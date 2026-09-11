// Client-side matchmaker login gate. Demo-only — like the member profile password,
// this protects against casual access on a shared browser, not real authentication.
const ADMIN_PASSWORD = 'kumar';
const SESSION_KEY = 'maya-admin-unlocked';

export function checkAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function isAdminUnlocked(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

export function markAdminUnlocked(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    // ignore — private browsing / storage blocked
  }
}

export function clearAdminUnlocked(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}
