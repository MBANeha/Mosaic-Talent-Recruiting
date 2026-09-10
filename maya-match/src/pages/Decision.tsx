import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Page } from '../components/Layout';
import { Button, Card, Eyebrow } from '../components/ui';
import { useStore } from '../data/store';

export const Decision: React.FC = () => {
  const { currentMember } = useStore();
  if (!currentMember) return <Navigate to="/request-invitation" replace />;
  const status = currentMember.reviewStatus;

  if (status === 'NOT_SUBMITTED' || status === 'PENDING') {
    return <Navigate to="/review" replace />;
  }

  return (
    <Page>
      <section className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8">
        {status === 'INVITED' && (
          <>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-maya-emerald/15 text-3xl">
              🟢
            </div>
            <Eyebrow>Maya's decision</Eyebrow>
            <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
              You're invited to join Maya.
            </h1>
            <p className="mx-auto mt-4 max-w-md text-ink/60">
              Your profile stood out. Choose the plan that fits where you are — every plan includes full
              community membership.
            </p>
            <Link to="/pricing" className="mt-8 inline-block">
              <Button size="lg">
                See Membership Options <ArrowRight size={18} />
              </Button>
            </Link>
          </>
        )}

        {status === 'BUILDING_POOL' && (
          <>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-maya-amethyst/15 text-3xl">
              🟣
            </div>
            <Eyebrow>Maya's decision</Eyebrow>
            <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
              We're building your pool.
            </h1>
            <Card className="mt-6 p-7 text-left">
              <p className="text-ink/70">
                We'd love to have you in Maya. We're currently building the Dream Dates pool in your region.
              </p>
              <p className="mt-3 text-ink/70">
                You may join as a <strong>Founding Member</strong> now and be among the first considered as
                your pool becomes active.
              </p>
            </Card>
            <Link to="/pricing" className="mt-8 inline-block">
              <Button size="lg">
                Join as a Founding Member — $100 <ArrowRight size={18} />
              </Button>
            </Link>
            <p className="mt-3 text-xs text-ink/40">
              We won't ask you to buy a Dream Dates package until your pool is truly ready.
            </p>
          </>
        )}

        {status === 'NOT_FIT' && (
          <>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-ink/10 text-3xl">
              🔴
            </div>
            <Eyebrow>Maya's decision</Eyebrow>
            <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Not currently a fit.
            </h1>
            <p className="mx-auto mt-4 max-w-md text-ink/60">
              Maya reviewed your profile closely and isn't able to offer membership right now. No payment was
              ever required or taken. We'll keep your information on file and reach out if that changes.
            </p>
            <Link to="/" className="mt-8 inline-block">
              <Button variant="secondary" size="lg">
                Return home
              </Button>
            </Link>
          </>
        )}
      </section>
    </Page>
  );
};
