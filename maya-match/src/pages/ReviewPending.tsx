import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Page } from '../components/Layout';
import { Card, Eyebrow } from '../components/ui';
import { useStore } from '../data/store';

export const ReviewPending: React.FC = () => {
  const { currentMember } = useStore();
  if (!currentMember) return <Navigate to="/request-invitation" replace />;
  if (currentMember.reviewStatus !== 'PENDING' && currentMember.reviewStatus !== 'NOT_SUBMITTED') {
    return <Navigate to="/decision" replace />;
  }

  return (
    <Page>
      <section className="mx-auto max-w-xl px-5 py-24 text-center sm:px-8">
        <div className="mx-auto mb-6 flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-gradient-to-br from-maya-amethyst to-maya-ruby">
          <Sparkles size={26} className="text-white" />
        </div>
        <h1 className="font-display text-3xl font-semibold text-ink">Your Profile Is With Maya 💜</h1>
        <p className="mt-4 text-ink/60">
          Maya reviews every completed profile personally before activating membership or Dream Dates. This
          usually takes a couple of days — we'll let you know the moment there's an update.
        </p>
        <Card muted className="mt-8 p-6 text-left">
          <Eyebrow>While you wait</Eyebrow>
          <p className="mt-2 text-sm text-ink/60">
            Keep an eye on your dashboard for updates to your region's pool status, and feel free to invite a
            friend — a stronger pool means better matches for everyone.
          </p>
          <Link to="/dashboard" className="mt-4 inline-block text-sm font-semibold text-maya-amethyst hover:underline">
            Back to my dashboard →
          </Link>
        </Card>
        <p className="mt-8 text-xs text-ink/30">
          Demo shortcut — <Link to="/admin/review" className="underline">continue as Maya's review console</Link>
        </p>
      </section>
    </Page>
  );
};
