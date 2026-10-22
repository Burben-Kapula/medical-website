import { useEffect, useRef } from "react";

type BoneTooltipProps = {
  /** Text to show; the tooltip is hidden when null. */
  label: string | null;
  sublabel?: string;
};

/** Floating label that follows the pointer. Tracks the pointer itself so the rest of the app doesn't re-render on every mouse move. */
export default function BoneTooltip({ label, sublabel }: BoneTooltipProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const pad = 16;
      const { offsetWidth: w, offsetHeight: h } = el;
      let x = e.clientX + pad;
      let y = e.clientY + pad;
      if (x + w > window.innerWidth - 8) x = e.clientX - w - pad;
      if (y + h > window.innerHeight - 8) y = e.clientY - h - pad;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      ref={ref}
      role="tooltip"
      aria-hidden={!label}
      className={`pointer-events-none fixed left-0 top-0 z-50 max-w-xs rounded-lg border border-accent-500/30 bg-ink-900/90 px-3 py-2 shadow-xl shadow-black/40 backdrop-blur-md transition-opacity duration-100 ${
        label ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400 shadow-[0_0_8px] shadow-accent-400" />
        <span className="text-sm font-medium text-white">{label}</span>
      </div>
      {sublabel && <div className="mt-0.5 ps-3.5 font-serif text-xs italic text-ink-300">{sublabel}</div>}
    </div>
  );
}
