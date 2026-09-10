import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, HeartHandshake, AlertCircle, Sparkles } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { useStore } from '../../data/store';

function StatTile({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="font-display text-3xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-widest text-cream/45">{label}</p>
    </div>
  );
}

const REGION_EMOJI: Record<string, string> = {
  ACTIVE: '🟢',
  READY: '🔵',
  BUILDING: '🟣',
  EARLY: '🔴',
};

const STATUS_RANK: Record<string, number> = { ACTIVE: 0, READY: 1, BUILDING: 2, EARLY: 3 };
const MARKET_HEALTH_PREVIEW_COUNT = 6;

export const AdminToday: React.FC = () => {
  const { db, adminToday, regions, currentMember, reviewQueue } = useStore();

  const topRegions = [...regions]
    .sort((a, b) => STATUS_RANK[a.status] - STATUS_RANK[b.status])
    .slice(0, MARKET_HEALTH_PREVIEW_COUNT);
  const remainingRegionCount = regions.length - topRegions.length;

  const liveRequests = currentMember ? db.dateRequests.filter((r) => r.memberId === currentMember.id).length : 0;
  const liveScheduled = currentMember ? db.scheduledDates.filter((d) => d.memberId === currentMember.id).length : 0;
  const liveMutual = currentMember
    ? db.scheduledDates.filter((d) => d.memberId === currentMember.id && d.mutual).length
    : 0;

  const stats = [
    { label: 'New Invitation Requests', value: adminToday.newInvitationRequests + (currentMember ? 1 : 0) },
    { label: 'Profiles Completed', value: adminToday.profilesCompleted + (currentMember && currentMember.profileCompletion >= 100 ? 1 : 0) },
    { label: 'Waiting For Maya Review', value: reviewQueue.length },
    { label: 'Consultations', value: adminToday.consultations + (currentMember?.consultationPaid ? 1 : 0) },
    { label: 'New Paid Members', value: adminToday.newPaidMembers + (currentMember?.membershipActive ? 1 : 0) },
    { label: 'Dream Dates Requested', value: adminToday.dreamDatesRequested + liveRequests },
    { label: 'Dates Scheduled', value: adminToday.datesScheduled + liveScheduled },
    { label: 'Feedback Waiting', value: adminToday.feedbackWaiting },
    { label: 'Mutual Connections', value: adminToday.mutualConnections + liveMutual },
  ];

  const needsYou = [
    { icon: ClipboardList, text: `${reviewQueue.length} profile${reviewQueue.length === 1 ? '' : 's'} need review`, to: '/admin/review' },
    { icon: HeartHandshake, text: '2 date requests need approval', to: '/admin/regions' },
    { icon: AlertCircle, text: '3 feedback issues need attention', to: '/admin/regions' },
    { icon: Sparkles, text: '1 VIP needs a check-in', to: '/admin/regions' },
  ];

  return (
    <AdminLayout>
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-maya-amethystLight">Maya Today</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-white">Good morning, Maya.</h1>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <StatTile key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-display text-lg font-semibold text-white">Market Health</h2>
          <div className="mt-4 flex flex-col divide-y divide-white/10">
            {topRegions.map((r) => (
              <div key={r.id} className="flex items-center justify-between py-3">
                <span className="text-sm font-medium text-cream/80">{r.name}</span>
                <span className="flex items-center gap-2 text-sm text-cream/60">
                  {REGION_EMOJI[r.status]} {r.status}
                </span>
              </div>
            ))}
          </div>
          <Link to="/admin/regions" className="mt-4 inline-block text-sm font-semibold text-maya-amethystLight hover:underline">
            {remainingRegionCount > 0
              ? `+${remainingRegionCount} more markets — open Regional Pool Engine →`
              : 'Open Regional Pool Engine →'}
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-display text-lg font-semibold text-white">Maya Needs You</h2>
          <div className="mt-4 flex flex-col gap-3">
            {needsYou.map((item) => (
              <Link
                key={item.text}
                to={item.to}
                className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm text-cream/75 transition hover:bg-white/10"
              >
                <item.icon size={16} className="text-maya-amethystLight" />
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
