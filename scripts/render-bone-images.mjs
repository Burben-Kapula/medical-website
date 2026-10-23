// Renders one illustration per bone into public/images/bones/<id>.jpg.
//
//   npm run images:render
//
// Each image has two panels: the whole skeleton with the bone highlighted
// (bones hidden behind others show through as an x-ray tint), and a
// close-up of the bone on its own. It uses a small software rasteriser,
// so no browser or GPU is needed. Run it again after changing the model or
// adding bones to src/data/bones.ts.

import fs from "node:fs";
import path from "node:path";
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { MeshoptDecoder } from "meshoptimizer";
import jpeg from "jpeg-js";
import { bones, boneIdForMesh, sideFromMeshName } from "../src/data/bones.ts";

const MODEL = path.resolve("src/models/skeleton.glb");
const OUT_DIR = path.resolve("public/images/bones");
const SS = 2; // supersampling factor
const W = 960;
const H = 600;
const SPLIT = 300; // width of the location panel

const BG_TOP = [236, 237, 239]; // matches the viewer background
const BG_BOTTOM = [228, 230, 233];
const BONE = [236, 232, 222];
const HIGHLIGHT = [47, 111, 222];

// Camera yaw in degrees (0 = front, -90 = view the right side, 180 = back).
const YAW = {
  temporal: -80,
  parietal: -60,
  zygomatic: -45,
  lacrimal: -40,
  nasal: -30,
  occipital: 180,
  scapula: 160,
  sacrum: 180,
  coccyx: 180,
  "hip-bone": -35,
  fibula: -70,
  ribs: -35,
  "thoracic-vertebrae": -70,
  "lumbar-vertebrae": -70,
  "cervical-vertebrae": -70,
  atlas: -30,
  axis: -30,
  "sesamoid-bones": -20,
};
const DEFAULT_YAW = -25;

// ── Load geometry ───────────────────────────────────────────────────────────
await MeshoptDecoder.ready;
const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({ "meshopt.decoder": MeshoptDecoder });
const doc = await io.read(MODEL);

/** @type {{ boneId?: string, side?: string, tris: Float32Array }[]} */
const parts = [];
for (const node of doc.getRoot().listNodes()) {
  const mesh = node.getMesh();
  if (!mesh) continue;
  const m = node.getWorldMatrix();
  for (const prim of mesh.listPrimitives()) {
    const pos = prim.getAttribute("POSITION");
    const idx = prim.getIndices();
    const count = idx ? idx.getCount() : pos.getCount();
    const tris = new Float32Array(count * 3);
    const v = [0, 0, 0];
    for (let i = 0; i < count; i++) {
      pos.getElement(idx ? idx.getScalar(i) : i, v);
      tris[i * 3] = m[0] * v[0] + m[4] * v[1] + m[8] * v[2] + m[12];
      tris[i * 3 + 1] = m[1] * v[0] + m[5] * v[1] + m[9] * v[2] + m[13];
      tris[i * 3 + 2] = m[2] * v[0] + m[6] * v[1] + m[10] * v[2] + m[14];
    }
    parts.push({ boneId: boneIdForMesh(node.getName()), side: sideFromMeshName(node.getName()), tris });
  }
}

function bounds(list) {
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (const p of list)
    for (let i = 0; i < p.tris.length; i += 3)
      for (let k = 0; k < 3; k++) {
        min[k] = Math.min(min[k], p.tris[i + k]);
        max[k] = Math.max(max[k], p.tris[i + k]);
      }
  return { min, max };
}

// ── Rasteriser ──────────────────────────────────────────────────────────────
function makeBuffer(w, h) {
  return { w, h, depth: new Float32Array(w * h).fill(-Infinity), shade: new Float32Array(w * h) };
}

