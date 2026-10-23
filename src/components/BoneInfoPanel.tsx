import { useEffect, useState, type ReactNode } from "react";
import { getBone } from "../data/bones";
import { languages, type Lang, type UiStrings } from "../data/i18n";
import { localizedText, prettifyMeshName, type SkeletonEntry } from "../lib/skeleton";

type RelatedItem = { key: string; label: string };

type BoneInfoPanelProps = {
  entry: SkeletonEntry;
  lang: Lang;
  strings: UiStrings;
  related: RelatedItem[];
  onNavigate: (key: string) => void;
  onClose: () => void;
};

export default function BoneInfoPanel({ entry, lang, strings, related, onNavigate, onClose }: BoneInfoPanelProps) {
  const bone = entry.boneId ? getBone(entry.boneId) : undefined;
  const local = entry.boneId ? localizedText(lang, entry.boneId) : undefined;
  const dir = languages.find((l) => l.code === lang)?.dir ?? "ltr";
  const meta = [entry.region && strings.regions[entry.region], entry.side && strings[entry.side]]
    .filter(Boolean)
    .join(" · ");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <article key={entry.key} className="flex min-h-0 flex-1 flex-col" aria-labelledby="bone-title">
      <header className="flex items-start gap-3 border-b border-line px-5 pb-4 pt-2 md:pt-5">
        <div className="min-w-0 flex-1">
          {meta && <p className="mb-1 text-xs text-faint first-letter:uppercase">{meta}</p>}
          <h2 id="bone-title" className="text-xl font-semibold leading-snug text-fg">
            {bone?.name ?? prettifyMeshName(entry.meshName)}
          </h2>
          {bone && <p className="mt-0.5 text-[15px] italic text-muted">{bone.latinName}</p>}
          {local?.name && (
            <p className="mt-0.5 text-sm text-muted" dir={dir}>
              {local.name}
            </p>
          )}
        </div>
        <CloseButton label={strings.close} onClick={onClose} />
      </header>

      <div className="scroll-thin min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5">
        {bone ? (
          <>
            <BoneImage src={bone.image} alt={bone.name} />
            <Section title={strings.description}>
              <p>{bone.description}</p>
            </Section>
            <Section title={strings.function}>
              <p>{bone.function}</p>
            </Section>

            {local && local.paragraphs.length > 0 && (
              <Section title={strings.inYourLanguage} dir={dir}>
                {local.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </Section>
            )}

            {related.length > 0 && entry.region && (
              <Section title={strings.regions[entry.region]}>
                <div className="flex flex-wrap gap-1.5">
                  {related.map((r) => (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => onNavigate(r.key)}
                      className="rounded-md border border-line px-2.5 py-1.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </Section>
            )}

            {bone.sourceUrl && (
              <a
                href={bone.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-accent underline underline-offset-2 hover:text-accent-dark"
              >
                {strings.reference} ↗
              </a>
            )}
          </>
        ) : (
          <Section title={strings.unmappedTitle}>
            <p>{strings.unmappedText}</p>
            <p className="font-mono text-xs text-faint">{entry.meshName}</p>
          </Section>
        )}
      </div>
    </article>
  );
}

function Section({ title, children, dir }: { title: string; children: ReactNode; dir?: "ltr" | "rtl" }) {
  return (
    <section dir={dir}>
      <h3 className="mb-1.5 text-sm font-semibold text-fg">{title}</h3>
      <div className="space-y-2 text-[15px] leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export function CloseButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="-me-2 grid h-10 w-10 shrink-0 place-items-center rounded-md text-muted transition-colors hover:bg-sunken hover:text-fg"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  );
}

function BoneImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (failed) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="aspect-[8/5] w-full rounded-md border border-line bg-sunken object-cover"
    />
  );
}
