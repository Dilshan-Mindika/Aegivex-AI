'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, History, ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';

export interface ScanHistoryItem {
  id: string;
  timestamp: string;
  target: string;
  riskScore: number;
  riskLevel: 'High' | 'Medium' | 'Low' | string;
  summary: string;
}

interface ScannerHistoryTableProps {
  history: ScanHistoryItem[];
  title?: string;
  onClearHistory?: () => void;
}

export function ScannerHistoryTable({ history, title = "Scan Audit History Log", onClearHistory }: ScannerHistoryTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest_risk' | 'lowest_risk'>('newest');

  const filteredAndSortedHistory = useMemo(() => {
    let list = [...history];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(item => 
        item.target.toLowerCase().includes(q) || 
        item.summary.toLowerCase().includes(q)
      );
    }

    // Filter by risk level
    if (riskFilter !== 'all') {
      list = list.filter(item => item.riskLevel.toLowerCase() === riskFilter.toLowerCase());
    }

    // Sort list
    list.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      }
      if (sortBy === 'highest_risk') {
        return b.riskScore - a.riskScore;
      }
      if (sortBy === 'lowest_risk') {
        return a.riskScore - b.riskScore;
      }
      return 0;
    });

    return list;
  }, [history, searchQuery, riskFilter, sortBy]);

  if (history.length === 0) {
    return (
      <div className="glass-card p-6 rounded-3xl border border-slate-800 text-center space-y-2">
        <History className="w-8 h-8 text-slate-600 mx-auto" />
        <h3 className="text-sm font-bold text-slate-300">No Recent Scans Recorded</h3>
        <p className="text-xs text-slate-500 font-mono">Perform a scan above to save audit records into persistent history log.</p>
      </div>
    );
  }

  return (
    <div className="glass-card-premium p-6 rounded-3xl border border-slate-800 space-y-4 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">{title} ({filteredAndSortedHistory.length})</h3>
        </div>

        {onClearHistory && (
          <button
            onClick={onClearHistory}
            className="text-[11px] font-mono text-slate-400 hover:text-red-400 transition underline cursor-pointer"
          >
            Clear History
          </button>
        )}
      </div>

      {/* Advanced Search, Filtering & Sorting Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search history targets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Risk Level Filter Dropdown */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-300">
          <Filter className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span className="text-slate-500 shrink-0">Filter:</span>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value as any)}
            className="bg-transparent text-white focus:outline-none w-full cursor-pointer"
          >
            <option value="all" className="bg-slate-950 text-white">All Risk Levels</option>
            <option value="high" className="bg-slate-950 text-red-400">High Risk Only</option>
            <option value="medium" className="bg-slate-950 text-amber-400">Medium Risk Only</option>
            <option value="low" className="bg-slate-950 text-emerald-400">Low / Safe Risk Only</option>
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-300">
          <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="text-slate-500 shrink-0">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent text-white focus:outline-none w-full cursor-pointer"
          >
            <option value="newest" className="bg-slate-950 text-white">Newest First</option>
            <option value="oldest" className="bg-slate-950 text-white">Oldest First</option>
            <option value="highest_risk" className="bg-slate-950 text-white">Highest Risk Score</option>
            <option value="lowest_risk" className="bg-slate-950 text-white">Lowest Risk Score</option>
          </select>
        </div>
      </div>

      {/* History Items List */}
      <div className="space-y-2 pt-2">
        {filteredAndSortedHistory.length === 0 ? (
          <p className="text-xs text-slate-500 font-mono py-4 text-center">No history records matching filter criteria.</p>
        ) : (
          filteredAndSortedHistory.map((item) => {
            const isHigh = item.riskScore > 60 || item.riskLevel.toLowerCase() === 'high';
            const isMed = item.riskScore > 30 && item.riskScore <= 60 || item.riskLevel.toLowerCase() === 'medium';

            return (
              <div 
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition space-y-1.5 font-mono text-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 truncate">
                    {isHigh ? (
                      <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                    ) : isMed ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    <span className="font-bold text-white truncate">{item.target}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-slate-400">{item.timestamp}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      isHigh 
                        ? 'bg-red-500/20 text-red-400 border-red-500/40' 
                        : isMed 
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}>
                      {item.riskLevel.toUpperCase()} ({item.riskScore})
                    </span>
                  </div>
                </div>

                <p className="text-slate-400 text-[11px] font-sans truncate">{item.summary}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
