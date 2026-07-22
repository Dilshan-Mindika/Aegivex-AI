'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, ShieldCheck, X, SlidersHorizontal, Check, Lock } from 'lucide-react';

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);

  // Preference state for customize modal
  const [preferences, setPreferences] = useState({
    essential: true, // Always locked true
    analytics: true,
    functional: true,
  });

  useEffect(() => {
    // Check if user has already made a choice
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('aegivex_cookie_consent');
      if (!consent) {
        // Show consent banner after a short delay on first visit / login
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleConsent = (type: 'necessary' | 'rejected' | 'accepted' | 'custom') => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aegivex_cookie_consent', JSON.stringify({
        type,
        preferences: type === 'custom' ? preferences : { essential: true, analytics: type === 'accepted', functional: type === 'accepted' },
        timestamp: new Date().toISOString(),
      }));
    }
    setIsVisible(false);
    setShowPreferencesModal(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main Cookie Consent Floating Banner (Dynamically Responsive 280px+) */}
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-2 left-2 right-2 xs:bottom-4 xs:left-4 xs:right-4 sm:bottom-6 sm:left-6 md:right-auto md:max-w-2xl z-50 pointer-events-auto min-w-0"
          >
            <div className="glass-card p-3.5 xs:p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl border border-cyan-500/30 bg-slate-950/95 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.85)] shadow-cyan-950/40 relative overflow-hidden">
              {/* Top Animated Running Glow Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Header Info */}
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-start xs:items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-xl xs:rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-inner mt-0.5 xs:mt-0">
                      <Cookie className="w-4 h-4 xs:w-5 xs:h-5 text-cyan-400 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-100 flex flex-wrap items-center gap-1.5 leading-snug">
                        <span>Privacy & Cookie Preferences</span>
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 whitespace-nowrap">
                          GDPR Compliant
                        </span>
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-400 mt-1 leading-normal">
                        We use essential cookies and encrypted telemetry to guarantee high-grade Web3 security and optimize AI performance.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleConsent('necessary')}
                    className="text-slate-400 hover:text-slate-200 transition p-1 hover:bg-slate-800/60 rounded-lg shrink-0"
                    aria-label="Close cookie message"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Responsive 3 Action Buttons + Customize Trigger */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2.5 border-t border-slate-800/80">
                  <button
                    onClick={() => setShowPreferencesModal(true)}
                    className="text-xs font-semibold text-slate-400 hover:text-cyan-400 transition flex items-center justify-center sm:justify-start gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-900 self-center sm:self-auto"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    Customize
                  </button>

                  <div className="grid grid-cols-3 sm:flex items-center gap-1.5 sm:gap-2 sm:ml-auto w-full sm:w-auto">
                    {/* Button 1: Only Needed */}
                    <button
                      onClick={() => handleConsent('necessary')}
                      className="px-2.5 xs:px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-[11px] sm:text-xs font-bold transition shadow-sm text-center truncate"
                    >
                      Only Needed
                    </button>

                    {/* Button 2: Reject All */}
                    <button
                      onClick={() => handleConsent('rejected')}
                      className="px-2.5 xs:px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 hover:border-red-500/40 text-red-300 hover:text-red-200 text-[11px] sm:text-xs font-bold transition shadow-sm text-center truncate"
                    >
                      Reject All
                    </button>

                    {/* Button 3: Accept All */}
                    <button
                      onClick={() => handleConsent('accepted')}
                      className="px-3 xs:px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-[11px] sm:text-xs font-extrabold transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-1 truncate"
                    >
                      <Check className="w-3.5 h-3.5 shrink-0 hidden xs:inline-block" />
                      Accept All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Preferences Customize Modal (Mobile Responsive) */}
          {showPreferencesModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card max-w-lg w-full p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-cyan-500/30 bg-slate-900 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4 pb-3 border-b border-slate-800">
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    Customize Cookie Preferences
                  </h3>
                  <button
                    onClick={() => setShowPreferencesModal(false)}
                    className="text-slate-400 hover:text-slate-200 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 sm:space-y-4 text-xs text-slate-300">
                  {/* Category 1: Essential */}
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-slate-100 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        Essential Security Cookies
                      </span>
                      <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 leading-snug">
                        Required for JWT authentication session integrity, rate limiting, and encrypted on-chain telemetry.
                      </p>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-extrabold uppercase px-2 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                      Always Active
                    </span>
                  </div>

                  {/* Category 2: Analytics */}
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-slate-100">Analytics & Telemetry</span>
                      <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 leading-snug">
                        Helps us improve smart contract audit speeds and honeypot detection accuracy.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
                    </label>
                  </div>

                  {/* Category 3: Customization */}
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-slate-100">Functional & UI Personalization</span>
                      <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 leading-snug">
                        Saves layout preferences, quick scanner shortcuts, and dark theme settings.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2.5 mt-5 sm:mt-6 pt-3.5 border-t border-slate-800">
                  <button
                    onClick={() => setShowPreferencesModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleConsent('custom')}
                    className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold transition shadow-md shadow-cyan-500/20"
                  >
                    Save Preferences
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
