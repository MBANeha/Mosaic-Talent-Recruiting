import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Check, ArrowRight, Heart, Users, Copy } from 'lucide-react';
import { Page } from '../components/Layout';
import { Button, Card, Eyebrow, Pill, ProgressBar, poolStatusTone } from '../components/ui';
import { useStore } from '../data/store';

const reviewLabel: Record<string, string> = {
  NOT_SUBMITTED: 'Not submitted',
  PENDING: 'Pending',
  INVITED: 'Invited',
  BUILDING_POOL: 'Building your pool',
  NOT_FIT: 'Not currently a fit',
};

export const Dashboard: React.FC = () => {
  const { currentMember } = useStore();
  const [copied, setCopied] = React.useState(false);

  if (!currentMember) return <Navigate to="/request-invitation" replace />;
  const m = currentMember;

  const statusRows = [
    { label: 'Registration', value: '✓ Complete', done: true },
    { label: 'Match Profile', value: `${m.profileCompletion}%`, done: m.profileCompletion >= 100 },
    { label: 'Maya Review', value: reviewLabel[m.reviewStatus], done: m.reviewStatus === 'INVITED' },
    { label: 'Region', value: m.region, done: true },
    { label: 'Dating Pool', value: m.poolStatus, done: m.poolStatus === 'ACTIVE' },
    { label: 'Membership', value: m.membershipActive ? m.membershipTier : 'Not Active', done: m.membershipActive },
    { label: 'Dream Dates', value: m.membershipTier === 'FOUNDING' || m.membershipTier === 'NONE' ? 'Not Active' : `${m.dreamDatesCredits} credits left`, done: m.dreamDatesCredits > 0 },
  ];

  let nextAction: { label: string; to: string; desc: string } | null = null;
  if (m.profileCompletion < 100) {
    nextAction = { label: 'Continue My Maya Profile', to: '/profile', desc: 'Finish building your dossier so Maya can review you.' };
  } else if (m.reviewStatus === 'NOT_SUBMITTED') {
    nextAction = { label: 'Submit Profile to Maya', to: '/profile', desc: 'Your profile is complete — send it to Maya for review.' };
  } else if (m.reviewStatus === 'PENDING') {
    nextAction = { label: 'View Review Status', to: '/review', desc: 'Maya is reviewing your completed profile.' };
  } else if (m.reviewStatus === 'INVITED' && !m.membershipActive) {
    nextAction = { label: "See Maya's Decision", to: '/decision', desc: "You're invited to join Maya — see your options." };
  } else if (m.membershipActive && m.dreamDatesCredits > 0) {
    nextAction = { label: 'View My Maya Picks', to: '/picks', desc: 'A limited selection of promising people, chosen for you.' };
  } else if (m.reviewStatus === 'BUILDING_POOL' && !m.membershipActive) {
    nextAction = { label: "See Maya's Decision", to: '/decision', desc: 'Your pool is still building — see how you can join now.' };
  } else if (m.reviewStatus === 'NOT_FIT') {
    nextAction = { label: "View Maya's Decision", to: '/decision', desc: 'Maya has shared an update on your application.' };
  }

  const referralLink = `mayamatch.com/request-invitation?ref=${m.referralCode}`;
  function copyLink() {
    navigator.clipboard?.writeText(`https://${referralLink}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Page>
      <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
        <Eyebrow>Your Maya Dashboard</Eyebrow>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Welcome, {m.invitation.firstName}
        </h1>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="p-7">
            <h2 className="font-display text-lg font-semibold text-ink">Your Maya Status</h2>
            <div className="mt-5 divide-y divide-ink/5">
              {statusRows.map((row) => (
                <div key={row.label} className="flex items-center justify-between py-3">
                  <span className="flex items-center gap-2 text-sm font-medium text-ink/70">
                    {row.done && <Check size={15} className="text-maya-emerald" />}
                    {row.label}
                  </span>
                  <span className="text-sm font-semibold text-ink">{row.value}</span>
                </div>
              ))}
            </div>
            {m.profileCompletion < 100 && (
              <div className="mt-4">
                <ProgressBar value={m.profileCompletion} />
              </div>
            )}
          </Card>

          <div className="flex flex-col gap-6">
            <Card className="p-7">
              <Eyebrow>Your Dating Pool</Eyebrow>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">{m.region}</h3>
              <div className="mt-3">
                <Pill tone={poolStatusTone(m.poolStatus)} dot>
                  {m.poolStatus === 'ACTIVE' ? 'Active Pool' : m.poolStatus === 'GROWING' ? 'Growing Pool' : 'Founding Pool Building'}
                </Pill>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                Maya is {m.poolStatus === 'ACTIVE' ? 'actively matching within' : 'currently building'} your
                local dating community. We don't publish exact numbers — instead, watch your pool move from{' '}
                <strong>Building</strong> → <strong>Growing</strong> → <strong>Active</strong>.
              </p>
            </Card>

            <Card muted className="p-7">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink/70">
                <Users size={16} /> Help Build Your Pool
              </div>
              <p className="mt-2 text-sm text-ink/60">Know a great single person Maya should meet?</p>
              <div className="mt-4 flex flex-col gap-2">
                <div className="truncate rounded-xl border border-ink/10 bg-white px-3 py-2.5 font-mono text-xs text-ink/60">
                  {referralLink}
                </div>
                <Button variant="secondary" size="sm" onClick={copyLink}>
                  <Copy size={14} /> {copied ? 'Copied!' : 'Copy Invite Link'}
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {nextAction && (
          <Card className="mt-6 flex flex-col items-start justify-between gap-4 p-7 sm:flex-row sm:items-center">
            <div>
              <Eyebrow>Next step</Eyebrow>
              <p className="mt-1 font-display text-lg font-semibold text-ink">{nextAction.desc}</p>
            </div>
            <Link to={nextAction.to} className="shrink-0">
              <Button size="lg">
                {nextAction.label} <ArrowRight size={18} />
              </Button>
            </Link>
          </Card>
        )}

        {m.membershipActive && (
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Link to="/picks">
              <Card className="flex h-full flex-col justify-between p-6 transition hover:-translate-y-0.5 hover:shadow-jewel">
                <Heart size={18} className="text-maya-ruby" />
                <div>
                  <p className="mt-3 font-display text-base font-semibold text-ink">Maya Picks</p>
                  <p className="mt-1 text-xs text-ink/50">Browse this week's curated selection.</p>
                </div>
              </Card>
            </Link>
            <Link to="/dates">
              <Card className="flex h-full flex-col justify-between p-6 transition hover:-translate-y-0.5 hover:shadow-jewel">
                <span className="text-lg">💜</span>
                <div>
                  <p className="mt-3 font-display text-base font-semibold text-ink">My Dream Dates</p>
                  <p className="mt-1 text-xs text-ink/50">Requests, scheduling &amp; feedback.</p>
                </div>
              </Card>
            </Link>
            <Link to="/matches">
              <Card className="flex h-full flex-col justify-between p-6 transition hover:-translate-y-0.5 hover:shadow-jewel">
                <span className="text-lg">✨</span>
                <div>
                  <p className="mt-3 font-display text-base font-semibold text-ink">Mutual Matches</p>
                  <p className="mt-1 text-xs text-ink/50">Where connections became conversations.</p>
                </div>
              </Card>
            </Link>
          </div>
        )}
      </section>
    </Page>
  );
};
