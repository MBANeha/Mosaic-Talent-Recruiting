
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { GoogleGenAI } from "@google/genai";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  LogOut, 
  Activity, 
  TrendingUp, 
  Send, 
  Linkedin, 
  Search,
  UserCheck,
  Building2,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowLeft,
  FileText,
  ExternalLink,
  Copy,
  Zap,
  Filter,
  Target,
  MessageSquare,
  Plus,
  Play,
  Pause,
  RefreshCw,
  BrainCircuit,
  Radio,
  Sparkles
} from 'lucide-react';
import { MOCK_ANALYTICS, MOCK_JOBS, MOCK_MARKET_SIGNALS, MOCK_CANDIDATES } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Job, DripifyCampaign, DripifyLead, OwlMatch } from '../types';

// --- Sidebar ---
const AdminSidebar = ({ active, setActive, onLogout }: { active: string, setActive: (v: string) => void, onLogout: () => void }) => (
  <div className="w-64 bg-mosaic-dark text-slate-300 flex flex-col h-screen fixed left-0 top-0 z-50">
    <div className="p-6 flex items-center border-b border-slate-800">
       <div className="w-8 h-8 bg-mosaic-teal rounded-lg flex items-center justify-center mr-3">
          <span className="text-white font-bold text-lg">A</span>
       </div>
       <div className="flex flex-col">
          <span className="font-serif font-bold text-white tracking-wide">ADMIN</span>
          <span className="text-[10px] text-slate-500 uppercase">Mosaic Talent</span>
       </div>
    </div>
    
    <div className="flex-1 py-6 px-3 space-y-1">
        {[
            { id: 'overview', label: 'Operations Overview', icon: LayoutDashboard },
            { id: 'intelligence', label: 'Owl Intelligence', icon: BrainCircuit }, // New Tab
            { id: 'workspace', label: 'Recruiting Workspace', icon: Target }, 
            { id: 'clients', label: 'Client Management', icon: Building2 },
            { id: 'candidates', label: 'Candidate Tracking', icon: Users },
            { id: 'dripify', label: 'Dripify Automation', icon: Linkedin },
        ].map((item) => (
            <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`w-full flex items-center px-3 py-3 rounded-lg transition-colors ${active === item.id ? 'bg-mosaic-teal/20 text-white border border-mosaic-teal/30' : 'hover:bg-slate-800 hover:text-white'}`}
            >
                <item.icon className={`w-5 h-5 mr-3 ${active === item.id ? 'text-mosaic-teal' : ''}`} />
                <span className="text-sm font-medium">{item.label}</span>
            </button>
        ))}
    </div>

    <div className="p-4 border-t border-slate-800">
        <button onClick={onLogout} className="flex items-center text-slate-400 hover:text-white text-sm px-2 w-full">
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </button>
    </div>
  </div>
);

// --- Analytics View ---
const AnalyticsView = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Business Performance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">$32,450</h3>
                    </div>
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg"><DollarSignIcon className="w-5 h-5" /></div>
                </div>
                <p className="text-xs text-green-600 mt-2 flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +12% vs last month</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Active Jobs</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">{MOCK_JOBS.length}</h3>
                    </div>
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Briefcase className="w-5 h-5" /></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">3 pending approval</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Website Visits</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">2,840</h3>
                    </div>
                    <div className="p-2 bg-teal-50 text-mosaic-teal rounded-lg"><Activity className="w-5 h-5" /></div>
                </div>
                 <p className="text-xs text-green-600 mt-2 flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +5% vs last week</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">New Leads</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">145</h3>
                    </div>
                    <div className="p-2 bg-mosaic-teal/10 text-mosaic-teal rounded-lg"><Users className="w-5 h-5" /></div>
                </div>
                 <p className="text-xs text-slate-500 mt-2">From Dripify & Web</p>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-80">
                <h3 className="font-bold text-slate-800 mb-6">Traffic & Engagement</h3>
                <ResponsiveContainer width="100%" height="85%">
                    <AreaChart data={MOCK_ANALYTICS}>
                        <defs>
                            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0f766e" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#0f766e" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                        <YAxis tickLine={false} axisLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                        <Tooltip />
                        <Area type="monotone" dataKey="visitors" stroke="#0f766e" fillOpacity={1} fill="url(#colorVisitors)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-80">
                <h3 className="font-bold text-slate-800 mb-6">Revenue vs Applications</h3>
                <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={MOCK_ANALYTICS}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#8C72B9" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="applications" fill="#46B2A3" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
);

