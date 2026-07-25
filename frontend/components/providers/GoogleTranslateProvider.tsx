'use client';

import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    // eslint-disable-next-line
    google: any;
  }
}

export function GoogleTranslateProvider() {
  useEffect(() => {
    // Define the initialization function
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    // Load the script
    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
    };
  }, []);

  return (
    /* Hidden Google Translate Element - Must be rendered for API to work */
    <div
      id="google_translate_element"
      className="fixed bottom-0 right-0 opacity-0 pointer-events-none w-px h-px overflow-hidden -z-50"
      aria-hidden="true"
    />
  );
}
