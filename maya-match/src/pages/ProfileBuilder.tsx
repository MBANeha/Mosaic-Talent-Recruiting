import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Lock } from 'lucide-react';
import { Page } from '../components/Layout';
import { Button, Card, Eyebrow, Field, Input, Textarea, ProgressBar } from '../components/ui';
import { useStore } from '../data/store';
import type { ProfileSectionKey } from '../types';

const SECTIONS: { key: ProfileSectionKey; title: string; subtitle: string }[] = [
  { key: 'aboutMe', title: 'About Me', subtitle: 'Career, lifestyle, and how you spend your time' },
  { key: 'myRelationship', title: 'My Relationship', subtitle: 'History, goals, and what you\'re looking for next' },
  { key: 'myPerson', title: 'My Person', subtitle: 'Who Maya should be looking for on your behalf' },
  { key: 'tellMaya', title: 'Tell Maya', subtitle: 'The things a form can\'t always capture' },
];

const thresholds = [25, 50, 75, 100];

function FieldRow({
  label,
  value,
  onChange,
  area,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  area?: boolean;
  placeholder?: string;
}) {
  return (
    <Field label={label}>
      {area ? (
        <Textarea value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <Input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
    </Field>
  );
}

export const ProfileBuilder: React.FC = () => {
  const { currentMember, updateProfileSection, submitProfileForReview } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  if (!currentMember) return <Navigate to="/request-invitation" replace />;
  const m = currentMember;
  const section = SECTIONS[step];

  const set = (field: string, value: string) => {
    updateProfileSection(m.id, section.key, { [field]: value } as any);
  };

  const data = (m.matchProfile[section.key] ?? {}) as Record<string, string>;
  const get = (f: string) => data[f] ?? '';

  const isLast = step === SECTIONS.length - 1;
  const progressLabel =
    m.profileCompletion >= 100 ? 'READY FOR MAYA' : `${thresholds.find((t) => t > m.profileCompletion) ?? 100}%`;

  function handleSubmitToMaya() {
    submitProfileForReview(m.id);
    navigate('/review');
  }

  return (
    <Page>
      <section className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <Eyebrow>Your Match Profile</Eyebrow>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Building your Maya dossier
        </h1>
        <p className="mt-2 text-ink/60">This is where Maya really gets to know you — take your time.</p>

        <div className="mt-8 flex items-center justify-between">
          <ProgressBar value={m.profileCompletion} className="mr-4" />
          <span className="shrink-0 text-sm font-bold text-maya-amethyst">{progressLabel}</span>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {SECTIONS.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setStep(i)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                i === step ? 'bg-ink text-cream' : 'bg-ink/5 text-ink/50 hover:bg-ink/10'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        <Card className="mt-6 p-6 sm:p-9">
          <h2 className="font-display text-xl font-semibold text-ink">{section.title}</h2>
          <p className="mt-1 text-sm text-ink/50">{section.subtitle}</p>

          <div className="mt-7 grid gap-6">
            {section.key === 'aboutMe' && (
              <>
                <FieldRow label="Career" value={get('career')} onChange={(v) => set('career', v)} placeholder="What do you do, and what drew you to it?" area />
                <FieldRow label="Education" value={get('education')} onChange={(v) => set('education', v)} />
                <FieldRow label="Lifestyle" value={get('lifestyle')} onChange={(v) => set('lifestyle', v)} area />
                <FieldRow label="Interests & hobbies" value={get('interests')} onChange={(v) => set('interests', v)} />
                <FieldRow label="Personality" value={get('personality')} onChange={(v) => set('personality', v)} area />
                <FieldRow label="A typical weekend" value={get('typicalWeekend')} onChange={(v) => set('typicalWeekend', v)} area />
              </>
            )}
            {section.key === 'myRelationship' && (
              <>
                <FieldRow label="Relationship history" value={get('relationshipHistory')} onChange={(v) => set('relationshipHistory', v)} area />
                <FieldRow label="How long have you been single?" value={get('timeSingle')} onChange={(v) => set('timeSingle', v)} />
                <FieldRow label="What are you looking for right now?" value={get('goals')} onChange={(v) => set('goals', v)} area />
                <FieldRow label="Do you want marriage?" value={get('wantsMarriage')} onChange={(v) => set('wantsMarriage', v)} />
                <FieldRow label="Do you want children?" value={get('wantsChildren')} onChange={(v) => set('wantsChildren', v)} />
                <FieldRow label="Family values" value={get('familyValues')} onChange={(v) => set('familyValues', v)} area />
                <FieldRow label="What hasn't worked before?" value={get('whatHasntWorked')} onChange={(v) => set('whatHasntWorked', v)} area />
              </>
            )}
            {section.key === 'myPerson' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <FieldRow label="Age range — from" value={get('ageRangeMin')} onChange={(v) => set('ageRangeMin', v)} />
                  <FieldRow label="Age range — to" value={get('ageRangeMax')} onChange={(v) => set('ageRangeMax', v)} />
                </div>
                <FieldRow label="Geography" value={get('geography')} onChange={(v) => set('geography', v)} />
                <FieldRow label="Cultural preference" value={get('culturalPreference')} onChange={(v) => set('culturalPreference', v)} />
                <FieldRow label="Religious preference" value={get('religiousPreference')} onChange={(v) => set('religiousPreference', v)} />
                <FieldRow label="Career / education preference" value={get('careerEducationPreference')} onChange={(v) => set('careerEducationPreference', v)} />
                <FieldRow label="Lifestyle preference" value={get('lifestylePreference')} onChange={(v) => set('lifestylePreference', v)} />
                <FieldRow label="Personality preference" value={get('personalityPreference')} onChange={(v) => set('personalityPreference', v)} />
                <FieldRow label="Family goals preference" value={get('familyGoalsPreference')} onChange={(v) => set('familyGoalsPreference', v)} />
                <FieldRow label="Dealbreakers" value={get('dealbreakers')} onChange={(v) => set('dealbreakers', v)} area />
                <FieldRow label="Nice-to-haves" value={get('niceToHaves')} onChange={(v) => set('niceToHaves', v)} area />
              </>
            )}
            {section.key === 'tellMaya' && (
              <>
                <FieldRow label="What makes you a great partner?" value={get('greatPartnerTraits')} onChange={(v) => set('greatPartnerTraits', v)} area />
                <FieldRow label="What are you working on right now?" value={get('currentlyWorkingOn')} onChange={(v) => set('currentlyWorkingOn', v)} area />
                <FieldRow label="What do friends love about you?" value={get('whatFriendsLove')} onChange={(v) => set('whatFriendsLove', v)} area />
                <FieldRow label="Your passions" value={get('passions')} onChange={(v) => set('passions', v)} />
                <FieldRow label="What should a future partner understand about you?" value={get('whatPartnerShouldUnderstand')} onChange={(v) => set('whatPartnerShouldUnderstand', v)} area />
                <FieldRow label="What makes you want a second date?" value={get('secondDateFactor')} onChange={(v) => set('secondDateFactor', v)} />
                <div className="rounded-2xl border border-dashed border-ink/15 bg-sand/50 p-5">
                  <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink/40">
                    <Lock size={12} /> Private — visible only to Maya
                  </p>
                  <div className="grid gap-4">
                    <FieldRow label="Income range" value={get('incomeRange')} onChange={(v) => set('incomeRange', v)} />
                    <FieldRow label="Investment / savings posture" value={get('investmentPosture')} onChange={(v) => set('investmentPosture', v)} />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-9 flex items-center justify-between border-t border-ink/5 pt-6">
            <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
              <ArrowLeft size={16} /> Back
            </Button>
            {!isLast ? (
              <Button onClick={() => setStep((s) => Math.min(SECTIONS.length - 1, s + 1))}>
                Next: {SECTIONS[step + 1].title} <ArrowRight size={16} />
              </Button>
            ) : (
              <Button onClick={handleSubmitToMaya} disabled={m.profileCompletion < 100}>
                Submit Profile to Maya <ArrowRight size={16} />
              </Button>
            )}
          </div>
        </Card>
        {isLast && m.profileCompletion < 100 && (
          <p className="mt-3 text-center text-xs text-ink/40">
            Fill in every field across all four sections to unlock submission.
          </p>
        )}
      </section>
    </Page>
  );
};
