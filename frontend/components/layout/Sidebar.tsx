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
  Sparkles
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Security Chat', path: '/chat', icon: Bot, highlight: true },
  { name: 'Wallet Risk Scanner', path: '/scanners/wallet', icon: Wallet },
  { name: 'Token Risk Analyzer', path: '/scanners/token', icon: Coins },
  { name: 'Contract Analyzer', path: '/scanners/contract', icon: FileCode2 },
  { name: 'Website Scanner', path: '/scanners/website', icon: Globe },
  { name: 'Transaction Explainer', path: '/scanners/transaction', icon: Receipt },
  { name: 'Scan History', path: '/history', icon: History },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  // Hide sidebar on public landing page and auth pages for a full-screen layout
  if (pathname === '/' || pathname === '/login' || pathname === '/register') return null;

  return (
    <aside className="w-64 bg-surface border-r border-slate-800 flex flex-col justify-between h-screen sticky top-0 z-40">
      <div>
        {/* Brand Header */}
        <div className="p-5 flex items-center gap-3 border-b border-slate-800/80">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-blue-600/20 p-1 border border-blue-500/30 flex items-center justify-center shadow-glow-blue">
            <Image 
              src="/logo.png" 
              alt="Aegivex AI Logo" 
              width={32} 
              height={32} 
              className="object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-white tracking-tight">AEGIVEX</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30 font-mono">AI</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Web3 Security Copilot</p>
          </div>
        </div>

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
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
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
