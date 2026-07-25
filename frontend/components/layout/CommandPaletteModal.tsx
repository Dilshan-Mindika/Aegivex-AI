'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  Bot, 
  Wallet, 
  Coins, 
  FileCode2, 
  Globe, 
  Receipt, 
  Gift, 
  Bell, 
  History, 
  Settings, 
  ShieldCheck, 
  ArrowRight,
  Zap,
  Command,
  Play,
  Bug,
  Gauge,
  Users
} from 'lucide-react';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const commandItems = [
  { name: 'AI Security Copilot Chat', category: 'AI Assistant', path: '/chat', icon: Bot, desc: 'Ask Aegivex AI GPT-4o-mini copilot about Web3 security' },
  { name: 'Pre-Execution Transaction Simulator', category: 'Simulation', path: '/simulation', icon: Play, desc: 'Simulate transaction calldata & asset balance changes' },
  { name: 'Smart Contract Static Vulnerability Auditor', category: 'Audit', path: '/scanners/static-analysis', icon: Bug, desc: 'Slither SWC static rule check (Reentrancy, tx.origin)' },
  { name: 'MEV Protection & Gas Optimization Analyzer', category: 'Optimization', path: '/scanners/mev-gas', icon: Gauge, desc: 'Calculate sandwich attack exposure & gas savings' },
  { name: 'Multi-Sig Vault & Timelock Auditor', category: 'Governance', path: '/scanners/multisig', icon: Users, desc: 'Audit Gnosis Safe thresholds & 48h timelock guards' },
  { name: 'NFT & Airdrop Scam Scanner', category: 'Scanners', path: '/scanners/nft-airdrop', icon: Gift, desc: 'Detect setApprovalForAll traps & fake claim permits' },
  { name: 'Wallet Risk & Reputation Scanner', category: 'Scanners', path: '/scanners/wallet', icon: Wallet, desc: 'Audit wallet history & active spender permits' },
  { name: 'Token Risk & Honeypot Analyzer', category: 'Scanners', path: '/scanners/token', icon: Coins, desc: 'Identify 100% sell fee locks & liquidity traps' },
  { name: 'Smart Contract Logic Auditor', category: 'Scanners', path: '/scanners/contract', icon: FileCode2, desc: 'Inspect source code verification & proxy backdoors' },
  { name: 'Website Safety & Phishing Scanner', category: 'Scanners', path: '/scanners/website', icon: Globe, desc: 'Verify dApp URLs, SSL age, and DNS history' },
  { name: 'Transaction Payload Explainer', category: 'Scanners', path: '/scanners/transaction', icon: Receipt, desc: 'Decode complex hex payload data and permit signatures' },
  { name: 'Bytecode Decompiler Inspector', category: 'Scanners', path: '/scanners/nft-airdrop', icon: FileCode2, desc: 'Inspect raw EVM assembly opcodes (DELEGATECALL)' },
  { name: 'Bulk Parallel Address Scanner', category: 'Scanners', path: '/scanners/nft-airdrop', icon: ShieldCheck, desc: 'Audit multiple addresses & contracts simultaneously' },
  { name: 'Security Alerts & News Feed', category: 'Intelligence', path: '/alerts', icon: Bell, desc: 'Live telemetry on Whale transfers, Rug pulls & Drains' },
  { name: 'Scan Audit History Log', category: 'Analytics', path: '/history', icon: History, desc: 'View and manage past security scan records' },
  { name: 'Two-Factor & Security Settings', category: 'Account', path: '/settings', icon: Settings, desc: 'Configure 2FA, connected wallets, and API keys' },
];

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open trigger handled by parent or custom event
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredItems = commandItems.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card-premium w-full max-w-xl rounded-3xl border border-slate-700 shadow-2xl overflow-hidden text-left"
          >
            {/* Search Input Bar */}
            <div className="p-4 border-b border-slate-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-cyan-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search All-In-One tools, scanners, alerts, or settings..."
                autoFocus
                className="w-full bg-transparent text-white text-xs sm:text-sm font-mono placeholder-slate-500 focus:outline-none"
              />
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-1 rounded">
                ESC
              </span>
            </div>

            {/* Item List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="p-6 text-center text-xs font-mono text-slate-500">
                  No matching security tools or scanners found.
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(item.path)}
                      className="w-full p-3 rounded-2xl hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30 flex items-center justify-between text-left transition group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm text-white group-hover:text-cyan-300">{item.name}</span>
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-400">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-mono mt-0.5">{item.desc}</p>
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition shrink-0" />
                    </button>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400 px-4">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                Aegivex All-In-One Web3 Command Center
              </span>
              <span>Use <kbd className="text-cyan-300 font-bold">↑</kbd> <kbd className="text-cyan-300 font-bold">↓</kbd> to navigate</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