/** Rasterises triangles of `list` into `buf` using an orthographic camera. */
function raster(buf, list, view) {
  const { cx, cy, cz, scale, ox, oy, yaw } = view;
  const c = Math.cos(yaw);
  const s = Math.sin(yaw);
  // Light comes from the upper front-left of the camera.
  const L = normalize([-0.45, 0.6, 0.66]);
  const P = new Float32Array(9);
  for (const part of list) {
    const t = part.tris;
    for (let i = 0; i < t.length; i += 9) {
      for (let k = 0; k < 3; k++) {
        const x = t[i + k * 3] - cx;
        const y = t[i + k * 3 + 1] - cy;
        const z = t[i + k * 3 + 2] - cz;
        const vx = x * c - z * s; // camera right
        const vz = x * s + z * c; // toward camera
        P[k * 3] = ox + vx * scale;
        P[k * 3 + 1] = oy - y * scale;
        P[k * 3 + 2] = vz;
      }
      // Face normal in view space (two-sided).
      const ax = P[3] - P[0], ay = -(P[4] - P[1]), az = (P[5] - P[2]) * scale;
      const bx = P[6] - P[0], by = -(P[7] - P[1]), bz = (P[8] - P[2]) * scale;
      let nx = ay * bz - az * by, ny = az * bx - ax * bz, nz = ax * by - ay * bx;
      const len = Math.hypot(nx, ny, nz);
      if (len === 0) continue;
      nx /= len; ny /= len; nz /= len;
      if (nz < 0) { nx = -nx; ny = -ny; nz = -nz; }
      const diffuse = Math.max(0, nx * L[0] + ny * L[1] + nz * L[2]);
      const shade = 0.28 + 0.62 * diffuse + 0.18 * Math.pow(nz, 8);

      const minX = Math.max(0, Math.floor(Math.min(P[0], P[3], P[6])));
      const maxX = Math.min(buf.w - 1, Math.ceil(Math.max(P[0], P[3], P[6])));
      const minY = Math.max(0, Math.floor(Math.min(P[1], P[4], P[7])));
      const maxY = Math.min(buf.h - 1, Math.ceil(Math.max(P[1], P[4], P[7])));
      if (minX > maxX || minY > maxY) continue;
      const area = (P[3] - P[0]) * (P[7] - P[1]) - (P[6] - P[0]) * (P[4] - P[1]);
      if (Math.abs(area) < 1e-9) continue;
      for (let py = minY; py <= maxY; py++) {
        const sy = py + 0.5;
        for (let px = minX; px <= maxX; px++) {
          const sx = px + 0.5;
          const w0 = ((P[3] - sx) * (P[7] - sy) - (P[6] - sx) * (P[4] - sy)) / area;
          const w1 = ((P[6] - sx) * (P[1] - sy) - (P[0] - sx) * (P[7] - sy)) / area;
          const w2 = 1 - w0 - w1;
          if (w0 < 0 || w1 < 0 || w2 < 0) continue;
          const z = w0 * P[2] + w1 * P[5] + w2 * P[8];
          const o = py * buf.w + px;
          if (z > buf.depth[o]) {
            buf.depth[o] = z;
            buf.shade[o] = shade;
          }
        }
      }
    }
  }
}

function normalize(v) {
  const l = Math.hypot(...v);
  return v.map((x) => x / l);
}

function frame(list, yaw, x0, width, pad) {
  // Fit `list` into a panel [x0, x0+width] × [0, H] (supersampled units).
  const c = Math.cos(yaw), s = Math.sin(yaw);
  let minU = Infinity, maxU = -Infinity, minY = Infinity, maxY = -Infinity;
  const b = bounds(list);
  const cx = (b.min[0] + b.max[0]) / 2, cz = (b.min[2] + b.max[2]) / 2;
  for (const p of list)
    for (let i = 0; i < p.tris.length; i += 3) {
      const u = (p.tris[i] - cx) * c - (p.tris[i + 2] - cz) * s;
      minU = Math.min(minU, u); maxU = Math.max(maxU, u);
      minY = Math.min(minY, p.tris[i + 1]); maxY = Math.max(maxY, p.tris[i + 1]);
    }
  const scale = Math.min((width * SS) / (maxU - minU), (H * SS) / (maxY - minY)) / pad;
  return {
    cx: cx + ((minU + maxU) / 2) * c,
    cz: cz - ((minU + maxU) / 2) * s,
    cy: (minY + maxY) / 2,
    scale,
    ox: (x0 + width / 2) * SS,
    oy: (H / 2) * SS,
    yaw,
  };
}

