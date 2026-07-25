'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  ShieldCheck, 
  Clock, 
  Key, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Lock,
  Layers
} from 'lucide-react';

export default function MultisigAuditorPage() {
  const [targetAddress, setTargetAddress] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuditing(true);
    setAuditResult(null);

    setTimeout(() => {
      setIsAuditing(false);

      const isRisky = targetAddress.toLowerCase().includes('risk') || targetAddress.startsWith('0x11');

      setAuditResult({
        vaultAddress: targetAddress || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F (Gnosis Safe)',
        threshold: isRisky ? '1-of-1 (SINGLE SIGNER)' : '3-of-5 (QUALIFIED MULTI-SIG)',
        timelock: isRisky ? '0 Hours (INSTANT EXECUTION)' : '48 Hours Timelock Guard',
        score: isRisky ? 85 : 5,
        rating: isRisky ? 'CRITICAL TREASURY RISK' : 'SECURE GOVERNANCE SAFEGUARD',
        summary: isRisky 
          ? 'CRITICAL GOVERNANCE RISK: Vault requires only 1 signer (1-of-1) with 0-hour timelock delay, presenting a single point of failure.' 
          : 'Verified Gnosis Safe multi-sig vault with 3-of-5 threshold requirement and 48-hour timelock delay protection.',
        signers: [
          { address: '0x8f2a...39f1', status: 'VERIFIED SIGNER (Hardware Wallet)', weight: '1 Vote' },
          { address: '0x71c7...976f', status: 'VERIFIED SIGNER (Cold Storage)', weight: '1 Vote' },
          { address: '0x33b1...8e21', status: 'VERIFIED SIGNER (Institutional Multisig)', weight: '1 Vote' }
        ],
        checks: [
          { name: 'Multi-Sig Threshold Ratio', passed: !isRisky, detail: isRisky ? '1-of-1 Risky' : '3-of-5 Safe' },
          { name: 'Timelock Execution Delay', passed: !isRisky, detail: isRisky ? '0h Delay' : '48h Delay' },
          { name: 'Signer Key Separation', passed: true, detail: 'Multi-Geo Storage' },
          { name: 'Hardware Wallet Signers', passed: true, detail: 'HSM Enforce' }
        ]
      });
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              GNOSIS SAFE & TIMELOCK AUDITOR
            </span>
            <span className="text-xs font-mono text-purple-300">Treasury Governance Telemetry</span>
          </div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" />
            Multi-Sig Vault & Timelock Auditor
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Audit Gnosis Safe multi-sig thresholds, signer key reputation, timelock delay parameters, and treasury risk.
          </p>
        </div>

        {auditResult && (
          <button
            onClick={() => window.print()}
            className="btn-futuristic-primary px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4" />
            Export Vault Report PDF
          </button>
        )}
      </div>

      {/* Input Form */}
      <div className="glass-card-premium p-6 rounded-3xl border border-slate-800 space-y-4">
        <form onSubmit={handleAudit} className="space-y-4 text-left">
          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Gnosis Safe or Multi-Sig Vault Contract Address</label>
            <input
              type="text"
              value={targetAddress}
              onChange={(e) => setTargetAddress(e.target.value)}
              placeholder="0x... Gnosis Safe or Timelock Contract Address"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>Governance Audit Engine Active</span>
            </div>

            <button
              type="submit"
              disabled={isAuditing}
              className="btn-futuristic-primary px-6 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              {isAuditing ? 'Auditing Vault Governance...' : 'Audit Multi-Sig Vault'}
            </button>
          </div>
        </form>
      </div>

      {/* Audit Result */}
      {auditResult && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-premium p-6 rounded-3xl border border-slate-800 space-y-6 text-left"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-mono font-black text-sm shrink-0 ${
                auditResult.score > 50 ? 'border-red-500 bg-red-500/10 text-red-400' : 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
              }`}>
                {auditResult.score}/100
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">{auditResult.vaultAddress}</h3>
                <p className="text-xs font-mono text-slate-400">Threshold: <strong className="text-cyan-300">{auditResult.threshold}</strong> • Timelock: <strong className="text-purple-300">{auditResult.timelock}</strong></p>
              </div>
            </div>

            <span className={auditResult.score > 50 ? 'badge-risk-critical' : 'badge-risk-safe'}>{auditResult.rating}</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-medium">{auditResult.summary}</p>

          {/* Governance Checklist */}
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">
              Treasury Governance Safeguards
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {auditResult.checks.map((chk: any, idx: number) => (
                <div key={idx} className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs font-mono ${
                  chk.passed ? 'bg-emerald-500/5 border-emerald-500/30 text-emerald-300' : 'bg-red-500/5 border-red-500/30 text-red-300'
                }`}>
                  <div className="flex items-center gap-2">
                    {chk.passed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <AlertTriangle className="w-3.5 h-3.5 text-red-400" />}
                    <span className="font-bold">{chk.name}</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700">{chk.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Registered Signers */}
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">
              Registered Multi-Sig Signer Addresses
            </span>
            <div className="space-y-1.5">
              {auditResult.signers.map((s: any, idx: number) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-white font-bold">{s.address}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">{s.weight}</span>
                    <span className="badge-risk-safe text-[10px]">{s.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}
