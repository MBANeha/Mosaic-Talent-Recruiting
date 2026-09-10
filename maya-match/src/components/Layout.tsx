import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';
import { useStore } from '../data/store';
import { MayaCompanion } from './MayaCompanion';

const Logo: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <Link to="/" className="flex items-center gap-2 shrink-0">
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-maya-amethyst via-maya-sapphire to-maya-ruby text-white">
      <Sparkles size={16} strokeWidth={2.5} />
    </span>
    <span className={`font-display text-lg font-semibold tracking-tight ${dark ? 'text-cream' : 'text-ink'}`}>
      Maya Match <span className="italic font-medium">Dream Dates</span>
    </span>
  </Link>
);

export const Nav: React.FC = () => {
  const { currentMember } = useStore();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const links = [
    { to: '/dream-dates', label: 'How It Works' },
    { to: '/pricing', label: 'Membership' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition hover:text-maya-amethyst ${
                location.pathname === l.to ? 'text-maya-amethyst' : 'text-ink/70'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {currentMember ? (
            <Link
              to="/dashboard"
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-plum"
            >
              My Maya Dashboard
            </Link>
          ) : (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-ink/70 hover:text-maya-amethyst">
                Member Login
              </Link>
              <Link
                to="/request-invitation"
                className="rounded-full bg-gradient-to-r from-maya-amethyst to-maya-ruby px-5 py-2.5 text-sm font-semibold text-white shadow-jewel transition hover:brightness-110"
              >
                Request Your Invitation
              </Link>
            </>
          )}
        </div>
        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-ink/5 bg-cream px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="text-sm font-medium text-ink/80" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link
              to={currentMember ? '/dashboard' : '/request-invitation'}
              className="rounded-full bg-gradient-to-r from-maya-amethyst to-maya-ruby px-5 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              {currentMember ? 'My Maya Dashboard' : 'Request Your Invitation'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export const Footer: React.FC = () => (
  <footer className="border-t border-ink/5 bg-ink py-14 text-cream/70">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-maya-amethyst via-maya-sapphire to-maya-ruby">
              <Sparkles size={14} className="text-white" />
            </span>
            <span className="font-display text-base font-semibold text-cream">Maya Match Dream Dates</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            A private, curated dating community for Desi &amp; diverse professionals. Launching region by region.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-cream/90">Maya Match</span>
            <Link to="/dream-dates" className="hover:text-cream">How Dream Dates Work</Link>
            <Link to="/pricing" className="hover:text-cream">Membership</Link>
            <Link to="/request-invitation" className="hover:text-cream">Request an Invitation</Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-cream/90">Members</span>
            <Link to="/dashboard" className="hover:text-cream">Dashboard</Link>
            <Link to="/invite" className="hover:text-cream">Invite a Friend</Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-cream/90">Maya Match Team</span>
            <Link to="/admin" className="hover:text-cream">Matchmaker Sign In</Link>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Maya Match. Dream Dates is a curated introduction service.</span>
        <span>Prototype build — for demonstration purposes.</span>
      </div>
    </div>
  </footer>
);

export const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex min-h-screen flex-col bg-cream">
    <Nav />
    <main className="flex-1">{children}</main>
    <Footer />
    <MayaCompanion />
  </div>
);
