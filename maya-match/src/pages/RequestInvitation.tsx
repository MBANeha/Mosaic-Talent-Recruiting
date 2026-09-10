import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { Page } from '../components/Layout';
import { Button, Card, Eyebrow, Field, Input, Select, Textarea, CheckboxRow } from '../components/ui';
import { useStore } from '../data/store';
import { BUDGET_OPTIONS, REGIONS } from '../data/seed';
import type { InvitationInput, SocialNetwork } from '../types';

const METROS = [...REGIONS.map((r) => r.name), 'Other / Not Listed Yet'];
const NOT_INTERESTED = 'Not interested in paid services';

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
  photoDataUrl: '',
  socialNetwork: '',
  socialHandle: '',
  budgetInterest: [],
};

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const RequestInvitation: React.FC = () => {
  const { requestInvitation } = useStore();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const ref = params.get('ref');
  const [form, setForm] = useState<InvitationInput>({ ...emptyForm, referredByCode: ref ?? undefined });
  const [submitting, setSubmitting] = useState(false);
  const [photoError, setPhotoError] = useState('');

  const set = <K extends keyof InvitationInput>(key: K, value: InvitationInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setPhotoError('Please choose an image file.');
      return;
    }
    setPhotoError('');
    const dataUrl = await fileToDataUrl(file);
    set('photoDataUrl', dataUrl);
  }

  function toggleBudget(option: string) {
    setForm((f) => {
      if (option === NOT_INTERESTED) {
        return { ...f, budgetInterest: f.budgetInterest.includes(NOT_INTERESTED) ? [] : [NOT_INTERESTED] };
      }
      const withoutNotInterested = f.budgetInterest.filter((b) => b !== NOT_INTERESTED);
      const has = withoutNotInterested.includes(option);
      return {
        ...f,
        budgetInterest: has ? withoutNotInterested.filter((b) => b !== option) : [...withoutNotInterested, option],
      };
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.photoDataUrl) {
      setPhotoError('A photo is required so Maya can review you.');
      return;
    }
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

            <Field label="Upload a photo" required className="sm:col-span-2">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-ink/20 bg-sand/60">
                  {form.photoDataUrl ? (
                    <img src={form.photoDataUrl} alt="Your upload" className="h-full w-full object-cover" />
                  ) : (
                    <Camera size={20} className="text-ink/30" />
                  )}
                </div>
                <div>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink/70 transition hover:border-maya-amethyst hover:text-maya-amethyst">
                    {form.photoDataUrl ? 'Change photo' : 'Choose a photo'}
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                  </label>
                  <p className="mt-1.5 text-xs text-ink/40">Only Maya sees this — never shown publicly.</p>
                </div>
              </div>
              {photoError && <p className="mt-2 text-xs font-medium text-maya-ruby">{photoError}</p>}
            </Field>

            <Field label="Social network" required>
              <Select
                required
                value={form.socialNetwork}
                onChange={(e) => set('socialNetwork', e.target.value as SocialNetwork)}
              >
                <option value="">Select</option>
                {['Facebook', 'Instagram', 'LinkedIn'].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </Select>
            </Field>
            <Field label="Your handle" required hint="so Maya can verify it's really you">
              <Input
                required
                value={form.socialHandle}
                onChange={(e) => set('socialHandle', e.target.value)}
                placeholder="@yourhandle"
              />
            </Field>

            <div className="sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-ink/80">
                What would you consider spending? <span className="font-normal text-ink/40">(optional — helps Maya gauge fit)</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {BUDGET_OPTIONS.map((option) => {
                  const active = form.budgetInterest.includes(option);
                  return (
                    <button
                      type="button"
                      key={option}
                      onClick={() => toggleBudget(option)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                        active
                          ? 'border-maya-amethyst bg-maya-amethyst/10 text-maya-amethystDark'
                          : 'border-ink/15 text-ink/60 hover:border-ink/30'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

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