// ── Compose images ──────────────────────────────────────────────────────────
const fullW = W * SS, fullH = H * SS;
const everything = parts;
const locView = frame(everything, 0, 0, SPLIT, 1.12);
const sceneBuf = makeBuffer(fullW, fullH);
raster(sceneBuf, everything, locView);

function background(y) {
  const t = y / (fullH - 1);
  return BG_TOP.map((c, k) => c + (BG_BOTTOM[k] - c) * t);
}

function writeImage(id, targetBuf, closeBuf) {
  const hi = new Float32Array(fullW * fullH * 3);
  for (let y = 0; y < fullH; y++) {
    const bg = background(y);
    for (let x = 0; x < fullW; x++) {
      const o = y * fullW + x;
      let col = bg;
      if (x < SPLIT * SS) {
        const sceneHit = sceneBuf.depth[o] > -Infinity;
        const targetHit = targetBuf.depth[o] > -Infinity;
        if (sceneHit) col = BONE.map((c) => c * sceneBuf.shade[o] * 0.82);
        if (targetHit) {
          const visible = targetBuf.depth[o] >= sceneBuf.depth[o] - 1e-5;
          const lit = HIGHLIGHT.map((c) => Math.min(255, c * (0.6 + 0.6 * targetBuf.shade[o])));
          col = visible ? lit : col.map((c, k) => c * 0.45 + lit[k] * 0.55);
        }
      } else if (closeBuf.depth[o] > -Infinity) {
        const sh = closeBuf.shade[o];
        col = BONE.map((c) => Math.min(255, c * (0.15 + 0.85 * sh)));
      }
      hi[o * 3] = col[0];
      hi[o * 3 + 1] = col[1];
      hi[o * 3 + 2] = col[2];
    }
  }
  // Downsample + panel divider.
  const data = Buffer.alloc(W * H * 4);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const acc = [0, 0, 0];
      for (let j = 0; j < SS; j++)
        for (let i = 0; i < SS; i++) {
          const o = ((y * SS + j) * fullW + (x * SS + i)) * 3;
          acc[0] += hi[o]; acc[1] += hi[o + 1]; acc[2] += hi[o + 2];
        }
      const d = (y * W + x) * 4;
      const n = SS * SS;
      const divider = x === SPLIT && y > 24 && y < H - 24;
      data[d] = divider ? 207 : acc[0] / n;
      data[d + 1] = divider ? 207 : acc[1] / n;
      data[d + 2] = divider ? 202 : acc[2] / n;
      data[d + 3] = 255;
    }
  const file = path.join(OUT_DIR, `${id}.jpg`);
  fs.writeFileSync(file, jpeg.encode({ data, width: W, height: H }, 86).data);
  return file;
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const only = process.argv.slice(2);
for (const bone of bones) {
  if (only.length && !only.includes(bone.id)) continue;
  const all = parts.filter((p) => p.boneId === bone.id);
  if (!all.length) {
    console.warn(`  skip ${bone.id}: no meshes mapped`);
    continue;
  }
  // Close-up shows the right side for paired bones.
  const right = all.filter((p) => p.side === "right");
  const close = right.length ? right : all;
  const yaw = ((YAW[bone.id] ?? DEFAULT_YAW) * Math.PI) / 180;

  const targetBuf = makeBuffer(fullW, fullH);
  raster(targetBuf, all, locView);
  const closeBuf = makeBuffer(fullW, fullH);
  raster(closeBuf, close, frame(close, yaw, SPLIT + 20, W - SPLIT - 40, 1.18));
  const file = writeImage(bone.id, targetBuf, closeBuf);
  console.log(`  ${path.relative(process.cwd(), file)}`);
}
