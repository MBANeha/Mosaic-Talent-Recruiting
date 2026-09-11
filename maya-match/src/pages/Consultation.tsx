import React, { useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { Page } from '../components/Layout';
import { Button, Card, Eyebrow } from '../components/ui';
import { useStore } from '../data/store';
import type { MembershipTier } from '../types';

const TIER_INFO: Record<string, { name: string; total: number; emoji: string }> = {
  SAPPHIRE: { name: 'Sapphire', total: 299, emoji: '💙' },
  AMETHYST: { name: 'Amethyst VIP', total: 549, emoji: '💜' },
  DIAMOND: { name: 'Diamond VIP', total: 749, emoji: '💎' },
};

export const Consultation: React.FC = () => {
  const { currentMember, payConsultation, purchaseMembership } = useStore();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const tierParam = (params.get('tier') ?? 'SAPPHIRE') as MembershipTier;
  const info = TIER_INFO[tierParam] ?? TIER_INFO.SAPPHIRE;
  const [paid, setPaid] = useState(false);

  if (!currentMember) return <Navigate to="/request-invitation" replace />;

  function handlePayConsultation() {
    payConsultation(currentMember!.id);
    setPaid(true);
  }

  function handleCompletePurchase() {
    purchaseMembership(currentMember!.id, tierParam);
    navigate('/picks');
  }

  return (
    <Page>
      <section className="mx-auto max-w-xl px-5 py-20 sm:px-8">
        <Card className="p-9 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-maya-amethyst to-maya-ruby text-white">
            <PhoneCall size={22} />
          </div>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Maya Would Like to Meet You 💜</h1>
          <Eyebrow className="mt-4">Private Matchmaking Consultation — $50</Eyebrow>
          <p className="mt-3 text-sm leading-relaxed text-ink/60">
            Before Dream Dates begins, Maya's team meets every {info.name} member personally. Your $50
            consultation payment will be credited toward your Dream Dates package if you are approved and join.
          </p>

          {!paid ? (
            <Button size="lg" className="mt-8 w-full" onClick={handlePayConsultation}>
              Pay $50 Consultation <ArrowRight size={18} />
            </Button>
          ) : (
            <>
              <div className="mt-8 rounded-2xl bg-sand p-6 text-left">
                <div className="flex items-center justify-between text-sm text-ink/60">
                  <span>{info.emoji} {info.name}</span>
                  <span>${info.total}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm text-maya-emerald">
                  <span>Consultation credit</span>
                  <span>-$50</span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-3 font-semibold text-ink">
                  <span>Remaining balance</span>
                  <span>${info.total - 50}</span>
                </div>
              </div>
              <Button size="lg" className="mt-6 w-full" onClick={handleCompletePurchase}>
                Complete {info.name} — ${info.total - 50} <ArrowRight size={18} />
              </Button>
            </>
          )}
          <p className="mt-5 text-xs text-ink/35">
            No consultation is required for Founding Membership — this step only applies to Dream Dates
            packages, where Maya is actively curating your dates.
          </p>
        </Card>
      </section>
    </Page>
  );
};
