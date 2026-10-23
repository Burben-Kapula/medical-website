import { useEffect, useRef } from "react";

type BoneTooltipProps = {
  /** Text to show; the tooltip is hidden when null. */
  label: string | null;
  sublabel?: string;
};

/** Small label that follows the mouse. It tracks the pointer itself so the rest of the app doesn't re-render on every move. */
export default function BoneTooltip({ label, sublabel }: BoneTooltipProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const el = ref.current;
      if (!el || e.pointerType === "touch") return;
      const pad = 14;
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
      className={`pointer-events-none fixed left-0 top-0 z-50 max-w-xs rounded-md bg-fg px-2.5 py-1.5 text-white shadow-md ${
        label ? "visible" : "invisible"
      }`}
    >
      <div className="text-sm font-medium">{label}</div>
      {sublabel && <div className="text-xs italic text-white/70">{sublabel}</div>}
    </div>
  );
}
