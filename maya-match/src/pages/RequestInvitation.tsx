import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Page } from '../components/Layout';
import { Button, Card, Eyebrow, Field, Input, Select, Textarea, CheckboxRow } from '../components/ui';
import { useStore } from '../data/store';
import type { InvitationInput } from '../types';

const METROS = ['NYC Metro', 'DMV', 'Boston', 'Philadelphia', 'Other / Not Listed Yet'];

const emptyForm: InvitationInput = {
  firstName: '',
  lastName: '',
  email: '',
  city: '',
  state: '',
  nearestMetro: METROS[0],
  datingRadius: '25 miles',
  age: '',
  gender: '',
  interestedIn: '',
  culturalBackground: '',
  culturalImportance: 'Somewhat important',
  relationshipStatus: '',
  childrenStatus: '',
  relationshipGoal: '',
  whyMaya: '',
  referralSource: '',
  mayaInsiderOptIn: true,
};

export const RequestInvitation: React.FC = () => {
  const { requestInvitation } = useStore();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const ref = params.get('ref');
  const [form, setForm] = useState<InvitationInput>({ ...emptyForm, referredByCode: ref ?? undefined });
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof InvitationInput>(key: K, value: InvitationInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    requestInvitation(form);
    setTimeout(() => navigate('/confirmation'), 350);
  }

  return (
    <Page>
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        {ref && (
          <div className="mb-6 rounded-2xl border border-maya-amethyst/20 bg-maya-amethyst/5 px-5 py-3 text-sm font-medium text-maya-amethystDark">
            You were invited by a Maya Match member — referral code {ref}.
          </div>
        )}
        <Eyebrow>Step 1 of your Maya journey</Eyebrow>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">Request Your Invitation</h1>
        <p className="mt-3 max-w-xl text-ink/60">
          This short form helps Maya understand who is looking for meaningful connection in your area. It
          creates your permanent Maya Profile — no payment, no pressure.
        </p>

        <Card className="mt-10 p-6 sm:p-9">
          <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
            <Field label="First name" required>
              <Input required value={form.firstName} onChange={(e) => set('firstName', e.target.value)} />
            </Field>
            <Field label="Last name" required>
              <Input required value={form.lastName} onChange={(e) => set('lastName', e.target.value)} />
            </Field>
            <Field label="Email" required className="sm:col-span-2">
              <Input type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} />
            </Field>
            <Field label="City" required>
              <Input required value={form.city} onChange={(e) => set('city', e.target.value)} />
            </Field>
            <Field label="State" required>
              <Input required value={form.state} onChange={(e) => set('state', e.target.value)} />
            </Field>
            <Field label="Nearest Maya metro" required>
              <Select required value={form.nearestMetro} onChange={(e) => set('nearestMetro', e.target.value)}>
                {METROS.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </Select>
            </Field>
            <Field label="Dating radius">
              <Select value={form.datingRadius} onChange={(e) => set('datingRadius', e.target.value)}>
                {['10 miles', '25 miles', '50 miles', 'Open to travel'].map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </Select>
            </Field>
            <Field label="Age" required>
              <Input required type="number" min={21} max={80} value={form.age} onChange={(e) => set('age', e.target.value)} />
            </Field>
            <Field label="Gender" required>
              <Select required value={form.gender} onChange={(e) => set('gender', e.target.value)}>
                <option value="">Select</option>
                {['Woman', 'Man', 'Non-binary', 'Prefer to self-describe'].map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </Select>
            </Field>
            <Field label="Interested in dating" required>
              <Select required value={form.interestedIn} onChange={(e) => set('interestedIn', e.target.value)}>
                <option value="">Select</option>
                {['Men', 'Women', 'Men & Women'].map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </Select>
            </Field>
            <Field label="Cultural / religious background" required>
              <Input required value={form.culturalBackground} onChange={(e) => set('culturalBackground', e.target.value)} placeholder="e.g. Punjabi, Hindu" />
            </Field>
            <Field label="How important is shared background?">
              <Select value={form.culturalImportance} onChange={(e) => set('culturalImportance', e.target.value)}>
                {['Very important', 'Important', 'Somewhat important', 'Not important'].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </Select>
            </Field>
            <Field label="Relationship status" required>
              <Select required value={form.relationshipStatus} onChange={(e) => set('relationshipStatus', e.target.value)}>
                <option value="">Select</option>
                {['Single', 'Divorced', 'Widowed', 'Separated'].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </Select>
            </Field>
            <Field label="Children / future children">
              <Select value={form.childrenStatus} onChange={(e) => set('childrenStatus', e.target.value)}>
                {[
                  'None, wants children',
                  'None, open either way',
                  'None, does not want children',
                  'Has children, open to more',
                  'Has children, done having children',
                ].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </Select>
            </Field>
            <Field label="Relationship goal" required className="sm:col-span-2">
              <Select required value={form.relationshipGoal} onChange={(e) => set('relationshipGoal', e.target.value)}>
                <option value="">Select</option>
                {['Marriage-minded', 'Open to marriage', 'Long-term relationship', 'Not sure yet'].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </Select>
            </Field>
            <Field label="Why are you interested in Maya?" required className="sm:col-span-2">
              <Textarea required value={form.whyMaya} onChange={(e) => set('whyMaya', e.target.value)} />
            </Field>
            <Field label="How did you hear about us?">
              <Input value={form.referralSource} onChange={(e) => set('referralSource', e.target.value)} />
            </Field>
            <div className="flex items-end sm:col-span-1">
              <CheckboxRow checked={form.mayaInsiderOptIn} onChange={(v) => set('mayaInsiderOptIn', v)}>
                Keep me posted as a <strong>Maya Insider</strong> — launch updates &amp; regional news.
              </CheckboxRow>
            </div>

            <div className="sm:col-span-2">
              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Request Your Invitation'}
              </Button>
              <p className="mt-3 text-center text-xs text-ink/40">
                No payment required. You'll create your Maya Profile ID immediately.
              </p>
            </div>
          </form>
        </Card>
      </section>
    </Page>
  );
};
