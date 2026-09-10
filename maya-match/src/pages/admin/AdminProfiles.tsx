import React from 'react';
import { Eye, Briefcase, GraduationCap, MapPin, Mail, Phone } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { PickPhoto } from '../../components/PickPhoto';
import { useStore } from '../../data/store';

export const AdminProfiles: React.FC = () => {
  const { picks } = useStore();

  return (
    <AdminLayout>
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-maya-amethystLight">Backend Only</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-white">Dream Dates Roster</h1>
      <p className="mt-2 flex max-w-2xl items-center gap-2 text-sm text-cream/50">
        <Eye size={14} /> Members only ever see these faces blurred, behind their own password. Maya's console
        shows the real photo on file for every profile in curation.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {picks.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <PickPhoto pick={p} blurred={false} />
            <div className="p-5">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg font-semibold text-white">
                  {p.firstName}, {p.age}
                </h3>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-cream/60">
                  {p.metro}
                </span>
              </div>
              <div className="mt-3 flex flex-col gap-1.5 text-sm text-cream/60">
                <span className="flex items-center gap-2"><Briefcase size={13} /> {p.profession}</span>
                <span className="flex items-center gap-2"><GraduationCap size={13} /> {p.education}</span>
                <span className="flex items-center gap-2"><MapPin size={13} /> {p.culture}{p.religion ? ` · ${p.religion}` : ''}</span>
              </div>
              <p className="mt-3 text-xs italic leading-relaxed text-cream/45">"{p.mayaSummary}"</p>
              <div className="mt-4 flex flex-col gap-1 border-t border-white/10 pt-3 text-xs text-cream/50">
                <span className="flex items-center gap-2"><Mail size={12} /> {p.contactEmail}</span>
                <span className="flex items-center gap-2"><Phone size={12} /> {p.contactPhone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};
