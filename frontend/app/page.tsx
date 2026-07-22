'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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
  Zap,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Search,
  Cpu,
  Shield,
  Radio,
  ChevronRight,
  Terminal,
  Activity,
  Check,
  Lock,
  Flame,
  ShieldAlert
} from 'lucide-react';

const targetPhrases = [
  "WALLET ADDRESSES",
  "TOKEN ASSETS",
  "SMART CONTRACTS",
  "WEBSITE LINKS",
  "CRYPTO TRANSFERS"
];

export default function LandingPage() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'token' | 'wallet' | 'contract' | 'website'>('token');

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % targetPhrases.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col justify-between -m-4 md:-m-6 selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-hidden bg-neural-grid bg-animated-neural">
      
      {/* Vibrant Ambient Glow Spotlights */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-blue-600/15 blur-[170px] rounded-full pointer-events-none" />
      <div className="absolute top-36 right-1/4 w-[700px] h-[700px] bg-purple-600/15 blur-[170px] rounded-full pointer-events-none" />
      <div className="absolute top-[600px] left-1/3 w-[800px] h-[600px] bg-cyan-500/10 blur-[190px] rounded-full pointer-events-none" />

      {/* Navigation Header */}
      <header className="px-6 md:px-12 py-5 border-b border-slate-800/80 flex items-center justify-between backdrop-blur-xl sticky top-0 z-50 bg-[#020617]/85">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600/40 via-cyan-500/30 to-purple-600/40 p-1.5 border border-cyan-500/50 flex items-center justify-center shadow-glow-cyan">
            <Image src="/logo.png" alt="Aegivex AI Official Logo" width={36} height={36} className="object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-white">AEGIVEX</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 neon-glow-cyan font-mono">AI</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider">Simple Security Assistant</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold">Network Shield</span> Active
          </div>

          <Link 
            href="/login"
            className="text-xs font-bold text-slate-300 hover:text-white px-4 py-2 rounded-xl transition"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="btn-futuristic-primary text-xs font-bold px-6 py-2.5 rounded-xl text-white flex items-center gap-2 transition"
          >
            Start Check
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 pt-12 pb-16 md:pt-20 md:pb-24 max-w-7xl mx-auto text-center z-10">
        
        {/* Project Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-8 shadow-glow-cyan backdrop-blur-md"
        >
          <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>OKX.AI Genesis Project</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="font-mono text-[11px] text-purple-300">Simple AI Protection</span>
        </motion.div>

        {/* Dynamic Rotating Headline */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto mb-6"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.2]">
            AI SECURITY PROTECTION FOR YOUR
          </h1>
          
          <div className="h-16 sm:h-20 flex items-center justify-center my-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={phraseIndex}
                initial={{ opacity: 0, y: 20, rotateX: -60 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -20, rotateX: 60 }}
                transition={{ duration: 0.4 }}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-400/50 shadow-glow-cyan inline-flex items-center gap-3"
              >
                <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 animate-pulse" />
                <span className="text-2xl sm:text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 neon-glow-cyan font-mono">
                  {targetPhrases[phraseIndex]}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-200">
            BEFORE YOU SIGN OR TRANSFER
          </h2>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 font-normal"
        >
          Aegivex AI checks wallet addresses, token contracts, website links, and transactions in simple English so you can avoid scams and loss of funds.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/dashboard"
            className="btn-futuristic-primary w-full sm:w-auto px-8 py-4 rounded-2xl text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition"
          >
            <ShieldCheck className="w-5 h-5 text-cyan-300" />
            Open Security Dashboard
          </Link>
          
          <Link
            href="/chat"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 border border-purple-500/40 hover:border-purple-400 text-purple-300 hover:text-white font-bold text-sm shadow-glow-purple flex items-center justify-center gap-3 transition backdrop-blur-md group"
          >
            <Bot className="w-5 h-5 text-purple-400 group-hover:scale-110 transition" />
            Ask AI Assistant
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          </Link>
        </motion.div>

        {/* Central Official Logo HUD Radar */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-12 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/40 radar-spin-slow" />
            <div className="absolute inset-4 rounded-full border-2 border-dotted border-purple-500/50 radar-spin-reverse" />
            <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-blue-600/40 via-cyan-500/30 to-purple-600/40 blur-2xl animate-pulse" />
            
            <motion.div 
              whileHover={{ scale: 1.08 }}
              className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-slate-900/90 border-2 border-cyan-400/60 p-4 shadow-glow-cyan flex items-center justify-center backdrop-blur-xl border-gradient-glow transition duration-300"
            >
              <Image src="/logo.png" alt="Aegivex AI Official Logo" width={90} height={90} className="object-contain drop-shadow-[0_0_20px_rgba(6,182,212,0.9)]" />
            </motion.div>

            <div className="absolute -top-2 -left-8 sm:-left-12 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold shadow-glow-cyan animate-float-slow flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Drainer Blocked
            </div>

            <div className="absolute top-1/2 -right-8 sm:-right-16 -translate-y-1/2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-red-500/40 text-red-400 text-xs font-mono font-bold shadow-glow-red animate-float-delayed flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> High Risk Alert
            </div>

            <div className="absolute -bottom-2 -left-4 sm:-left-8 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold shadow-glow-purple animate-float-slow flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Assistant Active
            </div>
          </div>

          {/* Interactive Security Console Simulator */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="glass-card-premium border-gradient-glow p-6 sm:p-8 rounded-3xl text-left shadow-2xl relative border border-cyan-500/40 transition duration-300"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-slate-200 font-bold">Live AI Security Scanner Demo</span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                {(['token', 'wallet', 'contract', 'website'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg capitalize font-mono font-semibold transition ${
                      activeTab === tab 
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan' 
                        : 'text-slate-400 hover:text-white bg-slate-900/60'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Console Tabs Data */}
            {activeTab === 'token' && (
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-red-500/40 shadow-glow-red">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Token Scam Check</span>
                    <span className="text-xs font-bold text-red-400 px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30">High Risk</span>
                  </div>
                  <p className="text-xs font-mono text-slate-200 truncate">0x1f9840a85d5af5bf1d1762f925bdaddc4201f984</p>
                  <p className="text-[11px] text-red-300 mt-2 leading-relaxed">
                    SCAM ALERT: Sell fee is set to 100%. You will not be able to sell this token after buying.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Money Pool Status</span>
                    <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">Safe</span>
                  </div>
                  <p className="text-sm font-bold text-white">$12,450,000 USD</p>
                  <p className="text-[11px] text-slate-400 mt-2">Money pool locked for 365 days.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">AI Advice</span>
                    <Zap className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed mt-1">
                    DO NOT BUY THIS TOKEN. High risk of losing funds.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'wallet' && (
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Wallet Check</span>
                    <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">Low Risk</span>
                  </div>
                  <p className="text-xs font-mono text-slate-200 truncate">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</p>
                  <p className="text-[11px] text-slate-400 mt-2">Normal transaction history found.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Scam Reports</span>
                    <span className="text-xs font-bold text-emerald-400">0 Reports</span>
                  </div>
                  <p className="text-xs text-slate-300">Clean wallet record. No theft reports linked.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">AI Advice</span>
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Safe address to transfer assets.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'contract' && (
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Code Check</span>
                    <span className="text-xs font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">Verified</span>
                  </div>
                  <p className="text-xs font-mono text-slate-200 truncate">0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D</p>
                  <p className="text-[11px] text-slate-400 mt-2">Public contract code is readable and verified.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Owner Key</span>
                    <span className="text-xs font-bold text-purple-400">Upgradeable</span>
                  </div>
                  <p className="text-xs text-slate-300">Owner can update logic in future.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Safety Status</span>
                    <span className="text-xs font-bold text-emerald-400">Normal</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    No theft backdoors found in contract logic.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'website' && (
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Trust Rating</span>
                    <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">95% Safe</span>
                  </div>
                  <p className="text-xs font-mono text-slate-200 truncate">https://uniswap.org</p>
                  <p className="text-[11px] text-slate-400 mt-2">Valid security certificate found.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Fake Link Check</span>
                    <span className="text-xs font-bold text-emerald-400">Clean</span>
                  </div>
                  <p className="text-xs text-slate-300">No fake web link keywords detected. Domain age: 4 years.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">AI Advice</span>
                    <Globe className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Official web link verified. Safe to open.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Metrics Ticker Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { metric: '$4.8M+', label: 'Protected Funds', color: 'text-cyan-400' },
            { metric: '< 0.4s', label: 'Scan Response Time', color: 'text-emerald-400' },
            { metric: '99.9%', label: 'Scam Detection', color: 'text-purple-400' },
            { metric: '24/7', label: 'Active Protection', color: 'text-blue-400' },
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ scale: 1.05, y: -4 }}
              className="glass-card-premium p-4 rounded-2xl border border-slate-800 text-center"
            >
              <span className={`text-2xl sm:text-3xl font-black ${item.color} font-mono block mb-1`}>
                {item.metric}
              </span>
              <span className="text-xs text-slate-400 font-medium">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20 bg-slate-950/40 border-t border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-bold px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mb-3 inline-block font-mono">
              SIMPLE STEPS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">How Aegivex AI Protects You</h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Check any wallet address, token, website link, or transaction in 4 easy steps.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Sign In', desc: 'Sign in to access your security assistant tools.', icon: UserCheck, color: 'text-blue-400', border: 'border-blue-500/30' },
              { step: '02', title: 'Choose Tool', desc: 'Select Wallet, Token, Contract, Website, or Transaction checker.', icon: Search, color: 'text-cyan-400', border: 'border-cyan-500/30' },
              { step: '03', title: 'Paste Input', desc: 'Paste the address, website link, or transfer hash to check.', icon: Cpu, color: 'text-purple-400', border: 'border-purple-500/30' },
              { step: '04', title: 'Get AI Advice', desc: 'Receive instant risk rating (0-100) and clear advice in plain English.', icon: Shield, color: 'text-emerald-400', border: 'border-emerald-500/30' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className={`glass-card-premium border-gradient-glow p-6 rounded-2xl border ${s.border} relative group transition duration-300`}
                >
                  <span className="text-4xl font-black text-slate-800 absolute top-4 right-4 font-mono group-hover:text-cyan-500/20 transition">
                    {s.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <Icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6 Core Security Tools Showcase */}
      <section className="px-6 py-20 bg-slate-950/60 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">6 Core Security Tools</h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Everything you need to check crypto wallets, tokens, links, and transfers safely.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'AI Security Chat',
                desc: 'Ask questions in plain English to check if an address, link, or token is safe.',
                icon: Bot,
                color: 'text-purple-400',
                border: 'border-purple-500/30',
                link: '/chat'
              },
              {
                title: 'Wallet Risk Scanner',
                desc: 'Check wallet addresses for theft records, drainer links, and suspicious activity.',
                icon: Wallet,
                color: 'text-blue-400',
                border: 'border-blue-500/30',
                link: '/scanners/wallet'
              },
              {
                title: 'Token Risk Analyzer',
                desc: 'Check token tax rates, honeypot traps, and liquidity pool lock statuses.',
                icon: Coins,
                color: 'text-cyan-400',
                border: 'border-cyan-500/30',
                link: '/scanners/token'
              },
              {
                title: 'Smart Contract Auditor',
                desc: 'Check contract code logic for owner permissions, upgrade keys, and backdoors.',
                icon: FileCode2,
                color: 'text-emerald-400',
                border: 'border-emerald-500/30',
                link: '/scanners/contract'
              },
              {
                title: 'Website Safety Scanner',
                desc: 'Check web links for fake domain clones, SSL security, and phishing traps.',
                icon: Globe,
                color: 'text-amber-400',
                border: 'border-amber-500/30',
                link: '/scanners/website'
              },
              {
                title: 'Transaction Explainer',
                desc: 'Translate complex transfer requests and unlimited spending permits into simple English.',
                icon: Receipt,
                color: 'text-rose-400',
                border: 'border-rose-500/30',
                link: '/scanners/transaction'
              },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Link 
                    href={f.link}
                    className={`glass-card-premium border-gradient-glow p-6 rounded-2xl border ${f.border} block group h-full`}
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-10 border-t border-slate-800/80 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-3 bg-slate-950/90">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-600/20 p-1 border border-blue-500/30 flex items-center justify-center shadow-glow-blue">
            <Image src="/logo.png" alt="Aegivex AI Logo" width={20} height={20} className="object-contain" />
          </div>
          <span className="font-black text-sm text-slate-200 tracking-tight">AEGIVEX AI</span>
        </div>
        <p>Aegivex AI — Built for OKX.AI Genesis Hackathon</p>
        <p className="text-[11px] text-slate-600 font-mono">Simple AI Security Assistant</p>
      </footer>
    </div>
  );
}
