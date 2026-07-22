'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Bell, 
  ShieldAlert, 
  User as UserIcon, 
  LogOut, 
  ChevronDown, 
  CheckCircle2, 
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  if (pathname === '/') return null;

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/dashboard': return 'Security Command Dashboard';
      case '/chat': return 'AI Security Copilot Chat';
      case '/scanners/wallet': return 'Wallet Risk & Drainer Scanner';
      case '/scanners/token': return 'Token Honeypot & Liquidity Analyzer';
      case '/scanners/contract': return 'Smart Contract Code Auditor';
      case '/scanners/website': return 'dApp & Website Safety Scanner';
      case '/scanners/transaction': return 'Blockchain Transaction Explainer';
      case '/history': return 'Security Scan History & Audit Log';
      case '/settings': return 'User Security Preferences';
      default: return 'Aegivex AI Security';
    }
  };

  const notificationsMock = [
    { id: '1', title: 'Phishing Website Alert', msg: 'Website claim-airdrop-okx.xyz was flagged with High Risk.', time: '10m ago', type: 'high' },
    { id: '2', title: 'Unlimited Approval Warning', msg: 'Spender 0x7a2... requested unlimited WETH spending.', time: '1h ago', type: 'warn' },
    { id: '3', title: 'Token Honeypot Blocked', msg: 'PEPE-Fake token code contains 100% sell fee blacklist.', time: '3h ago', type: 'high' },
  ];

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('aegivex_token');
    }
    router.push('/login');
  };

  return (
    <div className="sticky top-3 z-30 px-4 sm:px-6 max-w-7xl mx-auto w-full">
      <header className="h-16 rounded-2xl border border-slate-800/80 bg-slate-950/85 backdrop-blur-xl px-5 flex items-center justify-between shadow-2xl transition duration-300">
        {/* Left Title & Prominent Official Logo Mark */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-glow-cyan group-hover:scale-105 transition duration-300">
              <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center p-1">
                <Image src="/logo.png" alt="Aegivex AI" width={28} height={28} className="object-contain drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
              </div>
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white hidden md:inline group-hover:text-cyan-300 transition">AEGIVEX</span>
          </Link>

          <span className="text-slate-700 hidden md:inline">/</span>

          <h1 className="text-xs md:text-sm font-bold text-slate-200 tracking-wide">
            {getPageTitle(pathname)}
          </h1>

          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] border border-emerald-500/20 font-medium">
            <Activity className="w-3 h-3 animate-pulse" />
            AI Shield Active
          </div>
        </div>

        {/* Right Tools & Profile */}
        <div className="flex items-center gap-3">
          {/* OKX Network Selector Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>OKX X Layer / EVM</span>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition relative"
              title="Threat Notifications"
              aria-label="Threat Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                    Live Threat Alerts
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">3 Unread</span>
                </div>
                <div className="space-y-2">
                  {notificationsMock.map((n) => (
                    <div key={n.id} className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs">
                      <div className="flex items-center justify-between text-slate-200 font-semibold mb-0.5">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-tight">{n.msg}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
              aria-label="User Account Menu"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-glow-blue">
                US
              </div>
              <span className="text-xs font-medium text-slate-200 hidden sm:inline">Web3 Researcher</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 z-50">
                <div className="px-3 py-2 border-b border-slate-800 mb-1">
                  <p className="text-xs font-semibold text-white">Signed in User</p>
                  <p className="text-[11px] text-slate-400 truncate">user@aegivex.ai</p>
                </div>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    router.push('/settings');
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg flex items-center gap-2"
                >
                  <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                  Account Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-2 mt-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};
