'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User, 
  Key, 
  Shield, 
  CheckCircle2, 
  Save, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle,
  QrCode,
  History,
  Wallet,
  Globe,
  SunMoon,
  Bell,
  Copy,
  Trash2,
  Plus,
  Sparkles,
  Check
} from 'lucide-react';
import { apiClient, handleApiCall } from '../../services/api';
import { LanguageSwitcher } from '../../components/layout/LanguageSwitcher';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | '2fa' | 'history' | 'wallets' | 'api' | 'theme' | 'notifications'>('profile');
  
  // Profile state
  const [name, setName] = useState('Web3 Security Researcher');
  const [email, setEmail] = useState('user@aegivex.ai');
  const [saved, setSaved] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdMessage, setPwdMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // 2FA State
  const [is2faEnabled, setIs2faEnabled] = useState(false);
  const [twoFaCode, setTwoFaCode] = useState('');
  const [twoFaSuccess, setTwoFaSuccess] = useState(false);

  // Connected Wallets State
  const [wallets, setWallets] = useState([
    { name: 'MetaMask', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', network: 'Ethereum Mainnet', primary: true },
    { name: 'OKX Wallet', address: '0x8f2a49f139f10a85d5af5bf1d1762f925bdaddc', network: 'OKX X Layer', primary: false },
    { name: 'Phantom', address: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU', network: 'Solana', primary: false }
  ]);

  // API Keys State
  const [apiKeys, setApiKeys] = useState([
    { id: 'key-1', name: 'Production Sentinel API', key: 'aegivex_live_sk_9f81a7...49f1', created: '2026-06-15' },
    { id: 'key-2', name: 'Development Scanner Test', key: 'aegivex_test_sk_33b110...8e21', created: '2026-07-01' }
  ]);
  const [newKeyName, setNewKeyName] = useState('');

  // Theme & Language State
  const [selectedTheme, setSelectedTheme] = useState<'cyberDark' | 'slateDark' | 'light'>('cyberDark');
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');

  // Notification Preferences State
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifBrowser, setNotifBrowser] = useState(true);
  const [notifTelegram, setNotifTelegram] = useState(false);
  const [notifDiscord, setNotifDiscord] = useState(true);

  // Login History Data
  const loginHistory = [
    { ip: '192.168.1.104', browser: 'Chrome 126 (Windows)', time: '2026-07-25 23:45', location: 'Tokyo, Japan', status: 'ACTIVE SESSION' },
    { ip: '172.56.21.90', browser: 'Safari Mobile (iOS)', time: '2026-07-24 14:12', location: 'Singapore', status: 'COMPLETED' },
    { ip: '198.51.100.42', browser: 'Brave Browser (macOS)', time: '2026-07-22 09:30', location: 'London, UK', status: 'COMPLETED' }
  ];

  useEffect(() => {
    handleApiCall<any>(apiClient.get('/profile'), null).then((user: any) => {
      if (user) {
        if (user.name) setName(user.name);
        if (user.email) setEmail(user.email);
      }
    });
  }, []);

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

  const handleEnable2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (twoFaCode.length >= 6) {
      setIs2faEnabled(true);
      setTwoFaSuccess(true);
      setTimeout(() => setTwoFaSuccess(false), 3000);
    }
  };

  const handleCreateApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    const newKey = {
      id: `key-${Date.now()}`,
      name: newKeyName,
      key: `aegivex_live_sk_${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`,
      created: new Date().toISOString().split('T')[0]
    };
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
  };

  const handleRevokeApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-cyan-400" />
            User Security & System Configurations
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure profile settings, Two-Factor Authentication (2FA), connected Web3 wallets, API keys, and notification preferences.
          </p>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800/80">
        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: '2fa', label: '2FA Auth', icon: Lock },
          { id: 'history', label: 'Login History', icon: History },
          { id: 'wallets', label: 'Wallets', icon: Wallet },
          { id: 'api', label: 'API Keys', icon: Key },
          { id: 'theme', label: 'Theme & Lang', icon: SunMoon },
          { id: 'notifications', label: 'Notifications', icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full py-2.5 px-2 rounded-xl text-xs font-bold font-mono flex items-center justify-center gap-1.5 transition cursor-pointer text-center ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PROFILE & PASSWORD */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card-premium p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-400" />
              Account Details
            </h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 text-xs font-mono cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                className="btn-futuristic-primary px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {saved ? 'Saved Successfully!' : 'Save Profile Changes'}
              </button>
            </form>
          </div>

          <div className="glass-card-premium p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-cyan-400" />
              Change Account Password
            </h2>
            <form onSubmit={handleChangePassword} className="space-y-3 text-left">
              {pwdMessage && (
                <div className={`p-3 rounded-xl border text-xs font-mono ${pwdMessage.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'}`}>
                  {pwdMessage.text}
                </div>
              )}

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <button
                type="submit"
                disabled={pwdLoading}
                className="btn-futuristic-primary px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                {pwdLoading ? 'Updating Password...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: TWO-FACTOR AUTHENTICATION (2FA) */}
      {activeTab === '2fa' && (
        <div className="glass-card-premium p-6 rounded-3xl border border-slate-800 space-y-5 max-w-2xl mx-auto">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-cyan-400" />
                Two-Factor Authentication (2FA)
              </h2>
              <p className="text-xs text-slate-400 mt-1">Protect your account using TOTP Authenticator Apps (Google Authenticator, Authy).</p>
            </div>
            <span className={is2faEnabled ? 'badge-risk-safe' : 'badge-risk-warning'}>
              {is2faEnabled ? '2FA ENABLED' : '2FA DISABLED'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-xl bg-white p-2 flex items-center justify-center shrink-0">
              <QrCode className="w-28 h-28 text-slate-950" />
            </div>

            <div className="space-y-2 text-left">
              <span className="text-xs font-mono text-cyan-300 font-bold block">TOTP Secret Key:</span>
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 font-bold tracking-wider">
                AEGIVEX-2FA-7781-9942-SEC
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Scan the QR code with your authenticator app and enter the 6-digit verification code below to authorize 2FA protection.
              </p>
            </div>
          </div>

          <form onSubmit={handleEnable2FA} className="space-y-4 text-left">
            {twoFaSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Two-Factor Authentication activated successfully!
              </div>
            )}

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">6-Digit Authenticator Code</label>
              <input
                type="text"
                value={twoFaCode}
                onChange={(e) => setTwoFaCode(e.target.value)}
                placeholder="123456"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono tracking-widest focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={twoFaCode.length < 6}
              className="btn-futuristic-primary px-6 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Shield className="w-4 h-4" />
              {is2faEnabled ? '2FA Active & Verified' : 'Verify & Enable 2FA'}
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: LOGIN HISTORY */}
      {activeTab === 'history' && (
        <div className="glass-card-premium p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <History className="w-5 h-5 text-cyan-400" />
              Login Session Audit History
            </h2>
            <span className="text-xs font-mono text-slate-400">Total Active Sessions: 1</span>
          </div>

          <div className="space-y-2.5">
            {loginHistory.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
                <div className="space-y-0.5">
                  <span className="font-bold text-white block">{item.browser}</span>
                  <span className="text-slate-400 text-[11px]">IP: {item.ip} • Location: {item.location}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-[11px]">{item.time}</span>
                  <span className={item.status === 'ACTIVE SESSION' ? 'badge-risk-safe' : 'badge-risk-warning'}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CONNECTED WALLETS */}
      {activeTab === 'wallets' && (
        <div className="glass-card-premium p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Wallet className="w-5 h-5 text-cyan-400" />
              Connected Web3 Wallets Manager
            </h2>
            <button className="btn-futuristic-primary px-3.5 py-1.5 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer">
              <Plus className="w-4 h-4" />
              Connect New Wallet
            </button>
          </div>

          <div className="space-y-3">
            {wallets.map((w, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{w.name}</span>
                      {w.primary && <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">PRIMARY</span>}
                    </div>
                    <span className="text-[11px] text-slate-400">{w.address} ({w.network})</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="badge-risk-safe">VERIFIED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: API KEY MANAGEMENT */}
      {activeTab === 'api' && (
        <div className="glass-card-premium p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-cyan-400" />
              Developer API Key Management
            </h2>
            <span className="text-xs font-mono text-cyan-300">Rate Limit: 10,000 req/min</span>
          </div>

          <form onSubmit={handleCreateApiKey} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Enter new API key descriptor name..."
              className="flex-1 w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-500 transition"
            />
            <button
              type="submit"
              disabled={!newKeyName.trim()}
              className="btn-futuristic-primary px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
            >
              <Plus className="w-4 h-4" />
              Generate API Secret Key
            </button>
          </form>

          <div className="space-y-3">
            {apiKeys.map((key) => (
              <div key={key.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
                <div>
                  <span className="font-bold text-white block mb-0.5">{key.name}</span>
                  <span className="text-slate-400 text-[11px]">Key: {key.key} • Created: {key.created}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleRevokeApiKey(key.id)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: THEME & LANGUAGE */}
      {activeTab === 'theme' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card-premium p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <SunMoon className="w-5 h-5 text-cyan-400" />
              Theme Switcher
            </h2>
            <div className="space-y-3">
              {[
                { id: 'cyberDark', name: 'Cyber Obsidian Dark (Default)', desc: 'High-contrast dark mode with cyan/purple neon accents.' },
                { id: 'slateDark', name: 'Slate Midnight Dark', desc: 'Subtle dark blue theme tailored for low-light environments.' },
                { id: 'light', name: 'Clean Light Mode', desc: 'High visibility daylight theme.' },
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id as any)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition ${
                    selectedTheme === theme.id 
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-white shadow-glow-cyan' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-xs mb-1">
                    <span>{theme.name}</span>
                    {selectedTheme === theme.id && <Check className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-mono">{theme.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card-premium p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              Global Language Translation Engine (FlagCDN)
            </h2>
            <p className="text-xs text-slate-400 font-mono leading-relaxed">
              Select your preferred global language below. Google Translate engine will automatically translate all security reports, threat feeds, and AI consultations transiently with cookie persistence.
            </p>
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: NOTIFICATION PREFERENCES */}
      {activeTab === 'notifications' && (
        <div className="glass-card-premium p-6 rounded-3xl border border-slate-800 space-y-5 max-w-2xl mx-auto">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Bell className="w-5 h-5 text-cyan-400" />
            Threat Alert Notification Channels
          </h2>

          <div className="space-y-3">
            {[
              { label: 'Email Threat Reports', state: notifEmail, setState: setNotifEmail, desc: 'Receive critical honeypot and vulnerability digests via email.' },
              { label: 'Browser Push Notifications', state: notifBrowser, setState: setNotifBrowser, desc: 'Real-time popups when high-risk transactions are detected.' },
              { label: 'Telegram Bot Webhooks', state: notifTelegram, setState: setNotifTelegram, desc: 'Stream live alerts to your personal Telegram channel.' },
              { label: 'Discord Server Webhooks', state: notifDiscord, setState: setNotifDiscord, desc: 'Post automated threat intelligence into Discord security channels.' }
            ].map((n, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 text-left">
                <div>
                  <h4 className="font-bold text-xs text-white">{n.label}</h4>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">{n.desc}</p>
                </div>

                <button
                  onClick={() => n.setState(!n.state)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 cursor-pointer shrink-0 ${
                    n.state ? 'bg-cyan-500' : 'bg-slate-800'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                    n.state ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
