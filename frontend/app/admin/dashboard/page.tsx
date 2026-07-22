'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Users, 
  ShieldAlert, 
  Activity, 
  Cpu, 
  MessageSquare, 
  Lock, 
  UserCheck, 
  RefreshCw, 
  Send, 
  Search, 
  Terminal, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight,
  ArrowRight,
  LayoutDashboard
} from 'lucide-react';
import LiveSupportChat from '@/components/LiveSupportChat';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>({
    total_users: 142,
    admin_count: 4,
    regular_user_count: 138,
    total_global_scans: 18450,
    active_threats_blocked: 612,
    audit_logs_recorded: 2410,
    system_status: 'OPERATIONAL',
    neural_engine_health: '99.98%'
  });

  const [users, setUsers] = useState<any[]>([
    { id: 'usr-1', name: 'Dilshan Mindika', email: 'dilshan@aegivex.ai', role: 'Admin', status: 'Active', scans_count: 420 },
    { id: 'usr-2', name: 'Alex Vance', email: 'alex.vance@okx.com', role: 'Admin', status: 'Active', scans_count: 185 },
    { id: 'usr-3', name: 'Crypto Sentinel', email: 'sentinel@web3security.io', role: 'User', status: 'Active', scans_count: 94 },
    { id: 'usr-4', name: 'Polygon Auditor', email: 'auditor@polygon.technology', role: 'User', status: 'Active', scans_count: 67 },
  ]);

  const [conversations, setConversations] = useState<any[]>([
    { user_id: 'usr-3', user_name: 'Crypto Sentinel', user_email: 'sentinel@web3security.io', user_role: 'User', unread_count: 1, last_message: 'Can you verify this Honeypot opcode signature on OKX X Layer?', last_timestamp: '2 mins ago', total_messages: 4 }
  ]);

  const [selectedUserChat, setSelectedUserChat] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [adminReplyText, setAdminReplyText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAdminStats();
    fetchUsers();
    fetchConversations();
  }, []);

  const fetchAdminStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8000/api/v1/admin/stats', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {}
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8000/api/v1/admin/users', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        if (data.users) setUsers(data.users);
      }
    } catch (err) {}
  };

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8000/api/v1/chat/live/admin/conversations', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        if (data.conversations && data.conversations.length > 0) {
          setConversations(data.conversations);
        }
      }
    } catch (err) {}
  };

  const handleSelectUserChat = async (conv: any) => {
    setSelectedUserChat(conv);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8000/api/v1/chat/live/messages?user_id=${conv.user_id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const msgs = await res.json();
        setChatMessages(msgs);
      } else {
        // Fallback demo message
        setChatMessages([
          { id: '1', sender_name: conv.user_name, sender_role: 'User', message: conv.last_message, is_admin_reply: false }
        ]);
      }
    } catch (err) {
      setChatMessages([
        { id: '1', sender_name: conv.user_name, sender_role: 'User', message: conv.last_message, is_admin_reply: false }
      ]);
    }
  };

  const handleSendAdminReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReplyText.trim() || !selectedUserChat) return;

    const reply = adminReplyText.trim();
    setAdminReplyText('');

    const newMsg = {
      id: `admin-${Date.now()}`,
      sender_name: 'Security Admin Desk',
      sender_role: 'Admin',
      message: reply,
      is_admin_reply: true,
      created_at: new Date().toISOString()
    };

    setChatMessages((prev) => [...prev, newMsg]);

    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:8000/api/v1/chat/live/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          message: reply,
          user_id: selectedUserChat.user_id
        })
      });
    } catch (err) {}
  };

  const handleToggleUserRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'Admin' ? 'User' : 'Admin';
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));

    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:8000/api/v1/admin/users/${userId}/role`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ role: newRole })
      });
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-4 sm:p-8 selection:bg-purple-500/30 font-sans">
      
      {/* Admin Top Navigation Bar */}
      <header className="max-w-7xl mx-auto mb-8 p-4 rounded-2xl bg-slate-950/90 border border-purple-500/40 shadow-glow-purple flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-xl p-[2px] border-running-glow shadow-glow-purple shrink-0">
            <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center p-1.5">
              <Image src="/logo.png" alt="Aegivex Logo" width={36} height={36} className="object-contain" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl text-white tracking-tight">AEGIVEX</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40 font-mono">ADMIN CONTROL CENTER</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">Super Admin Role-Based Access Control (RBAC)</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-xs font-bold text-cyan-300 transition flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            User Dashboard View
          </Link>
          <button
            onClick={() => {
              fetchAdminStats();
              fetchUsers();
              fetchConversations();
            }}
            className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:text-white transition"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-8">
        
        {/* Executive Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card-premium p-5 rounded-2xl border border-purple-500/30 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-purple-300">REGISTERED USERS</span>
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-3xl font-black text-white font-mono block">{stats.total_users}</span>
            <span className="text-[11px] text-slate-400 font-mono">{stats.admin_count} Super Admins • {stats.regular_user_count} Standard Users</span>
          </div>

          <div className="glass-card-premium p-5 rounded-2xl border border-red-500/30 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-red-300">THREATS INTERCEPTED</span>
              <ShieldAlert className="w-5 h-5 text-red-400" />
            </div>
            <span className="text-3xl font-black text-red-400 font-mono block">{stats.active_threats_blocked}</span>
            <span className="text-[11px] text-slate-400 font-mono">Malicious honeypot & drainer vectors</span>
          </div>

          <div className="glass-card-premium p-5 rounded-2xl border border-cyan-500/30 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-cyan-300">GLOBAL AUDIT LOGS</span>
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-3xl font-black text-cyan-300 font-mono block">{stats.total_global_scans}</span>
            <span className="text-[11px] text-slate-400 font-mono">Multi-chain transactions processed</span>
          </div>

          <div className="glass-card-premium p-5 rounded-2xl border border-emerald-500/30 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-emerald-300">NEURAL ENGINE HEALTH</span>
              <Cpu className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-3xl font-black text-emerald-400 font-mono block">{stats.neural_engine_health}</span>
            <span className="text-[11px] text-slate-400 font-mono">Latency Benchmark &lt; 0.4s</span>
          </div>
        </div>

        {/* Live Support Desk Console */}
        <section className="glass-card-premium p-6 rounded-3xl border border-purple-500/40 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Live Support Desk Inbox</h2>
                <p className="text-xs text-slate-400 font-mono">Respond directly to user queries from the central database desk</p>
              </div>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/40">
              Live DB Sync Active
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Conversation List */}
            <div className="space-y-2 border-r border-slate-800 pr-4 max-h-[380px] overflow-y-auto">
              <span className="text-xs font-mono text-slate-400 block mb-2">Active User Tickets ({conversations.length})</span>
              {conversations.map((c, i) => (
                <div
                  key={i}
                  onClick={() => handleSelectUserChat(c)}
                  className={`p-3.5 rounded-2xl border transition cursor-pointer ${
                    selectedUserChat?.user_id === c.user_id
                      ? 'bg-purple-500/20 border-purple-500/50 text-white shadow-glow-purple'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs">{c.user_name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{c.last_timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1 mb-1">{c.last_message}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                    {c.user_role} Ticket
                  </span>
                </div>
              ))}
            </div>

            {/* Chat Conversation View */}
            <div className="md:col-span-2 flex flex-col justify-between h-[380px] bg-slate-950 p-4 rounded-2xl border border-slate-800">
              {selectedUserChat ? (
                <>
                  <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm text-white">{selectedUserChat.user_name}</span>
                      <span className="text-xs text-slate-400 font-mono block">{selectedUserChat.user_email}</span>
                    </div>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                      {selectedUserChat.user_role} Account
                    </span>
                  </div>

                  <div className="flex-1 overflow-y-auto my-3 space-y-2 text-xs">
                    {chatMessages.map((m, idx) => (
                      <div key={idx} className={`flex flex-col ${m.is_admin_reply ? 'items-end' : 'items-start'}`}>
                        <span className="text-[10px] text-slate-400 font-mono mb-0.5">{m.sender_name} ({m.sender_role})</span>
                        <div className={`p-3 rounded-2xl max-w-[80%] ${
                          m.is_admin_reply
                            ? 'bg-purple-600/30 border border-purple-500/40 text-purple-100 rounded-tr-none'
                            : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                        }`}>
                          {m.message}
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendAdminReply} className="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <input
                      type="text"
                      value={adminReplyText}
                      onChange={(e) => setAdminReplyText(e.target.value)}
                      placeholder={`Reply as Admin to ${selectedUserChat.user_name}...`}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
                    />
                    <button
                      type="submit"
                      disabled={!adminReplyText.trim()}
                      className="btn-futuristic-primary px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Send Reply
                    </button>
                  </form>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs font-mono">
                  <MessageSquare className="w-8 h-8 mb-2 text-slate-600" />
                  Select a user conversation from the inbox to initiate admin response.
                </div>
              )}
            </div>

          </div>
        </section>

        {/* User Role-Based Access Control (RBAC) Table */}
        <section className="glass-card-premium p-6 rounded-3xl border border-slate-800 relative overflow-hidden">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">User Accounts & Role Permissions</h2>
                <p className="text-xs text-slate-400 font-mono">Manage User vs Admin privileges and security access levels</p>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-mono">Total {users.length} Managed Accounts</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-4">User Name</th>
                  <th className="py-3 px-4">Email Endpoint</th>
                  <th className="py-3 px-4">Role Access</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action Permission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-900/50 transition">
                    <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-cyan-400" />
                      {u.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{u.email}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold border ${
                        u.role === 'Admin'
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleToggleUserRole(u.id, u.role)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-purple-400 text-slate-300 hover:text-white transition cursor-pointer"
                      >
                        Set as {u.role === 'Admin' ? 'User' : 'Admin'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* Floating Live Support Chat Widget */}
      <LiveSupportChat />
    </div>
  );
}
