import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { 
  Check, ShieldCheck, Zap, BarChart, Lock, Trophy, Timer, Search, 
  Users, Gift, Star, ArrowRight, DollarSign, User, Mail, Building2, 
  Briefcase, TrendingDown, Shield, CheckCircle2, Target, TrendingUp 
} from 'lucide-react';
import { RECRUITING_PRICING, FRACTIONAL_PLANS } from '../constants';

export const EmployerSolutions: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    company: '', 
    positions: '',
    interestedInConsultation: '',
    serviceInterest: ''
  });

  useEffect(() => {
    const access = localStorage.getItem('mosaic_employer_pricing_access');
    if (access) {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name && 
      formData.email && 
      formData.company && 
      formData.positions && 
      formData.interestedInConsultation && 
      formData.serviceInterest
    ) {
      localStorage.setItem('mosaic_employer_pricing_access', JSON.stringify(formData));
      setIsUnlocked(true);
      window.scrollTo(0, 0);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="pt-32 min-h-screen bg-mosaic-sand flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=2000" 
            alt="Artsy Natural Material Detail" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -top-24 -left-24 w-[40rem] h-[40rem] bg-mosaic-teal/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 -right-24 w-[40rem] h-[40rem] bg-mosaic-teal/10 rounded-full blur-[120px]"></div>

        <div className="max-w-xl w-full bg-white rounded-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-stone-200 overflow-hidden relative z-10">
          <div className="bg-mosaic-dark p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
               <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1000" alt="Artsy Technical Detail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="relative z-10">
              <div className="inline-block p-5 bg-mosaic-teal/10 rounded-none mb-8 backdrop-blur-xl border border-white/10 shadow-2xl">
                <Lock className="w-12 h-12 text-mosaic-teal" />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight leading-tight">Unlock <span className="text-mosaic-teal italic">Employer</span> <br/>Pricing & VIP Access</h2>
              <p className="text-stone-400 text-lg mt-6 leading-relaxed font-light">Join the industry leaders. Enter your details to access our exclusive recruiting models.</p>
            </div>
          </div>
          <form onSubmit={handleUnlock} className="p-12 space-y-8 bg-white">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-4 w-4 h-4 text-stone-400 group-focus-within:text-mosaic-teal transition-colors" />
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-stone-50 border-b-2 border-stone-200 focus:border-mosaic-teal focus:bg-white outline-none transition-all text-sm font-medium rounded-none"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">Work Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-4 w-4 h-4 text-stone-400 group-focus-within:text-mosaic-teal transition-colors" />
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-stone-50 border-b-2 border-stone-200 focus:border-mosaic-teal focus:bg-white outline-none transition-all text-sm font-medium rounded-none"
                    placeholder="john@company.com"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">Company Name</label>
                <div className="relative group">
                  <Building2 className="absolute left-4 top-4 w-4 h-4 text-stone-400 group-focus-within:text-mosaic-teal transition-colors" />
                  <input 
                    required
                    type="text" 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-stone-50 border-b-2 border-stone-200 focus:border-mosaic-teal focus:bg-white outline-none transition-all text-sm font-medium rounded-none"
                    placeholder="Engineering Solutions Inc."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">Open Positions</label>
                <div className="relative group">
                  <Briefcase className="absolute left-4 top-4 w-4 h-4 text-stone-400 group-focus-within:text-mosaic-teal transition-colors" />
                  <select 
                    required
                    value={formData.positions}
                    onChange={(e) => setFormData({...formData, positions: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-stone-50 border-b-2 border-stone-200 focus:border-mosaic-teal focus:bg-white outline-none transition-all text-sm appearance-none font-medium rounded-none"
                  >
                    <option value="">Select volume...</option>
                    <option value="1">1 Position</option>
                    <option value="2-5">2–5 Positions</option>
                    <option value="6-10">6–10 Positions</option>
                    <option value="11+">11+ Positions</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-stone-50 p-8 border border-stone-100">
              <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest">Interested in a free consultation?</label>
              <div className="flex gap-8">
                <label className="flex items-center text-sm font-bold text-stone-700 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="consultation" 
                    value="yes" 
                    required
                    checked={formData.interestedInConsultation === 'yes'}
                    onChange={(e) => setFormData({...formData, interestedInConsultation: e.target.value})}
                    className="w-5 h-5 text-mosaic-teal border-stone-300 focus:ring-mosaic-teal transition-all cursor-pointer"
                  />
                  <span className="ml-3 group-hover:text-mosaic-teal transition-colors">Yes, please</span>
                </label>
                <label className="flex items-center text-sm font-bold text-stone-700 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="consultation" 
                    value="no" 
                    required
                    checked={formData.interestedInConsultation === 'no'}
                    onChange={(e) => setFormData({...formData, interestedInConsultation: e.target.value})}
                    className="w-5 h-5 text-mosaic-teal border-stone-300 focus:ring-mosaic-teal transition-all cursor-pointer"
                  />
                  <span className="ml-3 group-hover:text-stone-900 transition-colors">Not right now</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">Primary Service Interest</label>
              <select 
                required
                value={formData.serviceInterest}
                onChange={(e) => setFormData({...formData, serviceInterest: e.target.value})}
                className="w-full px-6 py-4 bg-stone-50 border-b-2 border-stone-200 focus:border-mosaic-teal focus:bg-white outline-none transition-all text-sm appearance-none font-bold text-stone-700 rounded-none"
              >
                <option value="">Select service type...</option>
                <option value="VIP">VIP: Fractional Talent Acquisition</option>
                <option value="High Priority">High Priority: Exclusive Search (15%)</option>
                <option value="Contingency">Contingency: Name Your Price (18-25%)</option>
              </select>
            </div>

            <Button type="submit" className="w-full py-8 text-xs uppercase tracking-[0.3em] font-black shadow-2xl bg-mosaic-teal hover:bg-teal-700 transform hover:scale-[1.02] transition-all rounded-none">
              Unlock VIP Pricing Access
            </Button>
            <p className="text-[10px] text-center text-stone-400 leading-relaxed uppercase tracking-widest">
              Secure access • Privacy Guaranteed • No Obligation
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 bg-stone-50">
      {/* Scarcity Banner */}
      <div className="bg-mosaic-teal text-white text-center py-4 font-black tracking-[0.2em] text-xs uppercase sticky top-20 z-40 shadow-xl">
        🚨 Launch Specials Active — Valid Until May 31, 2026 🚨
      </div>

      {/* HERO */}
      <section className="relative bg-mosaic-dark text-white py-32 text-center overflow-hidden">
         <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1621905252507-b354bcadc0d9?auto=format&fit=crop&q=80&w=2070" 
              alt="Artsy Structural Landscape" 
              className="w-full h-full object-cover opacity-30 scale-110 grayscale"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-mosaic-dark/95 via-mosaic-dark/80 to-mosaic-dark/95"></div>
         </div>
         
         <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="inline-flex items-center bg-mosaic-teal/10 backdrop-blur-xl text-mosaic-teal border border-mosaic-teal/20 px-10 py-4 rounded-none text-[10px] font-black tracking-[0.5em] mb-8 uppercase shadow-2xl">
               <Trophy className="w-4 h-4 mr-4" />
               VIP ACCESS GRANTED
            </div>
            <h1 className="text-4xl md:text-7xl font-serif font-bold mb-6 tracking-tight leading-tight">
              Scale <br/> <span className="text-mosaic-teal italic">With Precision.</span>
            </h1>
            <p className="text-stone-300 text-xl md:text-3xl max-w-3xl mx-auto leading-relaxed font-light tracking-tight">
              Foundational support to fully managed recruiting teams. Choose your partnership level.
            </p>
         </div>
      </section>

      {/* PART 1: SINGLE-POSITION RECRUITING */}
      <section id="single-position" className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 border-2 border-mosaic-teal/20 translate-x-8 translate-y-8 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700"></div>
              <img 
                src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=1000" 
                alt="Professional Business Handshake" 
                className="relative z-10 shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-1000 h-[600px] w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="text-[10px] font-black text-mosaic-teal uppercase tracking-[0.3em] mb-8">Option 01</div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-mosaic-dark mb-10 leading-tight tracking-tight">Zero Risk <br/><span className="text-mosaic-teal italic">Posting.</span></h2>
              <p className="text-stone-500 text-xl font-light leading-relaxed mb-12">
                Perfect for firms with occasional hiring needs who want access to top-tier talent without the upfront commitment.
              </p>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start">
                  <div className="p-3 bg-mosaic-teal/10 text-mosaic-teal mr-6">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-mosaic-dark text-lg mb-2">Pay Only on Success</h4>
                    <p className="text-stone-500 font-light">No upfront fees. You only pay when your ideal candidate signs the offer letter.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-3 bg-mosaic-teal/10 text-mosaic-teal mr-6">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-mosaic-dark text-lg mb-2">90-Day Guarantee</h4>
                    <p className="text-stone-500 font-light">Full replacement guarantee if the candidate doesn't work out within the first 3 months.</p>
                  </div>
                </div>
              </div>

              <div className="p-10 bg-mosaic-sand border-l-4 border-mosaic-teal">
                <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest mb-4">Investment</p>
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-serif font-bold text-mosaic-dark">18-25%</span>
                  <span className="text-stone-500 font-light italic">of first-year base salary</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive / Priority Search */}
      <section id="exclusive" className="py-32 bg-mosaic-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <img src="https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=2000" alt="Artsy Architecture" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="order-2 md:order-1">
              <div className="text-[10px] font-black text-mosaic-teal uppercase tracking-[0.3em] mb-8">Option 02</div>
              <h2 className="text-5xl md:text-7xl font-serif font-bold mb-10 leading-tight tracking-tighter">Priority <br/><span className="text-mosaic-teal italic">Search.</span></h2>
              <p className="text-stone-400 text-xl font-light leading-relaxed mb-12">
                Our most popular model for critical roles. We become your dedicated partner, providing a curated shortlist of passive talent.
              </p>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10">
                   <Zap className="w-8 h-8 text-mosaic-teal mb-6" />
                   <h4 className="font-bold text-lg mb-2">Fast-Track</h4>
                </div>
                <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10">
                   <Target className="w-8 h-8 text-mosaic-teal mb-6" />
                   <h4 className="font-bold text-lg mb-2">Passive Talent</h4>
                   <p className="text-stone-400 text-sm font-light">Access candidates not found on job boards.</p>
                </div>
              </div>

              <div className="p-10 bg-mosaic-teal/10 border-l-4 border-mosaic-teal backdrop-blur-xl">
                <p className="text-mosaic-teal/60 text-[10px] font-black uppercase tracking-widest mb-4">Investment</p>
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-serif font-bold text-mosaic-teal">15%</span>
                  <span className="text-stone-400 font-light italic">Flat fee (Limited Time)</span>
                </div>
                <p className="text-[10px] text-stone-500 mt-4 uppercase tracking-widest">Small engagement fee required to start</p>
              </div>
            </div>
            <div className="order-1 md:order-2 relative group">
               <div className="absolute -inset-4 border-2 border-mosaic-teal/20 -translate-x-8 translate-y-8 group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-700"></div>
               <img 
                src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=1000" 
                alt="Artsy Bridge Over Ocean" 
                className="relative z-10 shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-1000 h-[600px] w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contingency Recruiting */}
      <section id="contingency" className="py-32 bg-mosaic-sand relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <div className="text-[10px] font-black text-mosaic-teal uppercase tracking-[0.3em] mb-8">Option 03</div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-mosaic-dark mb-10 leading-tight tracking-tighter">Contingency <br/><span className="text-mosaic-teal italic">Search.</span></h2>
            <p className="text-stone-500 text-xl font-light leading-relaxed">
              Flexible, success-based recruiting tiers designed to fit your budget and urgency.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                tier: 'Standard',
                fee: '18%',
                desc: 'Steady-paced search for non-critical roles.',
                features: ['Standard Database Search', 'Job Board Posting', 'Basic Screening'],
                color: 'stone-400'
              },
              {
                tier: 'Priority',
                fee: '22%',
                desc: 'Active headhunting for mid-level roles.',
                features: ['Targeted Outreach', 'Passive Candidate Sourcing', 'Detailed Interviews'],
                color: 'mosaic-teal',
                popular: true
              },
              {
                tier: 'Urgent',
                fee: '25%',
                desc: 'Maximum speed for immediate needs.',
                features: ['Dedicated Sourcing Team', '24/7 Candidate Engagement', 'Executive Level Screening'],
                color: 'mosaic-dark'
              }
            ].map((plan) => (
              <div key={plan.tier} className={`relative bg-white p-12 shadow-2xl border-t-8 ${plan.popular ? 'border-mosaic-teal scale-105 z-10' : 'border-stone-200'} transition-all hover:-translate-y-4`}>
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-mosaic-teal text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest">Most Popular</div>
                )}
                <h3 className="text-2xl font-serif font-bold text-mosaic-dark mb-4">{plan.tier}</h3>
                <div className="text-5xl font-serif font-bold text-mosaic-dark mb-6">{plan.fee}</div>
                <p className="text-stone-500 text-sm font-light mb-10 leading-relaxed">{plan.desc}</p>
                <div className="space-y-4 mb-12">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-center text-sm font-bold text-stone-700">
                      <Check className="w-4 h-4 text-mosaic-teal mr-3" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link to="/contact">
                  <Button className={`w-full py-6 rounded-none uppercase tracking-widest text-xs font-black ${plan.popular ? 'bg-mosaic-teal text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>Select {plan.tier}</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POSITIONING COMPARISON */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-mosaic-dark mb-6">Model <span className="text-mosaic-teal italic">Comparison.</span></h2>
            <p className="text-stone-500 text-lg font-light">Choose the engagement that aligns with your growth trajectory.</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b-2 border-mosaic-dark">
                  <th className="py-8 px-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Model</th>
                  <th className="py-8 px-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Priority</th>
                  <th className="py-8 px-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Speed</th>
                  <th className="py-8 px-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Cost Structure</th>
                  <th className="py-8 px-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {[
                  { m: 'Contingency', p: 'Standard', s: 'Variable', c: 'Success Fee', b: 'Non-critical roles' },
                  { m: 'Exclusive Search', p: 'High', s: 'Fast', c: 'Retainer + Fee', b: 'Key technical hires' },
                  { m: 'Fractional VIP', p: 'Maximum', s: 'Accelerated', c: 'Monthly Subscription', b: 'High-growth scaling' },
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-mosaic-sand/50 transition-colors">
                    <td className="py-8 px-6 font-serif font-bold text-xl text-mosaic-dark">{row.m}</td>
                    <td className="py-8 px-6 text-sm font-bold text-stone-600 uppercase tracking-widest">{row.p}</td>
                    <td className="py-8 px-6 text-sm font-bold text-stone-600 uppercase tracking-widest">{row.s}</td>
                    <td className="py-8 px-6 text-sm font-bold text-stone-600 uppercase tracking-widest">{row.c}</td>
                    <td className="py-8 px-6 text-sm text-stone-500 font-light italic">{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Fractional Recruiting Plans */}
      <section id="fractional" className="py-32 bg-mosaic-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-24 items-center mb-32">
            <div>
              <div className="text-[10px] font-black text-mosaic-teal uppercase tracking-[0.3em] mb-8">Option 04</div>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-10 leading-tight tracking-tighter">Fractional <br/><span className="text-mosaic-teal italic">Teams.</span></h2>
              <p className="text-stone-400 text-xl font-light leading-relaxed mb-12">
                Your own dedicated recruiting department at a fraction of the cost. Perfect for high-growth firms.
              </p>
              <div className="space-y-8">
                <div className="p-8 bg-white/5 border-l-4 border-mosaic-teal backdrop-blur-sm">
                  <h4 className="font-bold text-white mb-2">Dedicated Recruiter</h4>
                  <p className="text-stone-400 text-sm font-light">A technical recruiting expert embedded in your team.</p>
                </div>
                <div className="p-8 bg-white/5 border-l-4 border-mosaic-teal backdrop-blur-sm">
                  <h4 className="font-bold text-white mb-2">Technical Vetting</h4>
                  <p className="text-stone-400 text-sm font-light">Direct oversight by our engineering-led recruiting team.</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 border-2 border-mosaic-teal/20 translate-x-8 translate-y-8 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700"></div>
              <img 
                src="https://images.unsplash.com/photo-1518005020251-5183309f061d?auto=format&fit=crop&q=80&w=1000" 
                alt="Artsy Modern Structural Detail" 
                className="relative z-10 shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-1000 h-[600px] w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                name: 'Growth Plan',
                price: '$4,500',
                period: '/month',
                desc: 'For firms hiring 1-2 people per month.',
                features: ['10 Hours/Week Dedicated Support', 'Unlimited Hires', 'Full Cycle Recruiting', 'Employer Branding Support']
              },
              {
                name: 'Scale Plan',
                price: '$8,000',
                period: '/month',
                desc: 'For firms hiring 3+ people per month.',
                features: ['20 Hours/Week Dedicated Support', 'Unlimited Hires', 'ATS Implementation', 'Hiring Manager Training']
              }
            ].map((plan) => (
              <div key={plan.name} className="bg-white/5 p-16 text-white shadow-2xl relative overflow-hidden group border border-white/10 backdrop-blur-md">
                <div className="absolute top-0 right-0 w-64 h-64 bg-mosaic-teal/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-mosaic-teal/20 transition-all"></div>
                <h3 className="text-3xl font-serif font-bold mb-4">{plan.name}</h3>
                <div className="flex items-baseline gap-4 mb-8">
                  <span className="text-6xl font-serif font-bold text-mosaic-teal">{plan.price}</span>
                  <span className="text-stone-500 font-light italic">{plan.period}</span>
                </div>
                <p className="text-stone-400 text-lg font-light mb-12 leading-relaxed">{plan.desc}</p>
                <div className="grid sm:grid-cols-2 gap-8 mb-16">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-center text-sm font-bold text-stone-300">
                      <div className="w-2 h-2 bg-mosaic-teal mr-4"></div>
                      {f}
                    </div>
                  ))}
                </div>
                <Link to="/contact">
                  <Button className="w-full py-8 bg-mosaic-teal hover:bg-mosaic-teal/90 text-white rounded-none uppercase tracking-widest text-xs font-black">Get Started</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI / Cost Savings Section */}
      <section className="py-32 bg-mosaic-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-mosaic-dark mb-6">The ROI of <span className="text-mosaic-teal italic">Precision.</span></h2>
            <p className="text-stone-500 text-lg font-light">Stop overpaying for standard agency results. Our model is engineered for efficiency.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-16 shadow-2xl border-t-8 border-stone-200">
              <h3 className="text-2xl font-serif font-bold text-mosaic-dark mb-10">Traditional Agency</h3>
              <div className="space-y-8">
                <div className="flex justify-between items-end border-b border-stone-100 pb-4">
                  <div>
                    <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Contingency Fee (25%)</div>
                    <div className="text-xl font-bold text-mosaic-dark">$120,000 Salary</div>
                  </div>
                  <div className="text-3xl font-serif font-bold text-red-600">$30,000</div>
                </div>
                <div className="flex justify-between items-end border-b border-stone-100 pb-4">
                  <div>
                    <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Contingency Fee (25%)</div>
                    <div className="text-xl font-bold text-mosaic-dark">$150,000 Salary</div>
                  </div>
                  <div className="text-3xl font-serif font-bold text-red-600">$37,500</div>
                </div>
                <p className="text-stone-500 text-sm font-light italic leading-relaxed">
                  "Surprise fees, misaligned incentives, and high costs per individual hire. You pay for their overhead, not your results."
                </p>
              </div>
            </div>

            <div className="bg-mosaic-dark p-16 shadow-2xl border-t-8 border-mosaic-teal text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <TrendingUp className="w-32 h-32" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-10">Mosaic Partnership</h3>
              <div className="space-y-8">
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <div>
                    <div className="text-[10px] font-black text-mosaic-teal uppercase tracking-widest mb-2">Fractional Growth Plan</div>
                    <div className="text-xl font-bold">5 Hires / Quarter</div>
                  </div>
                  <div className="text-3xl font-serif font-bold text-mosaic-teal">$2,700 <span className="text-xs font-light text-stone-500">/hire</span></div>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <div>
                    <div className="text-[10px] font-black text-mosaic-teal uppercase tracking-widest mb-2">Fractional Scale Plan</div>
                    <div className="text-xl font-bold">10 Hires / Quarter</div>
                  </div>
                  <div className="text-3xl font-serif font-bold text-mosaic-teal">$2,400 <span className="text-xs font-light text-stone-500">/hire</span></div>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 backdrop-blur-sm">
                  <p className="text-mosaic-teal text-sm font-bold uppercase tracking-widest mb-2">The Result:</p>
                  <p className="text-stone-400 text-sm font-light leading-relaxed">
                    Up to 80% reduction in cost-per-hire compared to traditional contingency models.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PART 2: STANDARD SERVICES */}
      <div className="bg-stone-900 py-20 text-center relative overflow-hidden">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1920" alt="Artsy Engineering Site" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
         </div>
         <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Standard Service Menu</h2>
            <p className="text-stone-400 text-lg tracking-widest uppercase">A la carte pricing for job posts and sourcing.</p>
         </div>
      </div>

      {/* Standard Service Menu */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-mosaic-dark mb-6">A La Carte <span className="text-mosaic-teal italic">Services.</span></h2>
            <p className="text-stone-500 text-lg font-light">Targeted solutions for specific hiring needs.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: 'Single Job Post',
                price: '$99',
                desc: '90 days live on our premium job board.',
                icon: <Briefcase className="w-8 h-8 text-mosaic-teal" />
              },
              {
                title: '3-Job Pack',
                price: '$249',
                desc: 'Save $48. Perfect for small teams.',
                icon: <Zap className="w-8 h-8 text-mosaic-teal" />,
                popular: true
              },
              {
                title: 'Featured Upgrade',
                price: '+$49',
                desc: 'Top of board placement and highlighting.',
                icon: <Target className="w-8 h-8 text-mosaic-teal" />
              }
            ].map((item) => (
              <div key={item.title} className={`p-12 border-2 ${item.popular ? 'border-mosaic-teal shadow-2xl scale-105 z-10' : 'border-stone-100'} transition-all hover:shadow-xl`}>
                <div className="mb-8">{item.icon}</div>
                <h3 className="text-xl font-serif font-bold text-mosaic-dark mb-2">{item.title}</h3>
                <div className="text-4xl font-serif font-bold text-mosaic-dark mb-6">{item.price}</div>
                <p className="text-stone-500 text-sm font-light mb-10 leading-relaxed">{item.desc}</p>
                <Link to="/employer/signup">
                  <Button className={`w-full py-6 rounded-none uppercase tracking-widest text-xs font-black ${item.popular ? 'bg-mosaic-teal text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>Select</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing Engine */}
      <section className="py-32 bg-mosaic-sand relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div>
              <div className="inline-flex items-center bg-mosaic-dark text-white px-4 py-1.5 rounded-none text-[10px] font-black uppercase tracking-widest mb-8">
                <Zap className="w-3 h-3 mr-2 text-mosaic-teal" />
                Technical Recruiting Team
              </div>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-mosaic-dark mb-10 leading-tight tracking-tighter">Sourcing <br/><span className="text-mosaic-teal italic">Engine.</span></h2>
              <p className="text-stone-600 text-xl font-light leading-relaxed mb-12">
                We use advanced scraping and direct recruitment outreach to build your technical pipeline with precision.
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="bg-white p-10 shadow-xl border-t-4 border-mosaic-teal">
                  <h4 className="font-bold text-mosaic-dark mb-4">Sourcing List</h4>
                  <div className="text-3xl font-serif font-bold text-mosaic-dark mb-2">$500</div>
                  <p className="text-stone-500 text-xs font-light">Per position. 50+ verified profiles.</p>
                </div>
                <div className="bg-mosaic-dark p-10 shadow-xl border-t-4 border-mosaic-teal text-white">
                  <h4 className="font-bold mb-4">Full Outreach</h4>
                  <div className="text-3xl font-serif font-bold text-mosaic-teal mb-2">$1,000</div>
                  <p className="text-stone-400 text-xs font-light">Per month. Includes drip campaigns.</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 border-2 border-mosaic-teal/20 translate-x-8 translate-y-8 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700"></div>
              <img 
                src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=1000" 
                alt="Technical Industrial Detail" 
                className="relative z-10 shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-1000 h-[600px] w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Viral Loops / Rewards */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-mosaic-dark mb-6">The Referral <span className="text-mosaic-teal italic">Ecosystem.</span></h2>
            <p className="text-stone-500 text-lg font-light">Don't hire alone. Earn rewards for building the network.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: 'Refer a Company',
                reward: '1 Free Unlock',
                desc: 'Both parties receive a free candidate unlock upon registration.',
                icon: <Gift className="w-8 h-8 text-mosaic-teal" />
              },
              {
                title: 'The Invitational',
                reward: '1 Month Free',
                desc: 'Refer 5 companies and unlock a month of sourcing for free.',
                icon: <Trophy className="w-8 h-8 text-mosaic-teal" />,
                popular: true
              },
              {
                title: 'Partner Pass',
                reward: 'Volume Discounts',
                desc: 'Add 3 hiring managers to unlock exclusive volume pricing.',
                icon: <Users className="w-8 h-8 text-mosaic-teal" />
              }
            ].map((item) => (
              <div key={item.title} className={`p-12 border-2 ${item.popular ? 'border-mosaic-teal shadow-2xl scale-105 z-10' : 'border-stone-100'} transition-all hover:shadow-xl`}>
                <div className="mb-8">{item.icon}</div>
                <h3 className="text-xl font-serif font-bold text-mosaic-dark mb-2">{item.title}</h3>
                <div className="text-2xl font-serif font-bold text-mosaic-teal mb-6">{item.reward}</div>
                <p className="text-stone-500 text-sm font-light mb-10 leading-relaxed">{item.desc}</p>
                <Button variant="outline" className="w-full py-6 rounded-none uppercase tracking-widest text-xs font-black border-stone-200 hover:bg-stone-50">Learn More</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-mosaic-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1920" 
            alt="Atmospheric Landscape" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-5xl md:text-8xl font-serif font-bold mb-12 leading-tight tracking-tighter">Ready to <br/><span className="text-mosaic-teal italic">Scale?</span></h2>
          <p className="text-stone-400 text-xl font-light leading-relaxed mb-16 max-w-2xl mx-auto">
            Tell us about your hiring needs — we’ll recommend the best solution and start building your candidate pipeline immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link to="/contact">
              <Button className="px-12 py-8 bg-mosaic-teal hover:bg-teal-700 text-white rounded-none uppercase tracking-widest text-xs font-black shadow-2xl">Book a Consultation</Button>
            </Link>
            <Link to="/employer/signup">
              <Button variant="outline" className="px-12 py-8 border-white/20 hover:bg-white/10 text-white rounded-none uppercase tracking-widest text-xs font-black">Create Account</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
