import React from 'react';
import type { Metadata } from 'next';
import '../styles/globals.css';
import { RootLayoutClient } from '../components/layout/RootLayoutClient';

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
      <body className="bg-[#020617] text-slate-100 antialiased selection:bg-blue-500/30 selection:text-blue-200 min-h-screen w-full m-0 p-0 overflow-x-hidden">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
