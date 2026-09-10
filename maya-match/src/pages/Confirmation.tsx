import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Copy, Check, ArrowRight } from 'lucide-react';
import { Page } from '../components/Layout';
import { Button, Card, Eyebrow } from '../components/ui';
import { useStore } from '../data/store';

export const Confirmation: React.FC = () => {
  const { currentMember } = useStore();
  const [copied, setCopied] = React.useState(false);

  if (!currentMember) return <Navigate to="/request-invitation" replace />;

  const referralLink = `mayamatch.com/request-invitation?ref=${currentMember.referralCode}`;

  function copyLink() {
    navigator.clipboard?.writeText(`https://${referralLink}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Page>
      <section className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-maya-amethyst to-maya-ruby text-3xl">
          💜
        </div>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">You're on Maya's radar.</h1>
        <p className="mx-auto mt-4 max-w-lg text-ink/60">
          Maya is building each dating pool intentionally, region by region. Your registration helps us
          understand who is looking for meaningful connections in <strong>{currentMember.region}</strong>.
        </p>
        <p className="mx-auto mt-2 max-w-lg text-sm text-ink/40">
          Maya Profile ID: <span className="font-mono text-ink/60">{currentMember.id}</span>
        </p>

        <Card className="mt-10 p-8 text-left">
          <Eyebrow>Next step</Eyebrow>
          <h2 className="mt-2 font-display text-xl font-semibold text-ink">Complete your Maya Profile</h2>
          <p className="mt-2 text-sm text-ink/60">
            So Maya can learn more about you and start considering you for the right introductions.
          </p>
          <Link to="/profile" className="mt-5 inline-block">
            <Button size="lg" className="w-full sm:w-auto">
              Build My Maya Profile <ArrowRight size={18} />
            </Button>
          </Link>
        </Card>

        <Card muted className="mt-6 p-8 text-left">
          <Eyebrow>Grow your pool</Eyebrow>
          <h2 className="mt-2 font-display text-xl font-semibold text-ink">Know someone who belongs in Maya?</h2>
          <p className="mt-2 text-sm text-ink/60">
            Invite a single friend and help Maya build a stronger pool for everyone — including you.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <div className="flex-1 truncate rounded-xl border border-ink/10 bg-white px-4 py-3 font-mono text-sm text-ink/70">
              {referralLink}
            </div>
            <Button variant="secondary" onClick={copyLink}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Invite a Single Friend'}
            </Button>
          </div>
        </Card>
      </section>
    </Page>
  );
};
