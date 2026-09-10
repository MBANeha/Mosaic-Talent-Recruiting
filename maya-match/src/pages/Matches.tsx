import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Page } from '../components/Layout';
import { Button, Card, Eyebrow, Pill } from '../components/ui';
import { useStore } from '../data/store';

const STAGES: { key: string; label: string }[] = [
  { key: 'MUTUAL_MATCH', label: 'Mutual Match' },
  { key: 'CONTACT_EXCHANGED', label: 'Contact Exchanged' },
  { key: 'SECOND_DATE', label: 'Second Date?' },
  { key: 'DATING', label: 'Dating' },
  { key: 'RELATIONSHIP', label: 'Relationship' },
];

export const Matches: React.FC = () => {
  const { currentMember, datesForMember, pickById, advanceJourney } = useStore();
  if (!currentMember) return <Navigate to="/request-invitation" replace />;

  const matches = datesForMember(currentMember.id).filter((d) => d.mutual);

  return (
    <Page>
      <section className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <Eyebrow>Where connections become conversations</Eyebrow>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">Mutual Matches</h1>

        {matches.length === 0 && (
          <Card className="mt-8 p-8 text-center text-ink/60">
            <p>No mutual matches yet — they'll appear here after a Dream Date where you both say yes.</p>
            <Link to="/picks" className="mt-4 inline-block">
              <Button>View My Maya Picks</Button>
            </Link>
          </Card>
        )}

        <div className="mt-8 flex flex-col gap-6">
          {matches.map((d) => {
            const pick = pickById(d.pickId);
            if (!pick) return null;
            const stageIdx = STAGES.findIndex((s) => s.key === d.journeyStage);
            return (
              <Card key={d.id} className="p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <Pill tone="ruby" dot>💜 It's Mutual</Pill>
                    <h3 className="mt-2 font-display text-xl font-semibold text-ink">You &amp; {pick.firstName}</h3>
                  </div>
                  <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${pick.photoGradient} flex items-center justify-center font-display text-lg font-semibold text-white`}>
                    {pick.firstName[0]}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {STAGES.map((s, i) => (
                    <React.Fragment key={s.key}>
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          i <= stageIdx ? 'bg-maya-amethyst text-white' : 'bg-ink/6 text-ink/35'
                        }`}
                      >
                        {s.label}
                      </span>
                      {i < STAGES.length - 1 && <span className="h-px w-3 bg-ink/15" />}
                    </React.Fragment>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-sand p-4">
                  <div className="text-sm text-ink/70">
                    <div>{pick.contactEmail}</div>
                    <div>{pick.contactPhone}</div>
                  </div>
                  {stageIdx < STAGES.length - 1 && (
                    <Button size="sm" variant="secondary" onClick={() => advanceJourney(d.id)}>
                      Mark: {STAGES[stageIdx + 1].label}
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </Page>
  );
};
