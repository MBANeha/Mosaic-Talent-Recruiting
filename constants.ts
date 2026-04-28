
import { NavItem, Candidate, PricingTier, Testimonial, Job, SourcedCandidate, AnalyticsData, DripifyCampaign, MarketSignal, VolumeBundle } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Job Board', path: '/jobs' },
  { label: 'Candidates', path: '/candidates' },
  { label: 'Employer Solutions', path: '/employers' },
];

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Civil Engineer (PE)',
    company: 'Apex Infrastructure',
    location: 'Austin, TX',
    type: 'Full-time',
    salaryRange: '$110k - $140k',
    experienceLevel: 'PE',
    description: 'Leading a team of 5 EITs on municipal water projects.',
    postedDate: '2023-10-25',
    isFeatured: true,
    status: 'Active',
    applicationCount: 12,
    sourcedCount: 5,
    bounty: '5000'
  },
  {
    id: '2',
    title: 'Construction Project Manager',
    company: 'BuildCorp',
    location: 'Remote / Travel',
    type: 'Contract',
    salaryRange: '$130k - $160k',
    experienceLevel: 'Senior',
    description: 'Overseeing commercial high-rise developments.',
    postedDate: '2023-10-28',
    status: 'Active',
    applicationCount: 8,
    sourcedCount: 3,
    bounty: '7500'
  },
  {
    id: '3',
    title: 'Environmental Scientist',
    company: 'GreenEarth Consultants',
    location: 'Denver, CO',
    type: 'Full-time',
    salaryRange: '$80k - $100k',
    experienceLevel: 'Mid',
    description: 'Field work and reporting for EIA statements.',
    postedDate: '2023-11-01',
    isSponsored: true,
    status: 'Active',
    applicationCount: 24,
    sourcedCount: 8,
    bounty: '3000'
  }
];

export const MOCK_SOURCED_CANDIDATES: SourcedCandidate[] = [
  {
    id: 'c1',
    firstName: 'James',
    lastName: 'Sullivan',
    highestDegree: 'M.S. Structural Engineering',
    title: 'Senior Structural Engineer',
    experience: '12 Years',
    fitScore: 96,
    notes: 'Perfect match for the bridge project. Has PE and 5 years leadership.',
    isUnlocked: false
  },
  {
    id: 'c2',
    firstName: 'Sarah',
    lastName: 'Connor',
    highestDegree: 'B.S. Construction Management',
    title: 'Project Manager',
    experience: '8 Years',
    fitScore: 88,
    notes: 'Strong background in commercial construction. PMP certified.',
    isUnlocked: false
  },
  {
    id: 'c3',
    firstName: 'Michael',
    lastName: 'Chang',
    highestDegree: 'B.S. Civil Engineering',
    title: 'Lead Civil Engineer',
    experience: '15 Years',
    fitScore: 92,
    notes: 'Previously at AECOM. Looking for smaller firm culture.',
    isUnlocked: true // Example of an already unlocked one
  }
];

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: '1',
    name: 'Jessica Parker',
    title: 'Senior Project Manager',
    experience: '12 Years',
    location: 'New York, NY',
    skills: ['Civil Engineering', 'Construction Mgmt', 'PMP'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    summary: 'Expert in large-scale infrastructure projects with a track record of delivering under budget.',
  },
  {
    id: '2',
    name: 'David Chen',
    title: 'Structural Engineer (PE)',
    experience: '8 Years',
    location: 'Austin, TX',
    skills: ['Revit', 'AutoCAD', 'Steel Structures'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    summary: 'Specialized in high-rise residential structural design and seismic retrofitting.',
  },
  {
    id: '3',
    name: 'Amanda Lewis',
    title: 'Environmental Consultant',
    experience: '5 Years',
    location: 'Denver, CO',
    skills: ['EIA', 'Regulatory Compliance', 'Sustainability'],
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    summary: 'Focused on environmental impact assessments for transportation sector clients.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    text: "Mosaic understood our technical requirements immediately. We hired a Lead PE in 3 weeks.",
    author: "Sarah J.",
    company: "Regional Engineering Firm"
  },
  {
    text: "The video-first approach saved us hours of screening time. Highly recommended.",
    author: "Mike T.",
    company: "Construction Corp"
  }
];

