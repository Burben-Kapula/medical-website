import { useCallback, useEffect, useMemo, useState } from "react";
import SkeletonViewer, { type FocusRequest } from "./components/SkeletonViewer";
import BoneTooltip from "./components/BoneTooltip";
import BoneInfoPanel from "./components/BoneInfoPanel";
import SearchBar, { type SearchItem } from "./components/SearchBar";
import QuizPanel from "./components/QuizPanel";
import AboutDialog from "./components/AboutDialog";
import { getBone } from "./data/bones";
import { languages, ui, type Lang } from "./data/i18n";
import { entryLabel, localizedText, type SkeletonIndex } from "./lib/skeleton";
import modelUrl from "./models/skeleton.glb?url";

type Mode = "explore" | "quiz";

const LANG_KEY = "medanatomy.lang";

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY) as Lang | null;
    if (saved && languages.some((l) => l.code === saved)) return saved;
  } catch {
    // Storage can be unavailable (private mode); fall back to English.
  }
  return "en";
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [index, setIndex] = useState<SkeletonIndex | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [quizKey, setQuizKey] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("explore");
  const [isolate, setIsolate] = useState(false);
  const [focus, setFocus] = useState<FocusRequest>({ key: null, nonce: 0 });
  const [aboutOpen, setAboutOpen] = useState(false);

  const strings = ui[lang];
  const sideWords = useMemo(() => ({ left: strings.left, right: strings.right }), [strings]);

  useEffect(() => {
    const dir = languages.find((l) => l.code === lang)?.dir ?? "ltr";
    document.documentElement.lang = lang === "ua" ? "uk" : lang;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      // Ignore: the choice just won't persist.
    }
  }, [lang]);

  const entriesByKey = useMemo(() => new Map(index?.entries.map((e) => [e.key, e]) ?? []), [index]);

  const searchItems: SearchItem[] = useMemo(
    () =>
      (index?.entries ?? [])
        .filter((e) => e.boneId)
        .map((e) => ({
          key: e.key,
          label: entryLabel(e, sideWords),
          latinName: getBone(e.boneId!)?.latinName,
          localName: localizedText(lang, e.boneId!)?.name,
          region: e.region,
        })),
    [index, sideWords, lang],
  );

  const focusOn = useCallback((key: string | null) => {
    setFocus((f) => ({ key, nonce: f.nonce + 1 }));
  }, []);

  const select = useCallback(
    (key: string | null, withFocus = false) => {
      setSelectedKey(key);
      if (!key) setIsolate(false);
      if (key && withFocus) focusOn(key);
    },
    [focusOn],
  );

  const startQuiz = () => {
    setMode("quiz");
    setSelectedKey(null);
    setHoveredKey(null);
    setIsolate(false);
  };

  const exitQuiz = useCallback(() => {
    setMode("explore");
    setQuizKey(null);
    focusOn(null);
  }, [focusOn]);

  const highlightForQuiz = useCallback(
    (key: string) => {
      setQuizKey(key);
      focusOn(key);
    },
    [focusOn],
  );

  const closePanel = useCallback(() => select(null), [select]);

  const hoveredEntry = hoveredKey ? entriesByKey.get(hoveredKey) : undefined;
  const selectedEntry = selectedKey ? entriesByKey.get(selectedKey) : undefined;

  const related = useMemo(() => {
    if (!selectedEntry?.region || !index) return [];
    const seen = new Set<string>();
    return index.entries
      .filter((e) => e.region === selectedEntry.region && e.boneId && e.boneId !== selectedEntry.boneId)
      .filter((e) => (seen.has(e.boneId!) ? false : (seen.add(e.boneId!), true)))
      .map((e) => {
        // Prefer the same side as the current selection.
        const sameSide = index.entries.find((x) => x.boneId === e.boneId && x.side === selectedEntry.side);
        const target = sameSide ?? e;
        return { key: target.key, label: getBone(target.boneId!)?.name ?? target.meshName };
      });
  }, [selectedEntry, index]);

  const panelOpen = mode === "quiz" || !!selectedEntry;

  return (
    <div className="flex h-full flex-col bg-ink-900">
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <header className="z-30 border-b border-white/5 bg-ink-900/95 backdrop-blur">
        <div className="flex h-14 items-center gap-3 px-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <img src="/favicon.svg" alt="" className="h-8 w-8 shrink-0" />
            <div className="min-w-0 leading-tight">
              <h1 className="truncate text-[15px] font-semibold text-white">{strings.title}</h1>
              <p className="hidden truncate text-[11px] text-ink-400 sm:block">MedAnatomy 3D · {strings.subtitle}</p>
            </div>
          </div>

          <div className="mx-auto hidden w-full max-w-md md:block">
            <SearchBar items={searchItems} strings={strings} onPick={(k) => select(k, true)} disabled={mode === "quiz"} />
          </div>

          <div className="ms-auto flex shrink-0 items-center gap-1.5 md:ms-0">
            <button
              type="button"
              onClick={mode === "quiz" ? exitQuiz : startQuiz}
              disabled={!index}
              aria-pressed={mode === "quiz"}
              className={`flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition disabled:opacity-40 ${
                mode === "quiz"
                  ? "bg-accent-500/20 text-accent-300 ring-1 ring-accent-500/50"
                  : "text-ink-200 hover:bg-white/5 hover:text-white"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              <span className="hidden sm:inline">{strings.quiz}</span>
            </button>
            <button
              type="button"
              onClick={() => setAboutOpen(true)}
              className="flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-ink-200 transition hover:bg-white/5 hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              <span className="hidden sm:inline">{strings.about}</span>
            </button>
            <label className="relative">
              <span className="sr-only">{strings.language}</span>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Lang)}
                className="h-9 cursor-pointer appearance-none rounded-lg border border-white/8 bg-ink-850 ps-3 pe-7 text-sm text-ink-100 outline-none focus:border-accent-500/60"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>
              <svg className="pointer-events-none absolute end-2 top-1/2 -translate-y-1/2 text-ink-400" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </label>
          </div>
        </div>
        <div className="px-3 pb-3 md:hidden">
          <SearchBar items={searchItems} strings={strings} onPick={(k) => select(k, true)} disabled={mode === "quiz"} />
        </div>
      </header>

      {/* ── Viewer + panel ──────────────────────────────────────────────── */}
      <main className="relative flex min-h-0 flex-1 flex-col md:flex-row">
        <div className="relative min-w-0 flex-1">
          <SkeletonViewer
            modelUrl={modelUrl}
            strings={strings}
            hoveredKey={hoveredKey}
            selectedKey={mode === "quiz" ? quizKey : selectedKey}
            isolate={isolate}
            interactive={mode === "explore"}
            focus={focus}
            onIndex={setIndex}
            onHover={setHoveredKey}
            onSelect={(key) => select(key, window.matchMedia("(max-width: 767px)").matches)}
            onToggleIsolate={() => setIsolate((v) => !v)}
            onResetView={() => focusOn(null)}
          />
        </div>

        {panelOpen && (
          <aside
            className="z-20 -mt-4 flex h-[55%] shrink-0 flex-col overflow-hidden rounded-t-2xl border-t border-white/8 bg-ink-850 shadow-[0_-20px_40px_rgba(0,0,0,0.4)] md:mt-0 md:h-auto md:w-[400px] md:rounded-none md:border-s md:border-t-0 md:shadow-none lg:w-[420px]"
          >
            <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-white/15 md:hidden" aria-hidden />
            {mode === "quiz" && index ? (
              <QuizPanel
                entries={index.entries}
                lang={lang}
                strings={strings}
                onHighlight={highlightForQuiz}
                onExit={exitQuiz}
              />
            ) : (
              selectedEntry && (
                <BoneInfoPanel
                  entry={selectedEntry}
                  lang={lang}
                  strings={strings}
                  related={related}
                  onNavigate={(k) => select(k, true)}
                  onClose={closePanel}
                />
              )
            )}
          </aside>
        )}
      </main>

      <BoneTooltip
        label={mode === "explore" && hoveredEntry ? entryLabel(hoveredEntry, sideWords) : null}
        sublabel={hoveredEntry?.boneId ? getBone(hoveredEntry.boneId)?.latinName : undefined}
      />
      <AboutDialog open={aboutOpen} strings={strings} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
