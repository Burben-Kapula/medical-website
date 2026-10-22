import { useEffect, useRef, useState, type ReactNode } from "react";
import type { UiStrings } from "../data/i18n";

const CREATORS = ["Maksym Kapula", "Maryna Kapula", "Amaliia Paasonen"];
const CONTACT = "maksym.kapula@gmail.com";
const MODEL_SOURCE = { label: "open3dmodel.com", url: "https://open3dmodel.com" };

type AboutDialogProps = { open: boolean; strings: UiStrings; onClose: () => void };

export default function AboutDialog({ open, strings, onClose }: AboutDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [cat, setCat] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-[min(92vw,440px)] rounded-2xl border border-white/10 bg-ink-850 p-0 text-ink-100 shadow-2xl backdrop:bg-ink-950/70 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-400">MedAnatomy 3D</p>
            <h2 className="mt-1 text-lg font-semibold text-white">{strings.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={strings.close}
            className="grid h-9 w-9 place-items-center rounded-lg text-ink-300 hover:bg-white/5 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <dl className="mt-5 space-y-4 text-sm">
          <Row term={strings.aboutCreators}>{CREATORS.join(", ")}</Row>
          <Row term={strings.aboutModel}>
            <a href={MODEL_SOURCE.url} target="_blank" rel="noopener noreferrer" className="text-accent-400 hover:text-accent-300">
              {MODEL_SOURCE.label}
            </a>
          </Row>
          <Row term={strings.aboutInfo}>Wikipedia</Row>
          <Row term={strings.aboutContact}>
            <a href={`mailto:${CONTACT}`} className="text-accent-400 hover:text-accent-300">
              {CONTACT}
            </a>
          </Row>
        </dl>

        <p className="mt-5 rounded-lg bg-ink-800/60 px-3 py-2 text-xs leading-relaxed text-ink-300">
          {strings.aboutDisclaimer}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <button
            type="button"
            onClick={() => setCat((c) => !c)}
            aria-label="Maxwell"
            title="Maxwell"
            className="h-6 w-6 rounded-full border border-white/5 text-xs opacity-30 transition hover:opacity-100"
          >
            🐈
          </button>
          {cat && (
            <img src="/images/maxwell-the-cat.gif" alt="Maxwell the cat" className="h-24 rounded-lg" />
          )}
        </div>
      </div>
    </dialog>
  );
}

function Row({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-3">
      <dt className="text-ink-400">{term}</dt>
      <dd className="text-ink-100">{children}</dd>
    </div>
  );
}
