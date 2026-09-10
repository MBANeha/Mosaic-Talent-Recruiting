import type { Member, DreamDateRequest, ScheduledDate } from '../types';

export interface MayaStep {
  message: string;
  ctaLabel?: string;
  ctaTo?: string;
}

interface JourneyContext {
  requests: DreamDateRequest[];
  dates: ScheduledDate[];
}

/** Maya, speaking in her own voice, telling the member what she'd do next if she were them. */
export function getMayaNextStep(m: Member, { requests, dates }: JourneyContext): MayaStep {
  const hasPendingRequest = requests.some((r) => r.status === 'PENDING');
  const upcomingDate = dates.find((d) => d.status === 'SCHEDULED');
  const awaitingFeedback = dates.find((d) => d.status === 'SCHEDULED');
  const hasMutualMatch = dates.some((d) => d.mutual);

  if (m.profileCompletion < 100) {
    return {
      message: "Let's finish your Match Profile first — the more I know about you, the better I can match you.",
      ctaLabel: 'Continue My Profile',
      ctaTo: '/profile',
    };
  }
  if (m.reviewStatus === 'NOT_SUBMITTED') {
    return {
      message: 'Your profile looks complete — send it my way and I\'ll start reviewing you personally.',
      ctaLabel: 'Submit to Maya',
      ctaTo: '/profile',
    };
  }
  if (m.reviewStatus === 'PENDING') {
    return {
      message: "I'm reading through your profile right now. I'll have a decision for you soon — hang tight.",
    };
  }
  if (m.reviewStatus === 'NOT_FIT') {
    return {
      message: "This round wasn't a fit, but I'll keep you on file — I'll reach out if that changes.",
    };
  }
  if (m.reviewStatus === 'INVITED' && !m.membershipActive) {
    return {
      message: "You're in! Pick the plan that fits where you are and I'll start sending you people.",
      ctaLabel: 'See My Options',
      ctaTo: '/decision',
    };
  }
  if (m.reviewStatus === 'BUILDING_POOL' && !m.membershipActive) {
    return {
      message: "Your pool's still filling out, but join as a Founding Member now and I'll keep you first in line.",
      ctaLabel: 'Join as Founding Member',
      ctaTo: '/decision',
    };
  }
  if (hasPendingRequest) {
    return {
      message: "I'm checking whether the interest is mutual on your rose — I'll let you know the moment I hear back.",
    };
  }
  if (upcomingDate) {
    return {
      message: "You've got a Dream Date coming up. Want a tip before you go? I've got one below.",
      ctaLabel: 'View My Dream Dates',
      ctaTo: '/dates',
    };
  }
  if (awaitingFeedback) {
    return {
      message: 'How did your date go? Tell me honestly — it helps me get your next picks even more right.',
      ctaLabel: 'Leave Feedback',
      ctaTo: '/dates',
    };
  }
  if (hasMutualMatch) {
    return {
      message: "You two hit it off — don't leave them on read, the inbox is right there waiting.",
      ctaLabel: 'Open Maya Match Inbox',
      ctaTo: '/matches',
    };
  }
  if (m.membershipActive && m.dreamDatesCredits > 0) {
    return {
      message: "You've got Dream Date credits sitting there — come see who I picked for you this week.",
      ctaLabel: 'View My Maya Picks',
      ctaTo: '/picks',
    };
  }
  if (m.membershipActive) {
    return {
      message: "You're all set up. When you're ready for more Dream Dates, I've got a plan for that.",
      ctaLabel: 'See Membership Options',
      ctaTo: '/pricing',
    };
  }
  return {
    message: "Let's get your invitation started — that's step one, and it only takes a minute.",
    ctaLabel: 'Request Your Invitation',
    ctaTo: '/request-invitation',
  };
}

const TIP_POOL_PRE_DATE = [
  'Ask one specific follow-up question instead of jumping to a new topic — it shows you were really listening.',
  "Treat it like a conversation, not an interview. It's okay to let a silence sit for a second.",
  'Have one story ready that shows (not tells) what you care about. It travels further than a list of facts.',
  "Log in a minute early and put your phone somewhere you can't see it.",
];

const TIP_POOL_WAITING = [
  'While you wait, jot down what actually mattered on your last few dates — the patterns show up fast.',
  "A rose that doesn't land isn't a reflection on you — it just means the reciprocal fit wasn't there yet.",
  'Use this pause to update anything in your profile that no longer feels true.',
];

const TIP_POOL_PICKING = [
  "Don't just skim the photo and job title — read the line I wrote about why I picked them, twice.",
  'Chemistry on paper and chemistry in person are different things. Stay a little curious, not just picky.',
  'If two people both interest you, send the rose to the one you keep re-reading, not the one that looks best on paper.',
];

const TIP_POOL_PROFILE = [
  'Specific beats impressive. "I make Sunday dinner for my whole building" says more than "I love cooking."',
  'Write your dealbreakers as plainly as your nice-to-haves — vague dealbreakers are the hardest ones for me to match around.',
  'A future partner reading this should be able to picture a Tuesday with you, not just a highlight reel.',
];

const TIP_POOL_GENERAL = [
  "The goal isn't to be impressive — it's to be findable by the right person.",
  "Slow is normal here. I'd rather get you three real matches than thirty forgettable ones.",
  'A good match will make the effort easy, not something you have to talk yourself into.',
  'Confidence reads less as certainty and more as being at ease with not being certain.',
];

function pickStable<T>(pool: T[], seed: string): T {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return pool[hash % pool.length];
}

/** A tip tailored to where the member is right now, stable for the session (doesn't flicker on re-render). */
export function getMayaTip(m: Member, { requests, dates }: JourneyContext): string {
  const hasPendingRequest = requests.some((r) => r.status === 'PENDING');
  const upcomingDate = dates.some((d) => d.status === 'SCHEDULED');

  let pool = TIP_POOL_GENERAL;
  let tag = 'general';
  if (upcomingDate) {
    pool = TIP_POOL_PRE_DATE;
    tag = 'pre-date';
  } else if (hasPendingRequest) {
    pool = TIP_POOL_WAITING;
    tag = 'waiting';
  } else if (m.membershipActive && m.dreamDatesCredits > 0) {
    pool = TIP_POOL_PICKING;
    tag = 'picking';
  } else if (m.profileCompletion < 100) {
    pool = TIP_POOL_PROFILE;
    tag = 'profile';
  }

  return pickStable(pool, m.id + tag);
}