export const EMPLOYER_TIERS: PricingTier[] = [
  {
    name: "Tier A: Standard",
    price: "$5,000/mo",
    description: "Perfect for standard engineering roles.",
    features: ["3-month minimum", "Dedicated Recruiter", "Weekly Reporting", "Standard Sourcing"]
  },
  {
    name: "Tier B: Technical/PE",
    price: "$7,500/mo",
    description: "For specialized technical and PE-track roles.",
    features: ["Priority Sourcing", "Technical Screening", "Video Intros", "Market Mapping"],
    recommended: true
  },
  {
    name: "Tier C: Leadership",
    price: "$15,000/mo",
    description: "Executive search for Senior/Director roles.",
    features: ["Executive Search Strategy", "Confidential Outreach", "Salary Negotiation Support", "360 Reference Checks"]
  }
];

export const RECRUITING_PRICING = [
  {
    position: "Entry Level/Inspectors",
    experience: "up to 5 years of experience",
    salary: "up to $100k",
    monthly: "$2,500",
    threeMonth: "$7,500"
  },
  {
    position: "Mid level Engineers",
    experience: "5-10 years of experience",
    salary: "$100-$150k",
    monthly: "$5,000",
    threeMonth: "$15,000"
  },
  {
    position: "Management level",
    experience: "10+ years",
    salary: "$150k-$250k",
    monthly: "$7,000",
    threeMonth: "$21,000"
  }
];

export const FRACTIONAL_PLANS = [
  {
    name: "Essential Partnership",
    price: "$4,000",
    description: "Foundational recruiting teamwork",
    capacity: "2–3 active positions",
    roles: "Entry-level / early career (≤ $100K)",
    features: [
      "Candidate sourcing + outreach",
      "Resume screening",
      "Initial phone screens",
      "Shortlist of qualified candidates",
      "Basic interview coordination",
      "Weekly email updates"
    ],
    costPerHire: "$1,333 – $2,000",
    bestFor: "Firms hiring a small number of roles and needing structured support",
    color: "green"
  },
  {
    name: "Growth Partnership",
    price: "$7,000",
    description: "Structured recruiting for scaling teams",
    capacity: "4–6 active positions",
    roles: "Mid-level professionals (≤ $150K)",
    features: [
      "Everything in Essential, PLUS:",
      "Deeper sourcing channels",
      "Candidate interview prep",
      "Interview scheduling+",
      "Weekly check-in calls",
      "Market insights"
    ],
    costPerHire: "$1,167 – $1,750",
    bestFor: "Growing firms hiring across multiple teams.",
    color: "blue"
  },
  {
    name: "Integrated Talent Partner",
    price: "$10,000",
    description: "Your dedicated recruiting partner",
    capacity: "7–10 active positions",
    roles: "All levels including senior hires",
    features: [
      "Everything in Growth, PLUS:",
      "Full-cycle recruiting ownership",
      "Dedicated recruiter",
      "Deep candidate vetting",
      "Offer support + negotiation",
      "Pipeline dashboard",
      "Process optimization"
    ],
    costPerHire: "$1,000 – $1,429",
    bestFor: "Companies scaling hiring across teams.",
    recommended: true,
    color: "purple"
  },
  {
    name: "Your Dedicated Recruiting Team",
    price: "$20,000",
    description: "Fully managed talent acquisition partnership",
    capacity: "11–15 active positions",
    roles: "All levels + executive searches",
    features: [
      "Everything in Partner, PLUS:",
      "Dedicated recruiter + sourcer",
      "Executive search support",
      "Workforce planning",
      "Hiring roadmap strategy",
      "Employer branding input",
      "Advanced metrics"
    ],
    costPerHire: "$1,333 – $1,818",
    bestFor: "High-growth firms & large-scale needs.",
    color: "amber"
  }
];

