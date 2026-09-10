import React from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { useStore } from '../../data/store';
import type { AiRecommendation } from '../../types';

const AI_LABEL: Record<AiRecommendation, { label: string; color: string }> = {
  STRONG_FIT: { label: 'Strong Fit', color: 'text-maya-emerald' },
  WAITLIST: { label: 'Waitlist', color: 'text-maya-goldLight' },
  NOT_CURRENTLY_FIT: { label: 'Not Currently Fit', color: 'text-maya-ruby' },
};

export const AdminReview: React.FC = () => {
  const { reviewQueue, adminDecide } = useStore();

  return (
    <AdminLayout>
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-maya-amethystLight">Review Queue</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-white">Profiles awaiting Maya's decision</h1>
      <p className="mt-2 max-w-xl text-sm text-cream/50">
        AI flags a recommendation — Maya always makes the final call.
      </p>

      {reviewQueue.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-cream/50">
          Nothing waiting for review right now.
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          {reviewQueue.map((m) => {
            const ai = m.aiRecommendation ? AI_LABEL[m.aiRecommendation] : null;
            return (
              <div key={m.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-lg font-semibold text-white">
                        {m.invitation.firstName} {m.invitation.lastName}
                      </h3>
                      {m.isDemoUser && (
                        <span className="rounded-full bg-maya-amethyst/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-maya-amethystLight">
                          Live demo profile
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-cream/50">
                      {m.invitation.age} · {m.invitation.gender} seeking {m.invitation.interestedIn} · {m.region}
                    </p>
                    <p className="mt-1 text-sm text-cream/50">
                      Profile {m.profileCompletion}% complete · {m.invitation.relationshipGoal}
                    </p>
                  </div>
                  {ai && (
                    <div className="text-left sm:text-right">
                      <p className="text-[11px] uppercase tracking-widest text-cream/35">AI Recommendation</p>
                      <p className={`font-display text-lg font-semibold ${ai.color}`}>{ai.label}</p>
                    </div>
                  )}
                </div>

                <p className="mt-4 rounded-xl bg-black/20 p-4 text-sm italic text-cream/60">
                  "{m.invitation.whyMaya}"
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() => adminDecide(m.id, 'INVITED')}
                    className="rounded-full bg-maya-emerald/20 px-4 py-2 text-sm font-semibold text-maya-emerald transition hover:bg-maya-emerald/30"
                  >
                    🟢 Invite to Join
                  </button>
                  <button
                    onClick={() => adminDecide(m.id, 'BUILDING_POOL')}
                    className="rounded-full bg-maya-amethyst/20 px-4 py-2 text-sm font-semibold text-maya-amethystLight transition hover:bg-maya-amethyst/30"
                  >
                    🟣 Building Your Pool
                  </button>
                  <button
                    onClick={() => adminDecide(m.id, 'NOT_FIT')}
                    className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-cream/60 transition hover:bg-white/15"
                  >
                    🔴 Not Currently a Fit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
};
