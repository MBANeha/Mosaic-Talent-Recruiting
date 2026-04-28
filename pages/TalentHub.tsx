import React, { useState } from 'react';
import { Button } from '../components/Button';
import { HardHat, Lock, Users, ArrowRight, Upload, Check, Mail, FileText, User, MapPin, Briefcase, GraduationCap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CandidateProfile } from '../types';

export const TalentHub: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1); // 1: Form, 2: Success
  const [formData, setFormData] = useState<CandidateProfile>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    degree: '',
    hasPE: 'no',
    hasEIT: 'no',
    visaNeeded: 'no',
    linkedIn: '',
    timeline: 'asap',
    idealJobTitles: '',
    preferredLocations: '',
    preferredSalaryRange: '',
    freeConsultation: false,
    joinEmailList: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    console.log('Form submitted:', formData);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (step === 2) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white p-12 rounded-[2.5rem] shadow-2xl border border-stone-100 text-center">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <Check className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-mosaic-dark mb-4">You're in the Database!</h1>
          <p className="text-lg text-stone-600 mb-10 leading-relaxed">
            Your profile has been successfully added to the Mosaic Candidate Database. 
            Our team will review your details and reach out if we have a match or to schedule your free consultation.
          </p>
          <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200 text-left mb-10">
            <h3 className="font-bold text-mosaic-dark mb-4 flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2 text-mosaic-teal" />
              What's Next?
            </h3>
            <ul className="space-y-4 text-stone-600">
              <li className="flex items-start">
                <div className="w-6 h-6 bg-mosaic-teal/10 text-mosaic-teal rounded-full flex items-center justify-center mr-3 mt-0.5 text-xs font-bold">1</div>
                <span><strong>Profile Review:</strong> Our technical recruiters will verify your PE/EIT status and experience.</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-mosaic-teal/10 text-mosaic-teal rounded-full flex items-center justify-center mr-3 mt-0.5 text-xs font-bold">2</div>
                <span><strong>Employer Visibility:</strong> Top engineering firms will now be able to scout your profile.</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-mosaic-teal/10 text-mosaic-teal rounded-full flex items-center justify-center mr-3 mt-0.5 text-xs font-bold">3</div>
                <span><strong>Consultation:</strong> If you opted in, we'll contact you to schedule your career strategy session.</span>
              </li>
            </ul>
          </div>
          <Link to="/">
            <Button size="lg" className="rounded-2xl px-12">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-stone-50">
      {/* Hero Section - Bold & Earthy */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden bg-mosaic-dark">
        {/* Earthy Background Image */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=2070" 
            alt="Artsy Environmental Engineering Landscape" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-mosaic-dark via-mosaic-dark/80 to-stone-50"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center text-mosaic-teal px-8 py-3 rounded-none text-[10px] font-black uppercase tracking-[0.2em] mb-10 border border-mosaic-teal/30 backdrop-blur-xl">
            100% Free for Candidates
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-10 tracking-tight leading-tight">
            Your Career, <br/>
            <span className="text-mosaic-teal italic">Engineered.</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-400 max-w-3xl mx-auto leading-relaxed font-light">
            We don't just find you a job. We help you navigate the complex landscape of <span className="text-white font-medium">civil, environmental, and construction engineering</span> careers.
          </p>
        </div>
      </section>

      {/* Main Form Container - Centered and Bold */}
      <section className="py-24 px-4 relative -mt-32">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-none shadow-2xl border border-stone-100 overflow-hidden relative">
            {/* Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-mosaic-teal"></div>
            
            <div className="p-12 md:p-24">
              <div className="grid lg:grid-cols-12 gap-24">
                {/* Left Side: Value Prop */}
                <div className="lg:col-span-4 space-y-12">
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-mosaic-dark mb-6">Why <span className="text-mosaic-teal italic">Join?</span></h3>
                    <p className="text-stone-500 text-lg leading-relaxed font-light">
                      We bridge the gap between top talent and the industry's most prestigious firms.
                    </p>
                  </div>

                  <div className="space-y-10">
                    {[
                      { icon: <ShieldCheck className="w-6 h-6" />, title: 'Direct Access', desc: 'Skip the HR black hole. Get seen by decision makers.' },
                      { icon: <Users className="w-6 h-6" />, title: 'Free Consultation', desc: 'Career coaching for top-tier candidates.' },
                      { icon: <Mail className="w-6 h-6" />, title: 'Exclusive Alerts', desc: 'Be the first to know about unlisted roles.' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-6 group">
                        <div className="w-14 h-14 border-2 border-stone-100 text-mosaic-teal flex items-center justify-center shrink-0 group-hover:bg-mosaic-teal group-hover:text-white transition-all">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-mosaic-dark text-lg mb-1">{item.title}</h4>
                          <p className="text-sm text-stone-500 font-light leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-12 border-t border-stone-100">
                    <div className="bg-stone-50 p-10 rounded-none border border-stone-100">
                      <p className="text-lg italic text-stone-600 leading-relaxed font-light">
                        "Mosaic helped me land a Senior PE role with a 25% salary increase. The process was seamless and completely free."
                      </p>
                      <p className="text-[10px] font-black text-mosaic-dark mt-6 uppercase tracking-[0.2em]">— Sarah M., Senior Civil Engineer</p>
                    </div>
                  </div>
                </div>

                {/* Right Side: The Form */}
                <div className="lg:col-span-8">
                  <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Primary Discipline</label>
                        <select 
                          name="discipline" 
                          className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark appearance-none cursor-pointer"
                        >
                          <option value="">Select Discipline...</option>
                          <option value="civil">Civil Engineering</option>
                          <option value="environmental">Environmental Engineering</option>
                          <option value="construction">Construction Management</option>
                          <option value="structural">Structural Engineering</option>
                          <option value="transportation">Transportation Engineering</option>
                          <option value="water">Water Resources</option>
                          <option value="other">Other Engineering/Business</option>
                        </select>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Years of Experience</label>
                        <select 
                          name="experience" 
                          value={formData.experience}
                          onChange={handleChange}
                          className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark appearance-none cursor-pointer"
                        >
                          <option value="">Select Experience...</option>
                          <option value="0-2">0-2 Years (Entry)</option>
                          <option value="3-5">3-5 Years (Junior)</option>
                          <option value="6-10">6-10 Years (Mid-Level)</option>
                          <option value="10-15">10-15 Years (Senior)</option>
                          <option value="15+">15+ Years (Principal/Executive)</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">First Name</label>
                        <input 
                          type="text" 
                          name="firstName" 
                          required 
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark placeholder:text-stone-300"
                          placeholder="Jane"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Last Name</label>
                        <input 
                          type="text" 
                          name="lastName" 
                          required 
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark placeholder:text-stone-300"
                          placeholder="Engineer"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Email Address</label>
                        <input 
                          type="email" 
                          name="email" 
                          required 
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark placeholder:text-stone-300"
                          placeholder="jane@engineering.com"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          required 
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark placeholder:text-stone-300"
                          placeholder="(555) 000-0000"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Upload Resume</label>
                      <div className="relative group">
                        <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="border-2 border-dashed border-stone-200 rounded-none p-12 text-center group-hover:bg-stone-50 group-hover:border-mosaic-teal transition-all">
                          <Upload className="w-10 h-10 mx-auto text-stone-300 mb-4 group-hover:text-mosaic-teal transition-all" />
                          <p className="text-lg font-serif font-bold text-mosaic-dark">Drop your resume here or click to browse</p>
                          <p className="text-xs text-stone-400 mt-2 uppercase tracking-widest">Maximum file size: 10MB</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Availability Timeline</label>
                        <select 
                          name="timeline" 
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark appearance-none cursor-pointer"
                        >
                          <option value="asap">ASAP</option>
                          <option value="1-3">Within 1-3 months</option>
                          <option value="3-6">3-6 months</option>
                          <option value="browsing">Just browsing</option>
                        </select>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Visa Sponsorship Required?</label>
                        <select 
                          name="visaNeeded" 
                          value={formData.visaNeeded}
                          onChange={handleChange}
                          className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark appearance-none cursor-pointer"
                        >
                          <option value="no">No, I am authorized to work</option>
                          <option value="yes">Yes, now or in the future</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Professional Engineer (PE)?</label>
                        <select 
                          name="hasPE" 
                          value={formData.hasPE}
                          onChange={handleChange}
                          className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark appearance-none cursor-pointer"
                        >
                          <option value="no">No</option>
                          <option value="yes">Yes, I have a PE</option>
                          <option value="eit">No, but I have an EIT</option>
                        </select>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Highest Education Level</label>
                        <select 
                          name="degree" 
                          value={formData.degree}
                          onChange={handleChange}
                          className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark appearance-none cursor-pointer"
                        >
                          <option value="">Select...</option>
                          <option value="BS">Bachelor's Degree</option>
                          <option value="MS">Master's Degree</option>
                          <option value="PhD">PhD</option>
                          <option value="Other">Other Professional Degree</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-12">
                      <Button type="submit" className="w-full py-10 rounded-none bg-mosaic-teal hover:bg-teal-700 text-white uppercase tracking-[0.3em] text-xs font-black shadow-2xl transition-all hover:scale-[1.01]">
                        Unlock Your Career Potential
                      </Button>
                      
                      <p className="text-center text-[10px] text-stone-400 uppercase tracking-[0.2em] mt-8 font-black">
                        By joining, you agree to our privacy policy and terms of service.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Employer Section - Bold Earthy Transition */}
      <section className="py-40 px-4 bg-stone-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-mosaic-dark mb-8 leading-tight">The Mosaic <span className="text-mosaic-teal italic">Standard.</span></h2>
            <p className="text-stone-400 text-xs font-black uppercase tracking-[0.4em]">We don't just place engineers; we specialize in civil, environmental, and construction management talent.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-40">
            {[
              {
                icon: <HardHat className="w-8 h-8" />,
                title: "Construction Management",
                desc: "Specialized placement for PMs, Supers, and Estimators in commercial and infrastructure sectors."
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "Vetted Firms Only",
                desc: "We only partner with firms that value their people as much as their projects."
              },
              {
                icon: <Lock className="w-8 h-8" />,
                title: "Privacy First",
                desc: "Your data is encrypted and only shared with your explicit consent."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-12 border-2 border-stone-100 hover:border-mosaic-teal transition-all group">
                <div className="w-16 h-16 border-2 border-stone-100 text-mosaic-teal flex items-center justify-center mb-10 group-hover:bg-mosaic-teal group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-serif font-bold text-mosaic-dark mb-6">{item.title}</h4>
                <p className="text-stone-500 text-lg font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-mosaic-dark p-20 md:p-32 rounded-none text-center relative overflow-hidden shadow-2xl">
            {/* Earthy Background for CTA */}
            <div className="absolute inset-0 opacity-20">
              <img 
                src="https://images.unsplash.com/photo-1517089534706-33c2ecbebd91?auto=format&fit=crop&q=80&w=2000" 
                alt="Engineering Abstract" 
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-mosaic-dark via-mosaic-dark/80 to-mosaic-dark"></div>
            
            <div className="relative z-10">
              <h3 className="text-5xl md:text-8xl font-serif font-bold text-white mb-12 leading-tight tracking-tighter">Hiring Engineering <br/><span className="text-mosaic-teal italic">Talent?</span></h3>
              <p className="text-stone-400 max-w-2xl mx-auto mb-16 text-xl font-light leading-relaxed">
                Gain exclusive access to our vetted Candidate Database and stop competing for the same talent on LinkedIn.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-8">
                <Link to="/employer/signup">
                  <Button className="bg-mosaic-teal hover:bg-teal-700 text-white px-12 py-8 rounded-none uppercase tracking-widest text-xs font-black shadow-2xl">Request Access</Button>
                </Link>
                <Link to="/employers">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-12 py-8 rounded-none uppercase tracking-widest text-xs font-black">Employer Solutions</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
};
