import React, { useState } from 'react';
import { Button } from '../components/Button';

export const Contact: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'employer' | 'candidate'>('employer');

  return (
    <div className="pt-32 min-h-screen bg-stone-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2070" 
          alt="Modern Engineering Office" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mosaic-dark/90 via-mosaic-dark/70 to-stone-50"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-24 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center text-mosaic-teal px-8 py-2 rounded-none text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-mosaic-teal/30 backdrop-blur-xl">
            Consultation Request
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 tracking-tight leading-tight">
            Let's Build Your <br/><span className="text-mosaic-teal italic">Dream Team.</span>
          </h1>
          <p className="text-stone-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Tell us about your hiring needs and we'll schedule a time to discuss how Mosaic can accelerate your growth.
          </p>
        </div>

        <div className="bg-white rounded-none shadow-2xl overflow-hidden border border-stone-100 relative">
          <div className="absolute top-0 left-0 right-0 h-2 bg-mosaic-teal"></div>
          
          <div className="p-10 md:p-20">
            <form className="space-y-12" onSubmit={(e) => {e.preventDefault(); alert("Thank you! We'll reach out shortly.");}}>
                
                {/* Services Checkboxes at Top */}
                <div className="bg-stone-50 p-10 rounded-none border border-stone-100">
                    <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-8">Services of Interest</label>
                    <div className="grid md:grid-cols-2 gap-6">
                         {[
                           "Job Postings",
                           "Candidate Sourcing",
                           "Full-Cycle Recruiting",
                           "Fractional Talent Acquisition"
                         ].map((service) => (
                           <label key={service} className="flex items-center space-x-4 cursor-pointer group">
                              <input type="checkbox" className="h-5 w-5 rounded-none text-mosaic-teal border-stone-300 focus:ring-mosaic-teal cursor-pointer" />
                              <span className="text-sm text-stone-600 group-hover:text-mosaic-dark transition-colors font-light">{service}</span>
                          </label>
                         ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">First Name</label>
                        <input type="text" required placeholder="Jane" className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark placeholder:text-stone-300" />
                    </div>
                    <div className="space-y-4">
                        <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">Last Name</label>
                        <input type="text" required placeholder="Engineer" className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark placeholder:text-stone-300" />
                    </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                         <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">Company</label>
                         <input type="text" required placeholder="Mosaic Engineering" className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark placeholder:text-stone-300" />
                    </div>
                    <div className="space-y-4">
                         <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">Email</label>
                         <input type="email" required placeholder="jane@mosaic.com" className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark placeholder:text-stone-300" />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">How did you hear about us?</label>
                        <select className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark appearance-none cursor-pointer">
                            <option value="">Select...</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Google">Google Search</option>
                            <option value="Referral">Referral</option>
                            <option value="Email">Email Marketing</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                     <div className="space-y-4">
                         <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">Phone Number</label>
                         <input type="tel" placeholder="(555) 000-0000" className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark placeholder:text-stone-300" />
                    </div>
                </div>

                <div className="space-y-4">
                     <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">Hiring Needs / Message</label>
                     <textarea rows={3} placeholder="Tell us about the roles you need to fill..." className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark placeholder:text-stone-300 resize-none"></textarea>
                </div>

                <div className="space-y-4">
                     <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">Preferred Date/Time for Consultation</label>
                     <textarea rows={2} placeholder="e.g. Monday mornings, or specifically Oct 24th at 2pm EST." className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark placeholder:text-stone-300 resize-none"></textarea>
                </div>

                <div className="pt-8">
                  <Button className="w-full py-10 rounded-none bg-mosaic-dark hover:bg-mosaic-dark/90 text-white uppercase tracking-[0.3em] text-xs font-black shadow-2xl transition-all hover:scale-[1.01]" size="lg">
                    Book Consultation
                  </Button>
                  
                  <p className="text-center text-[10px] text-stone-400 uppercase tracking-[0.2em] mt-12 font-black">
                      Are you a candidate? <a href="/candidates" className="text-mosaic-teal hover:underline font-bold">Join the Candidate Database here.</a>
                  </p>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};