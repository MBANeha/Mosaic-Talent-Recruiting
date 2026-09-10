import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Page } from '../components/Layout';
import { Button, Card, Eyebrow, Textarea, CheckboxRow } from '../components/ui';
import { PickPhoto } from '../components/PickPhoto';
import { ProfilesGate } from '../components/ProfilesGate';
import { useStore } from '../data/store';

const RATING_LABELS = ['Chemistry', 'Conversation', 'Values', 'Lifestyle compatibility', 'Attraction'] as const;
type RatingKey = 'chemistry' | 'conversation' | 'values' | 'lifestyle' | 'attraction';
const RATING_KEYS: RatingKey[] = ['chemistry', 'conversation', 'values', 'lifestyle', 'attraction'];

const SEE_AGAIN_OPTIONS: { key: 'YES' | 'NOT_FOR_ME' | 'MAYBE'; label: string; emoji: string }[] = [
  { key: 'YES', label: 'Yes', emoji: '💜' },
  { key: 'NOT_FOR_ME', label: 'Not for me', emoji: '🤍' },
  { key: 'MAYBE', label: 'Maybe / need to think', emoji: '🤔' },
];

export const Feedback: React.FC = () => {
  const { dateId } = useParams();
  const { currentMember, db, pickById, submitMemberFeedback } = useStore();
  const date = db.scheduledDates.find((d) => d.id === dateId);

  const [wantsToSeeAgain, setWantsToSeeAgain] = useState<'YES' | 'NOT_FOR_ME' | 'MAYBE' | ''>('');
  const [ratings, setRatings] = useState<Record<RatingKey, number>>({
    chemistry: 0,
    conversation: 0,
    values: 0,
    lifestyle: 0,
    attraction: 0,
  });
  const [whatWorked, setWhatWorked] = useState('');
  const [whatDidnt, setWhatDidnt] = useState('');
  const [anythingElse, setAnythingElse] = useState('');
  const [consent, setConsent] = useState(true);

  if (!currentMember) return <Navigate to="/request-invitation" replace />;
  if (!date) return <Navigate to="/dates" replace />;
  const pick = pickById(date.pickId);
  if (!pick) return <Navigate to="/dates" replace />;

  if (date.status === 'COMPLETED') {
    const mutual = date.mutual;
    return (
      <Page>
        <ProfilesGate member={currentMember}>
        <section className="mx-auto max-w-xl px-5 py-20 text-center sm:px-8">
          {mutual ? (
            <>
              <div className="mx-auto mb-5 flex justify-center">
                <PickPhoto pick={pick} blurred={false} variant="circle" className="h-20 w-20" />
              </div>
              <h1 className="font-display text-3xl font-semibold text-ink">It's Mutual 💜</h1>
              <p className="mt-3 text-ink/60">You both want to continue the conversation.</p>
              <Card className="mt-8 p-7 text-left">
                <Eyebrow>Maya Match Inbox unlocked</Eyebrow>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  No phone numbers exchanged yet — instead, Maya's opened a private inbox where you and{' '}
                  {pick.firstName} can message and send voice notes back and forth, right here.
                </p>
                <Link to={`/inbox/${date.id}`} className="mt-5 block">
                  <Button className="w-full">Open Maya Match Inbox 💬</Button>
                </Link>
              </Card>
            </>
          ) : (
            <>
              <div className="mx-auto mb-5 flex justify-center">
                <PickPhoto pick={pick} blurred variant="circle" className="h-20 w-20" />
              </div>
              <h1 className="font-display text-3xl font-semibold text-ink">No mutual connection this time.</h1>
              <p className="mx-auto mt-3 max-w-sm text-ink/60">
                That's part of dating. Your feedback will help Maya understand what may work better next time.
              </p>
            </>
          )}
          <Link to="/picks" className="mt-8 inline-block">
            <Button size="lg">Back to My Maya Picks</Button>
          </Link>
        </section>
        </ProfilesGate>
      </Page>
    );
  }

  const canSubmit = wantsToSeeAgain !== '' && RATING_KEYS.every((k) => ratings[k] > 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || !wantsToSeeAgain) return;
    submitMemberFeedback(date!.id, {
      wantsToSeeAgain,
      chemistry: ratings.chemistry,
      conversation: ratings.conversation,
      values: ratings.values,
      lifestyle: ratings.lifestyle,
      attraction: ratings.attraction,
      whatWorked,
      whatDidnt,
      anythingElse,
      consentToExchange: consent,
    });
  }

  return (
    <Page>
      <ProfilesGate member={currentMember}>
      <section className="mx-auto max-w-2xl px-5 py-14 sm:px-8">
        <Eyebrow>Private &amp; only visible to Maya</Eyebrow>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">How Was Your Dream Date?</h1>
        <div className="mt-3 flex items-center gap-3">
          <PickPhoto pick={pick} blurred variant="circle" />
          <p className="text-ink/60">Your date with {pick.firstName}.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mt-8 p-7">
            <p className="font-semibold text-ink">Would you like to see them again?</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {SEE_AGAIN_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.key}
                  onClick={() => setWantsToSeeAgain(opt.key)}
                  className={`rounded-2xl border-2 px-3 py-4 text-center text-sm font-semibold transition ${
                    wantsToSeeAgain === opt.key
                      ? 'border-maya-amethyst bg-maya-amethyst/5 text-maya-amethystDark'
                      : 'border-ink/10 text-ink/60 hover:border-ink/25'
                  }`}
                >
                  <div className="text-xl">{opt.emoji}</div>
                  <div className="mt-1">{opt.label}</div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="mt-6 p-7">
            <p className="font-semibold text-ink">Rate the date</p>
            <div className="mt-4 flex flex-col gap-4">
              {RATING_KEYS.map((key, i) => (
                <div key={key} className="flex items-center justify-between gap-4">
                  <span className="text-sm text-ink/65">{RATING_LABELS[i]}</span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        type="button"
                        key={n}
                        onClick={() => setRatings((r) => ({ ...r, [key]: n }))}
                        className={`h-7 w-7 rounded-full text-xs font-bold transition ${
                          ratings[key] >= n ? 'bg-maya-amethyst text-white' : 'bg-ink/8 text-ink/30'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="mt-6 flex flex-col gap-5 p-7">
            <label className="block">
              <span className="text-sm font-semibold text-ink/80">What worked?</span>
              <Textarea className="mt-2" value={whatWorked} onChange={(e) => setWhatWorked(e.target.value)} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink/80">What didn't?</span>
              <Textarea className="mt-2" value={whatDidnt} onChange={(e) => setWhatDidnt(e.target.value)} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink/80">Anything Maya should know?</span>
              <Textarea className="mt-2" value={anythingElse} onChange={(e) => setAnythingElse(e.target.value)} />
            </label>
          </Card>

          <Card className="mt-6 p-7">
            <CheckboxRow checked={consent} onChange={setConsent}>
              If {pick.firstName} also says yes, I'd like Maya to exchange our contact information.
            </CheckboxRow>
          </Card>

          <Button type="submit" size="lg" className="mt-6 w-full" disabled={!canSubmit}>
            Submit Feedback
          </Button>
        </form>
      </section>
      </ProfilesGate>
    </Page>
  );
};
