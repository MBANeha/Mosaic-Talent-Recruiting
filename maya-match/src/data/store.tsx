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
  InboxMessage,
  MayaQA,
  ReferralInvite,
} from '../types';
import {
  REGIONS,
  PICKS,
  SEED_MEMBERS,
  MIGRATION_CANDIDATES,
  ADMIN_TODAY_BASE,
  INBOX_OPENER_LINES,
  INBOX_REPLY_LINES,
  MAYA_ACK_LINES,
  MAYA_QUESTIONS,
} from './seed';
import { markProfilesUnlocked } from './unlock';

const STORAGE_KEY = 'maya-dream-dates-db-v1';

interface DB {
  members: Member[];
  currentMemberId: string | null;
  regions: Region[];
  dateRequests: DreamDateRequest[];
  scheduledDates: ScheduledDate[];
  migrationCandidates: MigrationCandidate[];
  messages: InboxMessage[];
  referralInvites: ReferralInvite[];
}

function loadDB(): DB {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DB;
      if (!parsed.messages) parsed.messages = [];
      if (!parsed.referralInvites) parsed.referralInvites = [];
      return parsed;
    }
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
    messages: [],
    referralInvites: [],
  };
}

function randomFrom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
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
  answerMayaQuestion: (memberId: string, questionId: string, questionText: string, answer: string) => void;
  requestDreamDate: (memberId: string, pickId: string) => DreamDateRequest | null;
  resolveRequest: (requestId: string) => void;
  scheduleDate: (requestId: string, slotLabel: string) => void;
  submitMemberFeedback: (dateId: string, feedback: Omit<DateFeedback, 'submittedAt'>) => void;
  requestsForMember: (memberId: string) => DreamDateRequest[];
  datesForMember: (memberId: string) => ScheduledDate[];
  memberById: (id: string) => Member | undefined;
  pickById: (id: string) => (typeof PICKS)[number] | undefined;
  advanceJourney: (dateId: string) => void;
  ensureInboxOpened: (dateId: string) => void;
  sendTextMessage: (dateId: string, text: string) => void;
  sendAudioMessage: (dateId: string, audioDataUrl: string, durationSec: number) => void;
  messagesForDate: (dateId: string) => InboxMessage[];
  sendReferralInvite: (memberId: string, friendName: string, friendEmail: string) => ReferralInvite;
  referralInvitesForMember: (memberId: string) => ReferralInvite[];
  advanceMigration: (id: string) => void;
  setMigrationDecision: (id: string, decision: MigrationCandidate['mayaDecision']) => void;
  adminToday: typeof ADMIN_TODAY_BASE;
  reviewQueue: Member[];
  resetDemo: () => void;
  seedPreviewMember: () => { memberId: string; mutualDateId: string; upcomingDateId: string; notMutualDateId: string };
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

  function scheduleReply(dateId: string) {
    const delay = 1300 + Math.random() * 1400;
    setTimeout(() => {
      setDb((prev) => {
        const reply: InboxMessage = {
          id: `msg-${Date.now()}-r`,
          dateId,
          sender: 'pick',
          kind: 'text',
          text: randomFrom(INBOX_REPLY_LINES),
          createdAt: Date.now(),
        };
        return { ...prev, messages: [...prev.messages, reply] };
      });
    }, delay);
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
      const referralCode = randomCode(input.firstName + input.lastName);
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
        referralCode,
        referredCount: 0,
        referralCreditsEarned: 0,
        mayaAnswers: [],
      };
      const friendName = input.friendReferralName.trim();
      const friendEmail = input.friendReferralEmail.trim();
      const referrerFullName = `${input.firstName} ${input.lastName}`.trim();
      const friendInvite: ReferralInvite | null =
        friendName && friendEmail
          ? {
              id: `refinv-${Date.now()}`,
              memberId: id,
              friendName,
              friendEmail,
              message: `Your friend, ${referrerFullName}, thought you'd be interested in our service. Here is your special invitation: www.mayamatch.com/request-invitation?ref=${referralCode}`,
              sentAt: Date.now(),
            }
          : null;
      setDb((prev) => ({
        ...prev,
        members: [...prev.members, newMember],
        currentMemberId: id,
        referralInvites: friendInvite ? [...prev.referralInvites, friendInvite] : prev.referralInvites,
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

    answerMayaQuestion(memberId, questionId, questionText, answer) {
      const qa: MayaQA = {
        id: questionId,
        question: questionText,
        answer,
        ack: randomFrom(MAYA_ACK_LINES),
        askedAt: Date.now(),
        answeredAt: Date.now(),
      };
      updateMember(memberId, (m) => ({ mayaAnswers: [...m.mayaAnswers, qa] }));
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

    ensureInboxOpened(dateId) {
      setDb((prev) => {
        if (prev.messages.some((m) => m.dateId === dateId)) return prev;
        const date = prev.scheduledDates.find((d) => d.id === dateId);
        if (!date) return prev;
        const opener: InboxMessage = {
          id: `msg-${Date.now()}-open`,
          dateId,
          sender: 'pick',
          kind: 'text',
          text: randomFrom(INBOX_OPENER_LINES),
          createdAt: Date.now(),
        };
        return { ...prev, messages: [...prev.messages, opener] };
      });
    },

    sendTextMessage(dateId, text) {
      const msg: InboxMessage = {
        id: `msg-${Date.now()}`,
        dateId,
        sender: 'member',
        kind: 'text',
        text,
        createdAt: Date.now(),
      };
      setDb((prev) => ({ ...prev, messages: [...prev.messages, msg] }));
      scheduleReply(dateId);
    },

    sendAudioMessage(dateId, audioDataUrl, durationSec) {
      const msg: InboxMessage = {
        id: `msg-${Date.now()}`,
        dateId,
        sender: 'member',
        kind: 'audio',
        audioDataUrl,
        audioDurationSec: durationSec,
        createdAt: Date.now(),
      };
      setDb((prev) => ({ ...prev, messages: [...prev.messages, msg] }));
      scheduleReply(dateId);
    },

    messagesForDate(dateId) {
      return db.messages.filter((m) => m.dateId === dateId).sort((a, b) => a.createdAt - b.createdAt);
    },

    sendReferralInvite(memberId, friendName, friendEmail) {
      const member = db.members.find((m) => m.id === memberId);
      const referrerName = member ? `${member.invitation.firstName} ${member.invitation.lastName}`.trim() : 'A Maya Match member';
      const link = `www.mayamatch.com/request-invitation?ref=${member?.referralCode ?? ''}`;
      const invite: ReferralInvite = {
        id: `refinv-${Date.now()}`,
        memberId,
        friendName,
        friendEmail,
        message: `Your friend, ${referrerName}, thought you'd be interested in our service. Here is your special invitation: ${link}`,
        sentAt: Date.now(),
      };
      setDb((prev) => ({ ...prev, referralInvites: [...prev.referralInvites, invite] }));
      return invite;
    },

    referralInvitesForMember(memberId) {
      return db.referralInvites
        .filter((r) => r.memberId === memberId)
        .sort((a, b) => b.sentAt - a.sentAt);
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
        messages: [],
        referralInvites: [],
      });
    },

    seedPreviewMember() {
      const id = `preview-${Date.now()}`;
      const now = Date.now();
      const day = 24 * 60 * 60 * 1000;

      const invitation: InvitationInput = {
        firstName: 'Preview',
        lastName: 'Member',
        email: 'preview@mayamatch.com',
        city: 'New York',
        state: 'NY',
        nearestMetro: 'NYC Metro',
        datingRadius: '25 miles',
        age: '34',
        gender: 'Woman',
        interestedIn: 'Men',
        raceEthnicity: 'South Asian (Punjabi)',
        partnerRaceEthnicity: 'South Asian',
        religion: 'Sikh',
        partnerReligion: 'Open',
        relationshipStatus: 'Single',
        childrenStatus: 'None, wants children',
        relationshipGoal: 'Marriage-minded',
        whyMaya: 'Ready for something intentional, curated by someone who actually reads the profile.',
        referralSource: 'Preview tool',
        referrerName: '',
        mayaInsiderOptIn: true,
        confirmedSingle: true,
        photoDataUrl: '',
        socialNetwork: 'Instagram',
        socialHandle: '@preview.member',
        budgetInterest: ['Amethyst — $549–$629', 'Diamond — $749–$849'],
        friendReferralName: '',
        friendReferralEmail: '',
      };

      const matchProfile: MatchProfile = {
        aboutMe: {
          career: 'Product lead at a healthcare startup.',
          education: 'MBA, NYU Stern',
          lifestyle: 'Early mornings, weekend hikes, always mid-way through a nonfiction book.',
          interests: 'Ceramics, trail running, hosting dinner parties',
          personality: 'Warm but direct — says what she means.',
          typicalWeekend: 'Farmers market, a long run, dinner with three close friends.',
        },
        myRelationship: {
          relationshipHistory: 'One long relationship that ended amicably two years ago.',
          timeSingle: 'About a year, dated casually in between.',
          goals: 'Ready to date with real intention again.',
          wantsMarriage: 'Yes',
          wantsChildren: 'Yes, within the next few years',
          familyValues: 'Close-knit, sees family most weekends.',
          whatHasntWorked: 'Dating apps that reward volume over fit.',
        },
        myPerson: {
          ageRangeMin: '32',
          ageRangeMax: '42',
          geography: 'NYC metro, open to North Jersey',
          culturalPreference: 'South Asian preferred, open otherwise',
          religiousPreference: 'Open',
          careerEducationPreference: 'Driven in whatever they do',
          lifestylePreference: 'Active, social but not a partier',
          personalityPreference: 'Confident, funny, emotionally available',
          familyGoalsPreference: 'Wants children',
          dealbreakers: 'Not ready for commitment, inconsistent effort',
          niceToHaves: 'Loves to cook, close with their family',
        },
        tellMaya: {
          greatPartnerTraits: 'Deeply loyal and a genuinely great listener.',
          currentlyWorkingOn: 'Being more patient with how long good things take.',
          whatFriendsLove: 'That she remembers the small details.',
          passions: 'Ceramics, mentoring young women in product',
          whatPartnerShouldUnderstand: 'Work matters to her, but it will never come first.',
          secondDateFactor: 'Easy conversation and genuine curiosity about my life.',
          incomeRange: '$150k-$200k',
          investmentPosture: 'Saves consistently, invests conservatively.',
        },
      };

      const region = db.regions.find((r) => r.name === 'NYC Metro') ?? db.regions[0];

      const previewMember: Member = {
        id,
        createdAt: now - 6 * day,
        isDemoUser: true,
        invitation,
        matchProfile,
        profileCompletion: 100,
        region: region.name,
        poolStatus: 'ACTIVE',
        reviewStatus: 'INVITED',
        aiRecommendation: 'STRONG_FIT',
        reviewSubmittedAt: now - 5 * day,
        reviewDecidedAt: now - 4 * day,
        membershipTier: 'DIAMOND',
        membershipActive: true,
        consultationRequired: true,
        consultationPaid: true,
        dreamDatesCredits: 8,
        committedCredits: 2,
        totalCreditsGranted: 11,
        activeRequestLimit: 3,
        referralCode: 'PREVIEW01',
        referredCount: 3,
        referralCreditsEarned: 60,
        dreamDatesPassword: 'preview',
        mayaAnswers: [
          {
            id: MAYA_QUESTIONS[0].id,
            question: MAYA_QUESTIONS[0].question,
            answer: 'When they remember something small I mentioned weeks ago.',
            ack: randomFrom(MAYA_ACK_LINES),
            askedAt: now - 3 * day,
            answeredAt: now - 3 * day,
          },
          {
            id: MAYA_QUESTIONS[1].id,
            question: MAYA_QUESTIONS[1].question,
            answer: 'Farmers market, a long run, then cooking for friends.',
            ack: randomFrom(MAYA_ACK_LINES),
            askedAt: now - 2 * day,
            answeredAt: now - 2 * day,
          },
        ],
      };

      const req1: DreamDateRequest = {
        id: `preview-req-1-${now}`,
        memberId: id,
        pickId: 'pick-2',
        status: 'ACCEPTED',
        createdAt: now - 2 * day,
        expiresAt: now - 2 * day + 48 * 60 * 60 * 1000,
        resolvedAt: now - 2 * day + 60 * 60 * 1000,
      };
      const upcomingDate: ScheduledDate = {
        id: `preview-date-upcoming-${now}`,
        requestId: req1.id,
        memberId: id,
        pickId: 'pick-2',
        status: 'SCHEDULED',
        scheduledFor: 'Sat 11:00 AM ET',
        createdAt: now - 1 * day,
      };

      const req2: DreamDateRequest = {
        id: `preview-req-2-${now}`,
        memberId: id,
        pickId: 'pick-1',
        status: 'ACCEPTED',
        createdAt: now - 5 * day,
        expiresAt: now - 5 * day + 48 * 60 * 60 * 1000,
        resolvedAt: now - 5 * day + 60 * 60 * 1000,
      };
      const memberFeedback2: DateFeedback = {
        wantsToSeeAgain: 'YES',
        chemistry: 5,
        conversation: 5,
        values: 4,
        lifestyle: 4,
        attraction: 4,
        whatWorked: 'Conversation just flowed — talked the full 30 minutes without noticing the time.',
        whatDidnt: '',
        anythingElse: '',
        consentToExchange: true,
        submittedAt: now - 4 * day,
      };
      const pickFeedback2: DateFeedback = {
        wantsToSeeAgain: 'YES',
        chemistry: 4,
        conversation: 5,
        values: 4,
        lifestyle: 4,
        attraction: 4,
        whatWorked: 'Easy conversation, aligned values.',
        whatDidnt: '',
        anythingElse: '',
        consentToExchange: true,
        submittedAt: now - 4 * day,
      };
      const mutualDate: ScheduledDate = {
        id: `preview-date-mutual-${now}`,
        requestId: req2.id,
        memberId: id,
        pickId: 'pick-1',
        status: 'COMPLETED',
        scheduledFor: 'Thu 7:00 PM ET',
        createdAt: now - 4.5 * day,
        memberFeedback: memberFeedback2,
        pickFeedback: pickFeedback2,
        mutual: true,
        contactExchanged: true,
        journeyStage: 'CONTACT_EXCHANGED',
      };

      const req3: DreamDateRequest = {
        id: `preview-req-3-${now}`,
        memberId: id,
        pickId: 'pick-3',
        status: 'ACCEPTED',
        createdAt: now - 6 * day,
        expiresAt: now - 6 * day + 48 * 60 * 60 * 1000,
        resolvedAt: now - 6 * day + 60 * 60 * 1000,
      };
      const memberFeedback3: DateFeedback = {
        wantsToSeeAgain: 'MAYBE',
        chemistry: 3,
        conversation: 3,
        values: 3,
        lifestyle: 3,
        attraction: 2,
        whatWorked: 'Pleasant conversation.',
        whatDidnt: "Didn't feel much spark.",
        anythingElse: '',
        consentToExchange: true,
        submittedAt: now - 5.5 * day,
      };
      const pickFeedback3: DateFeedback = {
        wantsToSeeAgain: 'NOT_FOR_ME',
        chemistry: 2,
        conversation: 3,
        values: 2,
        lifestyle: 3,
        attraction: 2,
        whatWorked: 'Pleasant, but not a fit.',
        whatDidnt: '',
        anythingElse: '',
        consentToExchange: false,
        submittedAt: now - 5.5 * day,
      };
      const notMutualDate: ScheduledDate = {
        id: `preview-date-notmutual-${now}`,
        requestId: req3.id,
        memberId: id,
        pickId: 'pick-3',
        status: 'COMPLETED',
        scheduledFor: 'Sun 4:00 PM ET',
        createdAt: now - 5.8 * day,
        memberFeedback: memberFeedback3,
        pickFeedback: pickFeedback3,
        mutual: false,
        contactExchanged: false,
      };

      const inboxMessages: InboxMessage[] = [
        {
          id: `preview-msg-1-${now}`,
          dateId: mutualDate.id,
          sender: 'pick',
          kind: 'text',
          text: 'Hi! Really glad Maya matched us 💜 Looking forward to getting to know you more here.',
          createdAt: now - 4 * day,
        },
        {
          id: `preview-msg-2-${now}`,
          dateId: mutualDate.id,
          sender: 'member',
          kind: 'text',
          text: 'Same! That was such an easy conversation.',
          createdAt: now - 4 * day + 5 * 60 * 1000,
        },
        {
          id: `preview-msg-3-${now}`,
          dateId: mutualDate.id,
          sender: 'pick',
          kind: 'text',
          text: 'When are you free again?',
          createdAt: now - 4 * day + 10 * 60 * 1000,
        },
      ];

      setDb((prev) => ({
        ...prev,
        members: [...prev.members.filter((m) => !m.id.startsWith('preview-')), previewMember],
        currentMemberId: id,
        dateRequests: [...prev.dateRequests.filter((r) => !r.id.startsWith('preview-')), req1, req2, req3],
        scheduledDates: [
          ...prev.scheduledDates.filter((d) => !d.id.startsWith('preview-')),
          upcomingDate,
          mutualDate,
          notMutualDate,
        ],
        messages: [...prev.messages.filter((msg) => !msg.id.startsWith('preview-')), ...inboxMessages],
      }));

      markProfilesUnlocked(id);

      return {
        memberId: id,
        mutualDateId: mutualDate.id,
        upcomingDateId: upcomingDate.id,
        notMutualDateId: notMutualDate.id,
      };
    },
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
