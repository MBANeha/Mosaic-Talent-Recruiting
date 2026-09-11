import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, X, ArrowRight, Lightbulb, Send } from 'lucide-react';
import { useStore } from '../data/store';
import { getMayaNextStep, getMayaTip } from '../data/mayaCompanion';
import { MAYA_QUESTIONS } from '../data/seed';

export const MayaCompanion: React.FC = () => {
  const { currentMember, requestsForMember, datesForMember, answerMayaQuestion } = useStore();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');

  if (!currentMember) return null;
  const m = currentMember;

  const requests = requestsForMember(m.id);
  const dates = datesForMember(m.id);
  const nextStep = getMayaNextStep(m, { requests, dates });
  const tip = getMayaTip(m, { requests, dates });

  const answeredIds = new Set(m.mayaAnswers.map((a) => a.id));
  const nextQuestion = MAYA_QUESTIONS.find((q) => !answeredIds.has(q.id));
  const hasSomethingNew = !!nextQuestion || !!nextStep.ctaTo;

  function handleAnswer(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed || !nextQuestion) return;
    answerMayaQuestion(m.id, nextQuestion.id, nextQuestion.question, trimmed);
    setDraft('');
  }

  return (
    <div className="fixed bottom-5 right-4 z-50 sm:bottom-6 sm:right-6">
      {open && (
        <div className="mb-3 w-[92vw] max-w-sm overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-jewel">
          <div className="flex items-center justify-between bg-gradient-to-r from-maya-amethyst to-maya-ruby px-5 py-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <Sparkles size={15} className="text-white" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-sm font-semibold text-white">Maya</p>
                <p className="text-[11px] text-white/75">Your personal wing person</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white" aria-label="Close Maya">
              <X size={17} />
            </button>
          </div>

          <div className="max-h-[65vh] overflow-y-auto p-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-maya-amethyst">What's next</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/75">{nextStep.message}</p>
              {nextStep.ctaTo && (
                <Link
                  to={nextStep.ctaTo}
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-cream transition hover:bg-plum"
                >
                  {nextStep.ctaLabel} <ArrowRight size={13} />
                </Link>
              )}
            </div>

            <div className="mt-5 rounded-2xl bg-sand/60 p-4">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-maya-amethyst">
                <Lightbulb size={12} /> Maya's tip
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{tip}</p>
            </div>

            <div className="mt-5 border-t border-ink/8 pt-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-maya-amethyst">Get to know you</p>

              <div className="mt-3 flex flex-col gap-2.5">
                {m.mayaAnswers.map((qa) => (
                  <React.Fragment key={qa.id}>
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-ink/8 bg-white px-3.5 py-2 text-xs text-ink/70">
                        {qa.question}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-gradient-to-br from-maya-amethyst to-maya-ruby px-3.5 py-2 text-xs text-white">
                        {qa.answer}
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-ink/8 bg-sand px-3.5 py-2 text-xs text-ink/60">
                        {qa.ack}
                      </div>
                    </div>
                  </React.Fragment>
                ))}

                {nextQuestion ? (
                  <>
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-ink/8 bg-white px-3.5 py-2 text-xs text-ink/70">
                        {nextQuestion.question}
                      </div>
                    </div>
                    <form onSubmit={handleAnswer} className="mt-1 flex items-center gap-2">
                      <input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="Tell Maya…"
                        className="flex-1 rounded-full border border-ink/12 bg-white px-3.5 py-2 text-xs text-ink placeholder:text-ink/35 focus:border-maya-amethyst focus:outline-none focus:ring-2 focus:ring-maya-amethyst/20"
                      />
                      <button
                        type="submit"
                        disabled={!draft.trim()}
                        aria-label="Send answer to Maya"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-maya-amethyst to-maya-ruby text-white disabled:opacity-40"
                      >
                        <Send size={12} />
                      </button>
                    </form>
                  </>
                ) : (
                  <p className="rounded-2xl bg-sand px-3.5 py-2.5 text-xs text-ink/50">
                    I feel like I really know you now 💜
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Ask Maya"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-maya-amethyst to-maya-ruby text-white shadow-jewel transition hover:brightness-110"
      >
        <Sparkles size={22} />
        {!open && hasSomethingNew && (
          <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-cream bg-maya-gold" />
        )}
      </button>
    </div>
  );
};
