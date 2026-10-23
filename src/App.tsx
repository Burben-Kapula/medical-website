import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
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
const isPhone = () => window.matchMedia("(max-width: 767px)").matches;

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
  const [sheetExpanded, setSheetExpanded] = useState(false);

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
      setSheetExpanded(false);
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
    setSheetExpanded(false);
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
  const search = (
    <SearchBar items={searchItems} strings={strings} onPick={(k) => select(k, true)} disabled={mode === "quiz"} />
  );

  return (
    <div className="flex h-dvh flex-col bg-page">
      {/* Top bar */}
      <header className="z-30 border-b border-line bg-surface">
        <div className="flex h-14 items-center gap-2 px-3 md:gap-4 md:px-5">
          <div className="flex min-w-0 flex-1 items-center gap-2.5 md:flex-none">
            <img src="/favicon.svg" alt="" className="h-7 w-7 shrink-0" />
            <div className="min-w-0">
              <h1 className="line-clamp-2 text-sm font-semibold leading-tight text-fg md:line-clamp-1 md:text-[15px]">
                {strings.title}
              </h1>
              <p className="hidden text-xs text-faint md:block">MedAnatomy 3D</p>
            </div>
          </div>

          <div className="mx-auto hidden w-full max-w-md md:block">{search}</div>

          <nav className="flex shrink-0 items-center gap-1.5">
            <HeaderButton
              label={mode === "quiz" ? strings.close : strings.quiz}
              onClick={mode === "quiz" ? exitQuiz : startQuiz}
              disabled={!index}
              active={mode === "quiz"}
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </HeaderButton>
            <HeaderButton label={strings.about} onClick={() => setAboutOpen(true)}>
              <circle cx="12" cy="12" r="9" />
              <path d="M12 16v-4M12 8h.01" />
            </HeaderButton>
            <label className="relative">
              <span className="sr-only">{strings.language}</span>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Lang)}
                className="h-10 w-[88px] cursor-pointer appearance-none truncate rounded-md border border-line bg-surface ps-2.5 pe-6 text-sm text-fg outline-none hover:bg-sunken focus:border-accent md:h-9 md:w-auto"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>
              <svg className="pointer-events-none absolute end-2 top-1/2 -translate-y-1/2 text-faint" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </label>
          </nav>
        </div>
        <div className="px-3 pb-3 md:hidden">{search}</div>
      </header>

      {/* Viewer + panel */}
      <main className="relative flex min-h-0 flex-1 flex-col md:flex-row">
        <div className="relative min-h-0 min-w-0 flex-1">
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
            onSelect={(key) => select(key, isPhone())}
            onToggleIsolate={() => setIsolate((v) => !v)}
            onResetView={() => focusOn(null)}
          />
        </div>

        {panelOpen && (
          <aside
            className={`z-20 flex shrink-0 flex-col overflow-hidden border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] transition-[height] duration-200 md:h-auto md:w-[380px] md:border-s md:border-t-0 md:pb-0 lg:w-[420px] ${
              sheetExpanded ? "h-[85%]" : "h-[48%]"
            }`}
          >
            {/* Phone only: tap the handle to expand or shrink the sheet. */}
            <button
              type="button"
              onClick={() => setSheetExpanded((v) => !v)}
              aria-label={sheetExpanded ? "Collapse" : "Expand"}
              aria-expanded={sheetExpanded}
              className="flex h-8 shrink-0 items-center justify-center md:hidden"
            >
              <span className="h-1 w-10 rounded-full bg-line-strong" />
            </button>
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

function HeaderButton({
  label,
  onClick,
  children,
  disabled,
  active,
}: {
  label: string;
  onClick: () => void;
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
      className={`flex h-10 min-w-10 items-center justify-center gap-1.5 rounded-md border px-2.5 text-sm transition-colors disabled:opacity-40 md:h-9 md:px-3 ${
        active
          ? "border-accent bg-accent text-white hover:bg-accent-dark"
          : "border-line bg-surface text-fg hover:bg-sunken"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {children}
      </svg>
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}
