
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ShieldCheck } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Authentication check
    if (passcode === 'kumar') {
      navigate('/admin/dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-mosaic-dark flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <img 
          src="https://picsum.photos/seed/infrastructure/1600/900" 
          alt="Infrastructure Engineering" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mosaic-dark/80 via-mosaic-dark/60 to-mosaic-dark/80"></div>
      </div>
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 relative z-10">
        <div className="text-center mb-8">
           <div className="w-16 h-16 bg-mosaic-teal rounded-full flex items-center justify-center mx-auto mb-4">
             <ShieldCheck className="w-8 h-8 text-white" />
           </div>
           <h1 className="text-2xl font-bold text-mosaic-dark">Admin Portal</h1>
           <p className="text-slate-500">Mosaic Talent Consulting</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
           <div>
             <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Access Passcode</label>
             <input 
                type="password" 
                value={passcode}
                onChange={(e) => { setPasscode(e.target.value); setError(false); }}
                className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal focus:outline-none"
                placeholder="Enter admin key..."
             />
             {error && <p className="text-red-500 text-xs mt-2">Invalid passcode.</p>}
           </div>
           <Button className="w-full" size="lg">Enter Dashboard</Button>
        </form>
      </div>
    </div>
  );
};
