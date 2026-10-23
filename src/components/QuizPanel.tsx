import { useCallback, useEffect, useMemo, useState } from "react";
import { getBone, type BoneInfo } from "../data/bones";
import type { Lang, UiStrings } from "../data/i18n";
import { localizedText, type SkeletonEntry } from "../lib/skeleton";
import { CloseButton } from "./BoneInfoPanel";

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

  const progress = Math.min(current + (picked ? 1 : 0), questions.length) / questions.length;

  return (
    <section className="flex min-h-0 flex-1 flex-col" aria-labelledby="quiz-title">
      <header className="flex items-center gap-3 border-b border-line px-5 pb-3 pt-2 md:pt-4">
        <div className="flex-1">
          <h2 id="quiz-title" className="text-base font-semibold text-fg">
            {strings.quizTitle}
          </h2>
          <p className="text-sm text-muted">
            {finished ? questions.length : current + 1} / {questions.length} · {strings.quizScore}:{" "}
            <span className="tabular-nums">{score}</span>
          </p>
        </div>
        <CloseButton label={strings.close} onClick={onExit} />
      </header>

      <div className="h-1 bg-sunken">
        <div className="h-full bg-accent transition-[width] duration-300" style={{ width: `${progress * 100}%` }} />
      </div>

      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto px-5 py-4">
        {finished ? (
          <div className="py-8 text-center">
            <p className="text-4xl font-semibold tabular-nums text-fg">
              {score}/{questions.length}
            </p>
            <p className="mt-2 text-muted">{strings.quizFinished}</p>
            <button
              type="button"
              onClick={restart}
              className="mt-6 h-11 rounded-md bg-accent px-5 text-sm font-medium text-white hover:bg-accent-dark"
            >
              {strings.quizRestart}
            </button>
          </div>
        ) : (
          q && (
            <>
              <p className="text-[15px] text-fg">{strings.quizPrompt}</p>
              <div className="mt-3 grid gap-2" role="group">
                {q.options.map((opt) => {
                  const isAnswer = opt.id === q.answerId;
                  const isPicked = opt.id === picked;
                  const local = localizedText(lang, opt.id);
                  let tone = "border-line hover:border-accent hover:bg-accent-soft";
                  if (picked && isAnswer) tone = "border-ok bg-ok-soft";
                  else if (picked && isPicked) tone = "border-bad bg-bad-soft";
                  else if (picked) tone = "border-line opacity-50";
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={!!picked}
                      onClick={() => answer(opt.id)}
                      className={`min-h-12 rounded-md border px-4 py-2.5 text-start transition-colors ${tone}`}
                    >
                      <span className="block text-[15px] font-medium text-fg">{opt.name}</span>
                      <span className="block text-sm text-muted">
                        <i>{opt.latinName}</i>
                        {local && <span className="ms-2">{local.name}</span>}
                      </span>
                    </button>
                  );
                })}
              </div>

              {picked && (
                <div className="mt-4" aria-live="polite">
                  <p className={`font-semibold ${picked === q.answerId ? "text-ok" : "text-bad"}`}>
                    {picked === q.answerId
                      ? strings.quizCorrect
                      : `${strings.quizWrong} ${getBone(q.answerId)?.name}`}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{getBone(q.answerId)?.function}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrent((c) => c + 1);
                      setPicked(null);
                    }}
                    className="mt-3 h-11 w-full rounded-md bg-accent px-4 text-sm font-medium text-white hover:bg-accent-dark md:w-auto"
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
