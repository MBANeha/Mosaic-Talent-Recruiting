import React from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { useStore } from '../../data/store';
import type { MigrationDecision } from '../../types';

const DECISION_LABEL: Record<MigrationDecision, { label: string; color: string }> = {
  INVITE_NOW: { label: '🟢 Invite Now', color: 'text-maya-emerald' },
  UPDATE_PROFILE: { label: '🟡 Update Profile', color: 'text-maya-goldLight' },
  DONT_MIGRATE: { label: "🔴 Don't Migrate", color: 'text-red-300' },
  PENDING_REVIEW: { label: 'Pending Review', color: 'text-cream/50' },
};

export const AdminMigration: React.FC = () => {
  const { migrationCandidates, advanceMigration, setMigrationDecision } = useStore();

  return (
    <AdminLayout>
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-maya-amethystLight">Free Dates Migration</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-white">Bring your existing community into Maya</h1>
      <p className="mt-2 max-w-2xl text-sm text-cream/50">
        Import Free Dates alumni, let Maya decide who's ready, and track them from invite to Sapphire/VIP.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {migrationCandidates.map((c) => (
          <div
            key={c.id}
            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold text-white">{c.name}</p>
              <p className="text-xs text-cream/45">{c.email} · {c.city}</p>
              <p className="mt-1 text-xs text-cream/40">{c.priorEngagement}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={c.mayaDecision}
                onChange={(e) => setMigrationDecision(c.id, e.target.value as MigrationDecision)}
                className={`rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold ${DECISION_LABEL[c.mayaDecision].color}`}
              >
                {Object.entries(DECISION_LABEL).map(([key, v]) => (
                  <option key={key} value={key} className="bg-[#150F22] text-cream">
                    {v.label}
                  </option>
                ))}
              </select>

              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-cream/70">
                {c.status}
              </span>

              {c.mayaDecision === 'INVITE_NOW' && c.status !== 'Sapphire' && (
                <button
                  onClick={() => advanceMigration(c.id)}
                  className="rounded-full bg-maya-amethyst px-4 py-1.5 text-xs font-semibold text-white transition hover:brightness-110"
                >
                  {c.status === 'Not Yet Invited' ? "Send: You're Invited 💜" : `Advance →`}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-cream/50">
        Invited → Opened → Profile Updated → Joined → Sapphire → VIP
      </div>
    </AdminLayout>
  );
};
