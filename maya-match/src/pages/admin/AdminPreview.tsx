import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, RefreshCw, Sparkles } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { useStore } from '../../data/store';
import type { ReviewDecision } from '../../types';

interface PreviewLink {
  label: string;
  to: string;
  note?: string;
}

interface PreviewGroup {
  title: string;
  links: PreviewLink[];
}

const DECISION_OPTIONS: { key: ReviewDecision; label: string; emoji: string }[] = [
  { key: 'INVITED', label: 'Invited', emoji: '🟢' },
  { key: 'BUILDING_POOL', label: 'Building Pool', emoji: '🟣' },
  { key: 'NOT_FIT', label: 'Not a Fit', emoji: '🔴' },
];

function LinkChip({ label, to, note }: PreviewLink) {
  return (
    <Link
      to={to}
      target="_blank"
      className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-cream/80 transition hover:border-maya-amethyst/50 hover:bg-white/10 hover:text-white"
    >
      <span>
        {label}
        {note && <span className="ml-2 text-xs text-cream/40">{note}</span>}
      </span>
      <ExternalLink size={14} className="shrink-0 text-cream/40" />
    </Link>
  );
}

export const AdminPreview: React.FC = () => {
  const { db, datesForMember, seedPreviewMember, adminDecide } = useStore();

  const previewMember = db.members.find((m) => m.id.startsWith('preview-'));
  const dates = previewMember ? datesForMember(previewMember.id) : [];
  const upcomingDateId = dates.find((d) => d.status === 'SCHEDULED')?.id;
  const mutualDateId = dates.find((d) => d.status === 'COMPLETED' && d.mutual)?.id;
  const notMutualDateId = dates.find((d) => d.status === 'COMPLETED' && !d.mutual)?.id;

  const groups: PreviewGroup[] = [
    {
      title: 'Discovery & sign-up',
      links: [
        { label: 'Landing page', to: '/' },
        { label: 'How Dream Dates works', to: '/dream-dates' },
        { label: 'Request an invitation', to: '/request-invitation' },
      ],
    },
    {
      title: 'Free member account',
      links: [
        { label: 'Confirmation', to: '/confirmation' },
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Match Profile builder', to: '/profile' },
        { label: 'Maya review — pending', to: '/review' },
        { label: "Maya's decision", to: '/decision', note: 'reflects the toggle below' },
      ],
    },
    {
      title: 'Membership',
      links: [
        { label: 'Pricing', to: '/pricing' },
        { label: 'Consultation payment', to: '/consultation?tier=SAPPHIRE' },
      ],
    },
    {
      title: 'Dream Dates',
      links: [
        { label: 'Maya Picks', to: '/picks' },
        { label: 'My Dream Dates', to: '/dates' },
        upcomingDateId
          ? { label: 'Feedback form (open)', to: `/dates/${upcomingDateId}/feedback` }
          : { label: 'Feedback form (open)', to: '/dates', note: 'generate a preview member first' },
        mutualDateId
          ? { label: 'Feedback result — mutual', to: `/dates/${mutualDateId}/feedback` }
          : { label: 'Feedback result — mutual', to: '/dates', note: 'generate a preview member first' },
        notMutualDateId
          ? { label: 'Feedback result — no match', to: `/dates/${notMutualDateId}/feedback` }
          : { label: 'Feedback result — no match', to: '/dates', note: 'generate a preview member first' },
        { label: 'Mutual Matches', to: '/matches' },
        mutualDateId
          ? { label: 'Maya Match Inbox', to: `/inbox/${mutualDateId}` }
          : { label: 'Maya Match Inbox', to: '/matches', note: 'generate a preview member first' },
        { label: 'Invite a friend', to: '/invite' },
      ],
    },
  ];

  return (
    <AdminLayout>
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-maya-amethystLight">QA &amp; Design Review</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-white">Preview every Dream Dates page</h1>
      <p className="mt-2 max-w-2xl text-sm text-cream/50">
        Jump straight to any screen in the member experience without filling out the invitation form yourself.
        Links open in a new tab so you keep this console open.
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-maya-amethyst to-maya-ruby">
              <Sparkles size={17} className="text-white" />
            </span>
            <div>
              <p className="font-display text-base font-semibold text-white">
                {previewMember ? 'Preview member ready' : 'No preview member yet'}
              </p>
              <p className="text-xs text-cream/50">
                {previewMember
                  ? 'A fully-built account: complete profile, Diamond membership, an upcoming date, a mutual match with inbox messages, and one non-mutual date.'
                  : 'Generate one to populate every page below with real, working state.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => seedPreviewMember()}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-maya-amethyst to-maya-ruby px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            <RefreshCw size={14} /> {previewMember ? 'Regenerate preview member' : 'Generate preview member'}
          </button>
        </div>

        {previewMember && (
          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-cream/40">
              Maya's decision for this preview member
            </span>
            {DECISION_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => adminDecide(previewMember.id, opt.key as 'INVITED' | 'BUILDING_POOL' | 'NOT_FIT')}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  previewMember.reviewStatus === opt.key
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-cream/50 hover:bg-white/10'
                }`}
              >
                {opt.emoji} {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {groups.map((group) => (
          <div key={group.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="font-display text-base font-semibold text-white">{group.title}</h2>
            <div className="mt-4 flex flex-col gap-2">
              {group.links.map((link) => (
                <LinkChip key={link.label} {...link} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};
