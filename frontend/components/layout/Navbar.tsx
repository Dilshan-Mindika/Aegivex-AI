'use client';

import React, { useState, useEffect } from 'react';
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
  Check,
  CheckCheck,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { apiClient, handleApiCall } from '../../services/api';
import { navItems } from './Sidebar';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  // Fetch real notifications from backend database
  const fetchNotifications = async () => {
    const data = await handleApiCall(apiClient.get('/notifications'), []);
    if (Array.isArray(data)) {
      setNotifications(data);
    }
  };

  useEffect(() => {
    if (pathname !== '/' && pathname !== '/login' && pathname !== '/register') {
      fetchNotifications();
      setMobileMenuOpen(false); // Close mobile drawer on route change
    }
  }, [pathname]);

  // Hide Navbar on public landing page and auth pages
  if (pathname === '/' || pathname === '/login' || pathname === '/register') return null;

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const handleMarkAllRead = async () => {
    await handleApiCall(apiClient.post('/notifications/read-all'), {});
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const handleMarkSingleRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await handleApiCall(apiClient.post(`/notifications/${id}/read`), {});
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/dashboard': return 'Command Intelligence';
      case '/chat': return 'AI Copilot Chat';
      case '/scanners/wallet': return 'Wallet Risk Scanner';
      case '/scanners/token': return 'Token Honeypot Analyzer';
      case '/scanners/contract': return 'Contract Auditor';
      case '/scanners/website': return 'Website Safety Scanner';
      case '/scanners/transaction': return 'Transaction Explainer';
      case '/history': return 'Audit Event History';
      case '/settings': return 'User Configurations';
      default: return 'Aegivex Security AI';
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('aegivex_token');
    }
    router.push('/login');
  };

  return (
    <div className="sticky top-2 sm:top-3 z-30 px-2 xs:px-3 sm:px-6 max-w-7xl mx-auto w-full">
      <header className="h-13 sm:h-16 rounded-xl sm:rounded-2xl border border-slate-800/80 bg-slate-950/90 backdrop-blur-xl px-2.5 xs:px-3 sm:px-5 flex items-center justify-between shadow-2xl transition duration-300">
        {/* Left Title & Mobile Menu Hamburger */}
        <div className="flex items-center gap-1.5 xs:gap-2.5 sm:gap-3 shrink-0">
          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          {/* Logo badge for mobile viewports */}
          <Link href="/dashboard" className="md:hidden flex items-center gap-1.5 shrink-0">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg p-[1.5px] border-running-glow shadow-glow-cyan">
              <div className="w-full h-full rounded-[6px] bg-slate-950 flex items-center justify-center p-0.5 relative z-10">
                <Image src="/logo.png" alt="Aegivex AI" width={20} height={20} className="object-contain" />
              </div>
            </div>
          </Link>

          <h1 className="text-[11px] xs:text-xs sm:text-sm font-bold text-slate-200 tracking-wide flex items-center gap-1.5 truncate max-w-[100px] xs:max-w-[170px] sm:max-w-none">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse shrink-0 hidden xs:inline-block" />
            <span className="truncate">{getPageTitle(pathname)}</span>
          </h1>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-[11px] border border-emerald-500/30 font-mono font-semibold shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>ALL SHIELDS GREEN • TELEMETRY ACTIVE</span>
          </div>
        </div>

        {/* Right Tools & Profile */}
        <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 shrink-0">

          {/* OKX Network Selector Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>OKX X Layer / EVM</span>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) fetchNotifications();
              }}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition relative"
              title="Threat Notifications"
              aria-label="Threat Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <>
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
                </>
              )}
            </button>

            {/* Notifications Dropdown Popover (Responsive Mobile Floating) */}
            {showNotifications && (
              <div className="fixed sm:absolute left-4 right-4 sm:left-auto sm:right-0 top-20 sm:top-auto sm:mt-2 w-auto sm:w-96 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-3.5 z-50">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-2.5">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    Live Threat Alerts
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 font-mono font-bold border border-red-500/20">
                      {unreadCount} Unread
                    </span>

                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-[10px] font-semibold text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 transition"
                      >
                        <CheckCheck className="w-3 h-3" />
                        Mark Read
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div 
                        key={n.id} 
                        className={`p-2.5 rounded-xl border text-xs transition relative ${
                          n.is_read 
                            ? 'bg-slate-900/40 border-slate-800/60 opacity-60' 
                            : 'bg-slate-900 border-cyan-500/30'
                        }`}
                      >
                        <div className="flex items-center justify-between text-slate-200 font-semibold mb-1">
                          <span className="flex items-center gap-1.5 truncate">
                            {n.type === 'Critical' ? (
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            )}
                            <span className="truncate">{n.title}</span>
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[10px] text-slate-500 font-mono">
                              {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            
                            {!n.is_read && (
                              <button
                                onClick={(e) => handleMarkSingleRead(n.id, e)}
                                className="text-[10px] text-slate-400 hover:text-cyan-300 bg-slate-800 p-1 rounded transition"
                              >
                                <Check className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug">{n.message}</p>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-slate-500 text-xs italic">
                      No threat notifications recorded.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 sm:pr-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
              aria-label="User Account Menu"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-glow-blue shrink-0">
                US
              </div>
              <span className="text-xs font-medium text-slate-200 hidden md:inline">Researcher</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xs:inline" />
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
                    router.push('/admin/dashboard');
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-purple-300 hover:bg-purple-500/20 rounded-lg flex items-center gap-2"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
                  Admin Control Center
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    router.push('/settings');
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg flex items-center gap-2"
                >
                  <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                  Security Configurations
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

      {/* Slide-out Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 z-40 bg-slate-950/95 backdrop-blur-2xl p-5 border-t border-slate-800 overflow-y-auto flex flex-col justify-between">
          <nav className="space-y-1.5">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2 font-mono">
              Aegivex Security Navigation
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan'
                      : item.highlight
                      ? 'text-purple-300 bg-purple-600/10 border border-purple-500/20'
                      : 'text-slate-300 bg-slate-900/60 border border-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : item.highlight ? 'text-purple-400' : 'text-slate-400'}`} />
                  <span className="flex-1 font-semibold">{item.name}</span>
                  {item.highlight && (
                    <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-slate-800/80 mt-6">
            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 font-bold text-xs flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out from Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
