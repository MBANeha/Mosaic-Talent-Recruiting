import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Heart, X, GraduationCap, Briefcase, MapPin, Sparkles } from 'lucide-react';
import { Page } from '../components/Layout';
import { Button, Card, Eyebrow, Pill } from '../components/ui';
import { PickPhoto } from '../components/PickPhoto';
import { ProfilesGate } from '../components/ProfilesGate';
import { useStore } from '../data/store';
import type { PickCandidate } from '../types';

function PickCard({ pick }: { pick: PickCandidate }) {
  const { currentMember, requestDreamDate, resolveRequest, requestsForMember } = useStore();
  const [passed, setPassed] = React.useState(false);
  const requests = currentMember ? requestsForMember(currentMember.id) : [];
  const request = requests.filter((r) => r.pickId === pick.id).sort((a, b) => b.createdAt - a.createdAt)[0];

  useEffect(() => {
    if (request && request.status === 'PENDING') {
      const t = setTimeout(() => resolveRequest(request.id), 2200);
      return () => clearTimeout(t);
    }
  }, [request?.id, request?.status]);

  if (passed) return null;
  if (!currentMember) return null;

  const noCredits = currentMember.dreamDatesCredits <= 0 && !request;

  return (
    <Card className="flex flex-col overflow-hidden">
      <PickPhoto pick={pick} blurred />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-xl font-semibold text-ink">
            {pick.firstName}, {pick.age}
          </h3>
          <Pill tone="amethyst">{pick.metro}</Pill>
        </div>
        <div className="mt-3 flex flex-col gap-1.5 text-sm text-ink/60">
          <span className="flex items-center gap-2"><Briefcase size={14} /> {pick.profession}</span>
          <span className="flex items-center gap-2"><GraduationCap size={14} /> {pick.education}</span>
          <span className="flex items-center gap-2"><MapPin size={14} /> {pick.culture}{pick.religion ? ` · ${pick.religion}` : ''}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {pick.interests.map((i) => (
            <span key={i} className="rounded-full bg-sand px-2.5 py-1 text-xs text-ink/60">{i}</span>
          ))}
        </div>
        <p className="mt-4 flex-1 text-sm italic leading-relaxed text-ink/55">"{pick.mayaSummary}"</p>
        <div className="mt-5 text-xs text-ink/45">
          {pick.relationshipGoal} · {pick.familyGoal}
        </div>

        <div className="mt-5 border-t border-ink/5 pt-5">
          {!request && (
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setPassed(true)}>
                <X size={16} /> Pass
              </Button>
              <Button
                className="flex-1"
                disabled={noCredits}
                onClick={() => requestDreamDate(currentMember.id, pick.id)}
              >
                <span>🌹</span> Request
              </Button>
            </div>
          )}
          {request?.status === 'PENDING' && (
            <div className="flex items-center justify-center gap-2 rounded-xl bg-sand py-3 text-sm font-medium text-ink/60">
              <Sparkles size={15} className="animate-pulse text-maya-amethyst" /> Maya is checking mutual interest…
            </div>
          )}
          {request?.status === 'ACCEPTED' && (
            <Link to="/dates">
              <Button className="w-full">It's a Dream Date — Schedule Now 💜</Button>
            </Link>
          )}
          {request?.status === 'DECLINED' && (
            <p className="rounded-xl bg-ink/5 py-3 text-center text-sm text-ink/50">
              No mutual connection this time. Your credit was returned.
            </p>
          )}
          {noCredits && !request && (
            <p className="mt-2 text-center text-xs text-maya-ruby">
              You're out of Dream Date credits —{' '}
              <Link to="/pricing" className="underline">
                add more
              </Link>
              .
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

export const Picks: React.FC = () => {
  const { currentMember, picks } = useStore();
  if (!currentMember) return <Navigate to="/request-invitation" replace />;
  if (!currentMember.membershipActive) return <Navigate to="/pricing" replace />;

  return (
    <Page>
      <ProfilesGate member={currentMember}>
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <Eyebrow>Curated for you</Eyebrow>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">Your Maya Picks</h1>
          <p className="mt-2 text-ink/60">
            {picks.length} promising {picks.length === 1 ? 'person' : 'people'} this week — chosen personally,
            not algorithmically browsed.
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-ink/40">
            <Sparkles size={12} /> Faces stay blurred until you and Maya are both sure — this is your
            password-protected view.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-maya-amethyst">
            <Heart size={16} /> {currentMember.dreamDatesCredits} Dream Date {currentMember.dreamDatesCredits === 1 ? 'credit' : 'credits'} available
          </div>

          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {picks.map((p) => (
              <PickCard key={p.id} pick={p} />
            ))}
          </div>
        </section>
      </ProfilesGate>
    </Page>
  );
};
