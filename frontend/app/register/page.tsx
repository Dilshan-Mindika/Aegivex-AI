'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Zap, ArrowLeft } from 'lucide-react';
import { apiClient } from '../../services/api';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterSuccess = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aegivex_token', 'aegivex_demo_access_token_jwt');
      localStorage.setItem('user_role', 'user');
    }
    router.push('/dashboard');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiClient.post('/auth/register', { name, email, password });
    } catch (err: any) {
    } finally {
      handleRegisterSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden bg-glow-ambient selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Orbs */}
      <motion.div 
        animate={{
          opacity: [0.1, 0.65, 0.2, 0.7, 0.1],
          scale: [0.9, 1.3, 0.95, 1.35, 0.9],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-1/5 w-[650px] h-[650px] bg-cyan-500/25 blur-[180px] rounded-full pointer-events-none z-0"
      />

      <Link 
        href="/" 
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition backdrop-blur-md"
      >
        <ArrowLeft className="w-4 h-4 text-cyan-400" />
        Back to Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-card-premium border-gradient-glow p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative z-10 text-left"
      >
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-slate-900 p-2.5 border border-cyan-500/40 items-center justify-center shadow-glow-cyan mb-3">
            <Image src="/logo.png" alt="Aegivex AI" width={42} height={42} className="object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.9)]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Create Aegivex Account</h1>
          <p className="text-xs text-slate-400 mt-1.5 font-medium">Start protecting your Web3 assets with AI Copilot</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-futuristic-primary w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-glow-cyan flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {loading ? 'Creating Account...' : 'Create Account & Enter Dashboard'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-[1px] bg-slate-800" />
          <span className="text-[10px] text-slate-500 font-mono uppercase">or quick access</span>
          <div className="flex-1 h-[1px] bg-slate-800" />
        </div>

        <button
          onClick={handleRegisterSuccess}
          type="button"
          className="w-full py-3 px-4 rounded-xl bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-bold text-xs shadow-glow-cyan flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <Zap className="w-4 h-4 text-cyan-400" />
          1-Click Instant Access
        </button>

        <div className="mt-6 text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-cyan-400 font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
