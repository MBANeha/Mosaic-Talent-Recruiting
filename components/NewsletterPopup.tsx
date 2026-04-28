import React, { useState, useEffect } from 'react';
import { X, Check, Mail } from 'lucide-react';

export const NewsletterPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'employer' | 'candidate'>('candidate');
  const [submitted, setSubmitted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('mosaic_newsletter_seen');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000); // Show after 5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      sessionStorage.setItem('mosaic_newsletter_seen', 'true');
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div className={`bg-mosaic-teal rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden transition-all duration-300 transform border border-teal-600 flex flex-col max-h-[90vh] ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-teal-200 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
            <div className="p-12 text-center my-auto">
                <div className="w-16 h-16 bg-white/20 text-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">You're in!</h3>
                <p className="text-white/90">Welcome to the Mosaic network. We'll be in touch shortly.</p>
            </div>
        ) : (
            <div className="p-6 md:p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-800 scrollbar-track-transparent">
                <div className="text-center mb-6">
                    <div className="w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                        <Mail className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white mb-1">Join the Mosaic Network</h3>
                    <p className="text-xs text-white/90">Select your path and get tailored opportunities delivered to your inbox.</p>
                </div>

                {/* Toggle */}
                <div className="flex bg-teal-900/40 p-1 rounded-lg mb-4 border border-teal-700/50 shrink-0">
                    <button
                        type="button"
                        onClick={() => setType('employer')}
                        className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${type === 'employer' ? 'bg-white text-mosaic-teal shadow-lg' : 'text-teal-200 hover:text-white'}`}
                    >
                        I'm an Employer
                    </button>
                    <button
                         type="button"
                        onClick={() => setType('candidate')}
                        className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${type === 'candidate' ? 'bg-white text-mosaic-teal shadow-lg' : 'text-teal-200 hover:text-white'}`}
                    >
                        I'm a Candidate
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            placeholder="Full Name"
                            required
                            className="w-full px-3 py-2.5 bg-white/95 border-0 rounded-lg placeholder-slate-500 text-slate-900 focus:ring-2 focus:ring-mosaic-dark/20 focus:outline-none text-sm transition-shadow"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            className="w-full px-3 py-2.5 bg-white/95 border-0 rounded-lg placeholder-slate-500 text-slate-900 focus:ring-2 focus:ring-mosaic-dark/20 focus:outline-none text-sm transition-shadow"
                        />
                    </div>

                    {type === 'employer' && (
                        <>
                            <input
                                type="text"
                                placeholder="Company Name"
                                required
                                className="w-full px-3 py-2.5 bg-white/95 border-0 rounded-lg placeholder-slate-500 text-slate-900 focus:ring-2 focus:ring-mosaic-dark/20 focus:outline-none text-sm transition-shadow"
                            />
                            <select
                                className="w-full px-3 py-2.5 bg-white/95 border-0 rounded-lg text-slate-900 focus:ring-2 focus:ring-mosaic-dark/20 focus:outline-none text-sm transition-shadow"
                                defaultValue=""
                            >
                                <option value="" disabled className="text-slate-500"># of positions (posting/sourcing/recruiting)</option>
                                <option value="1">1 position</option>
                                <option value="2-5">2-5 positions</option>
                                <option value="6-10">6-10 positions</option>
                                <option value="10+">10+ positions</option>
                            </select>
                        </>
                    )}

                    <select
                        className="w-full px-3 py-2.5 bg-white/95 border-0 rounded-lg text-slate-900 focus:ring-2 focus:ring-mosaic-dark/20 focus:outline-none text-sm transition-shadow"
                        defaultValue=""
                    >
                        <option value="" disabled className="text-slate-500">How did you hear about us?</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Google Search">Google Search</option>
                        <option value="Referral">Referral</option>
                        <option value="Email">Email Marketing</option>
                        <option value="Other">Other</option>
                    </select>

                    <div className="space-y-2 pt-2">
                        <p className="text-xs font-bold text-teal-200 uppercase tracking-wider">I'm interested in:</p>
                        <div className="space-y-2 max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-teal-800 scrollbar-track-transparent">
                            {type === 'employer' ? (
                                <>
                                    <label className="flex items-start space-x-3 cursor-pointer group">
                                        <div className="relative flex items-center pt-0.5">
                                            <input type="checkbox" className="peer h-4 w-4 rounded border-teal-300 text-mosaic-dark focus:ring-mosaic-dark bg-teal-800/50" />
                                        </div>
                                        <span className="text-sm text-white group-hover:text-teal-100 transition-colors">Job Posts</span>
                                    </label>
                                    <label className="flex items-start space-x-3 cursor-pointer group">
                                        <div className="relative flex items-center pt-0.5">
                                            <input type="checkbox" className="peer h-4 w-4 rounded border-teal-300 text-mosaic-dark focus:ring-mosaic-dark bg-teal-800/50" />
                                        </div>
                                        <span className="text-sm text-white group-hover:text-teal-100 transition-colors">Full-Cycle Recruiting</span>
                                    </label>
                                    <label className="flex items-start space-x-3 cursor-pointer group">
                                        <div className="relative flex items-center pt-0.5">
                                            <input type="checkbox" className="peer h-4 w-4 rounded border-teal-300 text-mosaic-dark focus:ring-mosaic-dark bg-teal-800/50" />
                                        </div>
                                        <span className="text-sm text-white group-hover:text-teal-100 transition-colors">Fractional Talent Acquisition</span>
                                    </label>
                                    <label className="flex items-start space-x-3 cursor-pointer group">
                                        <div className="relative flex items-center pt-0.5">
                                            <input type="checkbox" className="peer h-4 w-4 rounded border-teal-300 text-mosaic-dark focus:ring-mosaic-dark bg-teal-800/50" />
                                        </div>
                                        <span className="text-sm text-white group-hover:text-teal-100 transition-colors">Sourcing-Only Services</span>
                                    </label>
                                </>
                            ) : (
                                <>
                                    <label className="flex items-start space-x-3 cursor-pointer group">
                                        <div className="relative flex items-center pt-0.5">
                                            <input type="checkbox" className="peer h-4 w-4 rounded border-teal-300 text-mosaic-dark focus:ring-mosaic-dark bg-teal-800/50" />
                                        </div>
                                        <span className="text-sm text-white group-hover:text-teal-100 transition-colors">Free Candidate Database</span>
                                    </label>
                                    <label className="flex items-start space-x-3 cursor-pointer group">
                                        <div className="relative flex items-center pt-0.5">
                                            <input type="checkbox" className="peer h-4 w-4 rounded border-teal-300 text-mosaic-dark focus:ring-mosaic-dark bg-teal-800/50" />
                                        </div>
                                        <span className="text-sm text-white group-hover:text-teal-100 transition-colors">Career Boost (Resume/LinkedIn)</span>
                                    </label>
                                    <label className="flex items-start space-x-3 cursor-pointer group">
                                        <div className="relative flex items-center pt-0.5">
                                            <input type="checkbox" className="peer h-4 w-4 rounded border-teal-300 text-mosaic-dark focus:ring-mosaic-dark bg-teal-800/50" />
                                        </div>
                                        <span className="text-sm text-white group-hover:text-teal-100 transition-colors">Professional Branding</span>
                                    </label>
                                    <label className="flex items-start space-x-3 cursor-pointer group">
                                        <div className="relative flex items-center pt-0.5">
                                            <input type="checkbox" className="peer h-4 w-4 rounded border-teal-300 text-mosaic-dark focus:ring-mosaic-dark bg-teal-800/50" />
                                        </div>
                                        <span className="text-sm text-white group-hover:text-teal-100 transition-colors">Featured Candidate Upgrade</span>
                                    </label>
                                </>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 py-3 px-6 bg-mosaic-dark hover:bg-slate-800 text-white font-bold rounded-lg shadow-lg shadow-mosaic-dark/30 transform transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mosaic-dark ring-offset-teal-900"
                    >
                        Subscribe
                    </button>
                    <p className="text-[10px] text-center text-teal-200/60 mt-3">
                        No spam. Unsubscribe at any time.
                    </p>
                </form>
            </div>
        )}
      </div>
    </div>
  );
};