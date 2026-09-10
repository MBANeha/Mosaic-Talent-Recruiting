import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { CalendarClock, Video, Bell } from 'lucide-react';
import { Page } from '../components/Layout';
import { Button, Card, Eyebrow, Pill } from '../components/ui';
import { useStore } from '../data/store';

const SLOTS = ['Thu 7:00 PM ET', 'Fri 6:30 PM ET', 'Sat 11:00 AM ET', 'Sun 4:00 PM ET'];

export const Dates: React.FC = () => {
  const { currentMember, requestsForMember, datesForMember, scheduleDate, pickById } = useStore();
  if (!currentMember) return <Navigate to="/request-invitation" replace />;

  const requests = requestsForMember(currentMember.id);
  const scheduled = datesForMember(currentMember.id);
  const acceptedAwaitingSchedule = requests.filter(
    (r) => r.status === 'ACCEPTED' && !scheduled.some((d) => d.requestId === r.id)
  );
  const upcoming = scheduled.filter((d) => d.status === 'SCHEDULED');
  const completed = scheduled.filter((d) => d.status === 'COMPLETED');

  return (
    <Page>
      <section className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
        <Eyebrow>Dream Dates</Eyebrow>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">My Dream Dates</h1>

        {acceptedAwaitingSchedule.length === 0 && upcoming.length === 0 && completed.length === 0 && (
          <Card className="mt-8 p-8 text-center text-ink/60">
            <p>No Dream Dates yet. Head to your Maya Picks to send a rose.</p>
            <Link to="/picks" className="mt-4 inline-block">
              <Button>View My Maya Picks</Button>
            </Link>
          </Card>
        )}

        {acceptedAwaitingSchedule.map((r) => {
          const pick = pickById(r.pickId);
          if (!pick) return null;
          return (
            <Card key={r.id} className="mt-6 p-7">
              <Pill tone="emerald" dot>It's a Dream Date 💜</Pill>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                You and {pick.firstName} both want to meet.
              </h3>
              <p className="mt-1 text-sm text-ink/60">Choose a time that works — Maya finds the overlap.</p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => scheduleDate(r.id, slot)}
                    className="rounded-full border border-ink/12 px-4 py-2 text-sm font-medium text-ink/70 transition hover:border-maya-amethyst hover:text-maya-amethyst"
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </Card>
          );
        })}

        {upcoming.map((d) => {
          const pick = pickById(d.pickId);
          if (!pick) return null;
          return (
            <Card key={d.id} className="mt-6 overflow-hidden p-0">
              <div className="bg-plum p-7 text-cream">
                <Pill tone="amethyst" dot className="bg-white/10 text-cream">Scheduled</Pill>
                <h3 className="mt-3 font-display text-xl font-semibold">Dream Date with {pick.firstName}</h3>
                <div className="mt-4 flex flex-wrap gap-5 text-sm text-cream/70">
                  <span className="flex items-center gap-2"><CalendarClock size={15} /> {d.scheduledFor}</span>
                  <span className="flex items-center gap-2"><Video size={15} /> 30-minute virtual date</span>
                  <span className="flex items-center gap-2"><Bell size={15} /> Reminders at 24h, 2h &amp; 15min</span>
                </div>
                <p className="mt-3 text-xs text-cream/40">
                  A calendar invitation has been sent automatically. No contact information is exchanged before
                  the date.
                </p>
              </div>
              <div className="flex items-center justify-between p-6">
                <p className="text-sm text-ink/50">Demo shortcut — jump ahead once your date has happened.</p>
                <Link to={`/dates/${d.id}/feedback`}>
                  <Button variant="secondary">Leave Feedback</Button>
                </Link>
              </div>
            </Card>
          );
        })}

        {completed.length > 0 && (
          <div className="mt-10">
            <Eyebrow>Past Dream Dates</Eyebrow>
            <div className="mt-4 flex flex-col gap-3">
              {completed.map((d) => {
                const pick = pickById(d.pickId);
                if (!pick) return null;
                return (
                  <Card key={d.id} className="flex items-center justify-between p-5">
                    <div>
                      <p className="font-semibold text-ink">{pick.firstName}</p>
                      <p className="text-xs text-ink/45">{d.scheduledFor}</p>
                    </div>
                    <Pill tone={d.mutual ? 'emerald' : 'neutral'}>
                      {d.mutual ? 'Mutual match' : 'No mutual connection'}
                    </Pill>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </Page>
  );
};
