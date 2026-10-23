import { useEffect, useRef, useState, type ReactNode } from "react";
import type { UiStrings } from "../data/i18n";
import { CloseButton } from "./BoneInfoPanel";

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
      className="m-auto w-[min(92vw,420px)] rounded-lg border border-line bg-surface p-0 text-fg shadow-xl backdrop:bg-black/30"
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">MedAnatomy 3D</h2>
            <p className="text-sm text-muted">{strings.title}</p>
          </div>
          <CloseButton label={strings.close} onClick={onClose} />
        </div>

        <dl className="mt-4 divide-y divide-line border-y border-line text-sm">
          <Row term={strings.aboutCreators}>{CREATORS.join(", ")}</Row>
          <Row term={strings.aboutModel}>
            <a href={MODEL_SOURCE.url} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
              {MODEL_SOURCE.label}
            </a>
          </Row>
          <Row term={strings.aboutInfo}>Wikipedia</Row>
          <Row term={strings.aboutContact}>
            <a href={`mailto:${CONTACT}`} className="break-all text-accent underline underline-offset-2">
              {CONTACT}
            </a>
          </Row>
        </dl>

        <p className="mt-4 text-xs leading-relaxed text-faint">{strings.aboutDisclaimer}</p>

        <div className="mt-3 flex items-end justify-between">
          <button
            type="button"
            onClick={() => setCat((c) => !c)}
            aria-label="Maxwell"
            className="text-sm opacity-30 transition-opacity hover:opacity-100"
          >
            🐈
          </button>
          {cat && <img src="/images/maxwell-the-cat.gif" alt="Maxwell the cat" className="h-20 rounded-md" />}
        </div>
      </div>
    </dialog>
  );
}

function Row({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-3 py-2.5">
      <dt className="text-muted">{term}</dt>
      <dd>{children}</dd>
    </div>
  );
}
