'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  CookieConsent,
  defaultConsent,
  acceptAllConsent,
  loadConsent,
  saveConsent,
  deleteNonEssentialCookies,
  CONSENT_VERSION,
} from '@/lib/cookies';

interface CookieConsentContextType {
  consent: CookieConsent | null;
  showBanner: boolean;
  showPreferences: boolean;
  isLoading: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (preferences: Partial<CookieConsent>) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  closeBanner: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load consent on mount
  useEffect(() => {
    const storedConsent = loadConsent();

    if (storedConsent) {
      setConsent(storedConsent);
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }

    setIsLoading(false);
  }, []);

  // Handle analytics loading when consent changes
  useEffect(() => {
    if (consent?.analytics) {
      // Load Google Analytics if consented
      loadGoogleAnalytics();
    } else if (consent && !consent.analytics) {
      // Remove analytics cookies if consent revoked
      deleteNonEssentialCookies();
    }
  }, [consent]);

  const loadGoogleAnalytics = () => {
    // Only load if not already loaded
    if (typeof window !== 'undefined' && !window.gtag) {
      const gaId = process.env.NEXT_PUBLIC_GA_ID;
      if (!gaId) return;

      // Load gtag script
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      script.async = true;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      };
      window.gtag('js', new Date());
      window.gtag('config', gaId, {
        anonymize_ip: true,
        cookie_flags: 'SameSite=Lax;Secure',
      });
    }
  };

  const acceptAll = useCallback(() => {
    const newConsent: CookieConsent = {
      ...acceptAllConsent,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    saveConsent(newConsent);
    setConsent(newConsent);
    setShowBanner(false);
    setShowPreferences(false);
  }, []);

  const rejectAll = useCallback(() => {
    const newConsent: CookieConsent = {
      ...defaultConsent,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    saveConsent(newConsent);
    setConsent(newConsent);
    deleteNonEssentialCookies();
    setShowBanner(false);
    setShowPreferences(false);
  }, []);

  const savePreferences = useCallback((preferences: Partial<CookieConsent>) => {
    const newConsent: CookieConsent = {
      necessary: true, // Always true
      analytics: preferences.analytics ?? false,
      marketing: preferences.marketing ?? false,
      preferences: preferences.preferences ?? false,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    saveConsent(newConsent);
    setConsent(newConsent);

    // Delete cookies for categories that are not consented
    if (!newConsent.analytics || !newConsent.marketing) {
      deleteNonEssentialCookies();
    }

    setShowBanner(false);
    setShowPreferences(false);
  }, []);

  const openPreferences = useCallback(() => {
    setShowPreferences(true);
  }, []);

  const closePreferences = useCallback(() => {
    setShowPreferences(false);
  }, []);

  const closeBanner = useCallback(() => {
    // Only close if consent exists
    if (consent) {
      setShowBanner(false);
    }
  }, [consent]);

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        showBanner,
        showPreferences,
        isLoading,
        acceptAll,
        rejectAll,
        savePreferences,
        openPreferences,
        closePreferences,
        closeBanner,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
}

// Add types for window
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
