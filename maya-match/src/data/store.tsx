import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type {
  Member,
  InvitationInput,
  MatchProfile,
  ProfileSectionKey,
  Region,
  DreamDateRequest,
  ScheduledDate,
  DateFeedback,
  MembershipTier,
  MigrationCandidate,
} from '../types';
import { REGIONS, PICKS, SEED_MEMBERS, MIGRATION_CANDIDATES, ADMIN_TODAY_BASE } from './seed';

const STORAGE_KEY = 'maya-dream-dates-db-v1';

interface DB {
  members: Member[];
  currentMemberId: string | null;
  regions: Region[];
  dateRequests: DreamDateRequest[];
  scheduledDates: ScheduledDate[];
  migrationCandidates: MigrationCandidate[];
}

function loadDB(): DB {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as DB;
  } catch {
    // fall through to fresh seed
  }
  return {
    members: SEED_MEMBERS,
    currentMemberId: null,
    regions: REGIONS,
    dateRequests: [],
    scheduledDates: [],
    migrationCandidates: MIGRATION_CANDIDATES,
  };
}

const TIER_CREDITS: Record<MembershipTier, number> = {
  NONE: 0,
  FOUNDING: 0,
  SAPPHIRE: 3,
  AMETHYST: 7,
  DIAMOND: 11,
};

const TIER_REQUEST_LIMIT: Record<MembershipTier, number> = {
  NONE: 0,
  FOUNDING: 0,
  SAPPHIRE: 1,
  AMETHYST: 3,
  DIAMOND: 3,
};

function regionStatusToPoolStatus(status: Region['status']): Member['poolStatus'] {
  if (status === 'ACTIVE' || status === 'READY') return 'ACTIVE';
  if (status === 'BUILDING') return 'GROWING';
  return 'BUILDING';
}

function computeCompletion(profile: MatchProfile): number {
  const sections: ProfileSectionKey[] = ['aboutMe', 'myRelationship', 'myPerson', 'tellMaya'];
  let filled = 0;
  let total = 0;
  sections.forEach((key) => {
    const section = profile[key] as Record<string, string>;
    const values = Object.values(section);
    total += Math.max(values.length, 1) || 1;
    filled += values.filter((v) => v && v.trim().length > 0).length;
  });
  // account for sections that might be entirely empty (no keys yet)
  const fieldCounts: Record<ProfileSectionKey, number> = {
    aboutMe: 6,
    myRelationship: 7,
    myPerson: 11,
    tellMaya: 8,
  };
  const totalFields = Object.values(fieldCounts).reduce((a, b) => a + b, 0);
  let filledFields = 0;
  sections.forEach((key) => {
    const section = profile[key] as Record<string, string>;
    filledFields += Object.values(section).filter((v) => v && v.trim().length > 0).length;
  });
  return Math.min(100, Math.round((filledFields / totalFields) * 100));
}

function randomCode(base: string) {
  const suffix = Math.floor(Math.random() * 90 + 10);
  return `${base.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 6)}${suffix}`;
}

