'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, Shield, BarChart3, Megaphone, Settings } from 'lucide-react';
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
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-lg shadow-2xl p-6 sm:p-8">
              <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold font-heading text-gray-900 mb-2">
                      We value your privacy
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      We use cookies to enhance your browsing experience, analyse site traffic,
                      and understand where our visitors come from. By clicking &quot;Accept All&quot;,
                      you consent to our use of cookies.{' '}
                      <a
                        href="/privacy-policy"
                        className="text-primary-600 hover:text-primary-700 underline underline-offset-2"
                      >
                        Learn more
                      </a>
                    </p>
                  </div>
                </div>

                {/* Cookie Categories Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Essential</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    <span>Analytics</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Megaphone className="w-4 h-4 text-purple-600" />
                    <span>Marketing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Settings className="w-4 h-4 text-orange-600" />
                    <span>Preferences</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
                  <button
                    onClick={openPreferences}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2 transition-colors order-3 sm:order-1"
                  >
                    Manage Preferences
                  </button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={rejectAll}
                    className="order-2"
                  >
                    Reject All
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={acceptAll}
                    className="order-1 sm:order-3"
                  >
                    Accept All
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={closePreferences}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 sm:w-full sm:max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                      <Settings className="w-5 h-5 text-primary-600" />
                    </div>
                    <h2 className="text-xl font-bold font-heading text-gray-900">
                      Cookie Preferences
                    </h2>
                  </div>
                  <button
                    onClick={closePreferences}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Close preferences"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6 space-y-6">
                <p className="text-sm text-gray-600">
                  Manage your cookie preferences below. Essential cookies cannot be disabled
                  as they are necessary for the website to function properly.
                </p>

                {/* Cookie Categories */}
                <div className="space-y-4">
                  {/* Essential - Always On */}
                  <CookieCategory
                    icon={<Shield className="w-5 h-5 text-green-600" />}
                    title="Essential Cookies"
                    description="Required for the website to function. These cannot be disabled."
                    checked={true}
                    disabled={true}
                    onChange={() => {}}
                  />

                  {/* Analytics */}
                  <CookieCategory
                    icon={<BarChart3 className="w-5 h-5 text-blue-600" />}
                    title="Analytics Cookies"
                    description="Help us understand how visitors interact with our website by collecting anonymous information."
                    checked={preferences.analytics}
                    disabled={false}
                    onChange={() => handleToggle('analytics')}
                  />

                  {/* Marketing */}
                  <CookieCategory
                    icon={<Megaphone className="w-5 h-5 text-purple-600" />}
                    title="Marketing Cookies"
                    description="Used to track visitors across websites to display relevant advertisements."
                    checked={preferences.marketing}
                    disabled={false}
                    onChange={() => handleToggle('marketing')}
                  />

                  {/* Preferences */}
                  <CookieCategory
                    icon={<Settings className="w-5 h-5 text-orange-600" />}
                    title="Preference Cookies"
                    description="Allow the website to remember choices you make, such as language or region."
                    checked={preferences.preferences}
                    disabled={false}
                    onChange={() => handleToggle('preferences')}
                  />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 rounded-b-2xl">
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                  <div className="flex gap-3 order-2 sm:order-1">
                    <button
                      onClick={rejectAll}
                      className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2 transition-colors"
                    >
                      Reject All
                    </button>
                    <button
                      onClick={acceptAll}
                      className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2 transition-colors"
                    >
                      Accept All
                    </button>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSave}
                    className="order-1 sm:order-2"
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
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
    <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-4 mb-1">
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              disabled={disabled}
              onChange={onChange}
              className="sr-only peer"
            />
            <div
              className={`w-11 h-6 rounded-full transition-colors ${
                disabled
                  ? 'bg-green-500 cursor-not-allowed'
                  : checked
                  ? 'bg-primary-500 peer-focus:ring-2 peer-focus:ring-primary-300'
                  : 'bg-gray-300 peer-focus:ring-2 peer-focus:ring-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                  checked ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
          </label>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
        {disabled && (
          <span className="inline-block mt-2 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded">
            Always Active
          </span>
        )}
      </div>
    </div>
  );
}

export default CookieBanner;
