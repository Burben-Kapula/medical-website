import { useCallback, useEffect, useMemo, useState } from "react";
import { getBone, type BoneInfo } from "../data/bones";
import type { Lang, UiStrings } from "../data/i18n";
import { localizedText, type SkeletonEntry } from "../lib/skeleton";

const QUESTION_COUNT = 10;

type Question = { entry: SkeletonEntry; options: BoneInfo[]; answerId: string };

type QuizPanelProps = {
  entries: SkeletonEntry[];
  lang: Lang;
  strings: UiStrings;
  onHighlight: (key: string) => void;
  onExit: () => void;
};

function shuffle<T>(list: T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuiz(entries: SkeletonEntry[]): Question[] {
  const mapped = entries.filter((e) => e.boneId && getBone(e.boneId));
  const byBone = new Map<string, SkeletonEntry[]>();
  mapped.forEach((e) => byBone.set(e.boneId!, [...(byBone.get(e.boneId!) ?? []), e]));
  const boneIds = shuffle([...byBone.keys()]).slice(0, QUESTION_COUNT);

  return boneIds.map((id) => {
    const variants = byBone.get(id)!;
    const entry = variants[Math.floor(Math.random() * variants.length)];
    // Distractors: prefer bones from the same region so the question is fair but not trivial.
    const others = [...byBone.keys()].filter((b) => b !== id);
    const sameRegion = shuffle(others.filter((b) => byBone.get(b)![0].region === entry.region));
    const rest = shuffle(others.filter((b) => !sameRegion.includes(b)));
    const distractors = [...sameRegion.slice(0, 2), ...rest].slice(0, 3);
    const options = shuffle([id, ...distractors]).map((b) => getBone(b)!);
    return { entry, options, answerId: id };
  });
}

export default function QuizPanel({ entries, lang, strings, onHighlight, onExit }: QuizPanelProps) {
  const [round, setRound] = useState(0);
  const questions = useMemo(() => buildQuiz(entries), [entries, round]); // eslint-disable-line react-hooks/exhaustive-deps
  const [current, setCurrent] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const finished = current >= questions.length;
  const q = questions[current];

  useEffect(() => {
    if (q) onHighlight(q.entry.key);
  }, [q, onHighlight]);

  const restart = useCallback(() => {
    setRound((r) => r + 1);
    setCurrent(0);
    setPicked(null);
    setScore(0);
  }, []);

  const answer = (id: string) => {
    if (picked || !q) return;
    setPicked(id);
    if (id === q.answerId) setScore((s) => s + 1);
  };

  return (
    <section className="animate-panel-in flex h-full flex-col" aria-labelledby="quiz-title">
      <header className="flex items-center gap-3 border-b border-white/5 px-5 py-4">
        <div className="flex-1">
          <h2 id="quiz-title" className="text-base font-semibold text-white">
            {strings.quizTitle}
          </h2>
          <p className="text-xs text-ink-400">
            {strings.quizScore}: <span className="tabular-nums text-ink-200">{score}</span> /{" "}
            {questions.length}
          </p>
        </div>
        <button
          type="button"
          onClick={onExit}
          aria-label={strings.close}
          className="grid h-9 w-9 place-items-center rounded-lg text-ink-300 transition hover:bg-white/5 hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </header>

      <div className="h-1 bg-ink-800">
        <div
          className="h-full bg-accent-500 transition-[width] duration-500"
          style={{ width: `${(Math.min(current + (picked ? 1 : 0), questions.length) / questions.length) * 100}%` }}
        />
      </div>

      <div className="scroll-thin flex-1 overflow-y-auto px-5 py-5">
        {finished ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full border-4 border-accent-500/30 text-2xl font-semibold tabular-nums text-white">
              {score}/{questions.length}
            </div>
            <p className="mt-4 text-lg font-semibold text-white">{strings.quizFinished}</p>
            <button
              type="button"
              onClick={restart}
              className="mt-6 rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-500"
            >
              {strings.quizRestart}
            </button>
          </div>
        ) : (
          q && (
            <>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-400">
                {current + 1} / {questions.length}
              </p>
              <p className="mt-2 text-[15px] text-ink-100">{strings.quizPrompt}</p>
              <div className="mt-4 grid gap-2" role="group">
                {q.options.map((opt) => {
                  const isAnswer = opt.id === q.answerId;
                  const isPicked = opt.id === picked;
                  const local = localizedText(lang, opt.id);
                  let tone = "border-white/8 bg-ink-800/60 hover:border-accent-500/50 hover:bg-ink-800";
                  if (picked && isAnswer) tone = "border-emerald-400/60 bg-emerald-500/15";
                  else if (picked && isPicked) tone = "border-red-400/60 bg-red-500/15";
                  else if (picked) tone = "border-white/5 bg-ink-800/30 opacity-60";
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={!!picked}
                      onClick={() => answer(opt.id)}
                      className={`rounded-xl border px-4 py-3 text-start transition ${tone}`}
                    >
                      <span className="block text-sm font-medium text-white">{opt.name}</span>
                      <span className="block font-serif text-xs italic text-ink-300">
                        {opt.latinName}
                        {local && lang !== "en" && <span className="ms-2 not-italic font-sans text-ink-400">{local.name}</span>}
                      </span>
                    </button>
                  );
                })}
              </div>

              {picked && (
                <div className="mt-4 rounded-xl border border-white/5 bg-ink-800/50 p-4" aria-live="polite">
                  <p className={`text-sm font-semibold ${picked === q.answerId ? "text-emerald-300" : "text-red-300"}`}>
                    {picked === q.answerId
                      ? strings.quizCorrect
                      : `${strings.quizWrong} ${getBone(q.answerId)?.name}`}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-300">{getBone(q.answerId)?.function}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrent((c) => c + 1);
                      setPicked(null);
                    }}
                    className="mt-3 rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white hover:bg-accent-500"
                  >
                    {strings.quizNext}
                  </button>
                </div>
              )}
            </>
          )
        )}
      </div>
    </section>
  );
}
