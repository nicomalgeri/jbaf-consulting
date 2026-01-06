// Cookie utility functions for JBAF Consulting

export type CookieCategory = 'necessary' | 'analytics' | 'marketing' | 'preferences';

export interface CookieConsent {
  necessary: boolean; // Always true, required for site functionality
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: string;
  version: string;
}

export const CONSENT_COOKIE_NAME = 'jbaf_cookie_consent';
export const CONSENT_VERSION = '1.0';
export const CONSENT_EXPIRY_DAYS = 365;

// Default consent (only necessary cookies)
export const defaultConsent: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
  timestamp: '',
  version: CONSENT_VERSION,
};

// Accept all consent
export const acceptAllConsent: CookieConsent = {
  necessary: true,
  analytics: true,
  marketing: true,
  preferences: true,
  timestamp: '',
  version: CONSENT_VERSION,
};

/**
 * Set a cookie with the given name, value, and expiry days
 */
export function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`;
}

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
}

/**
 * Delete a cookie by name
 */
export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax;Secure`;
}

/**
 * Save cookie consent to a cookie
 */
export function saveConsent(consent: CookieConsent): void {
  const consentWithTimestamp: CookieConsent = {
    ...consent,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };

  setCookie(CONSENT_COOKIE_NAME, JSON.stringify(consentWithTimestamp), CONSENT_EXPIRY_DAYS);
}

/**
 * Load cookie consent from cookie
 */
export function loadConsent(): CookieConsent | null {
  const consentStr = getCookie(CONSENT_COOKIE_NAME);

  if (!consentStr) return null;

  try {
    const consent = JSON.parse(consentStr) as CookieConsent;

    // Check if consent version matches, if not return null to show banner again
    if (consent.version !== CONSENT_VERSION) {
      return null;
    }

    return consent;
  } catch {
    return null;
  }
}

/**
 * Check if user has given consent
 */
export function hasConsent(): boolean {
  return loadConsent() !== null;
}

/**
 * Check if a specific category is consented
 */
export function hasCategoryConsent(category: CookieCategory): boolean {
  const consent = loadConsent();
  if (!consent) return category === 'necessary';
  return consent[category] ?? false;
}

/**
 * Delete all non-necessary cookies
 */
export function deleteNonEssentialCookies(): void {
  if (typeof document === 'undefined') return;

  // List of analytics/marketing cookies to delete
  const cookiesToDelete = [
    '_ga',
    '_ga_*',
    '_gid',
    '_gat',
    '_gcl_au',
    '__utma',
    '__utmb',
    '__utmc',
    '__utmz',
  ];

  const cookies = document.cookie.split(';');

  for (const cookie of cookies) {
    const cookieName = cookie.split('=')[0].trim();

    // Delete if in list or matches pattern
    if (
      cookiesToDelete.includes(cookieName) ||
      cookieName.startsWith('_ga_') ||
      cookieName.startsWith('_gat_')
    ) {
      deleteCookie(cookieName);
      // Also try deleting with domain variations
      document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
      document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
    }
  }
}

/**
 * Cookie information for legal documentation
 */
export const cookieInfo = {
  necessary: [
    {
      name: 'jbaf_cookie_consent',
      provider: 'JBAF Consulting',
      purpose: 'Stores your cookie consent preferences',
      expiry: '1 year',
      type: 'First-party',
    },
  ],
  analytics: [
    {
      name: '_ga',
      provider: 'Google Analytics',
      purpose: 'Distinguishes unique users by assigning a randomly generated number as a client identifier',
      expiry: '2 years',
      type: 'Third-party',
    },
    {
      name: '_ga_*',
      provider: 'Google Analytics',
      purpose: 'Used to persist session state for Google Analytics 4',
      expiry: '2 years',
      type: 'Third-party',
    },
    {
      name: '_gid',
      provider: 'Google Analytics',
      purpose: 'Distinguishes users for analytics purposes',
      expiry: '24 hours',
      type: 'Third-party',
    },
  ],
  marketing: [],
  preferences: [],
};
