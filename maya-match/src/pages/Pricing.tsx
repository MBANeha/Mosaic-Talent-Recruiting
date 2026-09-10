import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Page } from '../components/Layout';
import { Button, Card, Eyebrow, Pill } from '../components/ui';
import { useStore } from '../data/store';
import type { MembershipTier } from '../types';

interface Tier {
  tier: MembershipTier;
  emoji: string;
  name: string;
  price: string;
  sub?: string;
  features: string[];
  cta: string;
  badge?: string;
  requiresConsultation: boolean;
  accent: string;
}

const TIERS: Tier[] = [
  {
    tier: 'FOUNDING',
    emoji: '💜',
    name: 'Founding Membership',
    price: '$100',
    sub: '2026 Launch Special · Future annual membership: $150',
    features: [
      'Private Maya profile',
      '12-month membership',
      'Screened Maya community',
      'Member opportunities',
      'Select event invitations',
      'Ability to upgrade to Dream Dates',
    ],
    cta: 'Join Maya',
    requiresConsultation: false,
    accent: 'from-maya-amethyst to-maya-amethystDark',
  },
  {
    tier: 'SAPPHIRE',
    emoji: '💙',
    name: 'Sapphire',
    price: '$299',
    sub: '3 Curated Dream Dates · 12-month Maya Membership Included',
    features: [
      'Matchmaker / coach review',
      '3 Dream Date opportunities',
      'Post-date feedback',
      'Continued Maya community membership',
      'Additional dates available',
    ],
    cta: 'Choose Sapphire',
    badge: 'BEST PLACE TO START',
    requiresConsultation: true,
    accent: 'from-maya-sapphire to-maya-sapphireDark',
  },
  {
    tier: 'AMETHYST',
    emoji: '💜',
    name: 'Amethyst VIP',
    price: '$549',
    sub: '7 Dream Dates · Membership included',
    features: [
      'Founding VIP status',
      'Priority curation',
      'Up to 3 active requests',
      'Pre-date coaching',
      'Post-date coaching / feedback',
      'Matchmaker check-ins',
      'Early event access',
    ],
    cta: 'Go VIP',
    requiresConsultation: true,
    accent: 'from-maya-amethyst to-maya-ruby',
  },
  {
    tier: 'DIAMOND',
    emoji: '💎',
    name: 'Diamond VIP',
    price: '$749',
    sub: '11 Dream Dates',
    features: ['Everything in Amethyst', 'Maximum Dream Date value', 'Top-priority curation'],
    cta: 'Become Diamond VIP',
    requiresConsultation: true,
    accent: 'from-maya-gold to-maya-ruby',
  },
];

export const Pricing: React.FC = () => {
  const { currentMember, purchaseMembership } = useStore();
  const navigate = useNavigate();

  const poolBuilding = currentMember?.reviewStatus === 'BUILDING_POOL';
  const visibleTiers = poolBuilding ? TIERS.filter((t) => t.tier === 'FOUNDING') : TIERS;

  function handleChoose(tier: Tier) {
    if (!currentMember) {
      navigate('/request-invitation');
      return;
    }
    if (tier.requiresConsultation) {
      navigate(`/consultation?tier=${tier.tier}`);
      return;
    }
    purchaseMembership(currentMember.id, tier.tier);
    navigate('/dashboard');
  }

  return (
    <Page>
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="text-center">
          <Eyebrow>Membership &amp; Dream Dates</Eyebrow>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">Choose your plan</h1>
          <p className="mx-auto mt-3 max-w-xl text-ink/60">
            Every plan includes full Maya community membership. Dream Dates packages add curated
            introductions on top.
          </p>
        </div>

        {poolBuilding && (
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-maya-amethyst/20 bg-maya-amethyst/5 px-6 py-4 text-center text-sm text-maya-amethystDark">
            Your region's Dream Dates pool is still building, so Sapphire, Amethyst, and Diamond aren't open
            yet. You can join now as a Founding Member and be among the first considered once it's ready.
          </div>
        )}

        <div className={`mt-12 grid gap-6 ${poolBuilding ? 'mx-auto max-w-md' : 'lg:grid-cols-4'}`}>
          {visibleTiers.map((t) => (
            <Card
              key={t.tier}
              className={`relative flex flex-col p-7 ${t.badge ? 'ring-2 ring-maya-sapphire' : ''}`}
            >
              {t.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-maya-sapphire px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                  {t.badge}
                </span>
              )}
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${t.accent} text-lg`}>
                {t.emoji}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{t.name}</h3>
              <p className="mt-2 font-display text-3xl font-semibold text-ink">{t.price}</p>
              {t.sub && <p className="mt-1 text-xs leading-relaxed text-ink/45">{t.sub}</p>}
              <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink/65">
                    <Check size={15} className="mt-0.5 shrink-0 text-maya-emerald" /> {f}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-7 w-full"
                variant={t.badge ? 'primary' : 'secondary'}
                onClick={() => handleChoose(t)}
              >
                {t.cta} <ArrowRight size={16} />
              </Button>
              {t.requiresConsultation && (
                <p className="mt-3 text-center text-[11px] text-ink/40">
                  Starts with a $50 consultation, credited toward this package.
                </p>
              )}
            </Card>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-ink/35">
          No 1-date or 5-date packages — Maya's curation model works best in sets of 3, 7, or 11.
        </p>
      </section>
    </Page>
  );
};
