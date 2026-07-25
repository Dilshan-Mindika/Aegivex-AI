'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Bot, 
  Wallet, 
  Coins, 
  FileCode2, 
  Globe, 
  Receipt, 
  History, 
  Settings, 
  ShieldCheck,
  Zap,
  Bell,
  Gift,
  Play,
  Bug,
  Gauge,
  Users
} from 'lucide-react';

export const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Admin Control Center', path: '/admin/dashboard', icon: ShieldCheck, highlight: true },
  { name: 'AI Security Chat', path: '/chat', icon: Bot, highlight: true },
  { name: 'Tx Simulator', path: '/simulation', icon: Play },
  { name: 'Static Auditor', path: '/scanners/static-analysis', icon: Bug },
  { name: 'MEV & Gas Optimizer', path: '/scanners/mev-gas', icon: Gauge },
  { name: 'Multi-Sig Auditor', path: '/scanners/multisig', icon: Users },
  { name: 'NFT & Airdrop Scanner', path: '/scanners/nft-airdrop', icon: Gift },
  { name: 'Wallet Risk Scanner', path: '/scanners/wallet', icon: Wallet },
  { name: 'Token Risk Analyzer', path: '/scanners/token', icon: Coins },
  { name: 'Contract Analyzer', path: '/scanners/contract', icon: FileCode2 },
  { name: 'Website Scanner', path: '/scanners/website', icon: Globe },
  { name: 'Transaction Explainer', path: '/scanners/transaction', icon: Receipt },
  { name: 'Alerts & Intelligence', path: '/alerts', icon: Bell },
  { name: 'Scan History', path: '/history', icon: History },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  // Hide sidebar on public landing page and auth pages for a full-screen layout
  if (pathname === '/' || pathname === '/login' || pathname === '/register') return null;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-surface border-r border-slate-800 justify-between h-screen sticky top-0 z-40 shrink-0">
      <div>
        {/* Brand Header with Animated Running Glow Logo */}
        <Link href="/dashboard" className="p-5 flex items-center gap-3 border-b border-slate-800/80 group">
          <div className="relative w-10 h-10 rounded-xl p-[2px] border-running-glow shadow-glow-cyan group-hover:scale-105 transition duration-300 shrink-0">
            <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center p-1 relative z-10">
              <Image 
                src="/logo.png" 
                alt="Aegivex AI Logo" 
                width={28} 
                height={28} 
                className="object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.9)]"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-white tracking-tight group-hover:text-cyan-300 transition">AEGIVEX</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 font-mono">AI</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider">Web3 Security Copilot</p>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-glow-blue'
                    : item.highlight
                    ? 'text-purple-300 hover:bg-purple-600/10 hover:text-purple-200 border border-purple-500/20'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : item.highlight ? 'text-purple-400' : 'text-slate-400'}`} />
                <span className="flex-1">{item.name}</span>
                {item.highlight && (
                  <Zap className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Hackathon Info */}
      <div className="p-4 m-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
          <span className="flex items-center gap-1 font-semibold text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            OKX.AI Genesis
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">v1.0</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-tight">
          AI Copilot protect mode active for EVM & Solana networks.
        </p>
      </div>
    </aside>
  );
};
