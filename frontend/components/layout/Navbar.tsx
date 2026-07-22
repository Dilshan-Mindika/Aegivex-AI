'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  CheckCheck
} from 'lucide-react';
import { apiClient, handleApiCall } from '../../services/api';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
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
      case '/dashboard': return 'Security Command Intelligence Dashboard';
      case '/chat': return 'AI Security Intelligence Copilot Chat';
      case '/scanners/wallet': return 'Wallet Risk & Drainer Scanner';
      case '/scanners/token': return 'Token Honeypot & Liquidity Analyzer';
      case '/scanners/contract': return 'Smart Contract Code Auditor';
      case '/scanners/website': return 'dApp & Domain Security Scanner';
      case '/scanners/transaction': return 'Blockchain Transaction Payload Explainer';
      case '/history': return 'Security Audit History & Event Log';
      case '/settings': return 'User Security Configurations';
      default: return 'Aegivex AI Security Intelligence';
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('aegivex_token');
    }
    router.push('/login');
  };

  return (
    <div className="sticky top-3 z-30 px-4 sm:px-6 max-w-7xl mx-auto w-full">
      <header className="h-16 rounded-2xl border border-slate-800/80 bg-slate-950/85 backdrop-blur-xl px-5 flex items-center justify-between shadow-2xl transition duration-300">
        {/* Left Title Only (Logo Removed from Top Navbar) */}
        <div className="flex items-center gap-3">
          <h1 className="text-xs md:text-sm font-bold text-slate-200 tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
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

            {/* Notifications Dropdown Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-84 sm:w-96 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-3.5 z-50">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-2.5">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    Live Threat Intelligence Alerts
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 font-mono font-bold border border-red-500/20">
                      {unreadCount} Unread
                    </span>

                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-[10px] font-semibold text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 transition"
                        title="Mark all notifications as read in database"
                      >
                        <CheckCheck className="w-3 h-3" />
                        Mark All Read
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div 
                        key={n.id} 
                        className={`p-2.5 rounded-xl border text-xs transition relative group ${
                          n.is_read 
                            ? 'bg-slate-900/40 border-slate-800/60 opacity-60' 
                            : 'bg-slate-900 border-cyan-500/30 hover:border-cyan-500/60'
                        }`}
                      >
                        <div className="flex items-center justify-between text-slate-200 font-semibold mb-1">
                          <span className="flex items-center gap-1.5">
                            {n.type === 'Critical' ? (
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            )}
                            {n.title}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-500 font-mono">
                              {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            
                            {!n.is_read && (
                              <button
                                onClick={(e) => handleMarkSingleRead(n.id, e)}
                                className="text-[10px] text-slate-400 hover:text-cyan-300 bg-slate-800 hover:bg-cyan-500/20 p-1 rounded transition"
                                title="Mark as read"
                                aria-label="Mark notification as read"
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
                      No threat alert notifications recorded.
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
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
              aria-label="User Account Menu"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-glow-blue">
                US
              </div>
              <span className="text-xs font-medium text-slate-200 hidden sm:inline">Web3 Security Researcher</span>
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
    </div>
  );
};
