
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowRight, Users, Briefcase, Cpu, CheckCircle, Star, Zap, DollarSign, HardHat, Compass, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { CandidateApplicationModal } from '../components/CandidateApplicationModal';

export const Home: React.FC = () => {
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  return (
    <div className="w-full">
      {/* Global Modal */}
      <CandidateApplicationModal 
        job={null} 
        isOpen={isCandidateModalOpen} 
        onClose={() => setIsCandidateModalOpen(false)} 
      />

      {/* Hero Section */}
      <section className="relative bg-[#0A0F14] text-white pt-48 pb-20 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            {/* Logo Area */}
            <div className="mb-5 transition-all duration-1000 transform scale-90 md:scale-100 flex flex-col items-center">
               <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
                 <img 
                    src="/logo.png" 
                    alt="Mosaic Talent Consulting Logo" 
                    className={`w-full h-auto drop-shadow-2xl transition-opacity duration-500 ${logoLoaded ? 'opacity-100' : 'opacity-0 absolute'}`}
                    referrerPolicy="no-referrer"
                    onLoad={() => setLogoLoaded(true)}
                 />
                 
                 {/* High-Fidelity Reconstruction - Only visible if logo.png is missing */}
                 {!logoLoaded && (
                   <div className="flex flex-col items-center w-full mt-4">
                      <h1 className="text-4xl md:text-[5.5rem] font-serif font-bold tracking-tight bg-gradient-to-r from-mosaic-teal via-white to-mosaic-teal bg-clip-text text-transparent uppercase py-10 leading-normal">
                        MOSAIC
                      </h1>
                      
                      <div className="flex items-center w-full max-w-2xl mt-4">
                        <div className="h-[1px] flex-grow bg-white/40"></div>
                        <span className="mx-6 text-[12px] md:text-[22px] font-medium tracking-[0.35em] text-white whitespace-nowrap uppercase">TALENT CONSULTING</span>
                        <div className="h-[1px] flex-grow bg-white/40"></div>
                      </div>
                      
                       <div className="w-16 h-[1px] bg-white/20 mt-6 mb-4"></div>
                       <p className="text-[14px] md:text-[24px] font-light tracking-[0.1em] text-white/90">
                         Engineer-Led. Business-Driven.
                       </p>

                       <div className="w-16 h-[1px] bg-white/20 mt-4 mb-4"></div>
                       <p className="mt-4 text-[10px] md:text-[18px] font-bold tracking-[0.05em] bg-gradient-to-r from-mosaic-teal via-orange-400 to-mosaic-purple bg-clip-text text-transparent uppercase">
                         Specialized in Recruiting for Engineering & Business Talent.
                       </p>
                      
{/* slogan removed */}
                   </div>
                 )}
               </div>
            </div>

            {/* Main headline and description removed */}
            <div className="flex flex-col sm:flex-row justify-center gap-8">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto bg-mosaic-dark hover:bg-mosaic-teal shadow-2xl shadow-mosaic-dark/20 px-12 py-8 rounded-none uppercase tracking-[0.3em] text-xs font-black">Book a Consultation</Button>
              </Link>
              <Link to="/employers">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-12 py-8 rounded-none uppercase tracking-[0.3em] text-xs font-black">
                  Employer Solutions
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Strip */}
      <div className="bg-stone-50 py-16 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.4em] mb-12">Proven Industry Experience</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000">
             <span className="text-xl md:text-2xl font-serif font-black text-mosaic-dark uppercase tracking-tighter">Cisco</span>
             <span className="text-xl md:text-2xl font-serif font-black text-mosaic-dark uppercase tracking-tighter">Pratt & Whitney</span>
             <span className="text-xl md:text-2xl font-serif font-black text-mosaic-dark uppercase tracking-tighter">TRC Companies</span>
             <span className="text-xl md:text-2xl font-serif font-black text-mosaic-dark uppercase tracking-tighter">DKI Engineering</span>
             <span className="text-xl md:text-2xl font-serif font-black text-mosaic-dark uppercase tracking-tighter">FactSet</span>
          </div>
        </div>
      </div>

      {/* The Mosaic Method (Venn Diagram Concept) */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02] pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000" 
            alt="Artsy Nature Detail" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-32">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-mosaic-dark mb-8 leading-tight">The Mosaic <span className="text-mosaic-teal italic">Advantage.</span></h2>
            <p className="text-stone-400 text-xs font-black uppercase tracking-[0.2em]">Technical expertise, marketing strategy, and a rigorous process.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-16 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-stone-50 p-16 rounded-none border-2 border-stone-100 hover:border-mosaic-teal transition-all group relative overflow-hidden shadow-sm"
            >
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-1000">
                <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800" alt="Civil Engineering Site" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 border-2 border-stone-100 text-mosaic-teal flex items-center justify-center mb-10 group-hover:bg-mosaic-teal group-hover:text-white transition-all">
                  <HardHat className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-mosaic-dark mb-6 uppercase tracking-tight">Engineering DNA</h3>
                <p className="text-stone-500 text-lg leading-relaxed font-light">We speak your technical language. Founded by an Engineer-MBA with a profound background in technical recruiting, we verify skills before you ever see a resume.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              transition={{ delay: 0.1 }}
              className="bg-stone-50 p-16 rounded-none border-2 border-stone-100 hover:border-mosaic-teal transition-all group relative overflow-hidden shadow-sm"
            >
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-1000">
                <img src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800" alt="Environmental Engineering" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 border-2 border-stone-100 text-mosaic-teal flex items-center justify-center mb-10 group-hover:bg-mosaic-teal group-hover:text-white transition-all">
                  <Compass className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-mosaic-dark mb-6 uppercase tracking-tight">Strategic Recruiting</h3>
                <p className="text-stone-500 text-lg leading-relaxed font-light">A structured, high-velocity hiring process. AI-powered sourcing meets high-touch human vetting.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              transition={{ delay: 0.2 }}
              className="bg-stone-50 p-16 rounded-none border-2 border-stone-100 hover:border-mosaic-teal transition-all group relative overflow-hidden shadow-sm"
            >
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-1000">
                <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800" alt="Artsy Engineering Blueprints" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 border-2 border-stone-100 text-mosaic-teal flex items-center justify-center mb-10 group-hover:bg-mosaic-teal group-hover:text-white transition-all">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-mosaic-dark mb-6 uppercase tracking-tight">Marketing Savvy</h3>
                <p className="text-stone-500 text-lg leading-relaxed font-light">We don't just post jobs; we position your employer brand to attract passive, top-tier talent.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-40 bg-stone-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-mosaic-dark mb-8 leading-tight">Solutions for <span className="text-mosaic-teal italic">Employers.</span></h2>
            <p className="text-stone-400 text-xs font-black uppercase tracking-[0.4em]">Tailored recruiting models for every stage of growth.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
             <div className="bg-white p-0 rounded-none shadow-sm hover:shadow-2xl transition-all group overflow-hidden border border-stone-100">
                <div className="h-80 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=800" alt="Artsy Steel Structure" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-mosaic-teal/10 group-hover:bg-transparent transition-all duration-700"></div>
                  <div className="absolute top-0 left-0 w-2 h-full bg-mosaic-teal transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </div>
                <div className="p-12 border-b-8 border-mosaic-teal/5 group-hover:border-mosaic-teal transition-colors duration-700">
                  <div className="text-[10px] font-black text-mosaic-teal uppercase tracking-[0.3em] mb-6">Integrated Partnership</div>
                  <h3 className="text-2xl font-serif font-bold text-mosaic-dark mb-6">Fractional Talent Acquisition</h3>
                  <p className="text-stone-500 mb-10 text-lg font-light leading-relaxed">Your integrated recruiting partners. We function as an extension of your team on a subscription basis.</p>
                  <Link to="/employers" className="text-mosaic-teal font-black text-[10px] uppercase tracking-[0.4em] flex items-center group-hover:translate-x-4 transition-transform">
                    View VIP Plans <ArrowRight className="w-4 h-4 ml-4" />
                  </Link>
                </div>
             </div>
             <div className="bg-white p-0 rounded-none shadow-sm hover:shadow-2xl transition-all group overflow-hidden border border-stone-100">
                <div className="h-80 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=800" alt="Artsy Bridge Over Ocean" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-mosaic-teal/20 group-hover:bg-transparent transition-all duration-700"></div>
                  <div className="absolute top-0 left-0 w-2 h-full bg-mosaic-teal transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </div>
                <div className="p-12 border-b-8 border-mosaic-teal/10 group-hover:border-mosaic-teal transition-colors duration-700">
                  <div className="text-[10px] font-black text-mosaic-teal uppercase tracking-[0.3em] mb-6">High Priority Search</div>
                  <h3 className="text-2xl font-serif font-bold text-mosaic-dark mb-6">Exclusive Search (15%)</h3>
                  <p className="text-stone-500 mb-10 text-lg font-light leading-relaxed">A dedicated, priority search for critical roles. Reduced placement fees and faster results.</p>
                  <Link to="/employers" className="text-mosaic-teal font-black text-[10px] uppercase tracking-[0.4em] flex items-center group-hover:translate-x-4 transition-transform">
                    Learn more <ArrowRight className="w-4 h-4 ml-4" />
                  </Link>
                </div>
             </div>
             <div className="bg-white p-0 rounded-none shadow-sm hover:shadow-2xl transition-all group overflow-hidden border border-stone-100">
                <div className="h-80 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1573161158204-747f480376e3?auto=format&fit=crop&q=80&w=800" alt="Professional Partnership Handshake" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-mosaic-teal/20 group-hover:bg-transparent transition-all duration-700"></div>
                  <div className="absolute top-0 left-0 w-2 h-full bg-mosaic-teal transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </div>
                <div className="p-12 border-b-8 border-mosaic-teal/10 group-hover:border-mosaic-teal transition-colors duration-700">
                  <div className="text-[10px] font-black text-mosaic-teal uppercase tracking-[0.3em] mb-6">Success-Based Model</div>
                  <h3 className="text-2xl font-serif font-bold text-mosaic-dark mb-6">Name Your Own Price</h3>
                  <p className="text-stone-500 mb-10 text-lg font-light leading-relaxed">Flexible, success-based recruiting tiers (18% to 25%) designed to fit your budget and urgency.</p>
                  <Link to="/employers" className="text-mosaic-teal font-black text-[10px] uppercase tracking-[0.4em] flex items-center group-hover:translate-x-4 transition-transform">
                    Sign Up Now <ArrowRight className="w-4 h-4 ml-4" />
                  </Link>
                </div>
             </div>
          </div>

          <div className="mt-24 text-center">
             <Link to="/employers">
                <Button className="bg-mosaic-dark hover:bg-mosaic-dark/90 text-white px-12 py-8 rounded-none uppercase tracking-[0.3em] text-xs font-black shadow-2xl">See Launch Specials</Button>
             </Link>
          </div>
        </div>
      </section>

      {/* Elite Selection Section (Founder Spotlight) */}
      <section className="py-40 bg-white relative overflow-hidden border-y border-stone-100">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-mosaic-teal/5 -skew-x-12 transform translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-24 items-center">
             <div className="relative">
                <div className="absolute -inset-10 bg-mosaic-sand -z-10 translate-x-10 -translate-y-10 border border-stone-200"></div>
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000" 
                  alt="Neha Akkaya - Founder" 
                  className="w-full shadow-[50px_50px_0px_0px_#0D9488]"
                  referrerPolicy="no-referrer"
                />
             </div>
             <div>
                <div className="text-[10px] font-black text-mosaic-teal uppercase tracking-[0.4em] mb-8">Strategic Leadership</div>
                <h2 className="text-3xl md:text-[5rem] font-serif font-bold text-mosaic-dark mb-10 leading-tight tracking-tighter">
                  Engineered <br/><span className="text-mosaic-teal italic">Leadership.</span>
                </h2>
                <div className="space-y-8 text-stone-500 text-xl font-light leading-relaxed">
                   <p>
                     Founded by <span className="font-bold text-mosaic-dark italic">Neha Akkaya</span>, an <span className="font-bold text-mosaic-dark italic">Engineer & MBA</span> with 25+ years of experience working with industry leaders like <span className="italic">Cisco, Pratt & Whitney, TRC Companies, DKI Engineering, and FactSet.</span>
                   </p>
                   <p>
                     Mosaic Talent Consulting was built to bridge the gap between technical requirements and strategic growth, evaluating potential through the lens of engineering logic and business scalability.
                   </p>
                </div>
                <div className="mt-16 pt-16 border-t border-stone-100 flex items-center gap-10">
                   <div>
                      <div className="text-lg font-serif font-black text-mosaic-dark">Neha Akkaya</div>
                      <div className="text-[10px] font-black text-mosaic-dark uppercase tracking-widest mt-1">
                        <span className="text-mosaic-teal">Founder & Principal</span> | <span className="text-orange-500">MBA</span>, <span className="text-blue-500">Engineer</span>
                      </div>
                      <a href="https://www.linkedin.com/in/nakkaya/" target="_blank" rel="noopener noreferrer" className="inline-block text-[10px] font-bold text-mosaic-teal uppercase tracking-widest hover:underline mt-4">LinkedIn Profile</a>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Candidate CTA */}
      <section className="py-48 bg-mosaic-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=2000" 
            alt="Atmospheric Earthy Landscape" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-mosaic-dark via-mosaic-dark/80 to-mosaic-dark"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
           <div className="max-w-4xl mx-auto">
             <h2 className="text-4xl md:text-7xl font-serif font-bold mb-12 leading-[1.1] tracking-tight">
               Are you an Engineer, Construction Management or Business Professional?
             </h2>
             <p className="text-stone-400 mb-16 text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto">
               Join our curated Resume Book for free. Get access to hidden job markets and let top engineering and business firms find you.
             </p>
             <Button 
               variant="secondary"
               size="lg"
               onClick={() => setIsCandidateModalOpen(true)}
               className="bg-mosaic-dark text-white hover:bg-mosaic-teal border-none shadow-2xl px-16 py-10 rounded-none text-xs font-black uppercase tracking-[0.3em]"
             >
               Join Candidates Free
             </Button>
           </div>
        </div>
      </section>
    </div>
  );
};