interface StoreValue {
  db: DB;
  currentMember: Member | null;
  regions: Region[];
  migrationCandidates: MigrationCandidate[];
  picks: typeof PICKS;
  requestInvitation: (input: InvitationInput) => string;
  updateProfileSection: <K extends ProfileSectionKey>(memberId: string, section: K, data: Partial<MatchProfile[K]>) => void;
  submitProfileForReview: (memberId: string) => void;
  adminDecide: (memberId: string, decision: 'INVITED' | 'BUILDING_POOL' | 'NOT_FIT', note?: string) => void;
  purchaseMembership: (memberId: string, tier: MembershipTier) => void;
  payConsultation: (memberId: string) => void;
  setDreamDatesPassword: (memberId: string, password: string) => void;
  requestDreamDate: (memberId: string, pickId: string) => DreamDateRequest | null;
  resolveRequest: (requestId: string) => void;
  scheduleDate: (requestId: string, slotLabel: string) => void;
  submitMemberFeedback: (dateId: string, feedback: Omit<DateFeedback, 'submittedAt'>) => void;
  requestsForMember: (memberId: string) => DreamDateRequest[];
  datesForMember: (memberId: string) => ScheduledDate[];
  memberById: (id: string) => Member | undefined;
  pickById: (id: string) => (typeof PICKS)[number] | undefined;
  advanceJourney: (dateId: string) => void;
  advanceMigration: (id: string) => void;
  setMigrationDecision: (id: string, decision: MigrationCandidate['mayaDecision']) => void;
  adminToday: typeof ADMIN_TODAY_BASE;
  reviewQueue: Member[];
  resetDemo: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [db, setDb] = useState<DB>(loadDB);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  }, [db]);

  const currentMember = useMemo(
    () => db.members.find((m) => m.id === db.currentMemberId) ?? null,
    [db.members, db.currentMemberId]
  );

  function updateMember(id: string, patch: Partial<Member> | ((m: Member) => Partial<Member>)) {
    setDb((prev) => ({
      ...prev,
      members: prev.members.map((m) => {
        if (m.id !== id) return m;
        const resolved = typeof patch === 'function' ? patch(m) : patch;
        return { ...m, ...resolved };
      }),
    }));
  }

  const value: StoreValue = {
    db,
    currentMember,
    regions: db.regions,
    migrationCandidates: db.migrationCandidates,
    picks: PICKS,
    adminToday: ADMIN_TODAY_BASE,

    requestInvitation(input) {
      const id = `member-${Date.now()}`;
      const region = db.regions.find((r) => r.name === input.nearestMetro) ?? db.regions[0];
      const newMember: Member = {
        id,
        createdAt: Date.now(),
        isDemoUser: true,
        invitation: input,
        matchProfile: { aboutMe: {}, myRelationship: {}, myPerson: {}, tellMaya: {} },
        profileCompletion: 0,
        region: region.name,
        poolStatus: regionStatusToPoolStatus(region.status),
        reviewStatus: 'NOT_SUBMITTED',
        membershipTier: 'NONE',
        membershipActive: false,
        consultationRequired: false,
        consultationPaid: false,
        dreamDatesCredits: 0,
        committedCredits: 0,
        totalCreditsGranted: 0,
        activeRequestLimit: 0,
        referralCode: randomCode(input.firstName + input.lastName),
        referredCount: 0,
        referralCreditsEarned: 0,
      };
      setDb((prev) => ({
        ...prev,
        members: [...prev.members, newMember],
        currentMemberId: id,
      }));
      return id;
    },

    updateProfileSection(memberId, section, data) {
      updateMember(memberId, (m) => {
        const nextProfile: MatchProfile = {
          ...m.matchProfile,
          [section]: { ...m.matchProfile[section], ...data },
        };
        return {
          matchProfile: nextProfile,
          profileCompletion: computeCompletion(nextProfile),
        };
      });
    },

    submitProfileForReview(memberId) {
      updateMember(memberId, {
        reviewStatus: 'PENDING',
        reviewSubmittedAt: Date.now(),
        aiRecommendation: 'STRONG_FIT',
      });
    },

    adminDecide(memberId, decision, note) {
      updateMember(memberId, {
        reviewStatus: decision,
        reviewDecidedAt: Date.now(),
        reviewNote: note,
      });
    },

    purchaseMembership(memberId, tier) {
      updateMember(memberId, (m) => {
        const credits = TIER_CREDITS[tier];
        return {
          membershipTier: tier,
          membershipActive: true,
          consultationRequired: tier === 'SAPPHIRE' || tier === 'AMETHYST' || tier === 'DIAMOND',
          dreamDatesCredits: m.dreamDatesCredits + credits,
          totalCreditsGranted: m.totalCreditsGranted + credits,
          activeRequestLimit: TIER_REQUEST_LIMIT[tier],
        };
      });
    },

    payConsultation(memberId) {
      updateMember(memberId, { consultationPaid: true });
    },

    setDreamDatesPassword(memberId, password) {
      updateMember(memberId, { dreamDatesPassword: password });
    },

    requestDreamDate(memberId, pickId) {
      const member = db.members.find((m) => m.id === memberId);
      if (!member) return null;
      if (member.dreamDatesCredits <= 0) return null;
      const activePending = db.dateRequests.filter(
        (r) => r.memberId === memberId && r.status === 'PENDING'
      ).length;
      if (activePending >= member.activeRequestLimit) return null;

      const request: DreamDateRequest = {
        id: `req-${Date.now()}`,
        memberId,
        pickId,
        status: 'PENDING',
        createdAt: Date.now(),
        expiresAt: Date.now() + 48 * 60 * 60 * 1000,
      };
      setDb((prev) => ({ ...prev, dateRequests: [...prev.dateRequests, request] }));
      updateMember(memberId, (m) => ({ dreamDatesCredits: m.dreamDatesCredits - 1 }));
      return request;
    },

    resolveRequest(requestId) {
      setDb((prev) => {
        const request = prev.dateRequests.find((r) => r.id === requestId);
        if (!request) return prev;
        const pick = PICKS.find((p) => p.id === request.pickId);
        const accepted = pick?.willAccept ?? true;
        const nextRequests = prev.dateRequests.map((r) =>
          r.id === requestId
            ? { ...r, status: (accepted ? 'ACCEPTED' : 'DECLINED') as DreamDateRequest['status'], resolvedAt: Date.now() }
            : r
        );
        return { ...prev, dateRequests: nextRequests };
      });
      // return credit if declined
      const request = db.dateRequests.find((r) => r.id === requestId);
      const pick = request && PICKS.find((p) => p.id === request.pickId);
      if (request && pick && !pick.willAccept) {
        updateMember(request.memberId, (m) => ({ dreamDatesCredits: m.dreamDatesCredits + 1 }));
      } else if (request && pick) {
        updateMember(request.memberId, (m) => ({ committedCredits: m.committedCredits + 1 }));
      }
    },

    scheduleDate(requestId, slotLabel) {
      const request = db.dateRequests.find((r) => r.id === requestId);
      if (!request) return;
      const scheduled: ScheduledDate = {
        id: `date-${Date.now()}`,
        requestId,
        memberId: request.memberId,
        pickId: request.pickId,
        status: 'SCHEDULED',
        scheduledFor: slotLabel,
        createdAt: Date.now(),
      };
      setDb((prev) => ({ ...prev, scheduledDates: [...prev.scheduledDates, scheduled] }));
    },

    submitMemberFeedback(dateId, feedback) {
      setDb((prev) => {
        const nextDates = prev.scheduledDates.map((d) => {
          if (d.id !== dateId) return d;
          const pick = PICKS.find((p) => p.id === d.pickId);
          const pickFeedback: DateFeedback = {
            wantsToSeeAgain: pick?.willSayYesAfterDate ? 'YES' : 'NOT_FOR_ME',
            chemistry: pick?.willSayYesAfterDate ? 4 : 2,
            conversation: pick?.willSayYesAfterDate ? 5 : 3,
            values: pick?.willSayYesAfterDate ? 4 : 2,
            lifestyle: pick?.willSayYesAfterDate ? 4 : 3,
            attraction: pick?.willSayYesAfterDate ? 4 : 2,
            whatWorked: pick?.willSayYesAfterDate ? 'Easy conversation, aligned values.' : 'Pleasant, but not a fit.',
            whatDidnt: '',
            anythingElse: '',
            consentToExchange: !!pick?.willSayYesAfterDate,
            submittedAt: Date.now(),
          };
          const memberFeedback: DateFeedback = { ...feedback, submittedAt: Date.now() };
          const mutual = memberFeedback.wantsToSeeAgain === 'YES' && pickFeedback.wantsToSeeAgain === 'YES';
          const contactExchanged = mutual && memberFeedback.consentToExchange && pickFeedback.consentToExchange;
          return {
            ...d,
            status: 'COMPLETED' as const,
            memberFeedback,
            pickFeedback,
            mutual,
            contactExchanged,
            journeyStage: contactExchanged ? ('CONTACT_EXCHANGED' as const) : mutual ? ('MUTUAL_MATCH' as const) : undefined,
          };
        });
        return { ...prev, scheduledDates: nextDates };
      });
    },

    requestsForMember(memberId) {
      return db.dateRequests.filter((r) => r.memberId === memberId);
    },

    datesForMember(memberId) {
      return db.scheduledDates.filter((d) => d.memberId === memberId);
    },

    memberById(id) {
      return db.members.find((m) => m.id === id);
    },

    pickById(id) {
      return PICKS.find((p) => p.id === id);
    },

    advanceJourney(dateId) {
      const order: NonNullable<ScheduledDate['journeyStage']>[] = [
        'MUTUAL_MATCH',
        'CONTACT_EXCHANGED',
        'SECOND_DATE',
        'DATING',
        'RELATIONSHIP',
      ];
      setDb((prev) => ({
        ...prev,
        scheduledDates: prev.scheduledDates.map((d) => {
          if (d.id !== dateId || !d.journeyStage) return d;
          const idx = order.indexOf(d.journeyStage);
          return { ...d, journeyStage: order[Math.min(idx + 1, order.length - 1)] };
        }),
      }));
    },

    advanceMigration(id) {
      const order: MigrationCandidate['status'][] = [
        'Not Yet Invited',
        'Invited',
        'Opened',
        'Profile Updated',
        'Joined',
        'Sapphire',
      ];
      setDb((prev) => ({
        ...prev,
        migrationCandidates: prev.migrationCandidates.map((c) => {
          if (c.id !== id) return c;
          const idx = order.indexOf(c.status);
          const next = order[Math.min(idx + 1, order.length - 1)];
          return { ...c, status: next };
        }),
      }));
    },

    setMigrationDecision(id, decision) {
      setDb((prev) => ({
        ...prev,
        migrationCandidates: prev.migrationCandidates.map((c) =>
          c.id === id ? { ...c, mayaDecision: decision } : c
        ),
      }));
    },

    get reviewQueue() {
      return db.members.filter((m) => m.reviewStatus === 'PENDING');
    },

    resetDemo() {
      localStorage.removeItem(STORAGE_KEY);
      setDb({
        members: SEED_MEMBERS,
        currentMemberId: null,
        regions: REGIONS,
        dateRequests: [],
        scheduledDates: [],
        migrationCandidates: MIGRATION_CANDIDATES,
      });
    },
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
