'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Wallet, 
  Coins, 
  FileCode2, 
  Globe, 
  Receipt, 
  Bot, 
  ArrowUpRight, 
  Activity, 
  Zap, 
  RefreshCw,
  Search,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { apiClient, handleApiCall } from '../../services/api';
import LiveSupportChat from '@/components/LiveSupportChat';


import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({
    total_scans: 0,
    wallet_scans: 0,
    token_scans: 0,
    contract_scans: 0,
    website_scans: 0,
    transaction_scans: 0,
    average_risk_score: 0,
    ai_security_score: 100,
    active_threats_count: 0
  });
  const [recentScans, setRecentScans] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    const data = await handleApiCall(apiClient.get('/dashboard'), stats);
    if (data) setStats(data);

    const historyData = await handleApiCall(apiClient.get('/history'), []);
    if (Array.isArray(historyData)) {
      setRecentScans(historyData.slice(0, 5));
    } else if (historyData && Array.isArray(historyData.history)) {
      setRecentScans(historyData.history.slice(0, 5));
    }

    setLoading(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('aegivex_token');
      if (!token) {
        router.push('/login');
        return;
      }
    }
    fetchStats();
  }, []);



  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Top Banner */}
      <div className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-900/30 via-slate-900 to-purple-900/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
              OKX.AI Genesis Copilot Active
            </span>
            <span className="text-xs text-slate-400 font-mono">Status: Protected</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Security Command Center</h2>
          <p className="text-xs text-slate-400 mt-1">Real-time Web3 threat detection and automated AI safety scores.</p>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={fetchStats}
            className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition"
            title="Refresh Metrics"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            href="/chat"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xs shadow-glow-purple flex items-center gap-2 hover:opacity-90 transition shrink-0"
          >
            <Bot className="w-4 h-4" />
            Ask AI Copilot
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="glass-card p-4 sm:p-5 rounded-2xl border border-slate-800 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>AI SECURITY SCORE</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">{stats.ai_security_score}/100</span>
            <span className="text-xs font-semibold text-emerald-500">EXCELLENT</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Overall Web3 activity risk rating</p>
        </div>

        <div className="glass-card p-4 sm:p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>TOTAL SCANS RUN</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">{stats.total_scans}</span>
            <span className="text-xs text-blue-400 font-mono">+6 today</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Wallets, contracts, tokens & websites</p>
        </div>

        <div className="glass-card p-4 sm:p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>ACTIVE THREAT ALERTS</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-400">{stats.active_threats_count}</span>
            <span className="text-xs text-amber-500 font-semibold">ACTION NEEDED</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Unresolved drainer/honeypot warnings</p>
        </div>

        <div className="glass-card p-4 sm:p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>AVG RESPONSE TIME</span>
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-cyan-400">1.4s</span>
            <span className="text-xs text-cyan-500 font-mono">REALTIME</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Fast AI heuristic & RPC response</p>
        </div>
      </div>

      {/* Quick Scanners Launcher Grid */}
      <div>
        <h3 className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">Quick Launch Security Tools</h3>
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">

          {[
            { label: 'Wallet Risk', icon: Wallet, path: '/scanners/wallet', color: 'text-blue-400' },
            { label: 'Token Analyzer', icon: Coins, path: '/scanners/token', color: 'text-cyan-400' },
            { label: 'Smart Contract', icon: FileCode2, path: '/scanners/contract', color: 'text-emerald-400' },
            { label: 'Website Safety', icon: Globe, path: '/scanners/website', color: 'text-amber-400' },
            { label: 'Transaction', icon: Receipt, path: '/scanners/transaction', color: 'text-rose-400' },
            { label: 'AI Copilot Chat', icon: Bot, path: '/chat', color: 'text-purple-400' },
          ].map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <Link
                key={idx}
                href={tool.path}
                className="glass-card p-4 rounded-xl border border-slate-800 hover:border-blue-500/40 text-center group transition"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition">
                  <Icon className={`w-5 h-5 ${tool.color}`} />
                </div>
                <span className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 transition">{tool.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Table & Live Threat Alerts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Scans (2 cols) */}
        <div className="lg:col-span-2 glass-card p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              Recent Security Scans
            </h3>
            <Link href="/history" className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-semibold">
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-2 font-semibold">Target</th>
                  <th className="pb-2 font-semibold">Scan Type</th>
                  <th className="pb-2 font-semibold">Risk Level</th>
                  <th className="pb-2 font-semibold text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentScans.length > 0 ? (
                  recentScans.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/40 transition">
                      <td className="py-2.5 font-mono text-slate-300">
                        {row.target ? (row.target.length > 22 ? `${row.target.substring(0, 10)}...${row.target.substring(row.target.length - 6)}` : row.target) : 'N/A'}
                      </td>
                      <td className="py-2.5 text-slate-400 capitalize">{row.scan_type}</td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                          row.risk_level === 'High' || row.risk_level === 'Critical'
                            ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                            : row.risk_level === 'Medium'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>
                          {row.risk_level} ({row.risk_score})
                        </span>
                      </td>
                      <td className="py-2.5 text-right text-slate-500 font-mono">
                        {new Date(row.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-slate-500 italic">
                      No security scans recorded yet. Run a scanner to generate telemetry.
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        </div>

        {/* Live Threat Alerts Feed (1 col) */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            Security Copilot Intelligence
          </h3>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-red-400 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                Honeypot Contract Flagged
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Token PEPE-Fake (0x1f98...) set 100% sell tax and blacklisted buyer wallets.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-400 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                Unlimited Permit Requested
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Transaction request 0x9876... asked for unlimited spending permit for WETH.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-blue-400 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                dApp Domain Verified
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Domain https://uniswap.org confirmed with valid SSL certificate and clean DNS history.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Live Support Chat Widget */}
      <LiveSupportChat />
    </div>
  );
}

