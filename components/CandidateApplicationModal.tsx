
import React, { useState, useEffect } from 'react';
import { X, Upload, Video, Check, Lock, User, FileText, Mail } from 'lucide-react';
import { Button } from './Button';
import { Job, CandidateProfile } from '../types';

interface CandidateApplicationModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CandidateApplicationModal: React.FC<CandidateApplicationModalProps> = ({ job, isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Form, 2: Video, 3: Success
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [videoMode, setVideoMode] = useState<'none' | 'upload' | 'record'>('none');
  const [createAccount, setCreateAccount] = useState(true);
  const [password, setPassword] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(['newsletter', 'resume_book']); // Default resume book checked for general signup
  
  // Form State
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
    interestedServices: [],
    timeline: 'asap',
    idealJobTitles: '',
    preferredLocations: '',
    freeConsultation: false,
    joinEmailList: true
  });

  useEffect(() => {
    // Check for simulated candidate session
    const storedProfile = sessionStorage.getItem('mosaic_candidate_profile');
    if (storedProfile) {
      setIsLoggedIn(true);
      const parsed = JSON.parse(storedProfile);
      setFormData(prev => ({ ...prev, ...parsed }));
      if (parsed.interestedServices) {
          setSelectedServices(parsed.interestedServices);
      }
      setCreateAccount(false); // Already has account
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = () => {
    // Simulate saving account if checked
    const finalData = { ...formData, interestedServices: selectedServices };
    
    if ((createAccount || isLoggedIn) && !sessionStorage.getItem('mosaic_candidate_profile')) {
      sessionStorage.setItem('mosaic_candidate_profile', JSON.stringify(finalData));
      // Also set a flag that they are logged in now
      sessionStorage.setItem('mosaic_candidate_auth', 'true');
    }
    setStep(3);
  };

  const resetAndClose = () => {
    setStep(1);
    setVideoMode('none');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-mosaic-dark">
                {job ? `Apply for ${job.title}` : 'Join the Resume Book'}
            </h2>
            <p className="text-sm text-slate-500">
                {job ? `${job.company} • ${job.location}` : 'Create your profile to get scouted by top firms.'}
            </p>
          </div>
          <button onClick={resetAndClose} className="text-slate-400 hover:text-mosaic-dark">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1">
            <div 
                className="bg-mosaic-teal h-1 transition-all duration-300" 
                style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
            ></div>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-6">
              
              {isLoggedIn ? (
                 <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 flex items-start gap-3">
                    <div className="bg-white p-2 rounded-full text-mosaic-teal shadow-sm">
                        <User className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-mosaic-teal text-sm">Welcome back, {formData.firstName}!</h3>
                        <p className="text-xs text-slate-600 mt-1">Your profile details have been pre-filled. Review them below or proceed to the video step.</p>
                    </div>
                 </div>
              ) : (
                 <div className="bg-slate-50 p-4 rounded text-sm text-slate-600 border border-slate-200 mb-4">
                    <span className="font-bold text-mosaic-dark">Fast Track:</span> Create a secure sign-in below to enable 1-Click Apply for future roles.
                 </div>
              )}

               {/* Services Selection - MOVED TO TOP */}
               <div className="bg-teal-50/50 p-4 rounded-lg border border-teal-100">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-3">I'm interested in:</label>
                  <div className="space-y-3">
                      <label className="flex items-start space-x-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={selectedServices.includes('newsletter')} 
                            onChange={() => toggleService('newsletter')}
                            className="mt-1 h-4 w-4 rounded text-mosaic-teal border-slate-300 focus:ring-mosaic-teal" 
                          />
                          <span className="text-sm text-slate-700"><strong>Mosaic Newsletter</strong> (Job Alerts & Tips)</span>
                      </label>
                      <label className="flex items-start space-x-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={selectedServices.includes('resume_book')} 
                            onChange={() => toggleService('resume_book')}
                            className="mt-1 h-4 w-4 rounded text-mosaic-teal border-slate-300 focus:ring-mosaic-teal" 
                          />
                          <span className="text-sm text-slate-700"><strong>Free Resume Book</strong> (Visible to Employers)</span>
                      </label>
                       <label className="flex items-start space-x-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={selectedServices.includes('featured')} 
                            onChange={() => toggleService('featured')}
                            className="mt-1 h-4 w-4 rounded text-mosaic-teal border-slate-300 focus:ring-mosaic-teal" 
                          />
                          <span className="text-sm text-slate-700"><strong>Featured Candidate Upgrade</strong> ($99)</span>
                      </label>
                      <label className="flex items-start space-x-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={selectedServices.includes('career_boost')} 
                            onChange={() => toggleService('career_boost')}
                            className="mt-1 h-4 w-4 rounded text-mosaic-teal border-slate-300 focus:ring-mosaic-teal" 
                          />
                          <span className="text-sm text-slate-700"><strong>Career Boost</strong> ($150 Launch Special)</span>
                      </label>
                       <label className="flex items-start space-x-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={selectedServices.includes('professional_brand')} 
                            onChange={() => toggleService('professional_brand')}
                            className="mt-1 h-4 w-4 rounded text-mosaic-teal border-slate-300 focus:ring-mosaic-teal" 
                          />
                          <span className="text-sm text-slate-700"><strong>Professional Brand</strong> ($300 Launch Special)</span>
                      </label>
                  </div>
               </div>

              {/* Personal Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">First Name</label>
                    <input name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Last Name</label>
                    <input name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none" />
                </div>
              </div>

              <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Location</label>
                  <input name="location" value={formData.location} onChange={handleChange} placeholder="City, State" required className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Experience</label>
                    <select name="experience" value={formData.experience} onChange={handleChange} className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none bg-white">
                        <option value="">Select...</option>
                        <option value="0-2">0-2 Years</option>
                        <option value="3-5">3-5 Years</option>
                        <option value="5-10">5-10 Years</option>
                        <option value="10+">10+ Years</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Education</label>
                    <select name="degree" value={formData.degree} onChange={handleChange} className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none bg-white">
                        <option value="">Select...</option>
                        <option value="BS">Bachelor's</option>
                        <option value="MS">Master's</option>
                        <option value="PhD">PhD</option>
                        <option value="None">Other</option>
                    </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">How soon are you looking?</label>
                    <select name="timeline" value={formData.timeline} onChange={handleChange} className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none bg-white">
                        <option value="asap">ASAP</option>
                        <option value="1-3">Within 1-3 months</option>
                        <option value="3-6">3-6 months</option>
                        <option value="browsing">Just browsing</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Visa Sponsorship?</label>
                    <select name="visaNeeded" value={formData.visaNeeded} onChange={handleChange} className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none bg-white">
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                    </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">PE License?</label>
                    <select name="hasPE" value={formData.hasPE} onChange={handleChange} className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none bg-white">
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                    </select>
                </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">EIT?</label>
                    <select name="hasEIT" value={formData.hasEIT} onChange={handleChange} className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none bg-white">
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                    </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ideal Job Titles</label>
                    <input name="idealJobTitles" value={formData.idealJobTitles} onChange={handleChange} placeholder="e.g. Senior Project Manager" className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Preferred Locations</label>
                    <input name="preferredLocations" value={formData.preferredLocations} onChange={handleChange} placeholder="e.g. Denver, CO; Remote" className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none" />
                </div>
              </div>

               {/* Resume & Links */}
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">LinkedIn URL</label>
                 <input type="url" name="linkedIn" value={formData.linkedIn} onChange={handleChange} className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none" placeholder="https://linkedin.com/in/..." />
               </div>
               
               <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                  <p className="text-sm text-slate-600 font-medium">Upload Resume (PDF/Docx)</p>
                  <p className="text-xs text-slate-400 mt-1">Drag & drop or click to browse</p>
               </div>

               <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="freeConsultation"
                      checked={formData.freeConsultation}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 rounded text-mosaic-teal border-slate-300 focus:ring-mosaic-teal" 
                    />
                    <span className="text-sm text-slate-700">
                      <strong>Free Consultation?</strong> We offer career strategy sessions for top candidates at <strong>NO charge</strong>.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="joinEmailList"
                      checked={formData.joinEmailList}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 rounded text-mosaic-teal border-slate-300 focus:ring-mosaic-teal" 
                    />
                    <span className="text-sm text-slate-700">
                      Join our email list for job searching tips and open positions.
                    </span>
                  </label>
               </div>

               {/* Account Creation / Fast Track */}
               {!isLoggedIn && (
                   <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <label className="flex items-center gap-3 cursor-pointer mb-4">
                            <input 
                                type="checkbox" 
                                checked={createAccount} 
                                onChange={(e) => setCreateAccount(e.target.checked)}
                                className="w-5 h-5 text-mosaic-teal rounded focus:ring-mosaic-teal" 
                                />
                            <div>
                                <span className="block text-sm font-bold text-slate-800">Create Sign-In (Fast Track Apply)</span>
                                <span className="block text-xs text-slate-500">Save time on future applications.</span>
                            </div>
                        </label>
                        
                        {createAccount && (
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Create Password</label>
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none"
                                    placeholder="Min. 8 characters"
                                />
                            </div>
                        )}
                   </div>
               )}

               <div className="pt-2">
                   <Button type="submit" className="w-full" size="lg">Next: Add Video Cover Letter</Button>
               </div>
            </form>
          )}

          {step === 2 && (
             <div className="text-center py-4">
                <div className="w-16 h-16 bg-teal-100 text-mosaic-teal rounded-full flex items-center justify-center mx-auto mb-6">
                    <Video className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-mosaic-dark mb-2">Stand Out with Video</h3>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                    Tell {job ? 'the hiring manager' : 'us'} why you're the perfect fit{job ? ` for this ${job.title} role` : ''}. 
                    <span className="block text-sm text-slate-500 mt-2 italic">"Hi, I'm {formData.firstName || 'Name'} and I'm interested because..."</span>
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <button 
                        onClick={() => setVideoMode('record')}
                        className={`p-6 border-2 rounded-xl transition-all ${videoMode === 'record' ? 'border-mosaic-teal bg-teal-50' : 'border-slate-200 hover:border-mosaic-teal'}`}
                    >
                        <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                        </div>
                        <span className="block font-bold text-slate-800">Record Now</span>
                        <span className="text-xs text-slate-500">Use camera (60s max)</span>
                    </button>

                    <button 
                        onClick={() => setVideoMode('upload')}
                        className={`p-6 border-2 rounded-xl transition-all ${videoMode === 'upload' ? 'border-mosaic-teal bg-teal-50' : 'border-slate-200 hover:border-mosaic-teal'}`}
                    >
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Upload className="w-5 h-5" />
                        </div>
                        <span className="block font-bold text-slate-800">Upload Video</span>
                        <span className="text-xs text-slate-500">MP4, MOV (50MB max)</span>
                    </button>
                </div>

                {videoMode === 'record' && (
                    <div className="bg-black rounded-xl aspect-video mb-6 flex items-center justify-center relative overflow-hidden">
                        <p className="text-white text-sm">Camera Permission Simulated...</p>
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                            <button className="w-12 h-12 bg-red-600 rounded-full border-4 border-white hover:scale-110 transition-transform"></button>
                        </div>
                    </div>
                )}

                {videoMode === 'upload' && (
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 mb-6 bg-slate-50">
                        <p className="text-sm text-slate-600 font-bold">Drop video file here</p>
                    </div>
                )}

                <div className="space-y-3">
                    <Button onClick={handleSubmit} className="w-full" size="lg">
                        {job ? 'Submit Application' : 'Create Profile'}
                    </Button>
                    <button onClick={handleSubmit} className="text-sm text-slate-500 hover:text-slate-800">Skip Video & Submit</button>
                </div>
             </div>
          )}

          {step === 3 && (
             <div className="text-center py-12">
                 <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <Check className="w-10 h-10" />
                 </div>
                 <h3 className="text-3xl font-bold text-mosaic-dark mb-2">
                    {job ? 'Application Sent!' : 'Profile Created!'}
                 </h3>
                 <p className="text-slate-600 mb-8">
                    {job ? `Your application for ${job.title} has been submitted to ${job.company}.` : 'You have successfully joined the Mosaic Talent network.'}
                 </p>
                 <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 max-w-sm mx-auto mb-8">
                    <h4 className="font-bold text-slate-800 mb-2">What happens next?</h4>
                    <ul className="text-left text-sm text-slate-600 space-y-2">
                        <li className="flex items-start"><Check className="w-4 h-4 text-green-500 mr-2 mt-0.5"/> Mosaic reviews your profile</li>
                        <li className="flex items-start"><Check className="w-4 h-4 text-green-500 mr-2 mt-0.5"/> {job ? 'Hiring Manager receives shortlist' : 'We match you with active roles'}</li>
                        <li className="flex items-start"><Check className="w-4 h-4 text-green-500 mr-2 mt-0.5"/> You'll be notified for next steps</li>
                    </ul>
                 </div>
                 <Button onClick={resetAndClose}>{job ? 'Back to Job Board' : 'Close'}</Button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
