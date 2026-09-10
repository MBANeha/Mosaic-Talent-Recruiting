import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Camera, ShieldCheck, Lock, Gift, CircleDollarSign } from 'lucide-react';
import { Page } from '../components/Layout';
import { Button, Card, Eyebrow, Field, Input, Select, Textarea, CheckboxRow } from '../components/ui';
import { useStore } from '../data/store';
import { BUDGET_OPTIONS, REGIONS } from '../data/seed';
import type { InvitationInput, SocialNetwork } from '../types';

const METROS = [...REGIONS.map((r) => r.name), 'Other / Not Listed Yet'];
const NOT_INTERESTED = 'Not interested in paid services';

const trustPoints = [
  { icon: CircleDollarSign, text: 'Free to apply — no payment collected here' },
  { icon: Lock, text: 'Reviewed privately by Maya, never shown publicly' },
  { icon: ShieldCheck, text: 'No pressure — you decide what happens next' },
];

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
  raceEthnicity: '',
  partnerRaceEthnicity: '',
  religion: '',
  partnerReligion: '',
  relationshipStatus: '',
  childrenStatus: '',
  relationshipGoal: '',
  whyMaya: '',
  referralSource: '',
  referrerName: '',
  mayaInsiderOptIn: true,
  confirmedSingle: false,
  photoDataUrl: '',
  socialNetwork: '',
  socialHandle: '',
  budgetInterest: [],
  friendReferralName: '',
  friendReferralEmail: '',
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
  const [singleError, setSingleError] = useState('');

  const set = <K extends keyof InvitationInput>(key: K, value: InvitationInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setPhotoError('Please choose a JPG, PNG, or WebP image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError('That photo is larger than 5MB. Please choose a smaller file.');
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
    if (!form.confirmedSingle) {
      setSingleError('Please confirm that you are currently single to request a Dream Dates invitation.');
      return;
    }
    setSingleError('');
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
        <Eyebrow>Request an Invitation</Eyebrow>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Tell Maya Match a little about yourself
        </h1>
        <p className="mt-3 max-w-xl text-ink/60">
          Maya Match is building a curated, screened community market by market. Every new member is reviewed
          before becoming eligible for Dream Dates.
        </p>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-5">
          {trustPoints.map((t) => (
            <span key={t.text} className="flex items-center gap-2 text-sm font-medium text-ink/60">
              <t.icon size={15} className="shrink-0 text-maya-amethyst" /> {t.text}
            </span>
          ))}
        </div>

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
            <Field label="Your race / ethnicity" required>
              <Input
                required
                value={form.raceEthnicity}
                onChange={(e) => set('raceEthnicity', e.target.value)}
                placeholder="e.g. South Asian (Punjabi)"
              />
            </Field>
            <Field label="Preferred race / ethnicity in a partner">
              <Input
                value={form.partnerRaceEthnicity}
                onChange={(e) => set('partnerRaceEthnicity', e.target.value)}
                placeholder="e.g. Open, or South Asian"
              />
            </Field>
            <Field label="Your religion" required>
              <Input required value={form.religion} onChange={(e) => set('religion', e.target.value)} placeholder="e.g. Hindu" />
            </Field>
            <Field label="Preferred religion in a partner">
              <Input
                value={form.partnerReligion}
                onChange={(e) => set('partnerReligion', e.target.value)}
                placeholder="e.g. Open, or Hindu"
              />
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
                  <p className="mt-1.5 text-xs text-ink/40">
                    Only Maya sees this — never shown publicly. JPG, PNG, or WebP · maximum 5MB.
                  </p>
                </div>
              </div>
              {photoError && <p className="mt-2 text-xs font-medium text-maya-ruby">{photoError}</p>}
            </Field>

            <Field label="Social platform" required>
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
            <Field
              label="Profile handle or link"
              required
              hint="Never provide a password. This is used only for private review."
            >
              <Input
                required
                value={form.socialHandle}
                onChange={(e) => set('socialHandle', e.target.value)}
                placeholder="@yourname or profile URL"
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
            <Field label="Referrer's name" hint="Did someone tell you about Maya Match?">
              <Input
                value={form.referrerName}
                onChange={(e) => set('referrerName', e.target.value)}
                placeholder="e.g. Priya Nair"
              />
            </Field>

            <div className="rounded-2xl border border-ink/10 bg-sand/40 p-4 sm:col-span-2">
              <CheckboxRow checked={form.mayaInsiderOptIn} onChange={(v) => set('mayaInsiderOptIn', v)}>
                <strong>Send me Maya Match updates</strong>
                <br />
                <span className="font-normal text-ink/40">Optional. Unsubscribe at any time.</span>
              </CheckboxRow>
            </div>

            <div
              className={`rounded-2xl border p-4 sm:col-span-2 ${
                singleError ? 'border-maya-ruby/50 bg-maya-ruby/5' : 'border-maya-gold/40 bg-maya-gold/5'
              }`}
            >
              <CheckboxRow
                checked={form.confirmedSingle}
                onChange={(v) => {
                  set('confirmedSingle', v);
                  if (v) setSingleError('');
                }}
              >
                <strong>
                  I confirm that I am currently single. <span className="text-maya-ruby">*</span>
                </strong>
                <br />
                <span className="font-normal text-ink/40">This confirmation is required to request a Dream Dates invitation.</span>
              </CheckboxRow>
              {singleError && <p className="mt-2 text-xs font-medium text-maya-ruby">{singleError}</p>}
            </div>

            <div className="rounded-2xl border border-maya-gold/25 bg-maya-gold/5 p-5 sm:col-span-2">
              <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Gift size={16} className="text-maya-gold" /> Refer a friend or family member
              </span>
              <p className="mt-1 text-xs text-ink/60">
                Optional. Know someone Maya should meet? Tell us and we'll send them a personal invitation with
                your name on it. Earn a $20 future credit — after you and your referral each complete an
                eligible paid Maya Match service purchase valued over $200, you'll receive a $20 Maya Match
                credit toward a future eligible purchase after verification. The credit is not cash back and
                cannot be transferred.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Friend's name">
                  <Input
                    value={form.friendReferralName}
                    onChange={(e) => set('friendReferralName', e.target.value)}
                    placeholder="e.g. Rina Shah"
                  />
                </Field>
                <Field label="Friend's email">
                  <Input
                    type="email"
                    value={form.friendReferralEmail}
                    onChange={(e) => set('friendReferralEmail', e.target.value)}
                    placeholder="rina@example.com"
                  />
                </Field>
              </div>
            </div>

            <div className="sm:col-span-2">
              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Request my invitation'}
              </Button>
              <p className="mt-3 text-center text-xs text-ink/40">
                Submitting creates or updates your stable Maya Match applicant record. Applying is free and
                does not guarantee acceptance, a match, or a date.
              </p>
            </div>
          </form>
        </Card>
      </section>
    </Page>
  );
};
