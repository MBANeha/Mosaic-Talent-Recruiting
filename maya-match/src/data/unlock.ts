// Session-only "is this browser unlocked to view this member's curated profiles" flag.
// Deliberately not part of the persisted store: it should reset every new browser session,
// the same way a real password gate would ask again after you close the app.
const key = (memberId: string) => `maya-profiles-unlocked-${memberId}`;

export function isProfilesUnlocked(memberId: string): boolean {
  try {
    return sessionStorage.getItem(key(memberId)) === '1';
  } catch {
    return false;
  }
}

export function markProfilesUnlocked(memberId: string): void {
  try {
    sessionStorage.setItem(key(memberId), '1');
  } catch {
    // ignore — private browsing / storage blocked
  }
}
