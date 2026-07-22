'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ArrowLeft, KeyRound, CheckCircle2, AlertCircle, Eye, EyeOff, Shield } from 'lucide-react';
import { apiClient } from '../../services/api';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: '', color: 'bg-slate-700' };
    let score = 0;
    if (pwd.length >= 8) score += 25;
    if (/[A-Z]/.test(pwd)) score += 25;
    if (/[0-9]/.test(pwd)) score += 25;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 25;

    if (score <= 25) return { score, label: 'WEAK', color: 'bg-red-500' };
    if (score <= 50) return { score, label: 'FAIR', color: 'bg-amber-500' };
    if (score <= 75) return { score, label: 'GOOD', color: 'bg-cyan-500' };
    return { score, label: 'SECURED', color: 'bg-emerald-500' };
  };

  const pwdStrength = getPasswordStrength(newPassword);

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await apiClient.post('/auth/forgot-password', { email });
      setSuccessMsg(res.data.message || 'Verification code generated.');
      if (res.data.reset_code) {
        setResetCode(res.data.reset_code);
      }
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to request reset code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const res = await apiClient.post('/auth/reset-password', {
        email,
        reset_code: resetCode,
        new_password: newPassword,
      });
      setSuccessMsg(res.data.message || 'Password reset successfully.');
      setStep(3);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid reset code or request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-3 xs:p-4 sm:p-6 py-6 sm:py-12 bg-[#020617] bg-glow-ambient relative overflow-x-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Left Navigation Back to Sign In */}
      <div className="w-full max-w-md flex items-center justify-start mb-3 sm:mb-4 relative z-20">
        <Link 
          href="/login" 
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-xs font-semibold text-slate-300 hover:text-white transition backdrop-blur-md shadow-md"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          Back to Sign In
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Animated Card Frame */}
        <div className="glass-card p-8 rounded-3xl border-running-glow shadow-glow-cyan relative overflow-hidden bg-slate-950/90 backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border-running-glow p-0.5 mx-auto mb-3 flex items-center justify-center shadow-glow-cyan">
              <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center p-1.5">
                <Image src="/logo.png" alt="Aegivex AI" width={34} height={34} className="object-contain" />
              </div>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">Reset Account Password</h1>
            <p className="text-xs text-slate-400 mt-1">Autonomous Security Credentials Recovery</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Step 1: Request Code */}
          {step === 1 && (
            <form onSubmit={handleRequestCode} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Registered Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered account email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition font-mono placeholder:text-slate-600 placeholder:text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-futuristic-primary w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-glow-cyan flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Generating Code...' : 'Request Password Reset Code'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Step 2: Input Reset Code & New Password */}
          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {successMsg && (
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-2">
                  <KeyRound className="w-4 h-4 shrink-0 text-cyan-400" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Reset Verification Code</label>
                <input
                  type="text"
                  required
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  placeholder="e.g. AEGIVEX-8899"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-cyan-400 font-mono text-sm font-bold tracking-wider focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300">New Password</label>
                  {pwdStrength.label && (
                    <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded border ${
                      pwdStrength.label === 'WEAK' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                      pwdStrength.label === 'FAIR' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                      pwdStrength.label === 'GOOD' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' :
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {pwdStrength.label}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new strong password"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition placeholder:text-slate-600 placeholder:text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-200 transition focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {newPassword && (
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pwdStrength.score}%` }}
                      transition={{ duration: 0.3 }}
                      className={`h-full ${pwdStrength.color}`}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Confirm New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password to confirm"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition placeholder:text-slate-600 placeholder:text-xs"
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
              </div>


              <button
                type="submit"
                disabled={loading}
                className="btn-futuristic-primary w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-glow-cyan flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Resetting Password...' : 'Confirm & Reset Password'}
                <Shield className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Step 3: Success Screen */}
          {step === 3 && (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Password Reset Successful!</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your database account security credentials have been updated successfully. You can now sign in with your new password.
              </p>

              <button
                onClick={() => router.push('/login')}
                className="btn-futuristic-primary w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-glow-cyan flex items-center justify-center gap-2 transition cursor-pointer mt-4"
              >
                Sign In to Account
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
