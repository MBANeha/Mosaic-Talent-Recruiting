import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Copy, Check, Gift } from 'lucide-react';
import { Page } from '../components/Layout';
import { Button, Card, Eyebrow, Pill } from '../components/ui';
import { useStore } from '../data/store';

export const Invite: React.FC = () => {
  const { currentMember } = useStore();
  const [copied, setCopied] = useState(false);
  if (!currentMember) return <Navigate to="/request-invitation" replace />;

  const link = `mayamatch.com/request-invitation?ref=${currentMember.referralCode}`;
  function copyLink() {
    navigator.clipboard?.writeText(`https://${link}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Page>
      <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
        <Eyebrow>Your Maya Invite Link</Eyebrow>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">Help Build Your Dating Pool</h1>
        <p className="mt-3 text-ink/60">
          Know a great single person Maya should meet? A stronger, more balanced pool means better matches
          for you and everyone else in {currentMember.region}.
        </p>

        <Card className="mt-9 p-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1 truncate rounded-xl border border-ink/10 bg-sand px-4 py-3 font-mono text-sm text-ink/70">
              {link}
            </div>
            <Button onClick={copyLink}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy Link'}
            </Button>
          </div>
        </Card>

        <Card muted className="mt-6 flex items-start gap-4 p-7">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-maya-gold/15 text-maya-gold">
            <Gift size={20} />
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">Earn Maya credit</h3>
            <p className="mt-1 text-sm text-ink/60">
              If someone you refer is accepted and purchases a qualifying Maya service, you'll receive a{' '}
              <strong>$20 Maya credit</strong>.
            </p>
          </div>
        </Card>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Card className="p-6 text-center">
            <p className="font-display text-3xl font-semibold text-ink">{currentMember.referredCount}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-ink/40">Friends Referred</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="font-display text-3xl font-semibold text-ink">${currentMember.referralCreditsEarned}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-ink/40">Credits Earned</p>
          </Card>
        </div>
        <div className="mt-4 flex justify-center">
          <Pill tone="amethyst">Maya tracks referral quality, not just quantity</Pill>
        </div>
      </section>
    </Page>
  );
};
