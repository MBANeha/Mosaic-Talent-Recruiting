import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button, Card } from '../../components/ui';

export const AdminGate: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F0B18] px-5">
      <Card className="w-full max-w-sm border border-white/10 bg-[#150F22] p-9 text-center text-cream shadow-none">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-maya-amethyst via-maya-sapphire to-maya-ruby">
          <Sparkles size={22} className="text-white" />
        </div>
        <h1 className="font-display text-xl font-semibold">Maya Match Console</h1>
        <p className="mt-2 text-sm text-cream/50">Internal dashboard for the Maya Match team.</p>
        <Button size="lg" className="mt-7 w-full" onClick={() => navigate('/admin/today')}>
          Enter Console
        </Button>
        <p className="mt-4 text-xs text-cream/30">Prototype build — no authentication required.</p>
      </Card>
    </div>
  );
};
