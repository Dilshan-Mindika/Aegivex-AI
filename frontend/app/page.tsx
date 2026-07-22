'use client';

import React, { useState, useEffect } from 'react';
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
  AlertTriangle,
  UserCheck,
  Search,
  Cpu,
  Shield,
  Activity,
  Radio,
  Layers,
  ChevronRight,
  ShieldAlert,
  Flame,
  Terminal
} from 'lucide-react';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'wallet' | 'token' | 'contract' | 'website'>('token');

  return (
    <div className="min-h-screen bg-background text-white flex flex-col justify-between -m-4 md:-m-6 selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-hidden bg-cyber-grid bg-animated-grid">
      
      {/* Ambient Multi-layer Futuristic Spotlight Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-purple-600/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-96 left-1/3 w-[600px] h-[400px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none" />

      {/* Navigation Header */}
      <header className="px-6 md:px-12 py-5 border-b border-slate-800/80 flex items-center justify-between backdrop-blur-xl sticky top-0 z-50 bg-background/80">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600/30 via-cyan-500/20 to-purple-600/30 p-1.5 border border-cyan-500/40 flex items-center justify-center shadow-glow-cyan">
            <Image src="/logo.png" alt="Aegivex AI Official Logo" width={36} height={36} className="object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-white">AEGIVEX</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/40 neon-glow-cyan">AI</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider">Web3 Security Copilot</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold">OKX X Layer</span> Live Protect
          </div>

          <Link 
            href="/login"
            className="text-xs font-bold text-slate-300 hover:text-white px-4 py-2 rounded-xl transition"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="btn-futuristic-primary text-xs font-bold px-5 py-2.5 rounded-xl text-white flex items-center gap-2 transition"
          >
            Launch Copilot
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Futuristic Hero Section */}
      <section className="relative px-6 pt-16 pb-20 md:pt-24 md:pb-28 max-w-7xl mx-auto text-center z-10">
        
        {/* Hackathon Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-8 shadow-glow-cyan backdrop-blur-md animate-float-slow">
          <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>OKX.AI Genesis Hackathon Project</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="font-mono text-[11px] text-purple-300">v1.0 Copilot Engine</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] max-w-5xl mx-auto mb-6">
          AI-POWERED <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 neon-glow-cyan">
            WEB3 SECURITY COPILOT
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
          Next-generation AI security intelligence protecting your crypto assets. Identify wallet drainers, token honeypots, malicious smart contracts, and phishing domains <span className="text-cyan-400 font-semibold">before you sign</span>.
        </p>

        {/* Futuristic CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link
            href="/dashboard"
            className="btn-futuristic-primary w-full sm:w-auto px-8 py-4 rounded-2xl text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition"
          >
            <ShieldCheck className="w-5 h-5 text-cyan-300" />
            Launch Security Dashboard
          </Link>
          
          <Link
            href="/chat"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 border border-purple-500/40 hover:border-purple-400 text-purple-300 hover:text-white font-bold text-sm shadow-glow-purple flex items-center justify-center gap-3 transition backdrop-blur-md group"
          >
            <Bot className="w-5 h-5 text-purple-400 group-hover:scale-110 transition" />
            Ask AI Copilot Chat
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          </Link>
        </div>

        {/* 3D-Style AI Security HUD Radar & Central Official Logo */}
        <div className="relative max-w-4xl mx-auto mb-16">
          
          {/* Central Logo Radar Orb */}
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-12 flex items-center justify-center">
            
            {/* Outer Revolving Radar Ring 1 */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/30 radar-spin-slow" />
            
            {/* Inner Revolving Radar Ring 2 */}
            <div className="absolute inset-4 rounded-full border-2 border-dotted border-purple-500/40 radar-spin-reverse" />
            
            {/* Glow Core */}
            <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-blue-600/40 via-cyan-500/30 to-purple-600/40 blur-xl animate-pulse" />
            
            {/* Center Official Logo Card */}
            <div className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-slate-900/90 border-2 border-cyan-400/60 p-4 shadow-glow-cyan flex items-center justify-center backdrop-blur-xl">
              <Image src="/logo.png" alt="Aegivex AI Official Logo" width={80} height={80} className="object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
            </div>

            {/* Floating Live Badges around Radar */}
            <div className="absolute -top-2 -left-8 sm:-left-12 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold shadow-glow-cyan animate-float-slow flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Drainer Blocked
            </div>

            <div className="absolute top-1/2 -right-8 sm:-right-16 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-red-500/40 text-red-400 text-xs font-mono font-bold shadow-glow-red animate-float-delayed flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" /> Honeypot 0% Tax
            </div>

            <div className="absolute -bottom-2 -left-4 sm:-left-8 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold shadow-glow-purple animate-float-slow flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> AI Engine Active
            </div>
          </div>

          {/* Interactive Security Console Simulator */}
          <div className="glass-card-futuristic p-6 sm:p-8 rounded-3xl text-left shadow-2xl relative border border-cyan-500/30">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-slate-300 font-bold">Aegivex AI Security Inspector Console</span>
              </div>

              {/* Console Tab Switches */}
              <div className="flex items-center gap-2 text-xs">
                {(['token', 'wallet', 'contract', 'website'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-lg capitalize font-mono font-semibold transition ${
                      activeTab === tab 
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan' 
                        : 'text-slate-400 hover:text-white bg-slate-900/50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Console Body Display */}
            {activeTab === 'token' && (
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-red-500/40 shadow-glow-red">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Token Honeypot Audit</span>
                    <span className="text-xs font-bold text-red-400 px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30">High Risk (92/100)</span>
                  </div>
                  <p className="text-xs font-mono text-slate-200 truncate">0x1f9840a85d5af5bf1d1762f925bdaddc4201f984</p>
                  <p className="text-[11px] text-red-300 mt-2 leading-relaxed">
                    HONEYPOT ALERT! Sell tax set to 100%. Buyer wallet address blacklist function detected in bytecode.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Liquidity Verification</span>
                    <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">Verified</span>
                  </div>
                  <p className="text-sm font-bold text-white">$12,450,000 USD</p>
                  <p className="text-[11px] text-slate-400 mt-2">Ownership renounced. LP tokens locked for 365 days.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">AI Recommendation</span>
                    <Zap className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed mt-1">
                    DO NOT BUY. High risk of total capital loss. Use Aegivex Token Analyzer before trading unverified tokens.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'wallet' && (
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Wallet Risk</span>
                    <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">Low Risk (12/100)</span>
                  </div>
                  <p className="text-xs font-mono text-slate-200 truncate">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</p>
                  <p className="text-[11px] text-slate-400 mt-2">Verified activity history across OKX X Layer & Ethereum Mainnet.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Drainer Signatures</span>
                    <span className="text-xs font-bold text-emerald-400">0 Reports</span>
                  </div>
                  <p className="text-xs text-slate-300">Clean permit history. No suspicious outbound drainer activity recorded.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">AI Guidance</span>
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Safe to interact with standard verification.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'contract' && (
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Source Verification</span>
                    <span className="text-xs font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">Verified</span>
                  </div>
                  <p className="text-xs font-mono text-slate-200 truncate">0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D</p>
                  <p className="text-[11px] text-slate-400 mt-2">Solidity source code verified on Block Explorer.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Proxy Architecture</span>
                    <span className="text-xs font-bold text-purple-400">Proxy Contract</span>
                  </div>
                  <p className="text-xs text-slate-300">Upgradeable Proxy Pattern detected. Admin key present.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Reentrancy Risk</span>
                    <span className="text-xs font-bold text-emerald-400">Clean</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Reentrancy guard modifier detected. Clean execution logic.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'website' && (
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Trust Score</span>
                    <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">95% Trust</span>
                  </div>
                  <p className="text-xs font-mono text-slate-200 truncate">https://uniswap.org</p>
                  <p className="text-[11px] text-slate-400 mt-2">SSL TLS v1.3 valid. Clean DNS reputation score.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Phishing Check</span>
                    <span className="text-xs font-bold text-emerald-400">Clean</span>
                  </div>
                  <p className="text-xs text-slate-300">0 phishing keyword matches. Domain age: 4 years.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Recommendation</span>
                    <Globe className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Website appears legitimate. Safe to connect Web3 wallet.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Metrics Ticker Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { metric: '$4.8M+', label: 'Protected Assets', color: 'text-cyan-400' },
            { metric: '< 0.4s', label: 'AI Scan Latency', color: 'text-emerald-400' },
            { metric: '99.9%', label: 'Honeypot Accuracy', color: 'text-purple-400' },
            { metric: '24/7', label: 'OKX.AI Shield', color: 'text-blue-400' },
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-4 rounded-2xl border border-slate-800 text-center">
              <span className={`text-2xl sm:text-3xl font-black ${item.color} font-mono block mb-1`}>
                {item.metric}
              </span>
              <span className="text-xs text-slate-400 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section (4-Step User Flow) */}
      <section className="px-6 py-20 bg-surface/40 border-t border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mb-3 inline-block font-mono">
              USER WORKFLOW
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">How Aegivex AI Protects You</h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Inspect any Web3 wallet address, token contract, dApp domain, or transaction in 4 simple steps.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Sign In', desc: 'Authenticate securely to access your AI Web3 security copilot workspace.', icon: UserCheck, color: 'text-blue-400', border: 'border-blue-500/30' },
              { step: '02', title: 'Select Scanner', desc: 'Choose from Wallet, Token, Contract, Website, or Tx Explainer tools.', icon: Search, color: 'text-cyan-400', border: 'border-cyan-500/30' },
              { step: '03', title: 'Submit Input', desc: 'Paste the target wallet address, contract, domain URL, or raw tx hash.', icon: Cpu, color: 'text-purple-400', border: 'border-purple-500/30' },
              { step: '04', title: 'AI Guidance', desc: 'Receive instant risk score (0-100), summary, and actionable advice.', icon: Shield, color: 'text-emerald-400', border: 'border-emerald-500/30' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className={`glass-card p-6 rounded-2xl border ${s.border} glass-card-hover relative group`}>
                  <span className="text-4xl font-black text-slate-800 absolute top-4 right-4 font-mono group-hover:text-cyan-500/20 transition">
                    {s.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <Icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6 Core Security Scanners Section */}
      <section className="px-6 py-20 bg-surface/60 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">6 Core Web3 Security Scanners</h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
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
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition flex items-center justify-between">
                    {f.title}
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition" />
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer with Official Logo */}
      <footer className="px-6 md:px-12 py-10 border-t border-slate-800/80 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-3 bg-slate-950/80">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-600/20 p-1 border border-blue-500/30 flex items-center justify-center shadow-glow-blue">
            <Image src="/logo.png" alt="Aegivex AI Logo" width={20} height={20} className="object-contain" />
          </div>
          <span className="font-black text-sm text-slate-200 tracking-tight">AEGIVEX AI</span>
        </div>
        <p>Aegivex AI © 2026 — Built for OKX.AI Genesis Hackathon</p>
        <p className="text-[11px] text-slate-600 font-mono">Next.js 14 • FastAPI • PostgreSQL • LangChain • OpenAI API</p>
      </footer>
    </div>
  );
}
