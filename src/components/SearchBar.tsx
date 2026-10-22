import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import type { BoneRegion } from "../data/bones";
import type { UiStrings } from "../data/i18n";

export type SearchItem = {
  key: string;
  label: string;
  latinName?: string;
  localName?: string;
  region?: BoneRegion;
};

type SearchBarProps = {
  items: SearchItem[];
  strings: UiStrings;
  onPick: (key: string) => void;
  disabled?: boolean;
};

const fold = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function SearchBar({ items, strings, onPick, disabled }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const results = useMemo(() => {
    const q = fold(query.trim());
    if (!q) return items;
    return items.filter((it) =>
      [it.label, it.latinName, it.localName].some((s) => s && fold(s).includes(q)),
    );
  }, [items, query]);

  useEffect(() => setActive(0), [query]);

  // "/" or Ctrl/Cmd+K focuses the search field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest("input, textarea, select");
      if ((e.key === "/" && !typing) || (e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey))) {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  const pick = (key: string) => {
    onPick(key);
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      pick(results[active].key);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, listId]);

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="relative">
        <svg
          className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-ink-400"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && results[active] ? `${listId}-${active}` : undefined}
          aria-label={strings.searchPlaceholder}
          placeholder={strings.searchPlaceholder}
          value={query}
          disabled={disabled}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="h-10 w-full rounded-xl border border-white/8 bg-ink-850 ps-9 pe-12 text-sm text-white placeholder:text-ink-400 outline-none transition focus:border-accent-500/60 focus:bg-ink-800 focus:ring-4 focus:ring-accent-500/10 disabled:opacity-50"
        />
        <kbd className="pointer-events-none absolute end-3 top-1/2 hidden -translate-y-1/2 rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-ink-400 md:block">
          /
        </kbd>
      </div>

      {open && !disabled && (
        <ul
          id={listId}
          role="listbox"
          className="scroll-thin absolute inset-x-0 top-12 z-40 max-h-[60vh] overflow-y-auto rounded-xl border border-white/8 bg-ink-850/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl"
        >
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-ink-400">{strings.noResults}</li>}
          {results.map((item, i) => {
            const showRegion = item.region && item.region !== results[i - 1]?.region;
            return (
              <li key={item.key} role="presentation">
                {showRegion && (
                  <div className="px-3 pb-1 pt-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-400">
                    {strings.regions[item.region!]}
                  </div>
                )}
                <div
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onPointerEnter={() => setActive(i)}
                  onClick={() => pick(item.key)}
                  className={`flex cursor-pointer items-baseline justify-between gap-3 rounded-lg px-3 py-2 ${
                    i === active ? "bg-accent-500/15 text-white" : "text-ink-200"
                  }`}
                >
                  <span className="truncate text-sm">
                    {item.label}
                    {item.localName && <span className="ms-2 text-xs text-ink-400">{item.localName}</span>}
                  </span>
                  {item.latinName && (
                    <span className="shrink-0 font-serif text-xs italic text-ink-400">{item.latinName}</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
