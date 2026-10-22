// Prepares a skeleton model for the web and writes src/models/skeleton.glb.
//
//   npm run model:prepare -- [path/to/model.glb|.gltf] [--ratio 0.4] [--keep-textures]
//
// With no path, the newest *skeleton*.glb / .gltf in ~/Downloads is used.
// Steps:
//   1. Decode (Draco / meshopt supported).
//   2. Rename bone meshes to "<Name> L" / "<Name> R" / "<Name>" so the app can
//      read the side from the name (see src/data/bones.ts).
//   3. If the model only contains right-side bones (".r" suffix) and no left
//      ones, mirror them across the midline to build the left side. Mirrored
//      nodes reuse the same mesh data, so the file barely grows.
//   4. Drop textures (unless --keep-textures), weld, simplify, meshopt-compress.
//
// Other formats (FBX/OBJ): convert them to GLB first, e.g. in Blender
// (File → Export → glTF 2.0), then run this script on the .glb.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { dedup, prune, weld, simplify, meshopt, getBounds } from "@gltf-transform/functions";
import { MeshoptDecoder, MeshoptEncoder, MeshoptSimplifier } from "meshoptimizer";
import draco3d from "draco3dgltf";

const args = process.argv.slice(2);
const ratioIdx = args.indexOf("--ratio");
const ratio = ratioIdx >= 0 ? Number(args[ratioIdx + 1]) : 0.4;
const keepTextures = args.includes("--keep-textures");
const inputArg = args.find((a, i) => !a.startsWith("--") && args[i - 1] !== "--ratio");

function findInDownloads() {
  const dir = path.join(os.homedir(), "Downloads");
  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.(glb|gltf)$/i.test(f) && /skelet/i.test(f))
    .map((f) => ({ f: path.join(dir, f), t: fs.statSync(path.join(dir, f)).mtimeMs }))
    .sort((a, b) => b.t - a.t);
  return files[0]?.f;
}

const input = inputArg ?? findInDownloads();
if (!input || !fs.existsSync(input)) {
  console.error("No input model found. Pass a path: npm run model:prepare -- path/to/model.glb");
  process.exit(1);
}
const output = path.resolve("src/models/skeleton.glb");
console.log(`Input:  ${input}`);

await MeshoptDecoder.ready;
await MeshoptEncoder.ready;
await MeshoptSimplifier.ready;

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({
    "draco3d.decoder": await draco3d.createDecoderModule(),
    "meshopt.decoder": MeshoptDecoder,
    "meshopt.encoder": MeshoptEncoder,
  });

const doc = await io.read(input);
const root = doc.getRoot();
const scene = root.getDefaultScene() ?? root.listScenes()[0];

const countTris = () =>
  root
    .listMeshes()
    .flatMap((m) => m.listPrimitives())
    .reduce((n, p) => n + (p.getIndices() ?? p.getAttribute("POSITION")).getCount() / 3, 0);
console.log(`Source: ${root.listMeshes().length} meshes, ${Math.round(countTris())} triangles`);

// 1. Clean names: "Femur.r" → "Femur R", "Parietal bone left" → "Parietal bone L".
function cleanName(raw) {
  let name = raw.trim();
  let side = "";
  const dotSide = name.match(/\.([lr])\.?$/i);
  if (dotSide) {
    side = dotSide[1].toUpperCase();
    name = name.slice(0, dotSide.index);
  }
  const wordSide = name.match(/\s+(left|right)$/i);
  if (wordSide) {
    side = wordSide[1][0].toUpperCase();
    name = name.slice(0, wordSide.index);
  }
  name = name.replace(/_/g, " ").replace(/\.\d+$/, "").replace(/\s+/g, " ").trim();
  return { base: name, side };
}

const meshNodes = root.listNodes().filter((n) => n.getMesh());
for (const node of meshNodes) {
  const { base, side } = cleanName(node.getName());
  node.setName(side ? `${base} ${side}` : base);
}

// 2. Mirror right-side bones if the left side is missing.
const rightNodes = meshNodes.filter((n) => n.getName().endsWith(" R"));
const hasLeft = meshNodes.some((n) => n.getName().endsWith(" L") && !/^Parietal/i.test(n.getName()));
if (rightNodes.length && !hasLeft) {
  // Find the midline from bones without a side (skull, spine, sternum).
  const midline = meshNodes.filter((n) => !/ [LR]$/.test(n.getName()));
  const xs = midline.map((n) => {
    const b = getBounds(n);
    return (b.min[0] + b.max[0]) / 2;
  });
  const midX = xs.reduce((a, b) => a + b, 0) / Math.max(xs.length, 1);
  console.log(`Mirroring ${rightNodes.length} right-side bones (midline x = ${midX.toFixed(4)})`);

  const leftGroup = doc
    .createNode("Bones_left")
    .setScale([-1, 1, 1])
    .setTranslation([2 * midX, 0, 0]);
  scene.addChild(leftGroup);
  for (const node of rightNodes) {
    const clone = doc
      .createNode(node.getName().replace(/ R$/, " L"))
      .setMesh(node.getMesh())
      .setMatrix(node.getWorldMatrix());
    leftGroup.addChild(clone);
  }
}

// 3. Drop textures and UVs unless asked to keep them. The app renders every
// bone with one uniform material, so textures only add download size.
if (!keepTextures) {
  for (const mat of root.listMaterials()) {
    mat.setBaseColorTexture(null).setNormalTexture(null).setOcclusionTexture(null)
      .setMetallicRoughnessTexture(null).setEmissiveTexture(null);
  }
  for (const prim of root.listMeshes().flatMap((m) => m.listPrimitives())) {
    for (const semantic of prim.listSemantics()) {
      if (semantic.startsWith("TEXCOORD") || semantic === "TANGENT") prim.setAttribute(semantic, null);
    }
  }
}

// 4. Optimise.
await doc.transform(
  dedup(),
  weld(),
  simplify({ simplifier: MeshoptSimplifier, ratio, error: 0.0015 }),
  prune({ keepLeaves: false }),
);

console.log(`Output: ${root.listMeshes().length} meshes, ${Math.round(countTris())} unique triangles`);

// Replace Draco (needs a decoder download at runtime) with meshopt.
root
  .listExtensionsUsed()
  .filter((ext) => ext.extensionName === "KHR_draco_mesh_compression")
  .forEach((ext) => ext.dispose());
await doc.transform(meshopt({ encoder: MeshoptEncoder, level: "medium" }));

fs.mkdirSync(path.dirname(output), { recursive: true });
await io.write(output, doc);
const kb = (fs.statSync(output).size / 1024).toFixed(0);
console.log(`Wrote:  ${path.relative(process.cwd(), output)} (${kb} KB)`);
