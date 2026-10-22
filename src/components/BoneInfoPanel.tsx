import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <article key={entry.key} className="animate-panel-in flex h-full flex-col" aria-labelledby="bone-title">
      <header className="flex items-start gap-3 border-b border-white/5 px-5 pb-4 pt-5">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {entry.region && <Chip>{strings.regions[entry.region]}</Chip>}
            {entry.side && <Chip tone="accent">{strings[entry.side]}</Chip>}
          </div>
          <h2 id="bone-title" className="text-xl font-semibold leading-tight text-white">
            {bone?.name ?? prettifyMeshName(entry.meshName)}
          </h2>
          {bone && <p className="mt-1 font-serif text-[15px] italic text-accent-300">{bone.latinName}</p>}
          {local?.name && lang !== "en" && (
            <p className="mt-1 text-sm text-ink-300" dir={dir}>
              {local.name}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={strings.close}
          className="-me-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg text-ink-300 transition hover:bg-white/5 hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </header>

      <div className="scroll-thin flex-1 space-y-6 overflow-y-auto px-5 py-5">
        {bone ? (
          <>
            <BoneImage src={bone.image} alt={bone.name} />
            <Section title={strings.description}>{bone.description}</Section>
            <Section title={strings.function}>{bone.function}</Section>

            {local && local.paragraphs.length > 0 && (
              <section dir={dir} className="rounded-xl border border-white/5 bg-ink-800/50 p-4">
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">
                  {strings.inYourLanguage}
                </h3>
                <div className="space-y-2 text-sm leading-relaxed text-ink-200">
                  {local.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            )}

            {related.length > 0 && entry.region && (
              <section>
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">
                  {strings.regions[entry.region]}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {related.map((r) => (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => onNavigate(r.key)}
                      className="rounded-md border border-white/5 bg-ink-800/60 px-2.5 py-1 text-xs text-ink-200 transition hover:border-accent-500/40 hover:text-white"
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {bone.sourceUrl && (
              <a
                href={bone.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-400 hover:text-accent-300"
              >
                {strings.reference}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </a>
            )}
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-white/10 p-4">
            <h3 className="text-sm font-semibold text-white">{strings.unmappedTitle}</h3>
            <p className="mt-1 text-sm text-ink-300">{strings.unmappedText}</p>
            <p className="mt-3 font-mono text-xs text-ink-400">{entry.meshName}</p>
          </div>
        )}
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: string }) {
  return (
    <section>
      <h3 className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">{title}</h3>
      <p className="text-[15px] leading-relaxed text-ink-100">{children}</p>
    </section>
  );
}

function Chip({ children, tone = "neutral" }: { children: string; tone?: "neutral" | "accent" }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
        tone === "accent" ? "bg-accent-500/15 text-accent-300" : "bg-white/5 text-ink-300"
      }`}
    >
      {children}
    </span>
  );
}

function BoneImage({ src, alt }: { src: string; alt: string }) {
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  useEffect(() => setState("loading"), [src]);

  if (state === "error") return null;
  return (
    <figure className="overflow-hidden rounded-xl border border-white/5 bg-ink-950">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setState("ok")}
        onError={() => setState("error")}
        className={`aspect-[8/5] w-full object-cover transition-opacity duration-300 ${
          state === "ok" ? "opacity-100" : "opacity-0"
        }`}
      />
    </figure>
  );
}
