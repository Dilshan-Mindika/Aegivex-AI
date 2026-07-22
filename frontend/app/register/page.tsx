'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Building, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  AlertCircle, 
  ArrowLeft,
  CheckCircle2,
  Shield,
  Check,
  X
} from 'lucide-react';
import { apiClient } from '../../services/api';
import FuturisticBackgroundWorker from '../../components/FuturisticBackgroundWorker';

export default function RegisterPage() {
  const router = useRouter();
  
  // Empty Form State by Default
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('');
  const [organization, setOrganization] = useState('');
  const [primaryChain, setPrimaryChain] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Show / Hide Password Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Password Strength Evaluator
  const getPasswordStrength = (pass: string) => {
    if (!pass) {
      return { 
        score: 0, 
        label: 'ENTER PASSWORD', 
        color: 'bg-slate-800', 
        textColor: 'text-slate-500', 
        width: '0%', 
        checks: { length: false, upper: false, number: false, symbol: false } 
      };
    }

    const checks = {
      length: pass.length >= 8,
      upper: /[A-Z]/.test(pass),
      number: /[0-9]/.test(pass),
      symbol: /[^A-Za-z0-9]/.test(pass)
    };

    let score = 0;
    if (pass.length >= 6) score += 1;
    if (checks.length) score += 1;
    if (checks.upper) score += 1;
    if (checks.number) score += 1;
    if (checks.symbol) score += 1;

    if (score <= 1) {
      return { score, label: 'WEAK', color: 'bg-red-500', textColor: 'text-red-400', width: '25%', checks };
    } else if (score === 2) {
      return { score, label: 'FAIR', color: 'bg-amber-500', textColor: 'text-amber-400', width: '50%', checks };
    } else if (score === 3 || score === 4) {
      return { score, label: 'GOOD', color: 'bg-cyan-500', textColor: 'text-cyan-400', width: '75%', checks };
    } else {
      return { 
        score, 
        label: 'SECURED', 
        color: 'bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)]', 
        textColor: 'text-emerald-400 font-bold', 
        width: '100%', 
        checks 
      };
    }
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your password entry.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!agreeTerms) {
      setError('You must accept the Aegivex AI Security Terms & Conditions to proceed.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await apiClient.post('/auth/register', { 
        name, 
        email, 
        password,
        account_type: accountType || 'Security Researcher',
        organization,
        primary_chain: primaryChain || 'OKX X Layer'
      });

      if (res.data && res.data.access_token) {
        localStorage.setItem('aegivex_token', res.data.access_token);
        router.push('/dashboard');
      } else {
        setError('Failed to create account in database.');
      }
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Registration failed. Email address may already be registered.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col items-center justify-center p-3 xs:p-4 sm:p-6 py-6 sm:py-12 relative overflow-x-hidden bg-glow-ambient selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Offscreen Web Worker Particle Acceleration */}
      <FuturisticBackgroundWorker />
      
      {/* Background Glowing Orbs - Optimized for Mobile GPUs */}
      <motion.div 
        animate={{
          opacity: [0.2, 0.6, 0.3, 0.65, 0.2],
          scale: [0.95, 1.2, 0.98, 1.25, 0.95],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden sm:block absolute top-10 left-1/5 w-[650px] h-[650px] bg-cyan-500/20 blur-[180px] rounded-full pointer-events-none z-0"
      />

      {/* Top Back Navigation Bar - Positioned cleanly above card */}
      <div className="w-full max-w-xl flex items-center justify-start mb-3 sm:mb-4 relative z-20">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-xs font-semibold text-slate-300 hover:text-white transition backdrop-blur-md shadow-md"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          Back to Home
        </Link>
      </div>

      {/* Main Registration Card Wrapper with Futuristic Cyber Glow Animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.94, y: 15, filter: 'blur(6px)' }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 0.94, y: -15, filter: 'blur(6px)' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl p-[2px] sm:p-[2.5px] rounded-[26px] sm:rounded-[34px] border-running-glow shadow-glow-cyan relative z-10"
      >
        <div className="w-full h-full glass-card-premium p-5 sm:p-10 rounded-[24px] sm:rounded-[32px] bg-slate-950/95 backdrop-blur-2xl relative z-10 text-left">
          
          {/* Header Logo Badge with Running Glow Border */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="relative w-14 h-14 rounded-2xl p-[2px] border-running-glow shadow-glow-cyan shrink-0 mx-auto mb-3">
              <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center p-2 relative z-10">
                <Image src="/logo.png" alt="Aegivex AI" width={42} height={42} className="object-contain drop-shadow-[0_0_12px_rgba(6,182,212,0.9)]" />
              </div>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">Create Security Account</h1>
            <p className="text-xs text-slate-400 mt-1.5 font-medium">Register user credentials to access autonomous security intelligence</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3 sm:p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Row 1: Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full legal name"
                    className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition font-mono placeholder:text-slate-600 placeholder:text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex@company.com"
                    className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition font-mono placeholder:text-slate-600 placeholder:text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Account Type / Role & Organization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Professional Role</label>
                <div className="relative">
                  <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition font-mono appearance-none"
                  >
                    <option value="" disabled className="text-slate-600">-- Select Professional Role --</option>
                    <option value="Security Researcher">Security Researcher</option>
                    <option value="Smart Contract Auditor">Smart Contract Auditor</option>
                    <option value="Retail Investor / Trader">Retail Investor / Trader</option>
                    <option value="Protocol Lead / Developer">Protocol Lead / Developer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Organization / Team (Optional)</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Enter company or project name"
                    className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition font-mono placeholder:text-slate-600 placeholder:text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Primary Chain Focus */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Web3 Ecosystem Focus</label>
              <div className="relative">
                <Cpu className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <select
                  value={primaryChain}
                  onChange={(e) => setPrimaryChain(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition font-mono appearance-none"
                >
                  <option value="" disabled className="text-slate-600">-- Select Primary Ecosystem --</option>
                  <option value="OKX X Layer">OKX X Layer (Default Protocol)</option>
                  <option value="Ethereum Mainnet">Ethereum Mainnet (ETH)</option>
                  <option value="Solana Network">Solana Network (SOL)</option>
                  <option value="Arbitrum One">Arbitrum One (ARB)</option>
                  <option value="Base Network">Base Network (BASE)</option>
                  <option value="Polygon PoS">Polygon PoS (MATIC)</option>
                </select>
              </div>
            </div>

            {/* Row 4: Password with Show / Hide Toggle & Animated Strength Meter */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Password *</label>
                {password && (
                  <span className={`text-[10px] font-mono tracking-wider font-bold px-2 py-0.5 rounded-full border ${
                    strength.score <= 1 ? 'bg-red-500/15 border-red-500/30 text-red-400' :
                    strength.score === 2 ? 'bg-amber-500/15 border-amber-500/30 text-amber-400' :
                    strength.score <= 4 ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400' :
                    'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                  }`}>
                    {strength.label}
                  </span>
                )}
              </div>
              
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter strong password (min 6 characters)"
                  className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition placeholder:text-slate-600 placeholder:text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-200 transition focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Animated Password Strength Bar */}
              {password && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 space-y-1.5"
                >
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: strength.width }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className={`h-full rounded-full ${strength.color}`}
                    />
                  </div>

                  {/* Requirements Checklist Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px] font-mono pt-1">
                    <div className={`flex items-center gap-1 ${strength.checks.length ? 'text-emerald-400 font-semibold' : 'text-slate-500'}`}>
                      {strength.checks.length ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      8+ Characters
                    </div>
                    <div className={`flex items-center gap-1 ${strength.checks.upper ? 'text-emerald-400 font-semibold' : 'text-slate-500'}`}>
                      {strength.checks.upper ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      Uppercase Letter
                    </div>
                    <div className={`flex items-center gap-1 ${strength.checks.number ? 'text-emerald-400 font-semibold' : 'text-slate-500'}`}>
                      {strength.checks.number ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      Number
                    </div>
                    <div className={`flex items-center gap-1 ${strength.checks.symbol ? 'text-emerald-400 font-semibold' : 'text-slate-500'}`}>
                      {strength.checks.symbol ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      Special Symbol
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Row 5: Confirm Password with Show / Hide Toggle */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Confirm Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password to confirm"
                  className={`w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl bg-slate-900/90 border text-slate-200 text-xs sm:text-sm focus:outline-none transition placeholder:text-slate-600 placeholder:text-xs ${
                    confirmPassword && password !== confirmPassword 
                      ? 'border-red-500/60 focus:border-red-500' 
                      : 'border-slate-800 focus:border-cyan-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-200 transition focus:outline-none"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {confirmPassword && password !== confirmPassword && (
                <p className="text-[11px] text-red-400 mt-1 font-mono">Passwords do not match</p>
              )}
            </div>

            {/* Terms Agreement Checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-950 transition cursor-pointer"
              />
              <label htmlFor="agreeTerms" className="text-xs text-slate-400 leading-relaxed cursor-pointer select-none">
                I accept the <span className="text-cyan-400 font-bold hover:underline">Security Terms of Service</span> and <span className="text-cyan-400 font-bold hover:underline">Privacy Policy</span>.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-futuristic-primary w-full py-3.5 px-4 rounded-xl text-white font-bold text-xs sm:text-sm shadow-glow-cyan flex items-center justify-center gap-2 transition cursor-pointer mt-2"
            >
              {loading ? (
                <>Creating Database Account...</>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Register Security Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Already registered?{' '}
            <Link href="/login" className="text-cyan-400 font-bold hover:underline">
              Sign In to Account
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
