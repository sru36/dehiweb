/**
 * Authentication and donor utilities
 */

export type UserSession = {
  name?: string;
  email?: string;
  loggedInAt?: string;
  signedUpAt?: string;
};

export type DonationIntent = {
  id?: number | string;
  title?: string;
  amount?: number;
  source: 'campaign' | 'banner' | 'fundraiser' | 'other';
  cause?: string;
  createdAt: string;
};

export type DonationRecord = {
  id: string;
  title: string;
  ngo?: string;
  cause?: string;
  amount: number;
  date: string; // ISO string
};

const LS_KEYS = {
  token: 'userToken',
  session: 'userSession',
  firstIntent: 'firstDonationIntent',
  lastIntent: 'lastDonationIntent',
  donationHistory: 'donationHistory',
} as const;

/** Simple auth check */
export function isAuthenticated(): boolean {
  try {
    const userToken = localStorage.getItem(LS_KEYS.token);
    const userSession = localStorage.getItem(LS_KEYS.session);
    return !!(userToken || userSession);
  } catch {
    return false;
  }
}

/** Get current user session (if any) */
export function getUserSession(): UserSession | null {
  try {
    const raw = localStorage.getItem(LS_KEYS.session);
    return raw ? (JSON.parse(raw) as UserSession) : null;
  } catch {
    return null;
  }
}

/** Decide where the Donate button should send users */
export function getDonateRedirect(): string {
  return isAuthenticated() ? '/donate' : '/login';
}

/** Record the donation intent when a user clicks a Donate CTA */
export function recordDonationIntent(intent: Omit<DonationIntent, 'createdAt'>): void {
  const payload: DonationIntent = { ...intent, createdAt: new Date().toISOString() };
  try {
    const existingFirst = localStorage.getItem(LS_KEYS.firstIntent);
    if (!existingFirst) {
      localStorage.setItem(LS_KEYS.firstIntent, JSON.stringify(payload));
    }
    localStorage.setItem(LS_KEYS.lastIntent, JSON.stringify(payload));
  } catch {
    // ignore
  }
}

export function getFirstDonationIntent(): DonationIntent | null {
  try {
    const raw = localStorage.getItem(LS_KEYS.firstIntent);
    return raw ? (JSON.parse(raw) as DonationIntent) : null;
  } catch {
    return null;
  }
}

/** Donation history stored locally (until backend wiring) */
export function getDonationHistory(): DonationRecord[] {
  try {
    const raw = localStorage.getItem(LS_KEYS.donationHistory);
    return raw ? (JSON.parse(raw) as DonationRecord[]) : [];
  } catch {
    return [];
  }
}

export function addDonation(record: DonationRecord): void {
  try {
    const list = getDonationHistory();
    list.push(record);
    localStorage.setItem(LS_KEYS.donationHistory, JSON.stringify(list));
  } catch {
    // ignore
  }
}

/** Donors Club helpers (12-month rolling window to reach ₹10,000) */
export function getDonorsClubProgress() {
  const TARGET = 10000;
  const now = new Date();
  const windowStart = new Date(now);
  windowStart.setMonth(windowStart.getMonth() - 12);

  const total = getDonationHistory()
    .filter((d) => new Date(d.date) >= windowStart && new Date(d.date) <= now)
    .reduce((sum, d) => sum + Math.max(0, d.amount || 0), 0);

  const progress = Math.max(0, Math.min(100, Math.floor((total / TARGET) * 100)));
  const remaining = Math.max(0, TARGET - total);

  return { total, target: TARGET, progress, remaining, windowStart: windowStart.toISOString(), windowEnd: now.toISOString() };
}

export function isDonorsClubEligible(): boolean {
  return getDonorsClubProgress().total >= 10000;
}

/** Utility: derive a friendly name for greetings */
export function getDisplayName(): string {
  const session = getUserSession();
  if (session?.name && session.name.trim()) return session.name.trim();
  if (session?.email) return session.email.split('@')[0];
  return 'Friend';
}

/** Utility: simple unique member id from email */
export function getMemberId(): string | null {
  const session = getUserSession();
  const email = session?.email;
  if (!email) return null;
  let hash = 0;
  for (let i = 0; i < email.length; i++) hash = (hash * 31 + email.charCodeAt(i)) >>> 0;
  const base = hash.toString(36).toUpperCase();
  return `DEHI-${base.slice(0, 4)}-${base.slice(4, 8)}`;
}

/** Logout helper */
export function logout(): void {
  try {
    localStorage.removeItem(LS_KEYS.token);
    localStorage.removeItem(LS_KEYS.session);
    // keep donation history, but clear intents
    localStorage.removeItem(LS_KEYS.firstIntent);
    localStorage.removeItem(LS_KEYS.lastIntent);
  } catch {
    // ignore
  }
}
