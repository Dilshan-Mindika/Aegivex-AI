'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  ShieldAlert, 
  Flame, 
  Globe, 
  Layers, 
  ExternalLink, 
  Activity, 
  Radio, 
  Filter, 
  Newspaper,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

const alertCategories = [
  { id: 'all', label: 'All Live Feeds', count: 18 },
  { id: 'whale', label: 'Whale Transactions', icon: TrendingUp, count: 5 },
  { id: 'rugpull', label: 'Rug Pull Alerts', icon: Flame, count: 4 },
  { id: 'drain', label: 'Wallet Drained Alerts', icon: ShieldAlert, count: 3 },
  { id: 'phishing', label: 'Phishing Websites', icon: Globe, count: 4 },
  { id: 'news', label: 'Security News', icon: Newspaper, count: 2 },
];

const initialAlerts = [
  {
    id: 1,
    category: 'whale',
    title: 'Whale Transaction Alert ($12.5M USDT Transfer)',
    target: '0x8f2a...39f1 ➔ Binance Deposit Wallet',
    time: '3 mins ago',
    severity: 'high',
    desc: 'Large transfer of 12,500,000 USDT detected from unlabelled whale wallet to exchange deposit endpoint.',
    chain: 'Ethereum Mainnet',
    value: '$12,500,000'
  },
  {
    id: 2,
    category: 'rugpull',
    title: 'Token Rug Pull Flagged (100% Liquidity Removed)',
    target: '0x33b1...FakeYield Token',
    time: '12 mins ago',
    severity: 'critical',
    desc: 'Contract deployer executed liquidity removal transaction withdrawing $450,000 in ETH pool reserves.',
    chain: 'OKX X Layer',
    value: '$450,000'
  },
  {
    id: 3,
    category: 'phishing',
    title: 'Phishing Website Domain Blacklisted',
    target: 'https://claim-airdrop-aegivex.xyz',
    time: '25 mins ago',
    severity: 'critical',
    desc: 'Typosquatted domain flagged containing drainer script requesting permit2 approvals for wallet assets.',
    chain: 'Multi-Chain',
    value: 'Phishing Trap'
  },
  {
    id: 4,
    category: 'drain',
    title: 'Wallet Drained Alert (Unverified Permit Sign)',
    target: '0x71c7...976f',
    time: '42 mins ago',
    severity: 'high',
    desc: 'Address authorized setApprovalForAll signature on malicious NFT minting site. 14 Bored Apes transferred.',
    chain: 'Ethereum Mainnet',
    value: '$280,000'
  },
  {
    id: 5,
    category: 'news',
    title: 'Security News: Zero-Day Reentrancy Vulnerability Patched in Popular Lending Vault',
    target: 'DeFi Security Research Team Report',
    time: '1 hour ago',
    severity: 'safe',
    desc: 'Core developers released formal verification patch resolving flash loan arbitrage vector prior to exploitation.',
    chain: 'Arbitrum One',
    value: 'Patch Verified'
  },
  {
    id: 6,
    category: 'whale',
    title: 'Whale Transaction Alert (15,000 SOL Moved)',
    target: 'Solana Whale Account ➔ Unknown Vault',
    time: '2 hours ago',
    severity: 'warning',
    desc: 'Whale account transferred 15,000 SOL ($2.1M) into non-custodial cold storage wallet.',
    chain: 'Solana Network',
    value: '$2,100,000'
  }
];

export default function AlertsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredAlerts = selectedFilter === 'all' 
    ? initialAlerts 
    : initialAlerts.filter(a => a.category === selectedFilter);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400"></span>
              </span>
              REAL-TIME THREAT MONITORING
            </span>
            <span className="text-xs font-mono text-cyan-300">0-Latency Feed</span>
          </div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Radio className="w-6 h-6 text-red-400 animate-pulse" />
            Security Alerts & Intelligence Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Live telemetry feed capturing Whale transactions, Token Rug Pulls, Wallet Drains, Phishing Sites, and Web3 Security News.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>All Sensors Active (OKX, ETH, SOL)</span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {alertCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedFilter === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono flex items-center gap-2 transition shrink-0 cursor-pointer ${
                isActive 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan' 
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{cat.label}</span>
              <span className="px-1.5 py-0.2 rounded bg-slate-950 text-[10px] text-slate-300">
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Alert Feed List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          let badgeClass = 'badge-risk-warning';
          let icon = <AlertTriangle className="w-4 h-4 text-amber-400" />;

          if (alert.severity === 'critical') {
            badgeClass = 'badge-risk-critical';
            icon = <Flame className="w-4 h-4 text-red-400" />;
          } else if (alert.severity === 'high') {
            badgeClass = 'badge-risk-high';
            icon = <ShieldAlert className="w-4 h-4 text-orange-400" />;
          } else if (alert.severity === 'safe') {
            badgeClass = 'badge-risk-safe';
            icon = <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
          }

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              className="glass-card-premium p-4 sm:p-5 rounded-2xl border border-slate-800 text-left relative overflow-hidden transition"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 mb-2.5 pb-2.5 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  {icon}
                  <h3 className="font-bold text-sm sm:text-base text-white">{alert.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className={badgeClass}>{alert.category.toUpperCase()}</span>
                  <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {alert.time}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3 font-medium">{alert.desc}</p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono pt-2 border-t border-slate-900">
                <div className="flex items-center gap-3 text-slate-400">
                  <span>Chain: <strong className="text-white">{alert.chain}</strong></span>
                  <span>Target: <strong className="text-cyan-300">{alert.target}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Value Impact: <strong className="text-emerald-400">{alert.value}</strong></span>
                  <button className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
