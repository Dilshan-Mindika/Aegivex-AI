'use client';

import React, { useState } from 'react';
import { Settings, User, Key, Bell, Shield, CheckCircle2, Save } from 'lucide-react';

export default function SettingsPage() {
  const [name, setName] = useState('Web3 Security Researcher');
  const [email, setEmail] = useState('user@aegivex.ai');
  const [openaiKey, setOpenaiKey] = useState('sk-proj-demo-mode-key-okx-genesis');
  const [etherscanKey, setEtherscanKey] = useState('ETHERSCAN_DEMO_KEY');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="glass-card p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            User Security & API Preferences
          </h2>
          <p className="text-xs text-slate-400 mt-1">Manage profile credentials, custom RPC nodes, and OpenAI API key settings.</p>
        </div>

        {saved && (
          <span className="text-xs text-emerald-400 font-bold px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-1.5 animate-pulse">
            <CheckCircle2 className="w-4 h-4" /> Preferences Saved
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-3">
            <User className="w-4 h-4 text-blue-400" /> Account Profile
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* API Credentials */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Key className="w-4 h-4 text-purple-400" /> Custom API Keys (Optional)
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">OpenAI API Key</label>
              <input
                type="password"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono focus:outline-none focus:border-purple-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">Used for custom OpenAI model prompts if backend default key is omitted.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Block Explorer / Etherscan API Key</label>
              <input
                type="password"
                value={etherscanKey}
                onChange={(e) => setEtherscanKey(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-bold text-xs shadow-glow-blue flex items-center gap-2 transition"
          >
            <Save className="w-4 h-4" /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
