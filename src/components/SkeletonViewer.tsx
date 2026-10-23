import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import {
  Bvh,
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import {
  Box3,
  Color,
  DoubleSide,
  MathUtils,
  MeshStandardMaterial,
  PerspectiveCamera,

  Vector3,
  type Intersection,
  type Mesh,
  type Object3D,
} from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { buildSkeletonIndex, type SkeletonIndex } from "../lib/skeleton";
import type { UiStrings } from "../data/i18n";

export type FocusRequest = { key: string | null; nonce: number };

type SkeletonViewerProps = {
  modelUrl: string;
  strings: UiStrings;
  hoveredKey: string | null;
  selectedKey: string | null;
  isolate: boolean;
  interactive: boolean;
  focus: FocusRequest;
  onIndex: (index: SkeletonIndex) => void;
  onHover: (key: string | null) => void;
  onSelect: (key: string | null) => void;
  onToggleIsolate: () => void;
  onResetView: () => void;
};

const BONE_COLOR = new Color("#e8e4da");
const CARTILAGE_COLOR = new Color("#c6d4e1");
const TOOTH_COLOR = new Color("#f4f1ea");
const HIGHLIGHT = new Color("#3b82f6");
const TINT = new Color("#5b9dff");
const DEFAULT_VIEW_DIR = new Vector3(0.22, 0.12, 1).normalize();

export default function SkeletonViewer(props: SkeletonViewerProps) {
  const { strings, selectedKey, isolate, interactive, onToggleIsolate, onResetView } = props;
  const [ready, setReady] = useState(false);
  const [attempt, setAttempt] = useState(0);

  return (
    <div className="relative h-full w-full overflow-hidden bg-viewer">

      <ViewerErrorBoundary
        key={attempt}
        strings={strings}
        onRetry={() => {
          useGLTF.clear(props.modelUrl);
          setReady(false);
          setAttempt((n) => n + 1);
        }}
      >
        <div className="absolute inset-0">
        <Canvas
          dpr={[1, 2]}
          camera={{ fov: 36, near: 0.01, far: 50, position: [0.6, 1.1, 3] }}
          gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
          onPointerMissed={(e) => {
            if (interactive && e.type === "click") props.onSelect(null);
          }}
        >
          <SceneLights />
          <Suspense fallback={null}>
            <Bvh firstHitOnly>
              <SkeletonModel
                {...props}
                onIndex={(index) => {
                  setReady(true);
                  props.onIndex(index);
                }}
              />
            </Bvh>
          </Suspense>
          <OrbitControls
            makeDefault
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={0.8}
            zoomSpeed={0.9}
            minDistance={0.12}
            maxDistance={7}
            screenSpacePanning
          />
        </Canvas>
        </div>

        {!ready && <LoadingOverlay label={strings.loading} />}

        {ready && (
          <>
            <div className="pointer-events-none absolute bottom-3 start-3 hidden text-xs text-muted md:block">
              {[strings.hintRotate, strings.hintZoom, strings.hintPan].map((hint) => (
                <span key={hint} className="me-3">
                  {hint}
                </span>
              ))}
            </div>
            <div className="absolute bottom-3 end-3 flex gap-2">
              <ViewerButton
                onClick={onToggleIsolate}
                disabled={!selectedKey}
                active={isolate && !!selectedKey}
                label={strings.isolate}
              >
                <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" strokeDasharray="3 3" />
                <circle cx="12" cy="12" r="3.5" />
              </ViewerButton>
              <ViewerButton onClick={onResetView} label={strings.resetView}>
                <path d="M3 12a9 9 0 1 0 3-6.7" />
                <path d="M3 4v5h5" />
              </ViewerButton>
            </div>
          </>
        )}
      </ViewerErrorBoundary>
    </div>
  );
}

// ── Scene pieces ────────────────────────────────────────────────────────────

function SceneLights() {
  return (
    <>
      <hemisphereLight args={["#dbe6ff", "#1b2436", 0.55]} />
      <directionalLight position={[2.5, 4, 3.5]} intensity={1.7} />
      <directionalLight position={[-3.5, 2, 2]} intensity={0.45} color="#bcd3ff" />
      <directionalLight position={[0, 2.5, -4]} intensity={0.9} color="#9cc0ff" />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={1.2} position={[0, 3, 2]} scale={[4, 1.5, 1]} />
        <Lightformer form="rect" intensity={0.6} color="#9ec5ff" position={[-3, 1, -1]} scale={[2, 3, 1]} />
        <Lightformer form="rect" intensity={0.5} position={[3, 1, -1]} scale={[2, 3, 1]} />
      </Environment>
    </>
  );
}

type ModelProps = SkeletonViewerProps;

function SkeletonModel({
  modelUrl,
  hoveredKey,
  selectedKey,
  isolate,
  interactive,
  focus,
  onIndex,
  onHover,
  onSelect,
}: ModelProps) {
  const gltf = useGLTF(modelUrl, false, true);
  const scene = gltf.scene;

  // Build the index and give every mesh its own material so highlights are per bone.
  const { index, bounds } = useMemo(() => {
    scene.updateMatrixWorld(true);
    const idx = buildSkeletonIndex(scene);
    idx.keyByMesh.forEach((key, mesh) => {
      const source = mesh.material as MeshStandardMaterial;
      const boneId = key.split("|")[0];
      const color =
        boneId === "costal-cartilages" ? CARTILAGE_COLOR : boneId === "teeth" ? TOOTH_COLOR : BONE_COLOR;
      mesh.material = new MeshStandardMaterial({
        color,
        roughness: 0.58,
        metalness: 0,
        normalMap: source?.normalMap ?? null,
        normalScale: source?.normalScale,
        emissive: HIGHLIGHT,
        emissiveIntensity: 0,
        side: DoubleSide,
        envMapIntensity: 0.6,
      });
      mesh.userData.entryKey = key;
      mesh.userData.baseColor = color;
      mesh.userData.tint = 0;
    });
    return { index: idx, bounds: new Box3().setFromObject(scene) };
  }, [scene]);

  useEffect(() => {
    onIndex(index);
    // Only when a new model is loaded.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Animate highlight and isolation every frame.
  useFrame((_, dt) => {
    const k = 1 - Math.exp(-dt * 14);
    const isolating = isolate && !!selectedKey;
    index.keyByMesh.forEach((key, mesh) => {
      const mat = mesh.material as MeshStandardMaterial;
      const isSelected = key === selectedKey;
      const isHovered = key === hoveredKey && interactive;
      const glow = (isSelected ? 0.35 : 0) + (isHovered ? 0.22 : 0);
      mat.emissiveIntensity = MathUtils.lerp(mat.emissiveIntensity, glow, k);
      // Tint the surface too: emissive alone washes out on brightly lit bone.
      const tint = Math.min(1, (isSelected ? 0.7 : 0) + (isHovered ? 0.3 : 0));
      const t = (mesh.userData.tint = MathUtils.lerp((mesh.userData.tint as number) ?? 0, tint, k));
      mat.color.copy(mesh.userData.baseColor as Color).lerp(TINT, t);

      const targetOpacity = isolating && !isSelected ? 0.08 : 1;
      if (targetOpacity < 1 && !mat.transparent) {
        mat.transparent = true;
        mat.depthWrite = false;
        mat.needsUpdate = true;
      }
      mat.opacity = MathUtils.lerp(mat.opacity, targetOpacity, k);
      if (targetOpacity === 1 && mat.transparent && mat.opacity > 0.995) {
        mat.opacity = 1;
        mat.transparent = false;
        mat.depthWrite = true;
        mat.needsUpdate = true;
      }
    });
  });

  const pickKey = (hits: Intersection<Object3D>[]): string | null => {
    for (const hit of hits) {
      const key = (hit.object as Mesh).userData.entryKey as string | undefined;
      if (!key) continue;
      if (isolate && selectedKey && key !== selectedKey) continue;
      return key;
    }
    return null;
  };

  const handleMove = (e: ThreeEvent<PointerEvent>) => {
    if (!interactive || e.pointerType === "touch") return;
    e.stopPropagation();
    onHover(pickKey(e.intersections));
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    if (!interactive || e.delta > 4) return;
    e.stopPropagation();
    const key = pickKey(e.intersections);
    if (key) onSelect(key);
  };

  return (
    <>
      <group
        onPointerMove={handleMove}
        onPointerOut={() => interactive && onHover(null)}
        onClick={handleClick}
      >
        <primitive object={scene} />
      </group>
      <ContactShadows
        position={[0, bounds.min.y - 0.002, 0]}
        scale={2.4}
        opacity={0.3}
        blur={2.6}
        far={0.9}
        resolution={512}
        frames={1}
        color="#000000"
      />
      <CameraRig index={index} bounds={bounds} focus={focus} />
      <HoverCursor active={interactive && !!hoveredKey} />
    </>
  );
}

function HoverCursor({ active }: { active: boolean }) {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    gl.domElement.style.cursor = active ? "pointer" : "grab";
  }, [active, gl]);
  return null;
}

/** Smoothly moves the camera to frame a bone (or the whole skeleton). */
function CameraRig({ index, bounds, focus }: { index: SkeletonIndex; bounds: Box3; focus: FocusRequest }) {
  const controls = useThree((s) => s.controls) as OrbitControlsImpl | null;
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  const goal = useRef<{ target: Vector3; position: Vector3 } | null>(null);
  const snapped = useRef(false);

  const computeGoal = (key: string | null) => {
    const box = new Box3();
    const meshes = key ? index.meshesByKey.get(key) : undefined;
    if (meshes?.length) meshes.forEach((m) => box.expandByObject(m));
    else box.copy(bounds);
    const isBone = !!meshes?.length;
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const tan = Math.tan(MathUtils.degToRad(camera.fov / 2));
    // The view direction changes, so treat the wider of x/z as the visible width.
    const width = isBone ? Math.max(size.x, size.z) : size.x;
    const depth = isBone ? Math.max(size.x, size.z) : size.z;
    const fit = Math.max(size.y / 2 / tan, width / 2 / (tan * camera.aspect)) + depth / 2;
    const distance = Math.max(isBone ? 0.2 : 0.8, fit * (isBone ? 1.5 : 1.08));
    let dir = DEFAULT_VIEW_DIR.clone();
    if (isBone && controls) {
      dir = camera.position.clone().sub(controls.target).normalize();
    }
    return { target: center, position: center.clone().addScaledVector(dir, distance) };
  };

  // Frame the whole skeleton once the model is ready.
  useEffect(() => {
    if (!controls || snapped.current) return;
    const g = computeGoal(null);
    controls.target.copy(g.target);
    camera.position.copy(g.position);
    controls.update();
    snapped.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls]);

  useEffect(() => {
    if (focus.nonce === 0) return;
    goal.current = computeGoal(focus.key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus.nonce]);

  // Stop the animation when the user grabs the controls.
  useEffect(() => {
    if (!controls) return;
    const cancel = () => (goal.current = null);
    controls.addEventListener("start", cancel);
    return () => controls.removeEventListener("start", cancel);
  }, [controls]);

  useFrame((_, dt) => {
    const g = goal.current;
    if (!g || !controls) return;
    const k = 1 - Math.exp(-dt * 5);
    controls.target.lerp(g.target, k);
    camera.position.lerp(g.position, k);
    controls.update();
    if (controls.target.distanceTo(g.target) < 1e-4 && camera.position.distanceTo(g.position) < 1e-4) {
      goal.current = null;
    }
  });

  return null;
}

// ── Overlays ────────────────────────────────────────────────────────────────

function LoadingOverlay({ label }: { label: string }) {
  const { progress } = useProgress();
  return (
    <div className="absolute inset-0 grid place-items-center" role="status" aria-live="polite">
      <div className="w-56 text-center">
        <p className="text-sm text-muted">{label}</p>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-line">
          <div className="h-full bg-accent transition-[width] duration-300" style={{ width: `${Math.max(4, progress)}%` }} />
        </div>
      </div>
    </div>
  );
}

function ViewerButton({
  onClick,
  label,
  children,
  disabled,
  active,
}: {
  onClick: () => void;
  label: string;
  children: ReactNode;
  disabled?: boolean;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      aria-label={label}
      className={`flex h-10 min-w-10 items-center justify-center gap-2 rounded-md border px-2.5 text-sm shadow-sm transition-colors md:h-9 md:px-3 ${
        active ? "border-accent bg-accent text-white" : "border-line bg-surface text-fg hover:bg-sunken"
      } disabled:cursor-not-allowed disabled:opacity-50`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {children}
      </svg>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

type BoundaryProps = { children: ReactNode; strings: UiStrings; onRetry: () => void };

class ViewerErrorBoundary extends Component<BoundaryProps, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error("[skeleton] Failed to render the 3D model:", error);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    const { strings, onRetry } = this.props;
    return (
      <div className="absolute inset-0 grid place-items-center p-6" role="alert">
        <div className="max-w-md rounded-lg border border-line bg-surface p-5 text-center shadow-sm">
          <h2 className="text-base font-semibold text-bad">{strings.loadErrorTitle}</h2>
          <p className="mt-2 text-sm text-muted">{strings.loadErrorText}</p>
          <p className="mt-3 break-words rounded-md bg-sunken px-3 py-2 font-mono text-xs text-muted">
            {error.message}
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 h-10 rounded-md bg-accent px-4 text-sm font-medium text-white hover:bg-accent-dark"
          >
            {strings.retry}
          </button>
        </div>
      </div>
    );
  }
}
