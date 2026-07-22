'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { apiClient } from '../../services/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError('');

    try {
      const res = await apiClient.post('/auth/login', { email, password });
      if (res.data && res.data.access_token) {
        localStorage.setItem('aegivex_token', res.data.access_token);
        router.push('/dashboard');
      } else {
        setError('Failed to authenticate session with database.');
      }
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Incorrect email or password. Please verify your credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col items-center justify-center p-3 xs:p-4 sm:p-6 py-6 sm:py-12 relative overflow-x-hidden bg-glow-ambient selection:bg-cyan-500/30 selection:text-cyan-200">
      
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
      <div className="w-full max-w-md flex items-center justify-start mb-3 sm:mb-4 relative z-20">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-xs font-semibold text-slate-300 hover:text-white transition backdrop-blur-md shadow-md"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          Back to Home
        </Link>
      </div>

      {/* Main Login Card Wrapper with Futuristic Cyber Glow Animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.94, y: 15, filter: 'blur(6px)' }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 0.94, y: -15, filter: 'blur(6px)' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md p-[2px] sm:p-[2.5px] rounded-[26px] sm:rounded-[34px] border-running-glow shadow-glow-cyan relative z-10"
      >
        <div className="w-full h-full glass-card-premium p-8 sm:p-10 rounded-[24px] sm:rounded-[32px] bg-slate-950/95 backdrop-blur-2xl relative z-10 text-left">
          
          {/* Header Logo Badge with Running Glow Border */}
          <div className="text-center mb-8">
            <div className="relative w-14 h-14 rounded-2xl p-[2px] border-running-glow shadow-glow-cyan shrink-0 mx-auto mb-3">
              <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center p-2 relative z-10">
                <Image src="/logo.png" alt="Aegivex AI" width={42} height={42} className="object-contain drop-shadow-[0_0_12px_rgba(6,182,212,0.9)]" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Sign In to Aegivex AI</h1>
            <p className="text-xs text-slate-400 mt-1.5 font-medium">Enter your registered database account credentials</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email address"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition font-mono placeholder:text-slate-600 placeholder:text-xs"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">Password</label>
                <Link href="/forgot-password" className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your account password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition placeholder:text-slate-600 placeholder:text-xs"
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
            </div>



            <button
              type="submit"
              disabled={loading}
              className="btn-futuristic-primary w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-glow-cyan flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {loading ? 'Authenticating Credentials...' : 'Sign In'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <Link href="/register" className="text-cyan-400 font-bold hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
