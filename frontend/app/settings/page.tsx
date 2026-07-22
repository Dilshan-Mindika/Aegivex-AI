'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Key, Shield, CheckCircle2, Save, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { apiClient, handleApiCall } from '../../services/api';

export default function SettingsPage() {
  const [name, setName] = useState('Web3 Security Researcher');
  const [email, setEmail] = useState('user@aegivex.ai');
  const [saved, setSaved] = useState(false);

  // Change Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);

  const [pwdMessage, setPwdMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    // Fetch profile info from API
    handleApiCall<any>(apiClient.get('/profile'), null).then((user: any) => {
      if (user) {
        if (user.name) setName(user.name);
        if (user.email) setEmail(user.email);
      }
    });
  }, []);


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

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await handleApiCall(apiClient.put('/profile', { name }), null);
    if (res) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMessage(null);

    if (newPassword !== confirmPassword) {
      setPwdMessage({ type: 'error', text: 'New password and confirm password do not match.' });
      return;
    }

    if (newPassword.length < 6) {
      setPwdMessage({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }

    setPwdLoading(true);
    try {
      const res = await apiClient.post('/profile/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
      });
      setPwdMessage({ type: 'success', text: res.data.message || 'Password updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Failed to update password. Check current password.';
      setPwdMessage({ type: 'error', text: errorMsg });
    } finally {
      setPwdLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            User Security & Profile Configurations
          </h2>
          <p className="text-xs text-slate-400 mt-1">Manage account profile, update authentication passwords, and manage security settings.</p>
        </div>

        {saved && (
          <span className="text-xs text-emerald-400 font-bold px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-1.5 animate-pulse">
            <CheckCircle2 className="w-4 h-4" /> Profile Updated
          </span>
        )}
      </div>

      {/* Account Profile Card */}
      <form onSubmit={handleUpdateProfile} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-4 h-4 text-blue-400" /> Account Profile Details
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Registered Email Address (Read-Only)</label>
            <input
              type="email"
              disabled
              value={email}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800/60 text-slate-500 text-xs font-mono cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 transition"
          >
            <Save className="w-4 h-4" /> Save Profile Info
          </button>
        </div>
      </form>

      {/* Security & Change Password Card */}
      <form onSubmit={handleChangePassword} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4 relative overflow-hidden">
        <h3 className="text-sm font-bold text-slate-300 flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            Security & Change Password
          </span>
          <span className="text-[10px] text-cyan-400 font-mono bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            Database Encrypted
          </span>
        </h3>

        {pwdMessage && (
          <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
            pwdMessage.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}>
            {pwdMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{pwdMessage.text}</span>
          </div>
        )}

        <div className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500 transition placeholder:text-slate-600"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200 transition"
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password & Animated Strength Meter */}
          <div className="grid md:grid-cols-2 gap-4">
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
                <input
                  type={showNewPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new strong password"
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500 transition placeholder:text-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200 transition"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Animated Progress Bar */}
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

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password to confirm"
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500 transition placeholder:text-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200 transition focus:outline-none"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={pwdLoading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition disabled:opacity-50 cursor-pointer"
          >
            {pwdLoading ? (
              <span>Updating Password...</span>
            ) : (
              <>
                <Shield className="w-4 h-4" /> Update Security Password
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
