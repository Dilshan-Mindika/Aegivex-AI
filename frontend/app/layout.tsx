import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';
import { RootLayoutClient } from '../components/layout/RootLayoutClient';
import { GoogleTranslateProvider } from '../components/providers/GoogleTranslateProvider';

export const viewport: Viewport = {
  themeColor: '#020617',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Aegivex AI | Autonomous Web3 AI Security Copilot & Threat Intelligence',
  description: 'Real-time Web3 threat intelligence, smart contract vulnerability auditing, honeypot detection, wallet drainer protection, and transaction payload analysis across multi-chain ecosystems.',
  keywords: [
    'Aegivex AI',
    'Web3 AI Security',
    'Smart Contract Audit',
    'Honeypot Detector',
    'Wallet Drainer Protection',
    'OKX X Layer',
    'Phishing Website Scanner',
    'Crypto Threat Intelligence',
    'EVM Transaction Explainer',
    'DeFi Security'
  ],
  authors: [{ name: 'Aegivex AI Core Engineering Team' }],
  creator: 'Aegivex AI',
  publisher: 'Aegivex AI Security Protocol',
  metadataBase: new URL('https://aegivex.ai'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Aegivex AI - Autonomous Web3 AI Security Copilot',
    description: 'Protect your crypto assets from smart contract honeypots, wallet drainers, and phishing dApps with real-time AI threat intelligence.',
    url: 'https://aegivex.ai',
    siteName: 'Aegivex AI Security Intelligence',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'Aegivex AI Security Copilot Official Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aegivex AI - Web3 AI Security Copilot',
    description: 'Pre-execution risk assessment engine for tokens, smart contracts, wallets, and dApp endpoints across multi-chain protocols.',
    images: ['/logo.png'],
    creator: '@AegivexAI',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#020617] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200 min-h-screen w-full m-0 p-0 overflow-x-hidden">
        <GoogleTranslateProvider />
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
