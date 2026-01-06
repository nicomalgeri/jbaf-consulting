'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, BarChart3, Megaphone, Settings } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCookieConsent } from '@/context/CookieConsentContext';

export function CookieBanner() {
  const {
    showBanner,
    showPreferences,
    isLoading,
    acceptAll,
    rejectAll,
    openPreferences,
  } = useCookieConsent();

  // Don't render anything while loading to prevent hydration mismatch
  if (isLoading) return null;

  return (
    <AnimatePresence>
      {showBanner && !showPreferences && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="mx-auto max-w-3xl">
            <div className="rounded-xl border border-gray-200/80 bg-white shadow-lg p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Content */}
                <div className="flex-1">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We use cookies to improve your experience and analyse site traffic.{' '}
                    <a
                      href="/cookie-policy"
                      className="text-primary-600 hover:text-primary-700 underline underline-offset-2"
                    >
                      Cookie Policy
                    </a>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={openPreferences}
                    className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Manage
                  </button>
                  <button
                    onClick={rejectAll}
                    className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Reject
                  </button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={acceptAll}
                  >
                    Accept
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CookiePreferencesModal() {
  const {
    consent,
    showPreferences,
    closePreferences,
    savePreferences,
    acceptAll,
    rejectAll,
  } = useCookieConsent();

  const [preferences, setPreferences] = useState({
    analytics: consent?.analytics ?? false,
    marketing: consent?.marketing ?? false,
    preferences: consent?.preferences ?? false,
  });

  // Update local state when consent changes
  useEffect(() => {
    if (consent) {
      setPreferences({
        analytics: consent.analytics,
        marketing: consent.marketing,
        preferences: consent.preferences,
      });
    }
  }, [consent]);

  const handleToggle = (category: 'analytics' | 'marketing' | 'preferences') => {
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSave = () => {
    savePreferences(preferences);
  };

  return (
    <AnimatePresence>
      {showPreferences && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            onClick={closePreferences}
          />

          {/* Modal - Centered */}
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-lg max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl flex flex-col max-h-[85vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-bold font-heading text-gray-900">
                    Cookie Preferences
                  </h2>
                  <button
                    onClick={closePreferences}
                    className="p-2 -mr-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Close preferences"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-6 py-5">
                  <p className="text-sm text-gray-500 mb-5">
                    Choose which cookies you want to allow. Essential cookies are always enabled.
                  </p>

                  {/* Cookie Categories */}
                  <div className="space-y-3">
                    {/* Essential - Always On */}
                    <CookieCategory
                      icon={<Shield className="w-4 h-4 text-green-600" />}
                      title="Essential"
                      description="Required for basic site functionality"
                      checked={true}
                      disabled={true}
                      onChange={() => {}}
                    />

                    {/* Analytics */}
                    <CookieCategory
                      icon={<BarChart3 className="w-4 h-4 text-blue-600" />}
                      title="Analytics"
                      description="Help us understand how you use our site"
                      checked={preferences.analytics}
                      disabled={false}
                      onChange={() => handleToggle('analytics')}
                    />

                    {/* Marketing */}
                    <CookieCategory
                      icon={<Megaphone className="w-4 h-4 text-purple-600" />}
                      title="Marketing"
                      description="Used for targeted advertising"
                      checked={preferences.marketing}
                      disabled={false}
                      onChange={() => handleToggle('marketing')}
                    />

                    {/* Preferences */}
                    <CookieCategory
                      icon={<Settings className="w-4 h-4 text-orange-600" />}
                      title="Preferences"
                      description="Remember your settings and choices"
                      checked={preferences.preferences}
                      disabled={false}
                      onChange={() => handleToggle('preferences')}
                    />
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex gap-4">
                      <button
                        onClick={rejectAll}
                        className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        Reject all
                      </button>
                      <button
                        onClick={acceptAll}
                        className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        Accept all
                      </button>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleSave}
                    >
                      Save preferences
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

interface CookieCategoryProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  disabled: boolean;
  onChange: () => void;
}

function CookieCategory({
  icon,
  title,
  description,
  checked,
  disabled,
  onChange,
}: CookieCategoryProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex-shrink-0">{icon}</div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-gray-900 text-sm">{title}</h4>
            {disabled && (
              <span className="text-[10px] font-medium text-green-700 bg-green-100 px-1.5 py-0.5 rounded">
                Required
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center flex-shrink-0">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="sr-only peer"
        />
        <div
          className={`w-9 h-5 rounded-full transition-colors ${
            disabled
              ? 'bg-green-500 cursor-not-allowed'
              : checked
              ? 'bg-primary-500 cursor-pointer'
              : 'bg-gray-300 cursor-pointer hover:bg-gray-400'
          }`}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
              checked ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </div>
      </label>
    </div>
  );
}

export default CookieBanner;
