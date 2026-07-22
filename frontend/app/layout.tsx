import React from 'react';
import type { Metadata } from 'next';
import '../styles/globals.css';
import { Sidebar } from '../components/layout/Sidebar';
import { Navbar } from '../components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Aegivex AI - Web3 AI Security Copilot',
  description: 'AI-powered Web3 Security Copilot for OKX.AI Genesis Hackathon. Detect smart contract vulnerabilities, wallet drainers, token honeypots, website phishing, and complex transaction risks.',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-slate-100 antialiased selection:bg-blue-500/30 selection:text-blue-200">
        <div className="min-h-screen flex">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Navbar />
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
