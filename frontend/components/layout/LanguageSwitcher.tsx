'use client';

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Search, Globe } from "lucide-react";
import Image from "next/image";
import { languages } from "../../lib/languages";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    // eslint-disable-next-line
    google: any;
  }
}

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages.find(l => l.code === "en") || languages[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load initial language from googtrans cookie if present
  useEffect(() => {
    const match = document.cookie.match(/googtrans=([^;]+)/);
    if (match) {
      const parts = decodeURIComponent(match[1]).split("/");
      const currentLangCode = parts[parts.length - 1];
      if (currentLangCode) {
        const found = languages.find(l => l.code.toLowerCase() === currentLangCode.toLowerCase());
        if (found) {
          setSelectedLang(found);
        }
      }
    }
  }, []);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const changeLanguage = (langCode: string) => {
    const cookieValue = `/en/${langCode}`;
    document.cookie = `googtrans=${cookieValue}; path=/;`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname};`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=.${window.location.hostname};`;

    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    }
    window.location.reload();
  };

  const handleLanguageSelect = (lang: typeof languages[0]) => {
    setSelectedLang(lang);
    setIsOpen(false);
    setSearchQuery("");
    changeLanguage(lang.code);
  };

  const filteredLanguages = useMemo(() => {
    return languages.filter(lang =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="relative notranslate" ref={containerRef}>
      <button
        onClick={() => {
          if (isOpen) setSearchQuery("");
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white transition cursor-pointer"
        aria-label="Select Language"
      >
        <div className="flex items-center gap-2">
          <div className="relative w-5 h-3.5 rounded-[2px] shadow-sm overflow-hidden flex-shrink-0">
            <Image
              src={`https://flagcdn.com/24x18/${selectedLang.country}.png`}
              alt={selectedLang.name}
              fill
              className="object-cover"
              sizes="20px"
            />
          </div>
          <span className="text-xs font-mono font-bold uppercase hidden sm:block">{selectedLang.code}</span>
        </div>
        <Globe className="w-3.5 h-3.5 text-cyan-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-72 bg-slate-950 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-3xl text-left"
          >
            {/* Search Bar */}
            <div className="p-3 border-b border-slate-800 sticky top-0 bg-slate-950/95 backdrop-blur z-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search language..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="p-2 max-h-[260px] overflow-y-auto">
              {filteredLanguages.length === 0 ? (
                <div className="text-center py-4 text-xs font-mono text-slate-500">No languages found</div>
              ) : (
                filteredLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-mono rounded-xl transition-colors mb-1 ${
                      selectedLang.code === lang.code
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                        : "text-slate-300 hover:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-5 h-3.5 rounded-[2px] shadow-sm overflow-hidden flex-shrink-0">
                        <Image
                          src={`https://flagcdn.com/24x18/${lang.country}.png`}
                          alt={lang.name}
                          fill
                          className="object-cover"
                          sizes="20px"
                        />
                      </div>
                      <span className="font-bold">{lang.name}</span>
                    </div>
                    {selectedLang.code === lang.code && <Check className="w-4 h-4 text-cyan-400" />}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
