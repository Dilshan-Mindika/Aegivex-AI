'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import CookieConsentBanner from '../CookieConsentBanner';

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicPage = pathname === '/' || pathname === '/login' || pathname === '/register';

  if (isPublicPage) {
    return (
      <div className="min-h-screen w-full bg-[#020617] overflow-x-hidden">
        {children}
        <CookieConsentBanner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex w-full bg-[#020617] overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 max-w-full overflow-x-hidden">
        <Navbar />
        <main className="flex-1 p-2.5 xs:p-3.5 sm:p-5 md:p-6 min-w-0 max-w-full overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
      <CookieConsentBanner />
    </div>
  );
}
