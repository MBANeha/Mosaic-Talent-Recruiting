import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, EyeOff, Users, Sparkles } from 'lucide-react';
import { Page } from '../components/Layout';
import { Button, Card, Eyebrow } from '../components/ui';

const steps = [
  { label: 'CURATED', desc: 'Maya reviews every profile personally before anyone joins the community.' },
  { label: 'MEET', desc: 'You receive a limited, thoughtful selection — never an endless feed.' },
  { label: 'REFLECT', desc: 'A 30-minute virtual Dream Date, then private feedback on both sides.' },
  { label: 'DECIDE', desc: 'Only mutual "yes" moves forward. No guessing, no ghosting.' },
  { label: 'CONNECT', desc: 'Contact is exchanged only once you both want to keep going.' },
];

const principles = [
  {
    icon: EyeOff,
    title: 'No swiping through strangers',
    desc: 'Maya curates a small, intentional pool — not an infinite feed of profiles.',
  },
  {
    icon: ShieldCheck,
    title: 'No contact before you meet',
    desc: 'Numbers and socials stay private until both of you choose to continue.',
  },
  {
    icon: Users,
    title: 'Built pool by pool, region by region',
    desc: "We launch a city only once there's real, reciprocal compatibility inside it.",
  },
];

export const Landing: React.FC = () => {
  return (
    <Page>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-jewel-mesh opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/10 to-ink" />
        <div className="relative mx-auto max-w-5xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <div className="animate-fade-up mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cream/90 backdrop-blur">
            <Sparkles size={13} /> Now accepting founding invitation requests
          </div>
          <h1 className="animate-fade-up font-display text-4xl font-semibold leading-[1.08] text-cream sm:text-6xl" style={{ animationDelay: '80ms' }}>
            Maya Match Dream Dates
          </h1>
          <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg text-cream/80 sm:text-xl" style={{ animationDelay: '160ms' }}>
            A private, curated dating community for Desi &amp; diverse professionals.
          </p>
          <p className="animate-fade-up mx-auto mt-3 max-w-xl text-sm font-medium uppercase tracking-widest text-cream/50" style={{ animationDelay: '220ms' }}>
            Primarily professionals 30–45 · Singles 25–50+ welcome
          </p>
          <p className="animate-fade-up mt-2 text-sm text-cream/60" style={{ animationDelay: '260ms' }}>
            Launching region by region.
          </p>
          <div className="animate-fade-up mt-10 flex flex-col items-center gap-4" style={{ animationDelay: '320ms' }}>
            <Link to="/request-invitation">
              <Button size="lg" className="shadow-2xl">
                Request Your Invitation <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/dream-dates" className="text-sm font-medium text-cream/60 underline-offset-4 hover:text-cream hover:underline">
              See how Dream Dates works
            </Link>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="text-center">
          <Eyebrow>Not another app</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Curated the way great matchmaking used to feel
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {principles.map((p) => (
            <Card key={p.title} className="p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-maya-amethyst/15 to-maya-ruby/15 text-maya-amethyst">
                <p.icon size={20} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{p.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Dream Dates flow */}
      <section className="bg-plum py-20 text-cream">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-center">
            <Eyebrow className="text-maya-amethystLight">The Dream Dates model</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Maya curates the community. You choose.</h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-5">
            {steps.map((s, i) => (
              <div key={s.label} className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 font-display text-lg font-semibold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-widest text-maya-amethystLight">{s.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link to="/dream-dates">
              <Button variant="secondary" size="lg" className="bg-white/95">
                Learn the full Dream Dates model <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Page>
  );
};
