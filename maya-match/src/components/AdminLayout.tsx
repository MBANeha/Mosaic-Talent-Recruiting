import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, LayoutDashboard, Map, ClipboardList, Users2, LogOut } from 'lucide-react';

const items = [
  { to: '/admin/today', label: 'Maya Today', icon: LayoutDashboard },
  { to: '/admin/review', label: 'Review Queue', icon: ClipboardList },
  { to: '/admin/regions', label: 'Regional Pool Engine', icon: Map },
  { to: '/admin/migration', label: 'Free Dates Migration', icon: Users2 },
];

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-[#0F0B18] text-cream">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-[#150F22] px-5 py-6 lg:flex">
          <Link to="/admin/today" className="mb-8 flex items-center gap-2 px-1">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-maya-amethyst via-maya-sapphire to-maya-ruby">
              <Sparkles size={16} className="text-white" />
            </span>
            <div className="leading-tight">
              <div className="font-display text-sm font-semibold">Maya</div>
              <div className="text-[11px] uppercase tracking-widest text-cream/40">Matchmaker Console</div>
            </div>
          </Link>
          <nav className="flex flex-1 flex-col gap-1">
            {items.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    active ? 'bg-white/10 text-white' : 'text-cream/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={17} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Link to="/" className="mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-cream/50 hover:text-white">
            <LogOut size={17} /> Exit to member site
          </Link>
        </aside>
        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-white/10 px-5 py-4 lg:hidden">
            <Link to="/admin/today" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-maya-amethyst via-maya-sapphire to-maya-ruby">
                <Sparkles size={14} className="text-white" />
              </span>
              <span className="font-display text-sm font-semibold">Maya Console</span>
            </Link>
            <Link to="/" className="text-xs text-cream/50">Exit</Link>
          </header>
          <div className="flex gap-1 overflow-x-auto border-b border-white/10 px-4 py-2 lg:hidden">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
                  location.pathname === item.to ? 'bg-white/10 text-white' : 'text-cream/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <main className="px-5 py-8 sm:px-8 lg:px-10">{children}</main>
        </div>
      </div>
    </div>
  );
};
