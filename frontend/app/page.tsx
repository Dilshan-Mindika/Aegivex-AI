'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Bot, 
  Wallet, 
  Coins, 
  FileCode2, 
  Globe, 
  Receipt, 
  ArrowRight, 
  Sparkles, 
  Lock,
  Zap,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-white flex flex-col justify-between -m-4 md:-m-6">
      {/* Top Header Navigation */}
      <header className="px-8 py-5 border-b border-slate-800/80 flex items-center justify-between backdrop-blur-md sticky top-0 z-50 bg-background/90">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-blue-600/20 p-1.5 border border-blue-500/30 flex items-center justify-center shadow-glow-blue">
            <Image src="/logo.png" alt="Aegivex AI" width={36} height={36} className="object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white">AEGIVEX</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">AI</span>
            </div>
            <span className="text-xs text-slate-400">Web3 Security Copilot</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/login"
            className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-xl transition"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-glow-blue flex items-center gap-2 transition transform hover:-translate-y-0.5"
          >
            Launch Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-28 max-w-6xl mx-auto text-center overflow-hidden">
        {/* Glow Effects Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-6 shadow-glow-blue">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          OKX.AI Genesis Hackathon Project
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto mb-6">
          Your Intelligent <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 glow-text-blue">AI Security Copilot</span> for Web3
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Identify wallet drainers, token honeypots, malicious smart contracts, phishing domains, and risky transaction approvals in plain language before signing.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:opacity-95 text-white font-bold text-base shadow-glow-blue flex items-center justify-center gap-3 transition transform hover:-translate-y-0.5"
          >
            <ShieldCheck className="w-5 h-5" />
            Launch Copilot Dashboard
          </Link>
          <Link
            href="/chat"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 border border-purple-500/30 hover:border-purple-500/60 text-purple-300 hover:text-white font-bold text-base shadow-glow-purple flex items-center justify-center gap-3 transition"
          >
            <Bot className="w-5 h-5 text-purple-400" />
            Try AI Chat Assistant
          </Link>
        </div>

        {/* Live Mock Feature Banner Preview */}
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl text-left max-w-4xl mx-auto relative">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs text-slate-400 font-mono ml-2">Live AI Risk Audit Engine</span>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium flex items-center gap-1.5">
              <Zap className="w-3 h-3" />
              Scan Time &lt; 2s
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400">Wallet Risk</span>
                <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">Low (12/100)</span>
              </div>
              <p className="text-xs text-slate-300 font-mono truncate">0x71C7656...8976F</p>
              <p className="text-[11px] text-slate-400 mt-2">Verified activity history. 0 phishing reports associated.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-red-500/30 shadow-glow-red">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400">Token Honeypot</span>
                <span className="text-xs font-bold text-red-400 px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20">High (92/100)</span>
              </div>
              <p className="text-xs text-slate-300 font-mono truncate">0x1f9840a...f984</p>
              <p className="text-[11px] text-red-300 mt-2">Honeypot code detected! Sell tax set to 100%.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400">Website Safety</span>
                <span className="text-xs font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">Trust (95%)</span>
              </div>
              <p className="text-xs text-slate-300 font-mono truncate">https://uniswap.org</p>
              <p className="text-[11px] text-slate-400 mt-2">SSL TLS v1.3 valid. Clean domain reputation score.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Scanners Grid Section */}
      <section className="px-6 py-16 bg-surface/50 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-white mb-3">6 Core Web3 Security Scanners</h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto">
              Everything you need to navigate Web3, DeFi, NFTs, and smart contracts securely.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'AI Security Chat',
                desc: 'Ask natural language questions regarding contract security, wallet drainers, and scam prevention.',
                icon: Bot,
                color: 'text-purple-400',
                border: 'border-purple-500/30',
                link: '/chat'
              },
              {
                title: 'Wallet Risk Scanner',
                desc: 'Audit EVM & Solana wallet addresses for drainer contract interactions and phishing flags.',
                icon: Wallet,
                color: 'text-blue-400',
                border: 'border-blue-500/30',
                link: '/scanners/wallet'
              },
              {
                title: 'Token Risk Analyzer',
                desc: 'Check token tax rates, honeypot code traps, blacklists, and liquidity pool lock statuses.',
                icon: Coins,
                color: 'text-cyan-400',
                border: 'border-cyan-500/30',
                link: '/scanners/token'
              },
              {
                title: 'Smart Contract Auditor',
                desc: 'Decompile bytecode, verify source code, detect proxy upgradeability and reentrancy bugs.',
                icon: FileCode2,
                color: 'text-emerald-400',
                border: 'border-emerald-500/30',
                link: '/scanners/contract'
              },
              {
                title: 'Website Safety Scanner',
                desc: 'Scan Web3 dApp URLs for SSL certificate validity, phishing lookalikes, and domain age.',
                icon: Globe,
                color: 'text-amber-400',
                border: 'border-amber-500/30',
                link: '/scanners/website'
              },
              {
                title: 'Transaction Explainer',
                desc: 'Translate raw transaction payloads and unlimited spending permits into simple language.',
                icon: Receipt,
                color: 'text-rose-400',
                border: 'border-rose-500/30',
                link: '/scanners/transaction'
              },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <Link 
                  key={i} 
                  href={f.link}
                  className={`glass-card p-6 rounded-2xl border ${f.border} glass-card-hover block group`}
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <Icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-slate-800 text-center text-xs text-slate-500">
        <p className="mb-2">Aegivex AI © 2026 — Built for OKX.AI Genesis Hackathon</p>
        <p>Powered by Next.js, FastAPI, PostgreSQL, LangChain & OpenAI API</p>
      </footer>
    </div>
  );
}
