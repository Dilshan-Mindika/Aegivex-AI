'use client';

import React, { useEffect, useState } from 'react';
import { History, Search, Filter, RefreshCw, Activity, ArrowUpRight } from 'lucide-react';
import { apiClient, handleApiCall } from '../../services/api';

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([
    { id: '1', scan_type: 'wallet', target: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', risk_score: 12, risk_level: 'Low', created_at: '2026-07-22T10:15:00Z' },
    { id: '2', scan_type: 'token', target: 'UNI Token (0x1f9840a...)', risk_score: 92, risk_level: 'High', created_at: '2026-07-22T09:30:00Z' },
    { id: '3', scan_type: 'website', target: 'https://uniswap.org', risk_score: 5, risk_level: 'Low', created_at: '2026-07-22T08:45:00Z' },
    { id: '4', scan_type: 'contract', target: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', risk_score: 45, risk_level: 'Medium', created_at: '2026-07-22T07:10:00Z' },
    { id: '5', scan_type: 'transaction', target: '0x9876543210abcdef...', risk_score: 88, risk_level: 'High', created_at: '2026-07-22T06:05:00Z' },
  ]);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    const data = await handleApiCall(apiClient.get('/history'), history);
    if (data && Array.isArray(data) && data.length > 0) {
      setHistory(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filteredItems = history.filter((item) => {
    const matchesType = filterType === 'all' || item.scan_type.toLowerCase() === filterType;
    const matchesSearch = item.target.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleDeleteHistory = async (id: string) => {
    await handleApiCall(apiClient.delete(`/history/${id}`), {});
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <History className="w-5 h-5 text-blue-400" />
            Security Scan History & Audit Logs
          </h2>
          <p className="text-xs text-slate-400 mt-1">Unified index of all performed wallet, contract, token, website, and transaction security scans.</p>
        </div>

        <button
          onClick={fetchHistory}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:text-white transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh History
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search target address or URL..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          {['all', 'wallet', 'token', 'contract', 'website', 'transaction'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition ${
                filterType === type
                  ? 'bg-blue-600 text-white font-bold shadow-glow-blue'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* History Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-4 font-semibold">Scan Target</th>
                <th className="p-4 font-semibold">Scan Type</th>
                <th className="p-4 font-semibold">Risk Rating</th>
                <th className="p-4 font-semibold">Timestamp</th>
                <th className="p-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No scan records match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredItems.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-4 font-mono font-semibold text-slate-200">{row.target || row.reference_id || 'Security Scan'}</td>
                    <td className="p-4 text-slate-400 capitalize font-medium">{row.scan_type}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${
                        row.risk_level === 'High' || (row.risk_score && row.risk_score > 60)
                          ? 'bg-red-500/10 text-red-400 border-red-500/20'
                          : row.risk_level === 'Medium' || (row.risk_score && row.risk_score > 40)
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}>
                        {row.risk_level || 'Safe'} ({row.risk_score !== undefined ? row.risk_score : 15}/100)
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 font-mono">
                      {new Date(row.created_at || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteHistory(row.id)}
                        className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition text-[11px] font-semibold"
                        title="Remove record from history database"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