export const VOLUME_BUNDLES = [
  {
    name: "3 Role Basic",
    cost: "$7,500",
    discount: "10%",
    price: "$6,750",
    launchPrice: "$6,075",
    description: "Perfect for small teams."
  },
  {
    name: "5 Roles",
    cost: "$22,000",
    discount: "20%",
    price: "$17,600",
    launchPrice: "$15,840",
    description: "2 Entry, 2 Mid, 1 Mgmt.",
    recommended: true
  },
  {
    name: "7 Roles",
    cost: "$29,500",
    discount: "30%",
    price: "$20,650",
    launchPrice: "$18,585",
    description: "3 Entry, 3 Mid, 1 Mgmt."
  },
  {
    name: "11 Roles",
    cost: "$44,500",
    discount: "50%",
    price: "$22,250",
    launchPrice: "$20,025",
    description: "Mix with 1 Mgmt Level."
  }
];

export const MOCK_ANALYTICS: AnalyticsData[] = [
  { name: 'Mon', visitors: 120, applications: 4, revenue: 200 },
  { name: 'Tue', visitors: 145, applications: 7, revenue: 700 },
  { name: 'Wed', visitors: 180, applications: 12, revenue: 500 },
  { name: 'Thu', visitors: 160, applications: 9, revenue: 1000 },
  { name: 'Fri', visitors: 210, applications: 15, revenue: 1200 },
  { name: 'Sat', visitors: 90, applications: 3, revenue: 0 },
  { name: 'Sun', visitors: 85, applications: 5, revenue: 200 },
];

export const MOCK_DRIPIFY_CAMPAIGNS: DripifyCampaign[] = [
  {
    id: '1',
    name: 'Civil PE Outreach - NY',
    type: 'Candidate',
    target: 'Civil Engineer (PE)',
    status: 'Active',
    leads: [
        { id: 'l1', name: 'Robert Fox', title: 'Senior Civil Engineer', company: 'Aecom', location: 'New York, NY', status: 'Connection Sent', profileUrl: '#' },
        { id: 'l2', name: 'Jenny Wilson', title: 'Civil PE', company: 'WSP', location: 'New York, NY', status: 'Replied', profileUrl: '#' }
    ],
    stats: {
        found: 450,
        sent: 320,
        accepted: 89,
        replies: 45
    },
    sequence: {
        connection: "Hi, came across your profile...",
        followUp: "Just following up..."
    }
  },
  {
    id: '2',
    name: 'Construction PMs - TX',
    type: 'Candidate',
    target: 'Project Manager',
    status: 'Active',
    leads: [],
    stats: {
        found: 600,
        sent: 580,
        accepted: 185,
        replies: 88
    },
    sequence: {
        connection: "Hi, we help construction firms hire...",
        followUp: "Any interest?"
    }
  },
  {
    id: '3',
    name: 'Environmental Scientists - Remote',
    type: 'Candidate',
    target: 'Environmental Scientist',
    status: 'Paused',
    leads: [],
    stats: {
        found: 200,
        sent: 200,
        accepted: 15,
        replies: 12
    },
    sequence: {
        connection: "Hi, looking for remote scientists...",
        followUp: "Checking in..."
    }
  },
];

export const MOCK_MARKET_SIGNALS: MarketSignal[] = [
  {
    id: 's1',
    company: 'Turner Construction',
    signalType: 'Contract Win',
    description: 'Awarded $450M contract for new Airport Terminal expansion in Newark.',
    date: '2 days ago',
    impactScore: 95,
    suggestedAction: 'Target Project Managers & Superintendents in NJ area.'
  },
  {
    id: 's2',
    company: 'Jacobs',
    signalType: 'Expansion',
    description: 'Opening new water infrastructure division in Texas.',
    date: '4 days ago',
    impactScore: 88,
    suggestedAction: 'Source Civil PEs with Water/Wastewater exp in Austin/Dallas.'
  },
  {
    id: 's3',
    company: 'Bohler Engineering',
    signalType: 'Executive Hire',
    description: 'New VP of Land Development appointed.',
    date: '1 week ago',
    impactScore: 75,
    suggestedAction: 'Connect with new VP for hiring needs.'
  }
];
