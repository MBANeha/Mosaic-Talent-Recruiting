
export interface NavItem {
  label: string;
  path: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface Candidate {
  id: string;
  name?: string;
  title: string;
  experience: string;
  location: string;
  skills: string[];
  image: string;
  summary: string;
}

export interface Testimonial {
  text: string;
  author: string;
  company: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  salaryRange: string;
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Executive' | 'PE';
  description: string;
  postedDate: string;
  isFeatured?: boolean;
  isSponsored?: boolean;
  status: 'Active' | 'Draft' | 'Closed';
  applicationCount: number;
  sourcedCount: number;
  bounty?: string;
}

export interface SourcedCandidate {
  id: string;
  firstName: string; // Blurred if locked
  lastName: string; // Blurred if locked
  highestDegree?: string;
  title: string;
  experience: string;
  fitScore: number;
  notes: string;
  isUnlocked: boolean;
}

export interface EmployerProfile {
  companyName: string;
  contactName: string;
  email: string;
  credits: number;
  isFreePostUsed: boolean;
}

export interface AnalyticsData {
  name: string;
  visitors: number;
  applications: number;
  revenue: number;
}

export interface DripifyLead {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  status: 'Queued' | 'Connection Sent' | 'Connected' | 'Replied';
  profileUrl: string;
}

export interface DripifyCampaign {
  id: string;
  name: string;
  type: 'Candidate' | 'Client';
  target: string; // Job Title or "Client - HR"
  status: 'Active' | 'Paused' | 'Completed';
  leads: DripifyLead[];
  stats: {
    found: number;
    sent: number;
    accepted: number;
    replies: number;
  };
  sequence: {
    connection: string;
    followUp: string;
  };
}

export interface VolumeBundle {
  name: string;
  cost: string;
  discount: string;
  price: string;
  description: string;
  recommended?: boolean;
}

export interface RecruitingTier {
  position: string;
  experience: string;
  salary: string;
  monthly: string;
  threeMonth: string;
}

export interface CandidateProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  degree: string;
  hasPE: string;
  hasEIT: string;
  visaNeeded: string;
  linkedIn: string;
  interestedServices?: string[];
  timeline?: string;
  idealJobTitles?: string;
  preferredLocations?: string;
  preferredSalaryRange?: string;
  freeConsultation?: boolean;
  joinEmailList?: boolean;
}

export interface MarketSignal {
  id: string;
  company: string;
  signalType: 'Contract Win' | 'Funding' | 'Expansion' | 'Executive Hire';
  description: string;
  date: string;
  impactScore: number; // 1-100
  suggestedAction: string;
}

export interface OwlMatch {
  candidateId: string;
  jobId: string;
  score: number; // 0-100
  matchReasons: string[];
  missingSkills: string[];
}