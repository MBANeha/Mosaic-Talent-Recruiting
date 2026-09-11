import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Copy, Check, ArrowRight, ExternalLink } from 'lucide-react';
import { Page } from '../components/Layout';
import { Button, Card, Eyebrow } from '../components/ui';
import { useStore } from '../data/store';

const INTAKE_FORM_URL =
  'https://docs.google.com/forms/u/0/d/e/1FAIpQLSe1IhKmzV5HKToQeb0DdZ_oBTAqudnVnNnrRIp7EOTgm6mEkQ/viewform?pli=1';

export const Confirmation: React.FC = () => {
  const { currentMember } = useStore();
  const [copied, setCopied] = React.useState(false);

  if (!currentMember) return <Navigate to="/request-invitation" replace />;

  const referralLink = `www.mayamatch.com/request-invitation?ref=${currentMember.referralCode}`;

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
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          You're Officially on Maya's Radar. 💜
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-ink/60">
          Maya is building each dating pool intentionally rather than opening the doors to everyone. Complete
          your Maya Profile so we can learn more about you and who might make sense for you in{' '}
          <strong>{currentMember.region}</strong>.
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

        <Card className="mt-6 p-8 text-left">
          <Eyebrow>Want to move faster?</Eyebrow>
          <h2 className="mt-2 font-display text-xl font-semibold text-ink">
            Complete your intake &amp; book your consultation
          </h2>
          <p className="mt-2 text-sm text-ink/60">
            Finish our short intake form, then schedule your private $50 matchmaking consultation. If you
            join Dream Dates, that $50 is credited straight toward your membership.
          </p>
          <p className="mt-2 text-xs text-ink/40">
            Entirely optional and on your own timeline — this doesn't wait on Maya's review, and Maya won't
            chase you about it. The ball's in your court.
          </p>
          <a href={INTAKE_FORM_URL} target="_blank" rel="noopener" className="mt-5 inline-block">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Complete Intake &amp; Book Consultation <ExternalLink size={16} />
            </Button>
          </a>
        </Card>

        <Card muted className="mt-6 p-8 text-left">
          <Eyebrow>Grow your pool</Eyebrow>
          <h2 className="mt-2 font-display text-xl font-semibold text-ink">Know someone who belongs in Maya?</h2>
          <p className="mt-2 text-sm text-ink/60">
            Invite a single friend and help Maya build a stronger pool for everyone — including you.
          </p>
          <p className="mt-1 text-xs text-ink/40">
            Earn a $20 future credit. After you and your referral each complete an eligible paid Maya Match
            service purchase valued over $200, you'll receive a $20 Maya Match credit toward a future eligible
            purchase after verification. The credit is not cash back and cannot be transferred.
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
