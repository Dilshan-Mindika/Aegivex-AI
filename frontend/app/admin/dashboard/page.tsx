'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
import { apiClient, handleApiCall } from '../../../services/api';
import LiveSupportChat from '@/components/LiveSupportChat';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>({
    total_users: 0,
    admin_count: 0,
    regular_user_count: 0,
    total_global_scans: 0,
    active_threats_blocked: 0,
    audit_logs_recorded: 0,
    system_status: 'OPERATIONAL',
    neural_engine_health: '100.00%'
  });

  const [users, setUsers] = useState<any[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedUserChat, setSelectedUserChat] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [adminReplyText, setAdminReplyText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllAdminData = async () => {
    try {
      const [statsRes, usersRes, convsRes]: [any, any, any] = await Promise.all([
        handleApiCall(apiClient.get('/admin/stats'), null),
        handleApiCall(apiClient.get('/admin/users'), null),
        handleApiCall(apiClient.get('/chat/live/admin/conversations'), null)
      ]);

      if (statsRes) {
        setStats(statsRes);
      }

      if (usersRes && Array.isArray(usersRes.users)) {
        setUsers(usersRes.users);
      }

      if (convsRes && Array.isArray(convsRes.conversations)) {
        setConversations(convsRes.conversations);
      }
    } catch (err) {
      console.error('Failed to load admin telemetry:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAdminData();

    // Realtime background polling every 5 seconds
    const interval = setInterval(() => {
      fetchAllAdminData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSelectUserChat = async (conv: any) => {
    setSelectedUserChat(conv);
    try {
      const msgs = await handleApiCall(apiClient.get(`/chat/live/messages?user_id=${conv.user_id}`), []);
      if (Array.isArray(msgs)) {
        setChatMessages(msgs);
      }
    } catch (err) {
      console.error('Error fetching conversation messages:', err);
    }
  };

  // Poll active chat messages every 3s if chat is open
  useEffect(() => {
    if (!selectedUserChat) return;

    const chatInterval = setInterval(async () => {
      try {
        const msgs = await handleApiCall(apiClient.get(`/chat/live/messages?user_id=${selectedUserChat.user_id}`), []);
        if (Array.isArray(msgs)) {
          setChatMessages(msgs);
        }
      } catch (err) {}
    }, 3000);

    return () => clearInterval(chatInterval);
  }, [selectedUserChat]);

  const handleSendAdminReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReplyText.trim() || !selectedUserChat) return;

    const reply = adminReplyText.trim();
    setAdminReplyText('');

    try {
      const newMsg = await handleApiCall(apiClient.post('/chat/live/send', {
        message: reply,
        user_id: selectedUserChat.user_id
      }), null);

      if (newMsg) {
        setChatMessages((prev) => [...prev, newMsg]);
        fetchAllAdminData();
      }
    } catch (err) {
      console.error('Error sending admin reply:', err);
    }
  };

  const handleToggleUserRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole.toLowerCase() === 'admin' ? 'User' : 'Admin';

    try {
      await handleApiCall(apiClient.post(`/admin/users/${userId}/role`, { role: newRole }), null);
      fetchAllAdminData();
    } catch (err) {
      console.error('Error updating user role:', err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      
      {/* Header Banner */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-950/90 border border-purple-500/30 shadow-glow-purple flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-lg sm:text-xl text-white tracking-tight">AEGIVEX</span>
              <span className="text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40 font-mono">
                ADMIN CONTROL CENTER
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono">Super Admin Role-Based Access Control (RBAC) & Realtime Telemetry</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          <Link
            href="/dashboard"
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-xs font-bold text-cyan-300 transition flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>User Dashboard View</span>
          </Link>
          <button
            onClick={() => fetchAllAdminData()}
            className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:text-white transition cursor-pointer"
            title="Refresh Realtime Telemetry"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Executive Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card-premium p-5 rounded-2xl border border-purple-500/30 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-purple-300 font-bold">REGISTERED USERS</span>
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <span className="text-3xl font-black text-white font-mono block">{stats.total_users || 0}</span>
          <span className="text-[11px] text-slate-400 font-mono">
            {stats.admin_count || 0} Super Admins • {stats.regular_user_count || 0} Standard Users
          </span>
        </div>

        <div className="glass-card-premium p-5 rounded-2xl border border-red-500/30 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-red-300 font-bold">THREATS INTERCEPTED</span>
            <ShieldAlert className="w-5 h-5 text-red-400" />
          </div>
          <span className="text-3xl font-black text-red-400 font-mono block">{stats.active_threats_blocked || 0}</span>
          <span className="text-[11px] text-slate-400 font-mono">Malicious honeypot & drainer vectors</span>
        </div>

        <div className="glass-card-premium p-5 rounded-2xl border border-cyan-500/30 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-cyan-300 font-bold">GLOBAL AUDIT LOGS</span>
            <Activity className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-3xl font-black text-cyan-300 font-mono block">{stats.total_global_scans || 0}</span>
          <span className="text-[11px] text-slate-400 font-mono">Multi-chain transactions processed</span>
        </div>

        <div className="glass-card-premium p-5 rounded-2xl border border-emerald-500/30 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-emerald-300 font-bold">NEURAL ENGINE HEALTH</span>
            <Cpu className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-3xl font-black text-emerald-400 font-mono block">{stats.neural_engine_health || '99.98%'}</span>
          <span className="text-[11px] text-slate-400 font-mono">Latency Benchmark &lt; 0.4s</span>
        </div>
      </div>

      {/* Live Support Desk Console */}
      <section className="glass-card-premium p-4 sm:p-6 rounded-3xl border border-purple-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-800 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Live Support Desk Inbox</h2>
              <p className="text-xs text-slate-400 font-mono">Respond directly to user queries from the central database desk</p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/40 flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Live DB Sync Active
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Conversation List */}
          <div className="space-y-2 border-r border-slate-800 pr-0 md:pr-4 max-h-[380px] overflow-y-auto">
            <span className="text-xs font-mono text-slate-400 block mb-2 font-bold">
              Active User Tickets ({conversations.length})
            </span>
            
            {conversations.length > 0 ? (
              conversations.map((c, i) => (
                <div
                  key={c.user_id || i}
                  onClick={() => handleSelectUserChat(c)}
                  className={`p-3.5 rounded-2xl border transition cursor-pointer ${
                    selectedUserChat?.user_id === c.user_id
                      ? 'bg-purple-500/20 border-purple-500/50 text-white shadow-glow-purple'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs truncate max-w-[140px]">{c.user_name}</span>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0">
                      {c.last_timestamp ? new Date(c.last_timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1 mb-1">{c.last_message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                      {c.user_role} Ticket
                    </span>
                    {c.unread_count > 0 && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-500 text-white font-bold font-mono">
                        {c.unread_count} new
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-slate-500 text-xs italic font-mono">
                No active user support tickets in database.
              </div>
            )}
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
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono font-bold">
                    {selectedUserChat.user_role} Account
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto my-3 space-y-2 text-xs pr-1">
                  {chatMessages.map((m, idx) => (
                    <div key={m.id || idx} className={`flex flex-col ${m.is_admin_reply ? 'items-end' : 'items-start'}`}>
                      <span className="text-[10px] text-slate-400 font-mono mb-0.5">{m.sender_name} ({m.sender_role})</span>
                      <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                        m.is_admin_reply
                          ? 'bg-purple-600/30 border border-purple-500/40 text-purple-100 rounded-tr-none shadow-glow-purple'
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
                    className="btn-futuristic-primary px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Reply</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs font-mono">
                <MessageSquare className="w-8 h-8 mb-2 text-slate-600 animate-bounce" />
                <span>Select a user conversation from the inbox to initiate admin response.</span>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* User Role-Based Access Control (RBAC) Table */}
      <section className="glass-card-premium p-4 sm:p-6 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-800 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">User Accounts & Role Permissions</h2>
              <p className="text-xs text-slate-400 font-mono">Manage User vs Admin privileges and security access levels</p>
            </div>
          </div>
          <span className="text-xs text-slate-400 font-mono font-bold">Total {users.length} Managed Accounts</span>
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
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-900/50 transition">
                    <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{u.name}</span>
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
                        {u.status || 'Active'}
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
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 text-xs italic font-mono">
                    No registered user accounts found in database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Floating Live Support Chat Widget */}
      <LiveSupportChat />
    </div>
  );
}
