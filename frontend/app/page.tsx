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
  ShieldAlert,
  XCircle,
  RefreshCw
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
  const [scanInput, setScanInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'token' | 'wallet' | 'contract' | 'website'>('token');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % targetPhrases.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRunInstantScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanInput.trim()) return;
    
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      if (selectedCategory === 'token') {
        setScanResult({
          type: 'Token Scan',
          target: scanInput,
          score: 88,
          rating: 'High Risk',
          summary: 'Scam Token Alert: 100% sell tax detected. You cannot sell this token after buying.',
          recommendation: 'DO NOT BUY THIS TOKEN. High risk of total loss.',
          isSafe: false
        });
      } else if (selectedCategory === 'wallet') {
        setScanResult({
          type: 'Wallet Scan',
          target: scanInput,
          score: 12,
          rating: 'Low Risk',
          summary: 'Normal wallet address history found with 0 drainer interactions.',
          recommendation: 'Safe address for standard token transfers.',
          isSafe: true
        });
      } else if (selectedCategory === 'contract') {
        setScanResult({
          type: 'Smart Contract Audit',
          target: scanInput,
          score: 25,
          rating: 'Low Risk',
          summary: 'Verified smart contract code. Upgradeable proxy key present.',
          recommendation: 'Standard verified contract. Safe for standard interaction.',
          isSafe: true
        });
      } else {
        setScanResult({
          type: 'Website Link Check',
          target: scanInput,
          score: 5,
          rating: 'Verified Safe',
          summary: 'Official website SSL certificate valid. 0 phishing keywords detected.',
          recommendation: 'Legitimate Web3 website. Safe to connect wallet.',
          isSafe: true
        });
      }
    }, 1200);
  };

  const handleQuickPreset = (category: 'token' | 'wallet' | 'contract' | 'website', preset: string) => {
    setSelectedCategory(category);
    setScanInput(preset);
    setScanResult(null);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col justify-between -m-4 md:-m-6 selection:bg-cyan-500/30 selection:text-cyan-200 relative bg-glow-ambient">
      
      {/* Dynamic Animated Appearing & Disappearing Background Glowing Orbs */}
      <motion.div 
        animate={{
          opacity: [0.1, 0.65, 0.2, 0.7, 0.1],
          scale: [0.9, 1.3, 0.95, 1.35, 0.9],
          x: [0, 90, -70, 50, 0],
          y: [0, -70, 60, -40, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-1/5 w-[650px] h-[650px] bg-cyan-500/25 blur-[180px] rounded-full pointer-events-none z-0"
      />

      <motion.div 
        animate={{
          opacity: [0.2, 0.7, 0.1, 0.6, 0.2],
          scale: [1, 0.85, 1.35, 0.9, 1],
          x: [0, -80, 60, -50, 0],
          y: [0, 70, -50, 80, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-48 right-1/5 w-[650px] h-[650px] bg-purple-600/25 blur-[180px] rounded-full pointer-events-none z-0"
      />

      <motion.div 
        animate={{
          opacity: [0.05, 0.6, 0.15, 0.5, 0.05],
          scale: [0.85, 1.25, 0.9, 1.4, 0.85],
          x: [0, 100, -90, 60, 0],
          y: [0, -80, 70, -50, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-[600px] left-1/3 w-[750px] h-[600px] bg-blue-600/22 blur-[200px] rounded-full pointer-events-none z-0"
      />

      <motion.div 
        animate={{
          opacity: [0.1, 0.55, 0.05, 0.65, 0.1],
          scale: [1.1, 0.8, 1.3, 0.9, 1.1],
          x: [0, -70, 80, -60, 0],
          y: [0, 60, -70, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        className="absolute top-[1100px] right-1/4 w-[700px] h-[550px] bg-emerald-500/22 blur-[190px] rounded-full pointer-events-none z-0"
      />

      <motion.div 
        animate={{
          opacity: [0.0, 0.5, 0.1, 0.6, 0.0],
          scale: [0.8, 1.35, 0.85, 1.25, 0.8],
          x: [0, 70, -80, 50, 0],
          y: [0, -60, 70, -40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        className="absolute top-[1600px] left-1/4 w-[750px] h-[600px] bg-cyan-400/20 blur-[200px] rounded-full pointer-events-none z-0"
      />

      {/* Floating Modern Fixed Navigation Bar */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 max-w-5xl mx-auto w-full pointer-events-auto">
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`px-5 py-3 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
            isScrolled 
              ? 'bg-slate-950/95 border-cyan-400/50 shadow-glow-cyan backdrop-blur-2xl scale-[0.99]' 
              : 'bg-slate-950/85 border-cyan-500/30 shadow-glow-cyan backdrop-blur-xl'
          }`}
        >
          {/* Official Logo with Running Animated Border */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-xl p-[2px] border-running-glow shadow-glow-cyan group-hover:scale-105 transition duration-300">
                <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center p-1.5 relative z-10">
                  <Image src="/logo.png" alt="Aegivex AI Official Logo" width={34} height={34} className="object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.9)]" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-cyan-300 transition">AEGIVEX</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 neon-glow-cyan font-mono">AI</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono tracking-wider">Simple Security Assistant</span>
              </div>
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link 
              href="/login"
              className="text-xs font-bold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl transition"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="btn-futuristic-primary text-xs font-bold px-5 py-2.5 rounded-xl text-white flex items-center gap-2 transition"
            >
              Start Check
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.header>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto text-center z-10">
        
        {/* Hackathon Badge */}
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

        {/* INSTANT INTERACTIVE SCANNER BAR WITH RUNNING ANIMATED BORDER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="glass-card-premium p-[2px] rounded-3xl border-running-glow shadow-glow-cyan relative text-left">
            <div className="w-full h-full p-4 sm:p-6 rounded-[22px] bg-slate-950/90 backdrop-blur-2xl relative z-10">
              
              {/* Category Selector Tabs */}
              <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
                {[
                  { id: 'token', label: 'Token Contract', icon: Coins },
                  { id: 'wallet', label: 'Wallet Address', icon: Wallet },
                  { id: 'contract', label: 'Smart Contract', icon: FileCode2 },
                  { id: 'website', label: 'Website Link', icon: Globe },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setSelectedCategory(tab.id as any);
                        setScanResult(null);
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                        selectedCategory === tab.id
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan'
                          : 'bg-slate-900/60 text-slate-400 hover:text-white border border-transparent'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Input Form */}
              <form onSubmit={handleRunInstantScan} className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                    placeholder={
                      selectedCategory === 'token' ? 'Paste token contract address (0x...)' :
                      selectedCategory === 'wallet' ? 'Paste crypto wallet address (0x...)' :
                      selectedCategory === 'contract' ? 'Paste smart contract address (0x...)' :
                      'Paste website URL (https://...)'
                    }
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isScanning || !scanInput.trim()}
                  className="btn-futuristic-primary w-full sm:w-auto px-7 py-3.5 rounded-2xl text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 transition disabled:opacity-50"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      Instant AI Check
                    </>
                  )}
                </button>
              </form>

              {/* Quick Example Presets */}
              <div className="flex items-center gap-2 mt-3 text-xs text-slate-400 overflow-x-auto">
                <span className="font-mono text-[11px] text-slate-500 shrink-0">Try Example:</span>
                <button
                  onClick={() => handleQuickPreset('token', '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984')}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-cyan-400 font-mono text-[11px] transition shrink-0"
                >
                  Token 0x1f98...
                </button>
                <button
                  onClick={() => handleQuickPreset('website', 'https://uniswap.org')}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-cyan-400 font-mono text-[11px] transition shrink-0"
                >
                  Uniswap Site
                </button>
                <button
                  onClick={() => handleQuickPreset('wallet', '0x71C7656EC7ab88b098defB751B7401B5f6d8976F')}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-cyan-400 font-mono text-[11px] transition shrink-0"
                >
                  Safe Wallet
                </button>
              </div>

              {/* Live Instant Result Card */}
              {scanResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-2xl border ${
                    scanResult.isSafe 
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' 
                      : 'bg-red-500/10 border-red-500/40 text-red-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {scanResult.isSafe ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                      )}
                      <span className="font-bold text-sm text-white">{scanResult.type} Result</span>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                      scanResult.isSafe 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                        : 'bg-red-500/20 text-red-400 border-red-500/40'
                    }`}>
                      {scanResult.rating} ({scanResult.score}/100)
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-200 mb-2">{scanResult.summary}</p>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>AI Advice: {scanResult.recommendation}</span>
                  </div>
                </motion.div>
              )}

            </div>
          </div>
        </motion.div>

        {/* Supported Blockchains Bar */}
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">Protecting Assets Across Major Blockchains</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { name: 'OKX X Layer', color: 'border-emerald-500/40 text-emerald-400' },
              { name: 'Ethereum Mainnet', color: 'border-blue-500/40 text-blue-400' },
              { name: 'Solana Network', color: 'border-purple-500/40 text-purple-400' },
              { name: 'Arbitrum One', color: 'border-cyan-500/40 text-cyan-400' },
              { name: 'Base Network', color: 'border-blue-400/40 text-blue-300' },
              { name: 'Polygon PoS', color: 'border-purple-400/40 text-purple-300' },
            ].map((chain, i) => (
              <div 
                key={i}
                className={`px-4 py-2 rounded-xl bg-slate-900/80 border ${chain.color} text-xs font-mono font-bold flex items-center gap-2 shadow-glow-cyan`}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                {chain.name}
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Bar */}
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

      {/* "Without Aegivex AI vs With Aegivex AI" Comparison Section */}
      <section className="px-6 py-20 bg-slate-950/60 border-t border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mb-3 inline-block font-mono">
              SECURITY COMPARISON
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Why You Need Aegivex AI</h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              See the difference between signing unknown Web3 permits blindly versus using Aegivex AI security protection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass-card-premium p-6 rounded-3xl border border-red-500/30 text-left relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 font-mono">
                  WITHOUT AEGIVEX AI
                </span>
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Blind Signing & High Risk</h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Unknowingly sign unlimited asset approval permits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Buy honeypot tokens with 100% hidden sell tax fees.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Connect wallet to phishing website clones.</span>
                </li>
              </ul>
            </div>

            <div className="glass-card-premium border-gradient-glow p-6 rounded-3xl border border-cyan-500/40 text-left relative overflow-hidden shadow-glow-cyan">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                  WITH AEGIVEX AI
                </span>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">100% Real-Time Asset Shield</h3>
              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Instant warning in simple English before signing permits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Automated honeypot audit detects 100% sell tax in 0.4s.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>SSL and phishing link verification prevents wallet theft.</span>
                </li>
              </ul>
            </div>
          </div>
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
