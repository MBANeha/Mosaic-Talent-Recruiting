import React from 'react';
import { Link } from 'react-router-dom';
import { X, Check, ArrowRight } from 'lucide-react';
import { Page } from '../components/Layout';
import { Button, Card, Eyebrow } from '../components/ui';

const steps = [
  { label: 'JOIN', desc: 'Become part of a screened community of intentional singles.' },
  {
    label: 'GET CURATED',
    desc: 'Maya identifies promising people based on geography, relationship goals, life stage, cultural and religious preferences, family goals, lifestyle, personality, and education or career.',
  },
  { label: 'CHOOSE', desc: 'Maya presents a small number of curated profiles. You decide whether to request a Dream Date.' },
  { label: 'MEET', desc: 'If both agree, Maya facilitates a private, 30-minute virtual Dream Date.' },
  { label: 'REFLECT', desc: 'Afterward, both of you privately submit feedback — no pressure, no performance.' },
  { label: 'CONNECT', desc: 'If you both want to continue, Maya exchanges contact information.' },
];

const nots = [
  'No swiping through thousands of strangers',
  'No contacting people before the date',
  'No exchanging phone numbers beforehand',
  'No weeks of back-and-forth messaging',
];

export const DreamDatesInfo: React.FC = () => (
  <Page>
    <section className="bg-ink py-20 text-center text-cream">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Eyebrow className="text-maya-amethystLight">What are Dream Dates?</Eyebrow>
        <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Maya curates the community. You choose.</h1>
        <p className="mt-5 text-cream/70">
          Dream Dates replaces endless browsing with a small number of thoughtful introductions — each one
          reviewed by Maya before it ever reaches you.
        </p>
      </div>
    </section>

    <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <div className="grid gap-6 sm:grid-cols-3">
        {steps.map((s, i) => (
          <Card key={s.label} className="flex flex-col p-6">
            <span className="font-display text-2xl font-semibold text-maya-amethyst">{i + 1}</span>
            <h3 className="mt-3 text-sm font-bold uppercase tracking-widest text-ink">{s.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">{s.desc}</p>
          </Card>
        ))}
      </div>
    </section>

    <section className="bg-sand py-16">
      <div className="mx-auto grid max-w-5xl gap-6 px-5 sm:grid-cols-2 sm:px-8">
        <Card className="p-8">
          <h3 className="font-display text-lg font-semibold text-ink">What Dream Dates isn't</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {nots.map((n) => (
              <li key={n} className="flex items-start gap-3 text-sm text-ink/60">
                <X size={16} className="mt-0.5 shrink-0 text-maya-ruby" /> {n}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-8">
          <h3 className="font-display text-lg font-semibold text-ink">What you get instead</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {[
              'A limited selection of promising people from Maya\'s curated community',
              'A private 30-minute virtual Dream Date when you both agree to meet',
              'Structured, private feedback that helps Maya learn your preferences',
              'Contact exchanged only after a mutual yes',
              'Every photo stays face-blurred behind your own password until Maya confirms a mutual match',
            ].map((n) => (
              <li key={n} className="flex items-start gap-3 text-sm text-ink/60">
                <Check size={16} className="mt-0.5 shrink-0 text-maya-emerald" /> {n}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>

    <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
      <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Ready to see if Maya is building in your area?</h2>
      <Link to="/request-invitation" className="mt-6 inline-block">
        <Button size="lg">
          Request Your Invitation <ArrowRight size={18} />
        </Button>
      </Link>
    </section>
  </Page>
);