// --- Owl Intelligence Engine ---
const OwlIntelligence = () => {
    const [activeTab, setActiveTab] = useState<'watch' | 'match'>('watch');
    const [selectedMatchJob, setSelectedMatchJob] = useState<string>(MOCK_JOBS[0].id);
    const [owlMatches, setOwlMatches] = useState<OwlMatch[]>([]);
    const [isCalculating, setIsCalculating] = useState(false);

    const calculateMatches = () => {
        setIsCalculating(true);
        // Simulation of complex matching algorithm
        setTimeout(() => {
            const matches = MOCK_CANDIDATES.map(c => ({
                candidateId: c.id,
                jobId: selectedMatchJob,
                score: Math.floor(Math.random() * (99 - 70) + 70),
                matchReasons: ['Experience matches required level', 'Located in target region', 'Skills intersect 80%'],
                missingSkills: ['Specific software version']
            })).sort((a,b) => b.score - a.score);
            setOwlMatches(matches);
            setIsCalculating(false);
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                        <BrainCircuit className="w-6 h-6 mr-2 text-mosaic-teal" /> Owl Intelligence Engine
                    </h2>
                    <p className="text-slate-500 text-sm">Market signals and algorithmic candidate matching.</p>
                </div>
                <div className="flex bg-white border border-slate-200 rounded-lg p-1">
                    <button 
                        onClick={() => setActiveTab('watch')}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${activeTab === 'watch' ? 'bg-mosaic-teal text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        Market Watch
                    </button>
                    <button 
                        onClick={() => setActiveTab('match')}
                         className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${activeTab === 'match' ? 'bg-mosaic-teal text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        Smart Match
                    </button>
                </div>
            </div>

            {activeTab === 'watch' ? (
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Signal Feed */}
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-800 flex items-center mb-4">
                                <Radio className="w-4 h-4 mr-2 text-red-500 animate-pulse" /> Live Market Signals
                            </h3>
                            <div className="space-y-4">
                                {MOCK_MARKET_SIGNALS.map(signal => (
                                    <div key={signal.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-mosaic-teal transition-colors group">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-bold text-slate-500">{signal.date}</span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${signal.signalType === 'Contract Win' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {signal.signalType}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-slate-900">{signal.company}</h4>
                                        <p className="text-sm text-slate-600 mb-3">{signal.description}</p>
                                        
                                        <div className="bg-white p-3 rounded border border-slate-100">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs font-bold text-slate-400 uppercase">Owl Recommendation</p>
                                                    <p className="text-xs text-mosaic-teal font-bold">{signal.suggestedAction}</p>
                                                </div>
                                                <Button size="sm" variant="outline" className="h-8 text-xs">Create Campaign</Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Strategic Overview */}
                    <div className="space-y-6">
                         <div className="bg-mosaic-dark text-white p-6 rounded-xl shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-mosaic-teal rounded-full blur-3xl opacity-20"></div>
                            <h3 className="font-bold text-lg mb-2">Owl Insight Summary</h3>
                            <p className="text-slate-300 text-sm mb-6">
                                Infrastructure spending in the Northeast has increased by 15% this quarter. 
                                Expect high demand for Civil PEs in NJ/NY.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/10 p-3 rounded">
                                    <span className="block text-2xl font-bold text-mosaic-purple">15%</span>
                                    <span className="text-xs text-slate-400">Market Growth</span>
                                </div>
                                <div className="bg-white/10 p-3 rounded">
                                    <span className="block text-2xl font-bold text-mosaic-purple">High</span>
                                    <span className="text-xs text-slate-400">Talent Scarcity</span>
                                </div>
                            </div>
                         </div>

                         <div className="bg-white p-6 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-slate-800 mb-4">Target Accounts</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded cursor-pointer">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center text-slate-500 font-bold mr-3">A</div>
                                        <div>
                                            <div className="font-bold text-sm">Aecom</div>
                                            <div className="text-xs text-slate-500">2 Active Signals</div>
                                        </div>
                                    </div>
                                    <ArrowRightIcon className="w-4 h-4 text-slate-400" />
                                </div>
                                <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded cursor-pointer">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center text-slate-500 font-bold mr-3">T</div>
                                        <div>
                                            <div className="font-bold text-sm">Turner</div>
                                            <div className="text-xs text-slate-500">1 Active Signal</div>
                                        </div>
                                    </div>
                                    <ArrowRightIcon className="w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row h-[600px]">
                    <div className="w-full md:w-1/3 border-r border-slate-200 bg-slate-50 p-6">
                         <h3 className="font-bold text-slate-800 mb-4">1. Select Active Job</h3>
                         <select 
                            className="w-full p-3 border border-slate-300 rounded-lg bg-white mb-6"
                            value={selectedMatchJob}
                            onChange={(e) => setSelectedMatchJob(e.target.value)}
                         >
                            {MOCK_JOBS.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
                         </select>
                         
                         <div className="bg-white p-4 rounded-lg border border-slate-200 mb-6">
                            <h4 className="font-bold text-sm text-slate-700 mb-2">Scoring Criteria</h4>
                            <ul className="space-y-2 text-xs text-slate-500">
                                <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-500"/> Skills Match (40%)</li>
                                <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-500"/> Experience Level (30%)</li>
                                <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-500"/> Location Proximity (20%)</li>
                                <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-500"/> Education (10%)</li>
                            </ul>
                         </div>

                         <Button onClick={calculateMatches} disabled={isCalculating} className="w-full">
                            {isCalculating ? <Zap className="w-4 h-4 animate-spin" /> : 'Run Owl Match Algorithm'}
                         </Button>
                    </div>
                    <div className="w-full md:w-2/3 p-6 bg-slate-100 overflow-y-auto">
                        <h3 className="font-bold text-slate-800 mb-4">Ranked Candidates</h3>
                        {owlMatches.length > 0 ? (
                            <div className="space-y-4">
                                {owlMatches.map((match, idx) => {
                                    const candidate = MOCK_CANDIDATES.find(c => c.id === match.candidateId);
                                    return (
                                        <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4 relative overflow-hidden">
                                            {idx === 0 && <div className="absolute top-0 right-0 bg-mosaic-purple text-white text-[10px] font-bold px-2 py-1 rounded-bl">TOP MATCH</div>}
                                            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0 ${match.score > 90 ? 'bg-green-500' : match.score > 80 ? 'bg-mosaic-teal' : 'bg-slate-400'}`}>
                                                {match.score}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-bold text-slate-900">{candidate?.name}</h4>
                                                    <span className="text-xs text-slate-500">{candidate?.location}</span>
                                                </div>
                                                <p className="text-sm text-slate-600 mb-2">{candidate?.title}</p>
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    {match.matchReasons.map((r, i) => (
                                                        <span key={i} className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded border border-green-100 flex items-center">
                                                            <Sparkles className="w-3 h-3 mr-1" /> {r}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex justify-end gap-2 mt-2">
                                                    <Button size="sm" variant="outline" className="text-xs h-7">View Profile</Button>
                                                    <Button size="sm" className="text-xs h-7">Contact</Button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400">
                                <BrainCircuit className="w-16 h-16 mb-4 opacity-10" />
                                <p>Run the algorithm to see ranked matches.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// 5. Dripify Automation Module (Actual Logic)
const DripifyAutomation = () => {
    const [view, setView] = useState<'list' | 'create' | 'detail'>('list');
    const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
    
    // Initial Mock Campaigns
    const [campaigns, setCampaigns] = useState<DripifyCampaign[]>([
        { 
            id: '1', 
            name: 'Sourcing: Senior Civil PE (NY)', 
            type: 'Candidate',
            target: 'Senior Civil Engineer (PE)',
            status: 'Active', 
            leads: [
                { id: 'l1', name: 'Robert Fox', title: 'Senior Civil Engineer', company: 'Aecom', location: 'New York, NY', status: 'Connection Sent', profileUrl: '#' },
                { id: 'l2', name: 'Jenny Wilson', title: 'Civil PE', company: 'WSP', location: 'New York, NY', status: 'Replied', profileUrl: '#' },
                { id: 'l3', name: 'Guy Hawkins', title: 'Project Engineer', company: 'HNTB', location: 'Newark, NJ', status: 'Queued', profileUrl: '#' },
            ],
            stats: { found: 450, sent: 320, accepted: 89, replies: 45 },
            sequence: { connection: 'Hi Robert, impressed by your work at Aecom...', followUp: 'Checking in...' }
        },
        { 
            id: '2', 
            name: 'Biz Dev: Construction Owners (TX)', 
            type: 'Client',
            target: 'Owner / VP Construction',
            status: 'Paused', 
            leads: [
                { id: 'l4', name: 'Darlene Robertson', title: 'VP Construction', company: 'BuildCo', location: 'Austin, TX', status: 'Queued', profileUrl: '#' }
            ],
            stats: { found: 600, sent: 580, accepted: 185, replies: 88 },
            sequence: { connection: 'Hi Darlene, we help construction firms...', followUp: 'Any hiring needs?' }
        }
    ]);

    // Simulation Engine: Runs active campaigns
    useEffect(() => {
        const interval = setInterval(() => {
            setCampaigns(prev => prev.map(camp => {
                if (camp.status !== 'Active') return camp;

                // Randomly find a new lead
                const shouldFind = Math.random() > 0.7;
                let newLeads = [...camp.leads];
                let newStats = { ...camp.stats };

                if (shouldFind) {
                    const mockNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Evan', 'Fiona'];
                    const mockCompanies = ['Stantec', 'Kimley-Horn', 'Jacobs', 'HDR', 'Tetra Tech'];
                    const randomName = mockNames[Math.floor(Math.random() * mockNames.length)] + ' ' + ['Smith', 'Jones', 'Lee', 'Wong'][Math.floor(Math.random() * 4)];
                    
                    newLeads.push({
                        id: Math.random().toString(),
                        name: randomName,
                        title: camp.target.includes('Civil') ? 'Civil Engineer' : 'Hiring Manager',
                        company: mockCompanies[Math.floor(Math.random() * mockCompanies.length)],
                        location: 'USA',
                        status: 'Queued',
                        profileUrl: '#'
                    });
                    newStats.found += 1;
                }

                // Randomly progress lead statuses
                newLeads = newLeads.map(l => {
                    if (l.status === 'Queued' && Math.random() > 0.8) {
                        newStats.sent += 1;
                        return { ...l, status: 'Connection Sent' };
                    }
                    if (l.status === 'Connection Sent' && Math.random() > 0.9) {
                        newStats.accepted += 1;
                        return { ...l, status: 'Connected' };
                    }
                    if (l.status === 'Connected' && Math.random() > 0.95) {
                        newStats.replies += 1;
                        return { ...l, status: 'Replied' };
                    }
                    return l;
                });

                return { ...camp, leads: newLeads, stats: newStats };
            }));
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }, []);

    // Create Wizard State
    const [targetType, setTargetType] = useState<'candidate' | 'client'>('candidate');
    const [step, setStep] = useState(1);
    const [selectedJobId, setSelectedJobId] = useState(MOCK_JOBS[0].id);
    const [clientCriteria, setClientCriteria] = useState({ title: 'HR Director', location: 'New York' });
    const [generatedSequence, setGeneratedSequence] = useState({ connection: '', followUp: '' });
    const [generatedSearch, setGeneratedSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerateAI = async () => {
        setLoading(true);
        try {
            const targetJob = MOCK_JOBS.find(j => j.id === selectedJobId);
            const context = targetType === 'candidate' 
                ? `Target: Candidates for ${targetJob?.title} in ${targetJob?.location}` 
                : `Target: Potential Clients (Title: ${clientCriteria.title}) in ${clientCriteria.location}`;
            
            if (process.env.API_KEY) {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const msgResp = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: `Write 2 LinkedIn messages for: ${context}. 1. Connection Request (max 200 chars). 2. Follow-up. Return JSON: { "connection": "...", "followUp": "..." }`
                });
                const text = msgResp.text?.replace(/```json|```/g, '').trim();
                setGeneratedSequence(JSON.parse(text || '{"connection": "Hi...", "followUp": "..."}'));
                setGeneratedSearch(targetType === 'candidate' 
                     ? `site:linkedin.com/in ("${targetJob?.title}") AND "${targetJob?.location}"`
                     : `site:linkedin.com/in ("${clientCriteria.title}") AND "${clientCriteria.location}"`
                );
            } else {
                await new Promise(r => setTimeout(r, 1000));
                setGeneratedSearch(targetType === 'candidate' 
                    ? `site:linkedin.com/in ("${targetJob?.title}") AND "${targetJob?.location}"` 
                    : `site:linkedin.com/in ("${clientCriteria.title}") AND "${clientCriteria.location}"`);
                
                setGeneratedSequence(targetType === 'candidate' 
                    ? { connection: `Hi [Name], recruiting for a ${targetJob?.title} role. Let's connect.`, followUp: "Just following up..." }
                    : { connection: `Hi [Name], helping firms in ${clientCriteria.location} hire faster.`, followUp: "Any hiring needs?" });
            }
            setStep(2);
        } catch (e) { alert("AI Busy"); } 
        finally { setLoading(false); }
    };

    const handleLaunch = () => {
        const targetJob = MOCK_JOBS.find(j => j.id === selectedJobId);
        const targetName = targetType === 'candidate' ? targetJob?.title || 'Role' : clientCriteria.title;
        
        const newCamp: DripifyCampaign = {
            id: Math.random().toString(),
            name: `${targetType === 'candidate' ? 'Sourcing' : 'Biz Dev'}: ${targetName}`,
            type: targetType === 'candidate' ? 'Candidate' : 'Client',
            target: targetName,
            status: 'Active',
            leads: [],
            stats: { found: 0, sent: 0, accepted: 0, replies: 0 },
            sequence: generatedSequence
        };
        setCampaigns([...campaigns, newCamp]);
        setView('list');
        setStep(1);
    };

    const toggleStatus = (id: string) => {
        setCampaigns(campaigns.map(c => c.id === id ? { ...c, status: c.status === 'Active' ? 'Paused' : 'Active' } : c));
    };

    // -- RENDER --

    // Detail View
    if (view === 'detail' && selectedCampaignId) {
        const camp = campaigns.find(c => c.id === selectedCampaignId);
        if (!camp) return <div>Error loading campaign</div>;

        return (
            <div className="space-y-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setView('list')} className="p-2 hover:bg-slate-100 rounded-full"><ArrowLeft className="w-5 h-5 text-slate-500"/></button>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{camp.name}</h2>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${camp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{camp.status}</span>
                                <span>Target: {camp.target}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => toggleStatus(camp.id)}>
                            {camp.status === 'Active' ? <Pause className="w-4 h-4 mr-2"/> : <Play className="w-4 h-4 mr-2"/>}
                            {camp.status === 'Active' ? 'Pause' : 'Resume'}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                        <div className="text-2xl font-bold text-slate-900">{camp.stats.found}</div>
                        <div className="text-xs text-slate-500 uppercase font-bold">Leads Found</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                        <div className="text-2xl font-bold text-blue-600">{camp.stats.sent}</div>
                        <div className="text-xs text-slate-500 uppercase font-bold">Sent</div>
                    </div>
                     <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                        <div className="text-2xl font-bold text-mosaic-teal">{camp.stats.accepted}</div>
                        <div className="text-xs text-slate-500 uppercase font-bold">Connected</div>
                    </div>
                     <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                        <div className="text-2xl font-bold text-green-600">{camp.stats.replies}</div>
                        <div className="text-xs text-slate-500 uppercase font-bold">Replies</div>
                    </div>
                </div>

                <div className="flex gap-6 flex-1 overflow-hidden">
                    <div className="w-2/3 bg-white rounded-xl border border-slate-200 flex flex-col">
                        <div className="p-4 border-b border-slate-100 font-bold text-slate-800 flex justify-between">
                            <span>Lead List</span>
                            <span className="text-xs text-slate-400 font-normal flex items-center"><RefreshCw className="w-3 h-3 mr-1 animate-spin"/> Live Sync</span>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-bold sticky top-0">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Name</th>
                                        <th className="px-4 py-3 text-left">Company</th>
                                        <th className="px-4 py-3 text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {camp.leads.map(lead => (
                                        <tr key={lead.id} className="hover:bg-slate-50">
                                            <td className="px-4 py-3 font-medium">{lead.name} <div className="text-xs text-slate-500">{lead.title}</div></td>
                                            <td className="px-4 py-3 text-slate-600">{lead.company}</td>
                                            <td className="px-4 py-3">
                                                <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                                                    lead.status === 'Replied' ? 'bg-green-100 text-green-700' :
                                                    lead.status === 'Connected' ? 'bg-teal-100 text-mosaic-teal' :
                                                    lead.status === 'Connection Sent' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-slate-100 text-slate-500'
                                                }`}>
                                                    {lead.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {camp.leads.length === 0 && <tr className="text-center text-slate-500 py-8"><td colSpan={3} className="p-8">Scanning for leads...</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div className="w-1/3 space-y-6">
                        <div className="bg-white rounded-xl border border-slate-200 p-4">
                            <h4 className="font-bold text-slate-800 mb-3 text-sm">Sequence Preview</h4>
                            <div className="space-y-3">
                                <div className="p-3 bg-slate-50 rounded border border-slate-100">
                                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">Connection Note</div>
                                    <p className="text-xs text-slate-600 italic">"{camp.sequence.connection}"</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded border border-slate-100">
                                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">Follow Up (3 Days)</div>
                                    <p className="text-xs text-slate-600 italic">"{camp.sequence.followUp}"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // List View
    if (view === 'list') {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center"><Linkedin className="w-6 h-6 text-blue-600 mr-2"/> Dripify Automation</h2>
                        <p className="text-slate-500 text-sm mt-1">Manage active outreach campaigns.</p>
                    </div>
                    <Button onClick={() => setView('create')}><Plus className="w-4 h-4 mr-2"/> New Campaign</Button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                    {campaigns.map((camp) => (
                        <div key={camp.id} onClick={() => { setSelectedCampaignId(camp.id); setView('detail'); }} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-2 rounded-lg ${camp.type === 'Client' ? 'bg-blue-100 text-blue-600' : 'bg-teal-100 text-mosaic-teal'}`}>
                                    {camp.type === 'Client' ? <Building2 className="w-5 h-5"/> : <Briefcase className="w-5 h-5"/>}
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${camp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {camp.status === 'Active' ? <Play className="w-3 h-3 fill-current"/> : <Pause className="w-3 h-3 fill-current"/>}
                                    {camp.status}
                                </span>
                            </div>
                            
                            <h3 className="font-bold text-slate-900 mb-1 truncate">{camp.name}</h3>
                            <p className="text-xs text-slate-500 mb-6">Target: {camp.target}</p>
                            
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <div className="text-center p-2 bg-slate-50 rounded group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-200">
                                    <div className="text-lg font-bold text-slate-800">{camp.stats.found}</div>
                                    <div className="text-[10px] text-slate-400 uppercase">Leads</div>
                                </div>
                                <div className="text-center p-2 bg-slate-50 rounded group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-200">
                                    <div className="text-lg font-bold text-blue-600">{camp.stats.sent}</div>
                                    <div className="text-[10px] text-slate-400 uppercase">Sent</div>
                                </div>
                                <div className="text-center p-2 bg-slate-50 rounded group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-200">
                                    <div className="text-lg font-bold text-green-600">{camp.stats.replies}</div>
                                    <div className="text-[10px] text-slate-400 uppercase">Replies</div>
                                </div>
                            </div>
                            <div className="text-xs text-center text-mosaic-teal font-bold opacity-0 group-hover:opacity-100 transition-opacity">View Details →</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Create View
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => setView('list')} className="p-2 hover:bg-slate-100 rounded-full"><ArrowLeft className="w-5 h-5 text-slate-500"/></button>
                <h2 className="text-2xl font-bold text-slate-900">Create Automation Campaign</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    {/* Step 1: Objective */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center"><Target className="w-4 h-4 mr-2 text-mosaic-teal"/> 1. Select Objective</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div 
                                onClick={() => setTargetType('candidate')}
                                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${targetType === 'candidate' ? 'border-mosaic-teal bg-teal-50' : 'border-slate-100 hover:border-teal-200'}`}
                            >
                                <div className="font-bold text-slate-800 mb-1">Find Candidates</div>
                                <p className="text-xs text-slate-500">Source talent for active job posts.</p>
                            </div>
                            <div 
                                onClick={() => setTargetType('client')}
                                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${targetType === 'client' ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200'}`}
                            >
                                <div className="font-bold text-slate-800 mb-1">Find Clients</div>
                                <p className="text-xs text-slate-500">Generate B2B leads for Mosaic.</p>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Targeting */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center"><Filter className="w-4 h-4 mr-2 text-mosaic-teal"/> 2. Targeting Criteria</h3>
                            {targetType === 'candidate' ? (
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Select Active Job</label>
                                    <select 
                                    className="w-full p-3 border border-slate-300 rounded-lg bg-white"
                                    value={selectedJobId}
                                    onChange={(e) => setSelectedJobId(e.target.value)}
                                    >
                                        {MOCK_JOBS.map(j => <option key={j.id} value={j.id}>{j.title} - {j.location}</option>)}
                                    </select>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Target Title</label>
                                        <input 
                                        className="w-full p-3 border border-slate-300 rounded-lg" 
                                        value={clientCriteria.title} 
                                        onChange={(e) => setClientCriteria({...clientCriteria, title: e.target.value})}
                                    />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                                        <input 
                                        className="w-full p-3 border border-slate-300 rounded-lg" 
                                        value={clientCriteria.location} 
                                        onChange={(e) => setClientCriteria({...clientCriteria, location: e.target.value})}
                                    />
                                    </div>
                                </div>
                            )}
                            
                            {step === 1 && (
                                <div className="mt-6 text-right">
                                    <Button onClick={handleGenerateAI} disabled={loading}>
                                        {loading ? <Zap className="w-4 h-4 animate-spin" /> : 'Generate AI Sequence'}
                                    </Button>
                                </div>
                            )}
                    </div>

                    {/* Step 3: Sequence */}
                    {step === 2 && (
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-fade-in">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center"><MessageSquare className="w-4 h-4 mr-2 text-mosaic-teal"/> 3. Outreach Sequence</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Boolean Search String</label>
                                    <div className="bg-slate-900 text-green-400 font-mono text-xs p-3 rounded mb-4 break-all">
                                        {generatedSearch}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Connection Request Note</label>
                                    <textarea className="w-full p-3 border border-slate-300 rounded text-sm" rows={3} defaultValue={generatedSequence.connection}></textarea>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Follow-Up Message (Delay: 3 Days)</label>
                                    <textarea className="w-full p-3 border border-slate-300 rounded text-sm" rows={3} defaultValue={generatedSequence.followUp}></textarea>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                                <Button onClick={handleLaunch} className="bg-green-600 hover:bg-green-700 text-white">Launch Campaign</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Icon helper
const DollarSignIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);

const ArrowRightIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

// --- Main Admin Dashboard ---
export const AdminDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState('overview');
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const renderView = () => {
      switch(activeView) {
          case 'overview': return <AnalyticsView />;
          case 'intelligence': return <OwlIntelligence />; // New view
          case 'workspace': return <RecruitingWorkspace />; 
          case 'clients': return <ClientManagement />;
          case 'candidates': return <CandidateTracking />;
          case 'dripify': return <DripifyAutomation />;
          default: return <AnalyticsView />;
      }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <img 
          src="https://picsum.photos/seed/infrastructure/1920/1080" 
          alt="Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-transparent to-slate-50"></div>
      </div>

      <AdminSidebar active={activeView} setActive={setActiveView} onLogout={handleLogout} />
      <div className="flex-1 ml-64 p-8 overflow-y-auto h-screen relative z-10">
        {renderView()}
      </div>
    </div>
  );
};

// Sub-components for Clients, Candidates, Workspace kept from previous logic for brevity in display but fully implemented in file structure
const ClientManagement = () => {
    const [selectedClient, setSelectedClient] = useState<any>(null);
    const clients = [
        { id: 1, name: 'Apex Engineering', contact: 'john@apex.com', phone: '512-555-0101', plan: 'Fractional Tier 2', status: 'Active', action: 'Send Monthly Report', urgent: true, notes: 'Looking for structural PEs only.' },
        { id: 2, name: 'BuildCorp Inc', contact: 'sarah@buildcorp.com', phone: '212-555-0199', plan: 'Single Job Post', status: 'Pending', action: 'Review Job Draft', urgent: false, notes: 'Need help with job description.' },
        { id: 3, name: 'GreenEarth', contact: 'mike@green.com', phone: '303-555-0123', plan: 'Recruiting Tier A', status: 'Active', action: 'Schedule Candidate Debrief', urgent: true, notes: 'Urgent hire for Env Scientist.' },
        { id: 4, name: 'City Infrastructure', contact: 'admin@city.gov', phone: '202-555-0155', plan: 'Volume Bundle', status: 'Onboarding', action: 'Sign Contract', urgent: true, notes: 'Government contract pending.' },
    ];

    if (selectedClient) {
        return (
            <div className="space-y-6">
                <button onClick={() => setSelectedClient(null)} className="flex items-center text-slate-500 hover:text-mosaic-teal text-sm font-bold">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Clients
                </button>
                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">{selectedClient.name}</h2>
                            <div className="flex gap-4 text-sm text-slate-500 mt-1">
                                <span className="flex items-center"><UserCheck className="w-4 h-4 mr-1"/> {selectedClient.contact}</span>
                                <span className="flex items-center"><Building2 className="w-4 h-4 mr-1"/> {selectedClient.plan}</span>
                            </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${selectedClient.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            {selectedClient.status}
                        </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Action Items</h3>
                            <div className={`p-4 rounded-lg border-l-4 ${selectedClient.urgent ? 'bg-red-50 border-red-500' : 'bg-slate-50 border-slate-300'}`}>
                                <p className="font-bold text-slate-800">{selectedClient.action}</p>
                                <Button size="sm" className="mt-3" variant="outline">Mark Complete</Button>
                            </div>
                            
                            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2 pt-4">Internal Notes</h3>
                            <textarea className="w-full p-3 border border-slate-200 rounded-lg text-sm" rows={4} defaultValue={selectedClient.notes}></textarea>
                            <Button size="sm">Save Notes</Button>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Active Jobs</h3>
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <p className="text-sm text-slate-500 italic">No active jobs found for this client.</p>
                                <Button size="sm" variant="ghost" className="mt-2">+ Assign Job</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Client Management</h2>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2"/> Export CSV</Button>
                    <Button size="sm">Add Client</Button>
                </div>
            </div>
            
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                 <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase">Company</th>
                            <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase">Plan</th>
                            <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                            <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase text-red-600">Next Action</th>
                            <th className="text-right px-6 py-3 text-xs font-bold text-slate-500 uppercase">Manage</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {clients.map((client) => (
                            <tr key={client.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedClient(client)}>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900">{client.name}</div>
                                    <div className="text-xs text-slate-500">{client.contact}</div>
                                </td>
                                <td className="px-6 py-4 text-sm"><span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-bold">{client.plan}</span></td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`flex items-center font-bold text-xs ${client.status === 'Active' ? 'text-green-600' : 'text-slate-500'}`}>
                                        <div className={`w-2 h-2 rounded-full mr-2 ${client.status === 'Active' ? 'bg-green-500' : 'bg-slate-400'}`}></div> 
                                        {client.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className={`flex items-center gap-2 text-sm font-bold ${client.urgent ? 'text-red-600' : 'text-slate-600'}`}>
                                        {client.urgent && <AlertCircle className="w-4 h-4" />}
                                        {client.action}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-right">
                                    <Button size="sm" variant="outline">Manage Work</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>
        </div>
    );
};

const CandidateTracking = () => {
    const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
    const candidates = [
        { id: 1, name: 'Jessica Parker', email: 'jess@gmail.com', package: 'Professional Brand', lastActive: '2 hrs ago', action: 'Schedule 1hr Coaching', status: 'Pending' },
        { id: 2, name: 'David Chen', email: 'david.c@yahoo.com', package: 'Career Boost', lastActive: '1 day ago', action: 'Review Resume Draft', status: 'In Progress' },
        { id: 3, name: 'Amanda Lewis', email: 'a.lewis@gmail.com', package: 'Free Resume Book', lastActive: '3 days ago', action: 'Send Newsletter', status: 'Active' },
        { id: 4, name: 'Mike Ross', email: 'mross@law.com', package: 'Featured Upgrade', lastActive: '5 hrs ago', action: 'Approve Profile Video', status: 'Pending' },
    ];

    if (selectedCandidate) {
        return (
             <div className="space-y-6">
                <button onClick={() => setSelectedCandidate(null)} className="flex items-center text-slate-500 hover:text-mosaic-teal text-sm font-bold">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Candidates
                </button>
                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-8">
                         <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-2xl font-serif font-bold text-slate-400">
                                {selectedCandidate.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">{selectedCandidate.name}</h2>
                                <p className="text-slate-500">{selectedCandidate.email}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <span className="inline-block bg-teal-100 text-mosaic-teal px-3 py-1 rounded-full text-sm font-bold mb-2">{selectedCandidate.package}</span>
                            <p className="text-xs text-slate-400">Last Active: {selectedCandidate.lastActive}</p>
                         </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                            <Activity className="w-4 h-4 mr-2 text-mosaic-teal" /> Package Progress
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-white rounded border border-slate-200">
                                <span className="text-sm font-medium text-slate-700">1. Intake Form</span>
                                <CheckCircle className="w-5 h-5 text-green-500" />
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white rounded border border-teal-200 ring-1 ring-teal-100">
                                <span className="text-sm font-bold text-mosaic-teal">2. {selectedCandidate.action}</span>
                                <Button size="sm">Start</Button>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white rounded border border-slate-200 opacity-50">
                                <span className="text-sm font-medium text-slate-700">3. Final Deliverables</span>
                                <span className="text-xs text-slate-400">Locked</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Candidate Tracking</h2>
                 <div className="relative">
                     <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
                     <input type="text" placeholder="Search candidates..." className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-mosaic-teal focus:outline-none w-64" />
                 </div>
            </div>
            
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase">Candidate</th>
                            <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase">Package</th>
                            <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase">Last Active</th>
                            <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase text-mosaic-teal">Action Item</th>
                            <th className="text-right px-6 py-3 text-xs font-bold text-slate-500 uppercase">Work</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {candidates.map((c) => (
                            <tr key={c.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedCandidate(c)}>
                                 <td className="px-6 py-4 font-bold text-slate-800">
                                    {c.name}
                                 </td>
                                 <td className="px-6 py-4 text-sm">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold 
                                        ${c.package === 'Professional Brand' ? 'bg-amber-100 text-amber-800' : 
                                          c.package === 'Career Boost' ? 'bg-teal-100 text-teal-800' : 
                                          'bg-slate-100 text-slate-600'}`}>
                                        {c.package}
                                    </span>
                                 </td>
                                 <td className="px-6 py-4 text-sm text-slate-500 flex items-center">
                                    <Clock className="w-3 h-3 mr-1" /> {c.lastActive}
                                 </td>
                                 <td className="px-6 py-4 text-sm font-medium text-slate-700 border-l-4 border-mosaic-teal bg-teal-50/50">
                                    {c.action}
                                 </td>
                                 <td className="px-6 py-4 text-right">
                                    <Button size="sm" variant={c.status === 'Pending' ? 'primary' : 'outline'}>
                                        Do Work
                                    </Button>
                                 </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const RecruitingWorkspace = () => {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [criteria, setCriteria] = useState({ role: '', location: '', keywords: '' });
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<any>(null);

    const adminJobs = MOCK_JOBS.map((job, idx) => ({
        ...job,
        priority: idx === 0 ? 'Urgent' : idx === 2 ? 'High' : 'Normal',
        serviceLevel: idx === 0 ? 'Recruiting' : idx === 1 ? 'Sourcing' : 'Job Post',
        needsAttention: idx === 0
    }));

    useEffect(() => {
        if (selectedJob) {
            setCriteria({
                role: selectedJob.title,
                location: selectedJob.location,
                keywords: 'Civil Engineering, Construction'
            });
            setResults(null);
        }
    }, [selectedJob]);

    const handleSearch = async () => {
        if (!criteria.role) return;
        setIsSearching(true);
        setResults(null);

        try {
            let searchStrings = { google: '', linkedin: '' };
            let profiles = [];

            if (process.env.API_KEY) {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const stringResp = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: `Create a boolean search string for finding a "${criteria.role}" in "${criteria.location}". Return JSON: { "google": "site:linkedin.com/in ...", "linkedin": "..." }`,
                });
                try {
                    const text = stringResp.text?.replace(/```json|```/g, '').trim();
                    searchStrings = JSON.parse(text || '{}');
                } catch (e) {
                    searchStrings = { google: `site:linkedin.com/in "${criteria.role}" ${criteria.location}`, linkedin: `${criteria.role} AND ${criteria.location}` };
                }
                const profileResp = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: `Generate 3 realistic candidate profiles for a ${criteria.role} in ${criteria.location}. Return JSON array: [{ "name": "...", "title": "...", "company": "...", "match": "95%" }]`,
                });
                try {
                    const text = profileResp.text?.replace(/```json|```/g, '').trim();
                    profiles = JSON.parse(text || '[]');
                } catch (e) {
                    profiles = [{ name: 'Simulated Profile', title: criteria.role, company: 'Example Co', match: '90%' }];
                }
            } else {
                await new Promise(r => setTimeout(r, 1500));
                searchStrings = { 
                    google: `site:linkedin.com/in ("${criteria.role}") AND "${criteria.location}"`,
                    linkedin: `${criteria.role} AND ${criteria.location}`
                };
                profiles = [
                    { name: 'Sarah Jenkins', title: criteria.role, company: 'Structure Inc.', match: '95%' },
                    { name: 'Michael Chang', title: `Senior ${criteria.role}`, company: 'Global Eng Group', match: '88%' },
                    { name: 'David Okonjo', title: criteria.role, company: 'City Dept of Works', match: '82%' }
                ];
            }
            setResults({ strings: searchStrings, profiles });
        } catch (e) {
            alert("AI Busy");
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="h-[calc(100vh-64px)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Recruiting Workspace</h2>
                    <p className="text-sm text-slate-500">Manage active searches and execute AI sourcing.</p>
                </div>
            </div>

            <div className="flex gap-6 flex-1 overflow-hidden">
                {/* Left Panel: Priority Job Queue */}
                <div className="w-1/3 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-slate-800 flex items-center">
                                <Target className="w-4 h-4 mr-2 text-mosaic-teal"/> Priority Queue
                            </h3>
                            <span className="text-xs bg-teal-100 text-mosaic-teal px-2 py-0.5 rounded-full font-bold">{adminJobs.length} Active</span>
                        </div>
                    </div>
                    <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
                        {adminJobs.sort((a,b) => (a.priority === 'Urgent' ? -1 : 1)).map(job => (
                            <div 
                                key={job.id} 
                                onClick={() => setSelectedJob(job as any)}
                                className={`p-4 cursor-pointer transition-colors border-l-4 ${selectedJob?.id === job.id ? 'bg-teal-50 border-mosaic-teal' : 'hover:bg-slate-50 border-transparent'}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                        job.priority === 'Urgent' ? 'bg-red-100 text-red-600 animate-pulse' : 
                                        job.priority === 'High' ? 'bg-orange-100 text-orange-600' : 
                                        'bg-slate-100 text-slate-500'
                                    }`}>
                                        {job.priority}
                                    </span>
                                    <span className={`text-[10px] font-bold uppercase ${
                                        job.serviceLevel === 'Recruiting' ? 'text-mosaic-teal' :
                                        job.serviceLevel === 'Sourcing' ? 'text-blue-600' :
                                        'text-slate-400'
                                    }`}>
                                        {job.serviceLevel}
                                    </span>
                                </div>
                                <h4 className="font-bold text-slate-900 text-sm mb-0.5">{job.title}</h4>
                                <p className="text-xs text-slate-500 mb-2">{job.company} • {job.location}</p>
                                <div className="flex justify-between items-center">
                                    <div className="text-xs text-slate-400 flex items-center">
                                        <Users className="w-3 h-3 mr-1" /> {job.applicationCount} Apps
                                    </div>
                                    <Button size="sm" variant={selectedJob?.id === job.id ? 'primary' : 'outline'} className="h-7 text-xs px-2">
                                        Work Job
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel: AI Workbench */}
                <div className="w-2/3 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    {selectedJob ? (
                        <div className="flex flex-col h-full">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{selectedJob.title}</h3>
                                    <p className="text-sm text-slate-600">{selectedJob.company} • {selectedJob.location}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">Service Level</div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                                        (selectedJob as any).serviceLevel === 'Recruiting' ? 'bg-teal-100 text-mosaic-teal' : 
                                        (selectedJob as any).serviceLevel === 'Sourcing' ? 'bg-blue-100 text-blue-700' : 
                                        'bg-slate-100 text-slate-700'
                                    }`}>
                                        {(selectedJob as any).serviceLevel}
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-4 flex items-center">
                                        <Search className="w-4 h-4 mr-2 text-mosaic-teal" /> AI Candidate Scout
                                    </h4>
                                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                                        <input 
                                            className="p-2 text-sm border border-slate-300 rounded"
                                            value={criteria.role}
                                            onChange={(e) => setCriteria({...criteria, role: e.target.value})}
                                            placeholder="Role"
                                        />
                                        <input 
                                            className="p-2 text-sm border border-slate-300 rounded"
                                            value={criteria.location}
                                            onChange={(e) => setCriteria({...criteria, location: e.target.value})}
                                            placeholder="Location"
                                        />
                                        <Button onClick={handleSearch} disabled={isSearching} className="bg-mosaic-teal text-white">
                                            {isSearching ? <Zap className="w-4 h-4 animate-spin" /> : 'Run Scout'}
                                        </Button>
                                    </div>

                                    {results && (
                                        <div className="space-y-4 animate-fade-in">
                                            <div className="bg-slate-900 p-4 rounded-lg text-slate-300">
                                                <div className="text-xs font-bold text-mosaic-dark mb-1 uppercase">X-Ray String</div>
                                                <code className="text-xs font-mono break-all">{results.strings.google}</code>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-xs font-bold text-slate-500 uppercase">Matches Found</p>
                                                {results.profiles.map((p: any, i: number) => (
                                                    <div key={i} className="flex justify-between items-center p-3 bg-white border border-slate-200 rounded-lg">
                                                        <div>
                                                            <div className="font-bold text-sm">{p.name}</div>
                                                            <div className="text-xs text-slate-500">{p.title}</div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-green-600 font-bold text-sm">{p.match} Match</span>
                                                            <Button size="sm" variant="outline">Pipeline +</Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h4 className="font-bold text-slate-800 mb-4">Quick Actions</h4>
                                    <div className="flex gap-3">
                                        <Button variant="outline" size="sm"><FileText className="w-4 h-4 mr-2"/> Edit Job Post</Button>
                                        <Button variant="outline" size="sm"><ExternalLink className="w-4 h-4 mr-2"/> View Public Page</Button>
                                        <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 border-red-200">Close Job</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                            <Briefcase className="w-16 h-16 mb-4 opacity-20" />
                            <p>Select a job from the queue to begin sourcing.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};