import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Lock } from 'lucide-react';
import { Button, Card } from '../../components/ui';
import { checkAdminPassword, markAdminUnlocked } from '../../data/adminAuth';

export const AdminGate: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (checkAdminPassword(password)) {
      markAdminUnlocked();
      navigate('/admin/today');
    } else {
      setError('Incorrect password.');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F0B18] px-5">
      <Card className="w-full max-w-sm border border-white/10 bg-[#150F22] p-9 text-center text-cream shadow-none">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-maya-amethyst via-maya-sapphire to-maya-ruby">
          <Sparkles size={22} className="text-white" />
        </div>
        <h1 className="font-display text-xl font-semibold">Maya Match Console</h1>
        <p className="mt-2 text-sm text-cream/50">Internal dashboard for the Maya Match team.</p>

        <form onSubmit={handleSubmit} className="mt-7 text-left">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-cream/50">
              Matchmaker password
            </span>
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-cream placeholder:text-cream/30 focus:border-maya-amethyst focus:outline-none focus:ring-2 focus:ring-maya-amethyst/30"
            />
          </label>
          {error && <p className="mt-2 text-xs font-medium text-red-400">{error}</p>}
          <Button type="submit" size="lg" className="mt-6 w-full">
            <Lock size={15} /> Enter Console
          </Button>
        </form>

        <p className="mt-5 text-xs text-cream/30">Prototype build — password gate for demonstration purposes.</p>
      </Card>
    </div>
  );
};
