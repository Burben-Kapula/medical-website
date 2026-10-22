import type { Mesh, Object3D } from "three";
import {
  boneIdForMesh,
  boneRegions,
  getBone,
  regionOrder,
  sideFromMeshName,
  type BoneInfo,
  type BoneRegion,
  type Side,
} from "../data/bones";
import { localizedBoneTexts, type LocalizedBoneText } from "../data/localizedBones";
import type { Lang } from "../data/i18n";

/**
 * One selectable item in the viewer: a bone on one side ("femur|left"),
 * a midline bone ("sacrum|"), or an unmapped mesh ("mesh:<name>").
 */
export type SkeletonEntry = {
  key: string;
  boneId?: string;
  side?: Side;
  region?: BoneRegion;
  meshName: string;
  meshCount: number;
};

export type SkeletonIndex = {
  entries: SkeletonEntry[];
  meshesByKey: Map<string, Mesh[]>;
  keyByMesh: Map<Mesh, string>;
  unmapped: string[];
};

export function entryKey(boneId: string, side?: Side): string {
  return `${boneId}|${side ?? ""}`;
}

/** Groups the meshes of a loaded model into selectable entries. */
export function buildSkeletonIndex(root: Object3D): SkeletonIndex {
  const meshesByKey = new Map<string, Mesh[]>();
  const keyByMesh = new Map<Mesh, string>();
  const meta = new Map<string, SkeletonEntry>();
  const unmapped: string[] = [];

  root.traverse((obj) => {
    const mesh = obj as Mesh;
    if (!mesh.isMesh) return;
    const name = mesh.name || mesh.parent?.name || "mesh";
    const boneId = boneIdForMesh(name);
    const known = boneId ? getBone(boneId) : undefined;
    let key: string;
    if (boneId && known) {
      const side = sideFromMeshName(name);
      key = entryKey(boneId, side);
      if (!meta.has(key)) {
        meta.set(key, { key, boneId, side, region: boneRegions[boneId], meshName: name, meshCount: 0 });
      }
    } else {
      key = `mesh:${mesh.uuid}`;
      unmapped.push(name);
      meta.set(key, { key, meshName: name, meshCount: 0 });
    }
    meta.get(key)!.meshCount += 1;
    keyByMesh.set(mesh, key);
    const list = meshesByKey.get(key);
    if (list) list.push(mesh);
    else meshesByKey.set(key, [mesh]);
  });

  const entries = [...meta.values()].sort((a, b) => {
    const ra = a.region ? regionOrder.indexOf(a.region) : 99;
    const rb = b.region ? regionOrder.indexOf(b.region) : 99;
    if (ra !== rb) return ra - rb;
    return (a.boneId ?? a.meshName).localeCompare(b.boneId ?? b.meshName) || (a.side ?? "").localeCompare(b.side ?? "");
  });

  if (unmapped.length && import.meta.env.DEV) {
    console.warn(
      `[skeleton] ${unmapped.length} mesh(es) have no entry in src/data/bones.ts meshMappings:`,
      unmapped,
    );
  }
  return { entries, meshesByKey, keyByMesh, unmapped };
}

/** Bones whose localized text is the shared "foot" overview. */
const FOOT_GROUPS = new Set(["tarsals", "metatarsals", "foot-phalanges"]);

export function localizedText(lang: Lang, boneId: string): LocalizedBoneText | undefined {
  if (lang === "en") return undefined;
  const texts = localizedBoneTexts[lang];
  return texts[boneId] ?? (FOOT_GROUPS.has(boneId) ? texts.foot : undefined);
}

/** Display name of an entry, e.g. "Femur (left)". Falls back to the mesh name. */
export function entryLabel(entry: SkeletonEntry, sideWords: { left: string; right: string }): string {
  const bone: BoneInfo | undefined = entry.boneId ? getBone(entry.boneId) : undefined;
  const base = bone?.name ?? prettifyMeshName(entry.meshName);
  return entry.side ? `${base} (${sideWords[entry.side]})` : base;
}

export function prettifyMeshName(name: string): string {
  const clean = name.replace(/_/g, " ").replace(/\s+[LR]$/, "").trim();
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}
