import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Briefcase, DollarSign, Search, Filter, Star, Zap, 
  UserCheck, Building2, Mail, User, FileText, Check, ShieldCheck,
  ArrowRight, Lock, Sparkles, Users, Trophy, BarChart, Shield
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useAuth } from '../src/components/AuthProvider';
import { db, collection, addDoc, serverTimestamp } from '../src/firebase';
import { OperationType, handleFirestoreError } from '../src/firebase';

export const JobBoard: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    contactName: '',
    contactEmail: '',
    companyName: '',
    hiringVolume: '',
    serviceInterests: [] as string[],
    jobTitle: '',
    location: '',
    jobType: 'full-time',
    salaryRange: '',
    description: '',
    interestedInConsultation: false,
    joinEmailList: true
  });

  useEffect(() => {
    if (user && profile) {
      setFormData(prev => ({
        ...prev,
        contactName: profile.displayName || '',
        contactEmail: profile.email || '',
        companyName: profile.companyName || '',
      }));
    }
  }, [user, profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => {
      const current = prev.serviceInterests;
      const updated = current.includes(service)
        ? current.filter(s => s !== service)
        : [...current, service];
      return { ...prev, serviceInterests: updated };
    });
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Save to Firestore
      await addDoc(collection(db, 'jobs'), {
        employerId: user?.uid || 'anonymous',
        title: formData.jobTitle,
        company: formData.companyName,
        location: formData.location,
        type: formData.jobType,
        salary: formData.salaryRange,
        description: formData.description,
        status: 'active',
        createdAt: serverTimestamp(),
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        hiringVolume: formData.hiringVolume,
        serviceInterests: formData.serviceInterests,
        interestedInConsultation: formData.interestedInConsultation,
        joinEmailList: formData.joinEmailList
      });

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'jobs');
    } finally {
      setLoading(false);
    }
  };

  const generateAIDescription = async () => {
    if (!formData.jobTitle) return;
    setAiLoading(true);
    try {
      if (process.env.API_KEY) {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Write a professional and compelling job description for a ${formData.jobTitle} in the engineering industry. Include key responsibilities and required skills. Keep it under 200 words.`,
          });
          setFormData(prev => ({ ...prev, description: response.text || "" }));
      } else {
          await new Promise(resolve => setTimeout(resolve, 1500));
          setFormData(prev => ({ 
            ...prev, 
            description: `We are seeking a talented ${formData.jobTitle} to join our growing team. The ideal candidate will have strong technical skills, a passion for engineering excellence, and the ability to work collaboratively on complex projects. Key responsibilities include project design, technical analysis, and coordinating with cross-functional teams.` 
          }));
      }
    } catch (e) {
      console.error("AI Error:", e);
    } finally {
      setAiLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white p-12 rounded-[3rem] shadow-2xl border border-stone-100 text-center">
          <div className="w-24 h-24 bg-teal-100 text-mosaic-teal rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <Check className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-mosaic-dark mb-4">Job Posted Successfully!</h1>
          <p className="text-lg text-stone-600 mb-10 leading-relaxed">
            Thank you for posting your opening with <span className="text-mosaic-teal font-bold">Mosaic</span>. Your listing is being reviewed by our team and will be live on the board shortly. 
            We'll also reach out if we have any immediate candidate matches from our database.
          </p>
          <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200 text-left mb-10">
            <h3 className="font-bold text-mosaic-dark mb-4 flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2 text-mosaic-teal" />
              What's Next?
            </h3>
            <ul className="space-y-4 text-stone-600">
              <li className="flex items-start">
                <div className="w-6 h-6 bg-mosaic-teal/10 text-mosaic-teal rounded-full flex items-center justify-center mr-3 mt-0.5 text-xs font-bold">1</div>
                <span><strong>Review:</strong> Our team verifies all job postings to ensure quality for our candidates.</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-mosaic-teal/10 text-mosaic-teal rounded-full flex items-center justify-center mr-3 mt-0.5 text-xs font-bold">2</div>
                <span><strong>Candidate Matching:</strong> We'll cross-reference your job with our private Candidate Database.</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-mosaic-teal/10 text-mosaic-teal rounded-full flex items-center justify-center mr-3 mt-0.5 text-xs font-bold">3</div>
                <span><strong>Promotion:</strong> Featured jobs are sent to our newsletter subscribers instantly.</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-2xl px-8">Post Another Job</Button>
            <Link to={user ? "/employer/dashboard" : "/"}>
              <Button className="rounded-2xl px-12 bg-mosaic-teal hover:bg-teal-700">
                {user ? "Go to Dashboard" : "Return Home"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 bg-stone-50 min-h-screen">
      {/* Launch Promo Strip */}
      <div className="bg-mosaic-teal text-white py-4 text-center text-[10px] font-black tracking-[0.3em] uppercase sticky top-20 z-40 shadow-xl backdrop-blur-md bg-opacity-90">
         🚨 LAUNCH SPECIAL: Post your jobs for FREE 🚨
      </div>

      {/* Hero Section */}
      <section className="relative bg-mosaic-dark text-white py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1518005020251-5183309f061d?auto=format&fit=crop&q=80&w=2000" 
            alt="Detailed Architectural Structure" 
            className="w-full h-full object-cover grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-mosaic-dark via-mosaic-dark/90 to-stone-900"></div>
        </div>
        
        {/* Artsy Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-mosaic-teal/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-mosaic-teal/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {!user && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Link to="/employer/login">
                <Button variant="outline" className="text-white border-white/20 hover:bg-white/5 rounded-none px-10 py-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:tracking-[0.6em]">
                  Employer Login
                </Button>
              </Link>
            </motion.div>
          )}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center text-mosaic-teal px-10 py-4 rounded-none text-[10px] font-black uppercase tracking-[0.25em] mb-8 border border-mosaic-teal/20 backdrop-blur-2xl bg-white/5 shadow-2xl"
          >
            <Lock className="w-4 h-4 mr-4" />
            Fractional Talent Acquisition
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-serif font-bold mb-8 tracking-tight leading-tight text-white">
            Post a Job. <br/>
            <span className="text-mosaic-teal italic relative">
              Hire Better.
              <svg className="absolute -bottom-4 left-0 w-full h-4 text-mosaic-teal/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </span>
          </h1>
          <p className="text-stone-400 mb-0 max-w-3xl mx-auto text-xl md:text-3xl font-light leading-relaxed tracking-tight">
            Join the industry's most targeted engineering network. Post for free and let our <span className="text-white font-medium">technical precision</span> find your next top hire.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-32 px-4 relative bg-stone-50">
        <div className="max-w-5xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex justify-center mb-20">
            <div className="flex items-center gap-6">
              <div className={`w-14 h-14 rounded-none flex items-center justify-center font-black text-lg transition-all duration-500 ${step >= 1 ? 'bg-mosaic-teal text-white shadow-2xl' : 'bg-stone-200 text-stone-400'}`}>01</div>
              <div className={`w-24 h-px transition-all duration-500 ${step >= 2 ? 'bg-mosaic-teal' : 'bg-stone-200'}`}></div>
              <div className={`w-14 h-14 rounded-none flex items-center justify-center font-black text-lg transition-all duration-500 ${step >= 2 ? 'bg-mosaic-teal text-white shadow-2xl' : 'bg-stone-200 text-stone-400'}`}>02</div>
            </div>
          </div>

          <div className="bg-white rounded-none shadow-2xl border border-stone-100 overflow-hidden relative">
            <div className="h-2 bg-mosaic-teal"></div>
            
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.form 
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onSubmit={nextStep} 
                  className="p-12 md:p-24 space-y-16"
                >
                  <div className="text-center space-y-6 mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-mosaic-dark">Company <span className="text-mosaic-teal italic">Profile.</span></h2>
                    <p className="text-stone-500 font-light text-lg">Tell us about your organization to get started.</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Full Name</label>
                      <input 
                        required
                        type="text" 
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark placeholder:text-stone-300"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Work Email</label>
                      <input 
                        required
                        type="email" 
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark placeholder:text-stone-300"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Company Name</label>
                      <input 
                        required
                        type="text" 
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark placeholder:text-stone-300"
                        placeholder="Engineering Solutions Inc."
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Hiring Volume</label>
                      <select 
                        required
                        name="hiringVolume"
                        value={formData.hiringVolume}
                        onChange={handleChange}
                        className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark appearance-none cursor-pointer"
                      >
                        <option value="">Select volume...</option>
                        <option value="1">1 Position</option>
                        <option value="2-5">2–5 Positions</option>
                        <option value="6-10">6–10 Positions</option>
                        <option value="11+">11+ Positions</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Services of Interest</label>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {[
                        { id: 'free-post', label: 'Free Job Posting', desc: 'Launch Special' },
                        { id: 'fractional', label: 'Fractional TA', desc: 'VIP Support' },
                        { id: 'exclusive', label: 'Exclusive Search', desc: 'High Priority (15%)' },
                        { id: 'contingency', label: 'Contingency', desc: 'Name Your Price (18-25%)' }
                      ].map((service) => (
                        <div 
                          key={service.id}
                          onClick={() => handleServiceToggle(service.id)}
                          className={`p-8 border-2 cursor-pointer transition-all ${
                            formData.serviceInterests.includes(service.id)
                              ? 'border-mosaic-teal bg-mosaic-teal/5'
                              : 'border-stone-100 hover:border-stone-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-serif font-bold text-lg text-mosaic-dark">{service.label}</span>
                            <div className={`w-6 h-6 rounded-none border-2 flex items-center justify-center transition-all ${
                              formData.serviceInterests.includes(service.id)
                                ? 'border-mosaic-teal bg-mosaic-teal text-white'
                                : 'border-stone-300'
                            }`}>
                              {formData.serviceInterests.includes(service.id) && <Check className="w-4 h-4" />}
                            </div>
                          </div>
                          <p className="text-[10px] text-stone-400 uppercase tracking-widest font-black">{service.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-12">
                    <Button 
                      type="submit" 
                      className="w-full py-10 rounded-none bg-mosaic-dark hover:bg-stone-800 text-white uppercase tracking-[0.3em] text-xs font-black shadow-2xl transition-all hover:scale-[1.01]"
                    >
                      Continue to Job Details <ArrowRight className="ml-4 w-5 h-5" />
                    </Button>
                  </div>
                </motion.form>
              ) : (
                <motion.form 
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onSubmit={handleSubmit} 
                  className="p-12 md:p-24 space-y-16"
                >
                  <div className="text-center space-y-6 mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-mosaic-dark">Job <span className="text-mosaic-teal italic">Details.</span></h2>
                    <p className="text-stone-500 font-light text-lg">Define the role you're looking to fill.</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Job Title</label>
                      <input 
                        required
                        type="text" 
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark placeholder:text-stone-300"
                        placeholder="e.g. Senior Structural Engineer"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Location</label>
                      <input 
                        required
                        type="text" 
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark placeholder:text-stone-300"
                        placeholder="e.g. Denver, CO (or Remote)"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Job Type</label>
                      <select 
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                        className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark appearance-none cursor-pointer"
                      >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                        <option value="remote">Remote</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Salary Range</label>
                      <input 
                        type="text" 
                        name="salaryRange"
                        value={formData.salaryRange}
                        onChange={handleChange}
                        className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-lg font-light text-mosaic-dark placeholder:text-stone-300"
                        placeholder="e.g. $120k - $150k"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-end mb-4">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Job Description</label>
                      <button 
                        type="button"
                        onClick={generateAIDescription}
                        disabled={aiLoading || !formData.jobTitle}
                        className="flex items-center text-[10px] font-black text-mosaic-teal uppercase tracking-widest hover:text-mosaic-teal/80 disabled:opacity-50 transition-colors"
                      >
                        <Sparkles className={`w-4 h-4 mr-2 ${aiLoading ? 'animate-spin' : ''}`} />
                        {aiLoading ? 'Generating...' : 'Generate with AI'}
                      </button>
                    </div>
                    <textarea 
                      required
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={10}
                      className="w-full p-8 bg-stone-50 border-2 border-stone-100 focus:border-mosaic-teal outline-none transition-all text-sm leading-relaxed resize-none font-light"
                      placeholder="Describe the role, responsibilities, and requirements..."
                    ></textarea>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-8 pt-12">
                    <Button 
                      type="button"
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="flex-1 py-8 rounded-none border-stone-200 uppercase tracking-widest text-[10px] font-black"
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="flex-[2] py-10 rounded-none bg-mosaic-teal hover:bg-teal-700 text-white uppercase tracking-widest text-[10px] font-black shadow-2xl"
                    >
                      {loading ? 'Processing...' : 'Post Job for Free'}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-40 bg-white border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-mosaic-dark mb-8 leading-tight">How it <span className="text-mosaic-teal italic">Works.</span></h2>
            <p className="text-stone-400 text-xs font-black uppercase tracking-[0.4em]">Engineering your hiring success in 3 steps.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-24">
            {[
              { 
                step: '01', 
                title: 'Post Your Role', 
                desc: 'Fill out our optimized job form. Use our AI assistant to craft a compelling description in seconds.',
                icon: <FileText className="w-12 h-12 text-mosaic-teal" />
              },
              { 
                step: '02', 
                title: 'Direct Sourcing', 
                desc: 'Work directly with our recruiting team to find the right candidate from our specialized database.',
                icon: <Sparkles className="w-12 h-12 text-mosaic-teal" />
              },
              { 
                step: '03', 
                title: 'Get Candidates', 
                desc: 'Receive a curated list of top-tier matches directly in your inbox. No generic resumes, just talent.',
                icon: <UserCheck className="w-12 h-12 text-mosaic-teal" />
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="text-[12rem] font-black text-stone-50 absolute -top-32 -left-8 z-0 pointer-events-none">{item.step}</div>
                <div className="relative z-10">
                  <div className="mb-10">{item.icon}</div>
                  <h3 className="text-2xl font-serif font-bold text-mosaic-dark mb-6">{item.title}</h3>
                  <p className="text-stone-500 leading-relaxed font-light text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-40 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="relative">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-mosaic-teal/5 rounded-full blur-3xl"></div>
              <h2 className="text-6xl md:text-8xl font-serif font-bold text-mosaic-dark mb-12 leading-tight tracking-tighter">
                Why Industry Leaders <br/>
                <span className="text-mosaic-teal italic">Trust Mosaic.</span>
              </h2>
              <p className="text-stone-500 text-xl mb-16 leading-relaxed font-light max-w-xl">
                We aren't just a job board. We are a specialized engineering talent consultancy that uses technology to bridge the gap between top firms and elite talent.
              </p>
              
              <div className="space-y-12">
                {[
                  { t: 'Vetted Talent Pool', d: 'Every candidate in our database is manually reviewed for technical proficiency.' },
                  { t: 'Industry Specific', d: 'Focused exclusively on civil, structural, and environmental engineering.' },
                  { t: 'Zero Risk Posting', d: 'Post for free during our launch phase. No hidden fees or commitments.' }
                ].map(item => (
                  <div key={item.t} className="flex items-start group">
                    <div className="w-16 h-16 border-2 border-stone-200 flex items-center justify-center mr-8 group-hover:border-mosaic-teal group-hover:bg-mosaic-teal group-hover:text-white transition-all duration-500">
                      <Check className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-mosaic-dark mb-2">{item.t}</h4>
                      <p className="text-stone-500 text-sm leading-relaxed font-light">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-mosaic-dark p-20 rounded-none text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-mosaic-teal/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-8 mb-20">
                    <div className="w-20 h-20 border border-white/10 flex items-center justify-center backdrop-blur-md">
                      <BarChart className="w-10 h-10 text-mosaic-teal" />
                    </div>
                    <div>
                      <div className="text-6xl font-serif font-bold tracking-tighter">Vetted</div>
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-500">Talent Database</div>
                    </div>
                  </div>
                  
                  <div className="space-y-12">
                    <div className="p-10 border border-white/10 hover:bg-white/5 transition-all">
                      <h4 className="text-xl font-serif font-bold flex items-center">
                        <Zap className="w-6 h-6 mr-4 text-mosaic-teal" />
                        Fast-Track Hiring
                      </h4>
                    </div>
                    
                    <div className="p-10 border border-white/10 hover:bg-white/5 transition-all">
                      <h4 className="text-xl font-serif font-bold flex items-center">
                        <Trophy className="w-6 h-6 mr-4 text-mosaic-teal" />
                        Quality Guarantee
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
