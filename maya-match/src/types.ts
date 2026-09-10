// Core domain types for the Maya Dream Dates prototype.
// A single client-side store (see data/store.tsx) plays the role of the
// shared database referenced across the member, matchmaker/admin, and
// growth surfaces described in the product spec.

export type PoolStatus = 'BUILDING' | 'GROWING' | 'ACTIVE';
export type RegionStatus = 'EARLY' | 'BUILDING' | 'READY' | 'ACTIVE';

export type MembershipTier = 'NONE' | 'FOUNDING' | 'SAPPHIRE' | 'AMETHYST' | 'DIAMOND';

export type ReviewDecision = 'NOT_SUBMITTED' | 'PENDING' | 'INVITED' | 'BUILDING_POOL' | 'NOT_FIT';

export type AiRecommendation = 'STRONG_FIT' | 'WAITLIST' | 'NOT_CURRENTLY_FIT';

export interface InvitationInput {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  state: string;
  nearestMetro: string;
  datingRadius: string;
  age: string;
  gender: string;
  interestedIn: string;
  culturalBackground: string;
  culturalImportance: string;
  relationshipStatus: string;
  childrenStatus: string;
  relationshipGoal: string;
  whyMaya: string;
  referralSource: string;
  mayaInsiderOptIn: boolean;
  referredByCode?: string;
}

export interface AboutMeSection {
  career: string;
  education: string;
  lifestyle: string;
  interests: string;
  personality: string;
  typicalWeekend: string;
}

export interface MyRelationshipSection {
  relationshipHistory: string;
  timeSingle: string;
  goals: string;
  wantsMarriage: string;
  wantsChildren: string;
  familyValues: string;
  whatHasntWorked: string;
}

export interface MyPersonSection {
  ageRangeMin: string;
  ageRangeMax: string;
  geography: string;
  culturalPreference: string;
  religiousPreference: string;
  careerEducationPreference: string;
  lifestylePreference: string;
  personalityPreference: string;
  familyGoalsPreference: string;
  dealbreakers: string;
  niceToHaves: string;
}

export interface TellMayaSection {
  greatPartnerTraits: string;
  currentlyWorkingOn: string;
  whatFriendsLove: string;
  passions: string;
  whatPartnerShouldUnderstand: string;
  secondDateFactor: string;
  incomeRange: string;
  investmentPosture: string;
}

export interface MatchProfile {
  aboutMe: Partial<AboutMeSection>;
  myRelationship: Partial<MyRelationshipSection>;
  myPerson: Partial<MyPersonSection>;
  tellMaya: Partial<TellMayaSection>;
}

export type ProfileSectionKey = keyof MatchProfile;

export interface Member {
  id: string;
  createdAt: number;
  isDemoUser: boolean;
  invitation: InvitationInput;
  matchProfile: MatchProfile;
  profileCompletion: number; // 0-100
  region: string;
  poolStatus: PoolStatus;
  reviewStatus: ReviewDecision;
  aiRecommendation?: AiRecommendation;
  reviewSubmittedAt?: number;
  reviewDecidedAt?: number;
  reviewNote?: string;
  membershipTier: MembershipTier;
  membershipActive: boolean;
  consultationRequired: boolean;
  consultationPaid: boolean;
  dreamDatesCredits: number; // available (not yet committed) roses
  committedCredits: number;
  totalCreditsGranted: number;
  activeRequestLimit: number;
  referralCode: string;
  referredCount: number;
  referralCreditsEarned: number;
  /** Private password gating access to this member's curated profiles (Dream Dates picks). Demo-only, stored client-side. */
  dreamDatesPassword?: string;
  freeDatesAlumni?: boolean;
  /** Answers to Maya's "get to know you" companion questions, in the order they were asked. */
  mayaAnswers: MayaQA[];
}

export interface PickCandidate {
  id: string;
  firstName: string;
  age: number;
  metro: string;
  profession: string;
  education: string;
  culture: string;
  religion?: string;
  relationshipGoal: string;
  familyGoal: string;
  interests: string[];
  mayaSummary: string;
  photoGradient: string; // css gradient token, avoids external photo dependency
  /** Deterministic demo behavior once a rose is sent */
  willAccept: boolean;
  /** Deterministic demo behavior for post-date feedback */
  willSayYesAfterDate: boolean;
  contactEmail: string;
  contactPhone: string;
}

export type DreamDateRequestStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'EXPIRED';

export interface DreamDateRequest {
  id: string;
  memberId: string;
  pickId: string;
  status: DreamDateRequestStatus;
  createdAt: number;
  expiresAt: number;
  resolvedAt?: number;
}

export type ScheduledDateStatus = 'SCHEDULED' | 'COMPLETED';

export interface DateFeedback {
  wantsToSeeAgain: 'YES' | 'NOT_FOR_ME' | 'MAYBE';
  chemistry: number;
  conversation: number;
  values: number;
  lifestyle: number;
  attraction: number;
  whatWorked: string;
  whatDidnt: string;
  anythingElse: string;
  consentToExchange: boolean;
  submittedAt: number;
}

export interface ScheduledDate {
  id: string;
  requestId: string;
  memberId: string;
  pickId: string;
  status: ScheduledDateStatus;
  scheduledFor: string; // human readable slot label
  createdAt: number;
  memberFeedback?: DateFeedback;
  pickFeedback?: DateFeedback;
  mutual?: boolean;
  contactExchanged?: boolean;
  journeyStage?: 'MUTUAL_MATCH' | 'CONTACT_EXCHANGED' | 'SECOND_DATE' | 'DATING' | 'RELATIONSHIP';
}

export interface Region {
  id: string;
  name: string;
  status: RegionStatus;
  qualified: number;
  ageBandPct: number;
  poolBalance: number; // 0-100, 100 = perfectly balanced
  reciprocalMatches: number;
  strongSegments: string[];
  weakSegments: string[];
  growthRecommendation: string;
}

export interface MayaQA {
  id: string;
  question: string;
  answer: string;
  ack: string;
  askedAt: number;
  answeredAt: number;
}

export type InboxMessageKind = 'text' | 'audio';
export type InboxSender = 'member' | 'pick';

export interface InboxMessage {
  id: string;
  dateId: string;
  sender: InboxSender;
  kind: InboxMessageKind;
  text?: string;
  audioDataUrl?: string;
  audioDurationSec?: number;
  createdAt: number;
}

export type MigrationDecision = 'INVITE_NOW' | 'UPDATE_PROFILE' | 'DONT_MIGRATE' | 'PENDING_REVIEW';
export type MigrationStatus = 'Not Yet Invited' | 'Invited' | 'Opened' | 'Profile Updated' | 'Joined' | 'Sapphire' | 'VIP';

export interface MigrationCandidate {
  id: string;
  name: string;
  email: string;
  city: string;
  priorEngagement: string;
  mayaDecision: MigrationDecision;
  status: MigrationStatus;
}
