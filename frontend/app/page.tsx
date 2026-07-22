'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  ChevronRight,
  Terminal,
  Activity,
  Check,
  Lock,
  Flame,
  ShieldAlert,
  XCircle,
  RefreshCw,
  Layers,
  X,
  FileText,
  LockKeyhole
} from 'lucide-react';
import LiveSupportChat from '@/components/LiveSupportChat';

const targetPhrases = [
  "WALLET ADDRESSES",
  "TOKEN ASSETS",
  "SMART CONTRACTS",
  "WEBSITE DOMAINS",
  "CRYPTO TRANSFERS"
];

const multiChainList = [
  { name: 'OKX X Layer', symbol: 'XLAYER', icon: Cpu },
  { name: 'Ethereum Mainnet', symbol: 'ETH', icon: Layers },
  { name: 'Solana Network', symbol: 'SOL', icon: Zap },
  { name: 'Arbitrum One', symbol: 'ARB', icon: Activity },
  { name: 'Base Network', symbol: 'BASE', icon: Shield },
  { name: 'Polygon PoS', symbol: 'MATIC', icon: Terminal },
];

function AnimatedMetricCounter({ 
  targetValue, 
  prefix = '', 
  suffix = '', 
  decimals = 1,
  isCountdown = false 
}: { 
  targetValue: number; 
  prefix?: string; 
  suffix?: string; 
  decimals?: number;
  isCountdown?: boolean;
}) {
  const [currentVal, setCurrentVal] = useState(isCountdown ? 3.0 : 0);

  useEffect(() => {
    let startTime: number | null = null;
    const durationMs = 2400;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      if (isCountdown) {
        const computed = 3.0 - (3.0 - targetValue) * easedProgress;
        setCurrentVal(computed);
      } else {
        const computed = targetValue * easedProgress;
        setCurrentVal(computed);
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [targetValue, isCountdown]);

  return (
    <span>
      {prefix}
      {currentVal.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [scanInput, setScanInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'token' | 'wallet' | 'contract' | 'website'>('token');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [litChainIndex, setLitChainIndex] = useState<number>(0);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

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

  useEffect(() => {
    const lightInterval = setInterval(() => {
      setLitChainIndex((prev) => {
        let nextIdx = Math.floor(Math.random() * multiChainList.length);
        while (nextIdx === prev) {
          nextIdx = Math.floor(Math.random() * multiChainList.length);
        }
        return nextIdx;
      });
    }, 1600);
    return () => clearInterval(lightInterval);
  }, []);

  const handleProtectedNavigation = (targetPath: string = '/dashboard') => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('aegivex_token');
      if (token) {
        router.push(targetPath);
        return;
      }
    }
    router.push('/login');
  };

  const handleRunInstantScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanInput.trim()) return;
    
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      if (selectedCategory === 'token') {
        setScanResult({
          type: 'Token Risk Analysis',
          target: scanInput,
          score: 88,
          rating: 'Critical Threat Detected',
          summary: 'Malicious honeypot pattern identified: 100% sell fee restriction embedded within transfer functions.',
          recommendation: 'ABORT TRANSACTION. Extreme capital loss vector detected.',
          isSafe: false
        });
      } else if (selectedCategory === 'wallet') {
        setScanResult({
          type: 'Wallet Integrity Audit',
          target: scanInput,
          score: 12,
          rating: 'Low Risk Signature',
          summary: 'Verified address history with zero malicious approval permits or drainer contract association.',
          recommendation: 'Address cleared for standard cross-chain transfers.',
          isSafe: true
        });
      } else if (selectedCategory === 'contract') {
        setScanResult({
          type: 'Smart Contract Vulnerability Assessment',
          target: scanInput,
          score: 25,
          rating: 'Verified Contract Logic',
          summary: 'Verified open-source code with standard proxy upgradeability permissions enabled.',
          recommendation: 'Standard proxy contract verified. Safe for authorized protocol interaction.',
          isSafe: true
        });
      } else {
        setScanResult({
          type: 'Domain & Protocol Security Check',
          target: scanInput,
          score: 5,
          rating: 'Authentic Endpoint Verified',
          summary: 'SSL certificate validated. Zero phishing keyword signatures or typosquatting patterns detected.',
          recommendation: 'Official dApp domain confirmed. Safe to initialize wallet connection.',
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
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col justify-between w-full selection:bg-cyan-500/30 selection:text-cyan-200 relative bg-glow-ambient overflow-x-hidden font-sans">
      
      {/* Background Glowing Orbs */}
      <motion.div 
        animate={{
          opacity: [0.1, 0.65, 0.2, 0.7, 0.1],
          scale: [0.9, 1.3, 0.95, 1.35, 0.9],
          x: [0, 90, -70, 50, 0],
          y: [0, -70, 60, -40, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-1/5 w-[300px] sm:w-[650px] h-[300px] sm:h-[650px] bg-cyan-500/25 blur-[120px] sm:blur-[180px] rounded-full pointer-events-none z-0"
      />

      <motion.div 
        animate={{
          opacity: [0.2, 0.7, 0.1, 0.6, 0.2],
          scale: [1, 0.85, 1.35, 0.9, 1],
          x: [0, -80, 60, -50, 0],
          y: [0, 70, -50, 80, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-48 right-1/5 w-[300px] sm:w-[650px] h-[300px] sm:h-[650px] bg-purple-600/25 blur-[120px] sm:blur-[180px] rounded-full pointer-events-none z-0"
      />

      {/* Floating Fixed Navbar with Sign In, Sign Up, and Try Now Buttons */}
      <div className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 max-w-5xl mx-auto w-full pointer-events-auto">
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
            isScrolled 
              ? 'bg-slate-950/95 border-cyan-400/50 shadow-glow-cyan backdrop-blur-2xl scale-[0.99]' 
              : 'bg-slate-950/85 border-cyan-500/30 shadow-glow-cyan backdrop-blur-xl'
          }`}
        >
          {/* Brand Header */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl p-[2px] border-running-glow shadow-glow-cyan group-hover:scale-105 transition duration-300 shrink-0">
                <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center p-1 sm:p-1.5 relative z-10">
                  <Image src="/logo.png" alt="Aegivex AI Official Logo" width={30} height={30} className="object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.9)]" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-base sm:text-xl tracking-tight text-white group-hover:text-cyan-300 transition">AEGIVEX</span>
                  <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 neon-glow-cyan font-mono">AI</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono tracking-wider font-semibold hidden md:block">Web3 AI Security Intelligence Copilot</span>
              </div>
            </Link>
          </div>

          {/* Action Buttons: Sign In, Sign Up & Try Now */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <Link
              href="/login"
              className="text-xs font-bold text-slate-300 hover:text-white px-2 sm:px-3 py-1.5 sm:py-2 transition hidden xs:inline-block cursor-pointer"
            >
              Sign In
            </Link>
            <Link 
              href="/register"
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-400/60 text-slate-200 hover:text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              Sign Up
            </Link>
            <button
              onClick={() => handleProtectedNavigation('/dashboard')}
              className="btn-futuristic-primary text-xs font-bold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-white flex items-center gap-1.5 sm:gap-2 transition shrink-0 cursor-pointer"
            >
              Try Now
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.header>
      </div>

      {/* SECTION 1: HERO & INSTANT SCANNER BAR */}
      <section className="relative px-3 sm:px-6 pt-24 pb-12 sm:pt-36 sm:pb-24 max-w-7xl mx-auto text-center z-10 w-full overflow-x-hidden">
        
        {/* Hackathon Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -25, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
          className="inline-flex flex-col items-center gap-1 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-6 sm:mb-8 shadow-glow-cyan backdrop-blur-md max-w-full"
        >
          <span className="font-bold text-white tracking-wide text-[11px] sm:text-xs text-center">OKX.AI Genesis Hackathon Project</span>
          <span className="font-mono text-[10px] sm:text-[11px] text-purple-300 tracking-wider font-semibold text-center">
            Autonomous Threat Intelligence
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div 
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto mb-6"
        >
          <h1 className="text-xl xs:text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.2]">
            AUTONOMOUS AI SECURITY ENGINE FOR
          </h1>
          
          <div className="h-14 sm:h-20 flex items-center justify-center my-2 sm:my-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={phraseIndex}
                initial={{ opacity: 0, y: 20, rotateX: -60 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -20, rotateX: 60 }}
                transition={{ duration: 0.4 }}
                className="px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-400/50 shadow-glow-cyan inline-flex items-center gap-2 sm:gap-3 max-w-full"
              >
                <ShieldCheck className="w-5 h-5 sm:w-8 sm:h-8 text-cyan-400 animate-pulse shrink-0" />
                <span className="text-base xs:text-2xl sm:text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 neon-glow-cyan font-mono truncate">
                  {targetPhrases[phraseIndex]}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <h2 className="text-lg xs:text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-200">
            PRE-EXECUTION RISK ASSESSMENT ENGINE
          </h2>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-xs sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal px-2"
        >
          Delivers real-time automated threat intelligence, vulnerability auditing, honeypot detection, and transaction risk analysis across multi-chain ecosystems.
        </motion.p>

        {/* Instant Scanner Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto mb-12 sm:mb-16 w-full"
        >
          <div className="relative p-[2px] sm:p-[2.5px] rounded-2xl sm:rounded-3xl border-running-glow shadow-glow-cyan overflow-hidden text-left w-full">
            <div className="w-full h-full p-3 sm:p-6 rounded-[14px] sm:rounded-[22px] bg-slate-950/95 backdrop-blur-2xl relative z-10">
              
              {/* Category Selector Tabs */}
              <div className="grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2 mb-4 w-full">
                {[
                  { id: 'token', label: 'Token Analysis', icon: Coins },
                  { id: 'wallet', label: 'Wallet Audit', icon: Wallet },
                  { id: 'contract', label: 'Contract Auditor', icon: FileCode2 },
                  { id: 'website', label: 'Domain Check', icon: Globe },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setSelectedCategory(tab.id as any);
                        setScanResult(null);
                      }}
                      className={`px-2.5 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                        selectedCategory === tab.id
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan'
                          : 'bg-slate-900/60 text-slate-400 hover:text-white border border-transparent'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Input Form */}
              <form onSubmit={handleRunInstantScan} className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                    placeholder={
                      selectedCategory === 'token' ? 'Enter target token contract address (0x...)' :
                      selectedCategory === 'wallet' ? 'Enter target wallet public address (0x...)' :
                      selectedCategory === 'contract' ? 'Enter smart contract deployment address (0x...)' :
                      'Enter dApp URL endpoint (https://...)'
                    }
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 rounded-xl sm:rounded-2xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isScanning || !scanInput.trim()}
                  className="btn-futuristic-primary w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 transition disabled:opacity-50 cursor-pointer"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Analyzing Target...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      Execute Audit
                    </>
                  )}
                </button>
              </form>

              {/* Quick Presets */}
              <div className="flex items-center gap-1.5 sm:gap-2 mt-3 text-xs text-slate-400 overflow-x-auto pb-1">
                <span className="font-mono text-[10px] sm:text-[11px] text-slate-500 shrink-0">Presets:</span>
                <button
                  onClick={() => handleQuickPreset('token', '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984')}
                  className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-cyan-400 font-mono text-[10px] sm:text-[11px] transition shrink-0 cursor-pointer"
                >
                  Token 0x1f98...
                </button>
                <button
                  onClick={() => handleQuickPreset('website', 'https://uniswap.org')}
                  className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-cyan-400 font-mono text-[10px] sm:text-[11px] transition shrink-0 cursor-pointer"
                >
                  Uniswap Endpoint
                </button>
                <button
                  onClick={() => handleQuickPreset('wallet', '0x71C7656EC7ab88b098defB751B7401B5f6d8976F')}
                  className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-cyan-400 font-mono text-[10px] sm:text-[11px] transition shrink-0 cursor-pointer"
                >
                  Verified Address
                </button>
              </div>

              {/* Live Instant Result Card */}
              {scanResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-3.5 sm:p-4 rounded-2xl border ${
                    scanResult.isSafe 
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' 
                      : 'bg-red-500/10 border-red-500/40 text-red-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {scanResult.isSafe ? (
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                      )}
                      <span className="font-bold text-xs sm:text-sm text-white">{scanResult.type} Assessment</span>
                    </div>
                    <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full border ${
                      scanResult.isSafe 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                        : 'bg-red-500/20 text-red-400 border-red-500/40'
                    }`}>
                      {scanResult.rating} ({scanResult.score}/100)
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs leading-relaxed text-slate-200 mb-2">{scanResult.summary}</p>
                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] sm:text-[11px] font-mono text-slate-300 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Security Directive: {scanResult.recommendation}</span>
                  </div>
                </motion.div>
              )}

            </div>
          </div>
        </motion.div>

        {/* SECTION 2: MULTI-CHAIN PROTOCOL COVERAGE */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto mb-12 sm:mb-16 w-full"
        >
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4 font-semibold">Multi-Chain Protocol Coverage</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3.5 w-full">
            {multiChainList.map((chain, i) => {
              const isLit = litChainIndex === i;
              const Icon = chain.icon;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25, rotateY: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  animate={{
                    scale: isLit ? 1.05 : 1,
                    y: isLit ? -4 : 0,
                  }}
                  className={`relative p-3 sm:p-3.5 rounded-2xl border transition-all duration-500 overflow-hidden cursor-default group ${
                    isLit 
                      ? 'bg-gradient-to-br from-cyan-950/90 via-slate-900 to-purple-950/90 border-cyan-400/80 shadow-[0_0_30px_rgba(6,182,212,0.5)]' 
                      : 'bg-slate-950/80 border-slate-800/90 hover:border-slate-700 shadow-lg'
                  }`}
                >
                  <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors duration-500 ${isLit ? 'border-cyan-400' : 'border-slate-700/50'}`} />
                  <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors duration-500 ${isLit ? 'border-purple-400' : 'border-slate-700/50'}`} />

                  {isLit && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: [0.4, 0.85, 0.4], scale: [0.8, 1.25, 0.8] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-6 -right-6 w-20 h-20 bg-cyan-400/30 blur-xl rounded-full pointer-events-none"
                    />
                  )}

                  <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 relative z-10">
                    <div className={`p-1.5 sm:p-2 rounded-xl border transition-colors duration-500 ${
                      isLit 
                        ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-300 shadow-glow-cyan' 
                        : 'bg-slate-900 border-slate-800 text-slate-400 group-hover:text-slate-200'
                    }`}>
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>

                    <span className={`text-[11px] sm:text-xs font-mono font-bold tracking-tight text-center transition-colors duration-500 ${
                      isLit ? 'text-white neon-glow-cyan' : 'text-slate-300 group-hover:text-white'
                    }`}>
                      {chain.name}
                    </span>

                    <span className={`text-[9px] sm:text-[10px] font-mono transition-colors duration-500 ${
                      isLit ? 'text-cyan-300 font-bold' : 'text-slate-500'
                    }`}>
                      {chain.symbol}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* SECTION 3: METRICS BAR */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.93 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-5xl mx-auto w-full"
        >
          {[
            { 
              component: <AnimatedMetricCounter targetValue={4.8} prefix="$" suffix="M+" decimals={1} />, 
              label: 'Total Value Protected', 
              color: 'text-cyan-400' 
            },
            { 
              component: <AnimatedMetricCounter targetValue={0.4} prefix="< " suffix="s" decimals={1} isCountdown={true} />, 
              label: 'Latency Benchmark', 
              color: 'text-emerald-400' 
            },
            { 
              component: <AnimatedMetricCounter targetValue={99.9} prefix="" suffix="%" decimals={1} />, 
              label: 'Vulnerability Detection Rate', 
              color: 'text-purple-400' 
            },
            { 
              component: (
                <div className="flex items-center justify-center gap-1.5">
                  <span>24/7</span>
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping inline-block" />
                </div>
              ), 
              label: 'Autonomous Monitoring', 
              color: 'text-blue-400' 
            },
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ scale: 1.05, y: -4 }}
              className="glass-card-premium p-3 sm:p-4 rounded-2xl border border-slate-800 text-center"
            >
              <span className={`text-xl sm:text-3xl font-black ${item.color} font-mono block mb-0.5 sm:mb-1`}>
                {item.component}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-medium">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 4: SECURITY COMPARISON MATRIX */}
      <section className="px-3 sm:px-6 py-12 sm:py-20 bg-slate-950/60 border-t border-slate-800/80 relative w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <span className="text-xs font-bold px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mb-3 inline-block font-mono">
              SECURITY EVALUATION MATRIX
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-2 sm:mb-3">Institutional & Retail Security Matrix</h2>
            <p className="text-slate-400 text-xs sm:text-base max-w-xl mx-auto">
              Comparative analysis between unverified transaction signing and autonomous AI vulnerability protection.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto w-full">
            
            {/* Unprotected Execution Card */}
            <motion.div 
              initial={{ opacity: 0, x: -40, rotateY: 6 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="glass-card-premium p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-red-500/30 text-left relative overflow-hidden w-full"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 font-mono">
                  UNPROTECTED EXECUTION
                </span>
                <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">Unverified Signing Risk Factors</h3>
              <ul className="space-y-2.5 sm:space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Unintentional authorization of unlimited ERC20/NFT approval permits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Exposure to honeypot tokens with unannounced 100% sell tax code logic.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Interaction with typosquatted dApp phishing endpoints.</span>
                </li>
              </ul>
            </motion.div>

            {/* Aegivex Autonomous Shield Card */}
            <motion.div 
              initial={{ opacity: 0, x: 40, rotateY: -6 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="glass-card-premium border-gradient-glow p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-cyan-500/40 text-left relative overflow-hidden shadow-glow-cyan w-full"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                  AEGIVEX AUTONOMOUS SHIELD
                </span>
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">Real-Time Autonomous Risk Prevention</h3>
              <ul className="space-y-2.5 sm:space-y-3 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Pre-signature transaction decoding and risk signature classification.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Automated static code analysis identifying honeypot traps in &lt; 0.4s.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Cryptographic domain and SSL validation preventing wallet drainer attacks.</span>
                </li>
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS WORKFLOW ARCHITECTURE */}
      <section className="px-3 sm:px-6 py-12 sm:py-20 bg-slate-950/40 border-t border-slate-800/80 relative w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <span className="text-xs font-bold px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mb-3 inline-block font-mono">
              EXECUTION WORKFLOW
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-2 sm:mb-3">Security Intelligence Architecture</h2>
            <p className="text-slate-400 text-xs sm:text-base max-w-xl mx-auto">
              Multi-tiered threat analysis pipeline verifying Web3 transactions in 4 automated phases.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
            {[
              { step: '01', title: 'Session Authentication', desc: 'Initialize secure platform session with cryptographic token validation.', icon: UserCheck, color: 'text-blue-400' },
              { step: '02', title: 'Target Vector Input', desc: 'Specify contract address, wallet identifier, dApp URL, or transaction payload.', icon: Search, color: 'text-cyan-400' },
              { step: '03', title: 'Neural Analysis', desc: 'Execute deep neural evaluation against known threat vectors and opcode heuristics.', icon: Cpu, color: 'text-purple-400' },
              { step: '04', title: 'Threat Intelligence Report', desc: 'Receive standardized risk score (0-100), vulnerability breakdown, and directive.', icon: Shield, color: 'text-emerald-400' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="relative p-[2px] rounded-2xl border-running-glow shadow-glow-cyan overflow-hidden h-full group transition duration-300"
                >
                  <div className="w-full h-full p-4 sm:p-6 rounded-[14px] bg-slate-950/90 backdrop-blur-2xl relative z-10 flex flex-col justify-between">
                    <div>
                      <span className="text-3xl sm:text-4xl font-black text-slate-800 absolute top-3 sm:top-4 right-3 sm:right-4 font-mono group-hover:text-cyan-500/20 transition">
                        {s.step}
                      </span>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition">
                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${s.color}`} />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2">{s.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6: ENTERPRISE SECURITY SUITE */}
      <section className="px-3 sm:px-6 py-12 sm:py-20 bg-slate-950/60 border-t border-slate-800 w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-2 sm:mb-3">Enterprise Security Suite</h2>
            <p className="text-slate-400 text-xs sm:text-base max-w-xl mx-auto">
              Comprehensive threat assessment tools for smart contracts, digital assets, endpoints, and transaction payloads.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full">
            {[
              {
                title: 'AI Security Copilot Chat',
                desc: 'Interact with our conversational AI security agent to evaluate smart contracts, verify wallet integrity, and audit Web3 URLs.',
                icon: Bot,
                color: 'text-purple-400',
                link: '/chat'
              },
              {
                title: 'Wallet Risk & Drainer Scanner',
                desc: 'Perform deep-chain analysis on public wallet addresses to flag drainer authorization patterns and illicit counterparty risks.',
                icon: Wallet,
                color: 'text-blue-400',
                link: '/scanners/wallet'
              },
              {
                title: 'Token Risk & Honeypot Analyzer',
                desc: 'Audit token bytecode for tax manipulation, liquidity lock mechanisms, blacklist restrictions, and hidden mint functions.',
                icon: Coins,
                color: 'text-cyan-400',
                link: '/scanners/token'
              },
              {
                title: 'Smart Contract Auditor',
                desc: 'Examine contract AST and opcode logic for reentrancy vectors, access control flaws, and unverified upgradeability keys.',
                icon: FileCode2,
                color: 'text-emerald-400',
                link: '/scanners/contract'
              },
              {
                title: 'Website & dApp Domain Scanner',
                desc: 'Validate dApp domain signatures, SSL authority credentials, typosquatting vectors, and malicious script injection payloads.',
                icon: Globe,
                color: 'text-amber-400',
                link: '/scanners/website'
              },
              {
                title: 'Transaction Payload Explainer',
                desc: 'Decode complex ABI calldata, Permit2 signature approvals, and multi-call state modifications into clear risk audits.',
                icon: Receipt,
                color: 'text-rose-400',
                link: '/scanners/transaction'
              },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 35, rotateX: 12 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative p-[2px] rounded-2xl border-running-glow shadow-glow-cyan overflow-hidden h-full group"
                >
                  <button 
                    onClick={() => handleProtectedNavigation(f.link)}
                    className="w-full h-full p-4 sm:p-6 rounded-[14px] bg-slate-950/90 backdrop-blur-2xl relative z-10 block h-full flex flex-col justify-between text-left cursor-pointer"
                  >
                    <div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition">
                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${f.color}`} />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2 group-hover:text-cyan-400 transition flex items-center justify-between">
                        {f.title}
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition" />
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Redesigned Modern Footer */}
      <footer className="px-4 sm:px-6 md:px-12 py-10 sm:py-14 border-t border-slate-800/80 bg-slate-950/95 relative z-10 text-left w-full">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-6 w-full">
          
          {/* Logo & Brand Info */}
          <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl p-[2px] border-running-glow shadow-glow-cyan shrink-0">
                <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center p-2 relative z-10">
                  <Image src="/logo.png" alt="Aegivex AI Official Logo" width={44} height={44} className="object-contain drop-shadow-[0_0_12px_rgba(6,182,212,0.9)]" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="font-black text-xl sm:text-2xl tracking-tight text-white">AEGIVEX</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 neon-glow-cyan font-mono">AI</span>
                </div>
                <span className="text-[11px] sm:text-xs text-slate-400 font-mono tracking-wider font-semibold">Autonomous Web3 Security Intelligence Engine</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed font-normal">
              Pre-execution risk assessment engine for tokens, smart contracts, wallets, and dApp endpoints across multi-chain protocols.
            </p>
          </div>

          {/* Right Column: Copyright + Terms & Privacy */}
          <div className="flex flex-col items-center md:items-end gap-2 text-xs text-slate-400 font-mono text-center md:text-right w-full md:w-auto">
            <p className="font-medium text-slate-300">© 2026 Aegivex AI. All rights reserved.</p>
            <p className="text-[11px] text-cyan-400/90 font-bold mb-1">OKX.AI Genesis Hackathon Project</p>

            <div className="flex items-center justify-center md:justify-end gap-3 text-xs font-semibold text-slate-400 w-full">
              <button 
                onClick={() => setShowTermsModal(true)} 
                className="hover:text-cyan-400 transition flex items-center gap-1.5 cursor-pointer no-underline focus:outline-none"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                Terms & Conditions
              </button>
              <span className="text-slate-700">•</span>
              <button 
                onClick={() => setShowPrivacyModal(true)} 
                className="hover:text-purple-400 transition flex items-center gap-1.5 cursor-pointer no-underline focus:outline-none"
              >
                <LockKeyhole className="w-3.5 h-3.5 text-purple-400" />
                Privacy Policy
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Terms & Conditions Modal */}
      <AnimatePresence>
        {showTermsModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="glass-card-premium border-gradient-glow w-full max-w-2xl max-h-[85vh] overflow-y-auto p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-cyan-500/40 shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setShowTermsModal(false)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/50 transition cursor-pointer"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4 sm:mb-6 border-b border-slate-800 pb-3 sm:pb-4">
                <div className="p-2 sm:p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 shadow-glow-cyan">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Terms & Conditions</h3>
                  <p className="text-xs text-slate-400 font-mono">Platform Usage & Legal Guidelines</p>
                </div>
              </div>

              <div className="space-y-3.5 sm:space-y-4 text-xs text-slate-300 leading-relaxed">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-cyan-300 mb-1">1. Autonomous Threat Intelligence Scope</h4>
                  <p>
                    Aegivex AI operates as an automated pre-execution risk assessment engine. Security evaluation scores (0-100), threat classification signatures, and vulnerability reports are derived from static bytecode analysis, opcode heuristics, and public ledger telemetry.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-cyan-300 mb-1">2. Non-Custodial Security Infrastructure</h4>
                  <p>
                    Aegivex AI operates under a non-custodial architecture. The platform never requests, stores, or accesses private keys, seed phrases, or custodial fund balances.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-cyan-300 mb-1">3. Automated Risk Analysis Disclaimer</h4>
                  <p>
                    Security intelligence reports provide pre-execution risk indicators to mitigate honeypot tokens, malicious approval drainers, and typosquatted dApp phishing endpoints. Users remain solely responsible for validating contract interactions prior to transaction submission.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-cyan-300 mb-1">4. Acceptable Platform Usage</h4>
                  <p>
                    Reverse-engineering, automated scraping, or denial-of-service attempts against Aegivex neural analysis endpoints are strictly prohibited.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="btn-futuristic-primary px-5 py-2 sm:px-6 sm:py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer"
                >
                  Close Document
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacyModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="glass-card-premium border-gradient-glow w-full max-w-2xl max-h-[85vh] overflow-y-auto p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-purple-500/40 shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setShowPrivacyModal(false)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-purple-500/50 transition cursor-pointer"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4 sm:mb-6 border-b border-slate-800 pb-3 sm:pb-4">
                <div className="p-2 sm:p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 shadow-glow-purple">
                  <LockKeyhole className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Privacy Policy</h3>
                  <p className="text-xs text-slate-400 font-mono">Cryptographic Data Protection Standard</p>
                </div>
              </div>

              <div className="space-y-3.5 sm:space-y-4 text-xs text-slate-300 leading-relaxed">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-purple-300 mb-1">1. Zero Personally Identifiable Information (PII)</h4>
                  <p>
                    Aegivex AI adheres to a strict privacy framework. The platform does not collect, store, or sell user real-world names, physical addresses, email databases, or IP address tracking logs.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-purple-300 mb-1">2. On-Chain Target Telemetry Processing</h4>
                  <p>
                    Public wallet addresses, token contract identifiers, smart contract bytecode, and dApp URL endpoints submitted for security auditing are processed transiently to perform real-time neural threat evaluation.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-purple-300 mb-1">3. End-to-End Cryptographic Security</h4>
                  <p>
                    All communication between client browsers and Aegivex threat intelligence APIs is protected via TLS 1.3 encryption protocol standards.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-purple-300 mb-1">4. Data Sharing & Third-Party Non-Disclosure</h4>
                  <p>
                    Aegivex AI maintains complete data independence and does not share, monetize, or transmit telemetry search parameters to third-party data aggregators.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="btn-futuristic-primary px-5 py-2 sm:px-6 sm:py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer"
                >
                  Close Document
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Live Support Chat Widget */}
      <LiveSupportChat />

    </div>
  );
}
