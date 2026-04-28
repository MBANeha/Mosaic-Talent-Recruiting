
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { GoogleGenAI } from "@google/genai";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  CreditCard, 
  Settings, 
  Plus, 
  Search, 
  LogOut, 
  Eye, 
  Lock, 
  CheckCircle, 
  Zap, 
  MapPin, 
  Clock, 
  DollarSign,
  MoreHorizontal,
  Gift,
  Copy,
  ArrowRight,
  Building2,
  Download,
  FileText
} from 'lucide-react';
import { MOCK_JOBS, MOCK_SOURCED_CANDIDATES } from '../constants';
import { Job, SourcedCandidate } from '../types';
import { useAuth } from '../src/components/AuthProvider';
import { db, collection, query, where, onSnapshot, addDoc, serverTimestamp, updateDoc, doc } from '../src/firebase';
import { OperationType, handleFirestoreError } from '../src/firebase';

// --- Sidebar Component ---
const Sidebar = ({ active, setActive, onLogout }: { active: string, setActive: (v: string) => void, onLogout: () => void }) => (
  <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 z-40">
    <div className="p-6 flex items-center border-b border-slate-800">
       <div className="w-8 h-8 bg-mosaic-teal rounded-lg flex items-center justify-center mr-3">
          <span className="text-white font-bold text-lg">M</span>
       </div>
       <span className="font-serif font-bold text-white tracking-wide">EMPLOYER</span>
    </div>
    
    <div className="flex-1 py-6 px-3 space-y-1">
        {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'jobs', label: 'My Jobs', icon: Briefcase },
            { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
            { id: 'profile', label: 'Company Profile', icon: Settings },
        ].map((item) => (
            <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`w-full flex items-center px-3 py-3 rounded-lg transition-colors ${active === item.id ? 'bg-mosaic-teal text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="text-sm font-medium">{item.label}</span>
            </button>
        ))}
    </div>

    <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded p-3 mb-4">
            <p className="text-xs text-slate-400 uppercase font-bold mb-1">Your Plan</p>
            <p className="text-white font-bold text-sm">Launch Pack</p>
            <button className="text-xs text-mosaic-teal hover:underline mt-1" onClick={() => setActive('billing')}>Upgrade Plan</button>
        </div>
        <button onClick={onLogout} className="flex items-center text-slate-400 hover:text-white text-sm px-2">
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </button>
    </div>
  </div>
);

// --- Overview View ---
const Overview = ({ onCreateJob, onNavigate, jobsCount }: { onCreateJob: () => void, onNavigate: (view: string) => void, jobsCount: number }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-mosaic-dark">Dashboard Overview</h2>
        <Button onClick={onCreateJob}><Plus className="w-4 h-4 mr-2" /> Post a Job</Button>
    </div>

    {/* LAUNCH REWARDS WIDGET (SPECIALS) */}
    <div className="bg-gradient-to-r from-mosaic-dark to-slate-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
       <div className="absolute top-0 right-0 bg-mosaic-teal text-white text-[10px] font-bold px-2 py-1 rounded-bl">LAUNCH PACK ACTIVE</div>
       <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="flex items-center gap-4">
             <div className="bg-white/10 p-3 rounded-full">
                <Zap className="w-8 h-8 text-mosaic-teal" />
             </div>
             <div>
                <h3 className="text-lg font-bold text-white">Post for Free. Name Your Price.</h3>
                <p className="text-slate-300 text-sm">Disrupting engineering recruitment. Pay only on successful hire.</p>
             </div>
          </div>
          <div className="flex gap-4">
             <div className="bg-white/10 px-4 py-2 rounded text-center border border-white/10">
                <span className="block text-2xl font-bold text-mosaic-teal">$0</span>
                <span className="text-[10px] uppercase text-slate-400">To Post Job</span>
             </div>
             <div className="bg-white/10 px-4 py-2 rounded text-center border border-white/10">
                <span className="block text-2xl font-bold text-mosaic-teal">YOU</span>
                <span className="text-[10px] uppercase text-slate-400">Set the Fee</span>
             </div>
          </div>
       </div>
       {/* Referral Link Mini-Section */}
       <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
           <div className="text-xs text-slate-400">
              Refer a company & get <span className="text-white font-bold">1 Free Candidate Unlock</span>.
           </div>
           <div className="flex gap-2">
              <code className="bg-black/30 px-2 py-1 rounded text-xs text-slate-300 font-mono">mosaic.co/ref/xy92z</code>
              <button className="text-xs text-mosaic-teal hover:text-white flex items-center"><Copy className="w-3 h-3 mr-1"/> Copy</button>
           </div>
       </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="text-slate-500 text-sm font-medium mb-2">Active Jobs</div>
            <div className="text-3xl font-bold text-mosaic-dark">{jobsCount}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="text-slate-500 text-sm font-medium mb-2">Total Applicants</div>
            <div className="text-3xl font-bold text-mosaic-dark">0</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="text-slate-500 text-sm font-medium mb-2">Sourced Candidates</div>
            <div className="text-3xl font-bold text-mosaic-teal">0</div>
            <p className="text-xs text-slate-400 mt-2">Available to unlock</p>
        </div>
    </div>

    {/* AVAILABLE SERVICES */}
    <div className="space-y-4">
        <h3 className="font-bold text-slate-800">Available Services</h3>
        <div className="grid md:grid-cols-3 gap-4">
            <div onClick={onCreateJob} className="bg-white p-5 rounded-xl border border-slate-200 hover:border-mosaic-teal cursor-pointer transition-all group hover:shadow-md">
                <div className="w-10 h-10 bg-teal-50 text-mosaic-teal rounded-lg flex items-center justify-center mb-3 group-hover:bg-mosaic-teal group-hover:text-white transition-colors">
                    <Plus className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-mosaic-dark">Post a Job</h4>
                <p className="text-xs text-slate-500 mt-1 mb-3">Self-service board. 1st Post Free.</p>
                <span className="text-xs font-bold text-mosaic-teal flex items-center">Create Post <ArrowRight className="w-3 h-3 ml-1"/></span>
            </div>
            <Link to="/employers" className="bg-white p-5 rounded-xl border border-slate-200 hover:border-mosaic-teal cursor-pointer transition-all group hover:shadow-md">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Search className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-mosaic-dark">Sourcing Engine</h4>
                <p className="text-xs text-slate-500 mt-1 mb-3">AI-matched candidates for your pipeline.</p>
                 <span className="text-xs font-bold text-blue-600 flex items-center">View Options <ArrowRight className="w-3 h-3 ml-1"/></span>
            </Link>
            <Link to="/employers" className="bg-white p-5 rounded-xl border border-slate-200 hover:border-mosaic-teal cursor-pointer transition-all group hover:shadow-md">
                <div className="w-10 h-10 bg-teal-50 text-mosaic-teal rounded-lg flex items-center justify-center mb-3 group-hover:bg-mosaic-teal group-hover:text-white transition-colors">
                    <Users className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-mosaic-dark">Full Recruiting</h4>
                <p className="text-xs text-slate-500 mt-1 mb-3">Dedicated hiring team & placement guarantee.</p>
                 <span className="text-xs font-bold text-mosaic-teal flex items-center">View Tiers <ArrowRight className="w-3 h-3 ml-1"/></span>
            </Link>
        </div>
    </div>

    {/* RECENT JOBS */}
    <div className="space-y-4">
        <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Recent Jobs</h3>
            <button onClick={() => onNavigate('jobs')} className="text-mosaic-teal text-sm font-bold hover:underline">View All Jobs</button>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase">Job Title</th>
                        <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                        <th className="text-right px-6 py-3 text-xs font-bold text-slate-500 uppercase">Applications</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {MOCK_JOBS.slice(0, 3).map(job => (
                        <tr key={job.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => onNavigate('jobs')}>
                            <td className="px-6 py-4 text-sm font-bold text-mosaic-dark">{job.title}</td>
                            <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-bold ${job.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>{job.status}</span></td>
                            <td className="px-6 py-4 text-right text-sm font-bold text-slate-700">{job.applicationCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  </div>
);

// --- Create Job View (with AI) ---
const CreateJob = ({ onCancel, employerId, companyName }: { onCancel: () => void, employerId: string, companyName: string }) => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('Full-time');
    const [description, setDescription] = useState('');
    const [bounty, setBounty] = useState('5000');
    const [salary, setSalary] = useState('');

    const generateDesc = async () => {
        if (!title) return;
        setLoading(true);
        try {
          if (process.env.API_KEY) {
              const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
              const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Write a professional job description for a ${title} at a Civil Engineering firm. Include responsibilities, requirements, and a compelling hook. Return as plain text (no markdown).`,
              });
              setDescription(response.text || "Error generating text.");
          } else {
              await new Promise(r => setTimeout(r, 1500));
              setDescription(`(AI Generated) Join our team as a ${title}. We are looking for a dedicated professional to lead infrastructure projects. \n\nResponsibilities:\n- Manage project lifecycles\n- Coordinate with stakeholders\n- Ensure code compliance\n\nRequirements:\n- BS in Civil Engineering\n- 5+ years experience\n- PE License preferred.`);
          }
        } catch (e) {
            setDescription("AI Service Unavailable.");
        } finally {
            setLoading(false);
        }
    };

    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    const handlePublish = async () => {
        if (!title || !description || !location) {
            setMessage({ text: "Please fill in all required fields.", type: 'error' });
            return;
        }

        setLoading(true);
        try {
            await addDoc(collection(db, 'jobs'), {
                employerId,
                title,
                company: companyName || 'Engineering Firm',
                location,
                type,
                salary,
                description,
                status: 'active',
                createdAt: serverTimestamp(),
                placementFee: bounty
            });
            setMessage({ text: "Job Published Successfully!", type: 'success' });
            setTimeout(() => {
                onCancel();
            }, 2000);
        } catch (error) {
            handleFirestoreError(error, OperationType.CREATE, 'jobs');
            setMessage({ text: "Error publishing job. Please try again.", type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-3xl mx-auto relative">
            {message && (
                <div className={`absolute top-4 right-4 left-4 p-4 rounded-lg shadow-lg z-50 flex items-center justify-between ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                    <span className="font-bold">{message.text}</span>
                    <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-slate-600">×</button>
                </div>
            )}
            <div className="mb-8 border-b border-slate-100 pb-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-mosaic-dark">Post a New Job</h2>
                <button onClick={onCancel} className="text-slate-400 hover:text-slate-600"><Briefcase className="w-5 h-5"/></button>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Job Title</label>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="flex-1 p-2 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal focus:outline-none" 
                            placeholder="e.g. Senior Project Manager"
                        />
                        <Button variant="secondary" size="sm" onClick={generateDesc} disabled={loading || !title}>
                            {loading ? <Zap className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
                            {loading ? 'Writing...' : 'AI Write'}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Employment Type</label>
                        <select 
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none bg-white"
                        >
                            <option>Full-time</option>
                            <option>Contract</option>
                            <option>Part-time</option>
                            <option>Freelance</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Location</label>
                        <input 
                            type="text" 
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal focus:outline-none" 
                            placeholder="e.g. Dallas, TX (Remote)"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Salary Range (Optional)</label>
                    <input 
                        type="text" 
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal focus:outline-none" 
                        placeholder="e.g. $120k - $150k"
                    />
                </div>

                <div>
                     <label className="block text-sm font-bold text-slate-700 mb-1">Job Description</label>
                     <textarea 
                        rows={6} 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal focus:outline-none"
                        placeholder="Describe the role, responsibilities, and requirements..."
                     ></textarea>
                </div>

                <div className="bg-mosaic-teal/5 p-6 rounded-xl border border-mosaic-teal/10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-800 flex items-center">
                            <DollarSign className="w-4 h-4 mr-2 text-mosaic-teal" /> Name Your Placement Fee
                        </h3>
                        <span className="text-[10px] bg-mosaic-teal text-white px-2 py-0.5 rounded-full font-bold">SUCCESS ONLY</span>
                    </div>
                    <p className="text-xs text-slate-600 mb-4">Set the commission you're willing to pay a recruiter for a successful hire. Higher fees attract top-tier sourcing talent.</p>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-2 text-slate-400 font-bold">$</span>
                            <input 
                                type="number" 
                                value={bounty}
                                onChange={(e) => setBounty(e.target.value)}
                                className="w-full pl-7 pr-4 py-2 border border-mosaic-teal/20 rounded-lg focus:ring-2 focus:ring-mosaic-teal outline-none font-bold text-mosaic-dark" 
                                placeholder="e.g. 5000"
                            />
                        </div>
                        <div className="text-sm font-bold text-slate-500">USD</div>
                    </div>
                    <div className="mt-4 flex gap-2">
                        {['2500', '5000', '7500', '10000'].map(val => (
                            <button 
                                key={val}
                                onClick={() => setBounty(val)}
                                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${bounty === val ? 'bg-mosaic-teal text-white' : 'bg-white text-mosaic-teal border border-mosaic-teal/20 hover:bg-mosaic-teal/5'}`}
                            >
                                ${val}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h3 className="font-bold text-sm text-slate-700 mb-3">Post Visibility</h3>
                    <div className="space-y-3">
                        <label className="flex items-center justify-between p-3 border-2 border-mosaic-teal rounded bg-teal-50/50 cursor-pointer">
                            <div className="flex items-center">
                                <input type="radio" name="tier" defaultChecked className="mr-3 text-mosaic-teal focus:ring-mosaic-teal" />
                                <div>
                                    <div className="font-bold text-sm text-slate-800 flex items-center">
                                        Launch Special <span className="ml-2 bg-mosaic-teal text-white text-[10px] px-1 rounded">FREE</span>
                                    </div>
                                    <div className="text-xs text-slate-500">90 days active + AI Sourcing Network Access.</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-mosaic-teal">$0</div>
                                <div className="text-[10px] text-slate-400 line-through">$148 Value</div>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                    <Button onClick={handlePublish} disabled={loading}>
                        {loading ? 'Publishing...' : 'Publish Job'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

// --- Job Detail View (Applications & Sourced) ---
const JobDetail = ({ job, onBack }: { job: Job, onBack: () => void }) => {
    const [activeTab, setActiveTab] = useState<'applications' | 'sourced'>('applications');
    const [unlockedCandidates, setUnlockedCandidates] = useState<string[]>(['c3']); // Mock unlocked ID
    const [showUnlockConfirm, setShowUnlockConfirm] = useState<string | null>(null);

    const handleUnlock = (id: string) => {
        setUnlockedCandidates([...unlockedCandidates, id]);
        setShowUnlockConfirm(null);
    };

    return (
        <div className="space-y-6 relative">
            {showUnlockConfirm && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
                        <div className="bg-mosaic-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Zap className="w-8 h-8 text-mosaic-teal" />
                        </div>
                        <h3 className="text-xl font-bold text-mosaic-dark mb-2">Unlock Candidate Profile?</h3>
                        <p className="text-slate-600 mb-8">This will use your 1 Free Launch Unlock. You'll get full contact details and interview notes.</p>
                        <div className="flex gap-4">
                            <Button variant="outline" className="flex-1" onClick={() => setShowUnlockConfirm(null)}>Cancel</Button>
                            <Button className="flex-1" onClick={() => handleUnlock(showUnlockConfirm)}>Confirm Unlock</Button>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={onBack} className="text-sm text-slate-500 hover:text-mosaic-teal flex items-center mb-4">
                ← Back to Jobs
            </button>

            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold text-mosaic-dark">{job.title}</h2>
                    <div className="flex text-sm text-slate-500 gap-4 mt-1">
                        <span className="flex items-center"><MapPin className="w-3 h-3 mr-1"/> {job.location}</span>
                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1"/> Posted {job.postedDate}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${job.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                            {job.status}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit Job</Button>
                    <Button size="sm">View Live</Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <div className="flex space-x-8">
                    <button 
                        onClick={() => setActiveTab('applications')}
                        className={`py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'applications' ? 'border-mosaic-teal text-mosaic-teal' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                        Direct Applications ({job.applicationCount})
                    </button>
                    <button 
                        onClick={() => setActiveTab('sourced')}
                        className={`py-4 text-sm font-bold border-b-2 transition-colors flex items-center ${activeTab === 'sourced' ? 'border-mosaic-teal text-mosaic-teal' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                        <Zap className="w-4 h-4 mr-2 text-mosaic-teal" />
                        Sourced Candidates ({job.sourcedCount})
                    </button>
                </div>
            </div>

            {/* Content */}
            {activeTab === 'applications' ? (
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-bold">
                            <tr>
                                <th className="px-6 py-3 text-left">Name</th>
                                <th className="px-6 py-3 text-left">Experience</th>
                                <th className="px-6 py-3 text-left">Date</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[1,2,3].map((i) => (
                                <tr key={i} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 text-sm font-bold text-slate-800">Candidate Name {i}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">5 Years</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">Oct 2{i}, 2023</td>
                                    <td className="px-6 py-4 text-sm"><span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-bold">New</span></td>
                                    <td className="px-6 py-4 text-right">
                                        <Button size="sm" variant="outline">Review</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start gap-3">
                        <div className="bg-white p-2 rounded-full text-blue-600 shadow-sm"><Zap className="w-5 h-5"/></div>
                        <div>
                            <h4 className="font-bold text-blue-900 text-sm">Mosaic Premium Sourcing</h4>
                            <p className="text-xs text-blue-700 mt-1">These candidates have been pre-vetted by our team for your specific role. Unlock full contact details and our interview notes for a flat fee.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {MOCK_SOURCED_CANDIDATES.map((cand) => {
                            const isUnlocked = unlockedCandidates.includes(cand.id);
                            return (
                                <div key={cand.id} className="bg-white border border-slate-200 rounded-xl p-6 relative overflow-hidden group hover:border-mosaic-teal transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className={`font-bold text-lg ${!isUnlocked ? 'blur-[4px]' : ''}`}>
                                                {isUnlocked ? `${cand.firstName} ${cand.lastName}` : 'Candidate Name'}
                                            </h3>
                                            <p className="text-slate-600 text-sm font-medium">{cand.title}</p>
                                        </div>
                                        <div className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-bold">
                                            {cand.fitScore}% Match
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center text-sm text-slate-500">
                                            <Briefcase className="w-4 h-4 mr-2" /> {cand.experience}
                                        </div>
                                        <div className={`text-sm text-slate-600 p-3 bg-slate-50 rounded italic ${!isUnlocked ? 'blur-[3px] select-none' : ''}`}>
                                            "{cand.notes}"
                                        </div>
                                    </div>

                                    {isUnlocked ? (
                                        <div className="flex gap-2">
                                            <Button variant="outline" className="w-full">Download Resume</Button>
                                            <Button className="w-full">Contact</Button>
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="text-center">
                                                <Lock className="w-8 h-8 mx-auto text-mosaic-teal mb-2" />
                                                <Button onClick={() => setShowUnlockConfirm(cand.id)} className="shadow-xl">
                                                    Unlock Profile ($500)
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {!isUnlocked && (
                                        <div className="mt-4 text-center">
                                            <Button variant="secondary" size="sm" className="w-full opacity-50 group-hover:opacity-0 pointer-events-none">
                                                <Lock className="w-3 h-3 mr-2" /> Hover to Unlock
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Billing View ---
const BillingView = () => (
    <div className="space-y-8">
        <h2 className="text-2xl font-bold text-mosaic-dark">Billing & Plans</h2>

        <div className="grid md:grid-cols-2 gap-6">
            {/* Current Plan Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-mosaic-teal text-white text-xs font-bold px-3 py-1 rounded-bl">ACTIVE</div>
                <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wide mb-2">Current Plan</h3>
                <div className="text-3xl font-bold text-mosaic-dark mb-1">Launch Pack</div>
                <p className="text-sm text-slate-500 mb-6">Free Tier • Valid until May 31, 2026</p>
                
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Job Posts Remaining</span>
                        <span className="font-bold text-slate-900">1</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-mosaic-teal h-2 rounded-full" style={{width: '50%'}}></div>
                    </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Profile Unlocks</span>
                        <span className="font-bold text-slate-900">1</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                         <div className="bg-mosaic-teal h-2 rounded-full" style={{width: '50%'}}></div>
                    </div>
                </div>
                <Button variant="outline" className="w-full">Manage Subscription</Button>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wide mb-4">Payment Method</h3>
                <div className="flex items-center mb-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <CreditCard className="w-8 h-8 text-slate-600 mr-4" />
                    <div>
                        <div className="font-bold text-slate-800">Visa ending in 4242</div>
                        <div className="text-xs text-slate-500">Expires 12/28</div>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto">Edit</Button>
                </div>
                <div className="text-sm text-slate-500">
                    Next billing date: <span className="font-bold text-slate-800">N/A (Free Plan)</span>
                </div>
            </div>
        </div>

        {/* Upgrade Options */}
        <div>
            <h3 className="text-lg font-bold text-mosaic-dark mb-4">Available Upgrades</h3>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="border border-slate-200 rounded-xl p-6 bg-white hover:border-mosaic-teal transition-colors">
                    <h4 className="font-bold text-lg">Job Post Pack</h4>
                    <p className="text-sm text-slate-500 mb-4">3 Credits • Save $48</p>
                    <div className="text-2xl font-bold text-mosaic-teal mb-4">$249</div>
                    <Button className="w-full" variant="outline">Buy Now</Button>
                </div>
                <div className="border border-slate-200 rounded-xl p-6 bg-white hover:border-mosaic-teal transition-colors">
                     <h4 className="font-bold text-lg">Sourcing Engine</h4>
                     <p className="text-sm text-slate-500 mb-4">1 Position • No Outreach</p>
                     <div className="text-2xl font-bold text-mosaic-teal mb-4">$500</div>
                     <Button className="w-full" variant="outline">Start Sourcing</Button>
                </div>
                <div className="border border-slate-200 rounded-xl p-6 bg-white hover:border-mosaic-teal transition-colors">
                     <h4 className="font-bold text-lg">Recruiting Deposit</h4>
                     <p className="text-sm text-slate-500 mb-4">Start Full Search</p>
                     <div className="text-2xl font-bold text-mosaic-teal mb-4">$2,500</div>
                     <Button className="w-full" variant="outline">Engage Us</Button>
                </div>
            </div>
        </div>

        {/* Invoices */}
        <div>
             <h3 className="text-lg font-bold text-mosaic-dark mb-4">Invoice History</h3>
             <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
                        <tr>
                            <th className="px-6 py-3 text-left">Date</th>
                            <th className="px-6 py-3 text-left">Description</th>
                            <th className="px-6 py-3 text-right">Amount</th>
                            <th className="px-6 py-3 text-right">Status</th>
                            <th className="px-6 py-3 text-right">PDF</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        <tr>
                            <td className="px-6 py-4 text-slate-600">Oct 28, 2023</td>
                            <td className="px-6 py-4 font-medium text-slate-900">Launch Pack Activation</td>
                            <td className="px-6 py-4 text-right text-slate-600">$0.00</td>
                            <td className="px-6 py-4 text-right"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Paid</span></td>
                            <td className="px-6 py-4 text-right"><Download className="w-4 h-4 ml-auto text-slate-400 cursor-pointer hover:text-slate-600"/></td>
                        </tr>
                    </tbody>
                </table>
             </div>
        </div>
    </div>
);

// --- Profile View ---
const ProfileView = ({ profile }: { profile: any }) => {
    const [loading, setLoading] = useState(false);
    const [companyName, setCompanyName] = useState(profile?.companyName || '');
    const [website, setWebsite] = useState(profile?.website || '');
    const [managerName, setManagerName] = useState(profile?.displayName || '');
    const [jobTitle, setJobTitle] = useState(profile?.jobTitle || '');
    const [phone, setPhone] = useState(profile?.phone || '');
    const [about, setAbout] = useState(profile?.about || '');

    const handleSave = async () => {
        setLoading(true);
        try {
            const userDocRef = doc(db, 'users', profile.uid);
            await updateDoc(userDocRef, {
                companyName,
                website,
                displayName: managerName,
                jobTitle,
                phone,
                about
            });
            alert("Profile Updated!");
        } catch (error) {
            handleFirestoreError(error, OperationType.UPDATE, `users/${profile.uid}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-mosaic-dark mb-8">Company Profile</h2>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-8">
                
                {/* Logo & Branding */}
                <div className="flex items-start gap-6 border-b border-slate-100 pb-8">
                    <div className="w-24 h-24 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50">
                        <Building2 className="w-8 h-8 mb-1" />
                        <span className="text-xs font-medium">Upload Logo</span>
                    </div>
                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Company Name</label>
                            <input 
                                type="text" 
                                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none" 
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Website</label>
                             <input 
                                type="url" 
                                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none" 
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Hiring Manager Name</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none" 
                            value={managerName}
                            onChange={(e) => setManagerName(e.target.value)}
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Job Title</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none" 
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none bg-slate-50" 
                            value={profile?.email}
                            disabled
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
                        <input 
                            type="tel" 
                            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>

                {/* About / Details */}
                <div>
                     <label className="block text-sm font-bold text-slate-700 mb-1">About Company (Employer Brand)</label>
                     <p className="text-xs text-slate-500 mb-2">This will be displayed on your job posts.</p>
                     <textarea 
                        rows={4} 
                        className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal outline-none" 
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    ></textarea>
                </div>

                <div className="pt-4 flex justify-end">
                    <Button onClick={handleSave} disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

// --- Main Dashboard Layout ---
export const EmployerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, signOut, loading: authLoading } = useAuth();
  const [activeView, setActiveView] = useState('overview');
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/employer/login');
      return;
    }

    const q = query(collection(db, 'jobs'), where('employerId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(jobsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'jobs');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, authLoading, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/employer/login');
  };

  if (authLoading || (loading && user)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mosaic-teal"></div>
      </div>
    );
  }

  // View Logic
  let content;
  if (selectedJob) {
    content = <JobDetail job={selectedJob} onBack={() => setSelectedJob(null)} />;
  } else if (isCreating) {
    content = <CreateJob onCancel={() => setIsCreating(false)} employerId={user?.uid || ''} companyName={profile?.companyName || ''} />;
  } else {
      switch(activeView) {
          case 'overview': 
            content = <Overview onCreateJob={() => setIsCreating(true)} onNavigate={setActiveView} jobsCount={jobs.length} />;
            break;
          case 'jobs':
            content = (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-mosaic-dark">My Jobs</h2>
                        <Button onClick={() => setIsCreating(true)}><Plus className="w-4 h-4 mr-2" /> Post New Job</Button>
                    </div>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase">Job Title</th>
                                    <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                                    <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase">Posted</th>
                                    <th className="text-center px-6 py-3 text-xs font-bold text-slate-500 uppercase">Applications</th>
                                    <th className="text-center px-6 py-3 text-xs font-bold text-slate-500 uppercase text-mosaic-teal">Sourced</th>
                                    <th className="text-right px-6 py-3 text-xs font-bold text-slate-500 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {jobs.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">
                                            No jobs posted yet. Click "Post New Job" to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    jobs.map(job => (
                                        <tr key={job.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedJob(job)}>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-mosaic-dark text-sm">{job.title}</div>
                                                <div className="text-xs text-slate-500">{job.location}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${job.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                                    {job.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {job.createdAt?.toDate ? job.createdAt.toDate().toLocaleDateString() : 'Just now'}
                                            </td>
                                            <td className="px-6 py-4 text-center font-bold text-slate-700">0</td>
                                            <td className="px-6 py-4 text-center font-bold text-mosaic-teal">0</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-slate-400 hover:text-mosaic-teal"><MoreHorizontal className="w-5 h-5" /></button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
            break;
          case 'billing':
            content = <BillingView />;
            break;
          case 'profile':
            content = <ProfileView profile={profile} />;
            break;
          default:
            content = <Overview onCreateJob={() => setIsCreating(true)} onNavigate={setActiveView} jobsCount={jobs.length} />;
      }
  }

  return (
    <div className="bg-slate-50 min-h-screen flex relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <img 
          src="https://picsum.photos/seed/construction/1920/1080" 
          alt="Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-transparent to-slate-50"></div>
      </div>

      <Sidebar active={activeView} setActive={(v) => { setActiveView(v); setSelectedJob(null); setIsCreating(false); }} onLogout={handleLogout} />
      <div className="flex-1 ml-64 p-8 overflow-y-auto h-screen pb-20 relative z-10">
        {content}
      </div>
    </div>
  );
};
