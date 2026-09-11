import React from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { useStore } from '../../data/store';

const STATUS_STYLE: Record<string, string> = {
  ACTIVE: 'bg-maya-emerald/20 text-maya-emerald',
  READY: 'bg-maya-sapphire/20 text-blue-300',
  BUILDING: 'bg-maya-amethyst/20 text-maya-amethystLight',
  EARLY: 'bg-red-500/20 text-red-300',
};

const STATUS_EMOJI: Record<string, string> = { ACTIVE: '🟢', READY: '🔵', BUILDING: '🟣', EARLY: '🔴' };

export const AdminRegions: React.FC = () => {
  const { regions } = useStore();

  return (
    <AdminLayout>
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-maya-amethystLight">Growth &amp; Liquidity</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-white">Regional Pool Engine</h1>
      <p className="mt-2 max-w-2xl text-sm text-cream/50">
        Activation isn't based on raw member counts — it's based on how many plausible reciprocal matches the
        median member actually has.
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-widest text-cream/40">
              <th className="px-5 py-3 font-medium">Market</th>
              <th className="px-5 py-3 font-medium">Qualified</th>
              <th className="px-5 py-3 font-medium">30–45</th>
              <th className="px-5 py-3 font-medium">Pool Balance</th>
              <th className="px-5 py-3 font-medium">Reciprocal Matches</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {regions.map((r) => (
              <tr key={r.id} className="border-b border-white/5 last:border-0">
                <td className="px-5 py-4 font-semibold text-white">{r.name}</td>
                <td className="px-5 py-4 text-cream/70">{r.qualified}</td>
                <td className="px-5 py-4 text-cream/70">{r.ageBandPct}%</td>
                <td className="px-5 py-4 text-cream/70">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-maya-amethystLight" style={{ width: `${r.poolBalance}%` }} />
                    </div>
                    {r.poolBalance}%
                  </div>
                </td>
                <td className="px-5 py-4 text-cream/70">{r.reciprocalMatches}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[r.status]}`}>
                    {STATUS_EMOJI[r.status]} {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {regions.map((r) => (
          <div key={r.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-white">{r.name}</h3>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[r.status]}`}>
                {STATUS_EMOJI[r.status]} {r.status}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-cream/35">Strong</p>
                {r.strongSegments.map((s) => (
                  <p key={s} className="mt-1 text-maya-emerald">{s}</p>
                ))}
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-cream/35">Weak</p>
                {r.weakSegments.map((s) => (
                  <p key={s} className="mt-1 text-red-300">{s}</p>
                ))}
              </div>
            </div>
            <div className="mt-4 rounded-xl bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-widest text-cream/35">Growth recommendation</p>
              <p className="mt-1 text-sm text-cream/75">{r.growthRecommendation}</p>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};
