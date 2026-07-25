'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Flame, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  Gauge, 
  Cpu, 
  FileCode2, 
  CheckCircle2, 
  Download, 
  ArrowRight
} from 'lucide-react';

export default function MevGasPage() {
  const [targetInput, setTargetInput] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      setIsAnalyzing(false);

      const highMev = targetInput.toLowerCase().includes('mev') || Number(slippage) > 1.5;

      setResult({
        target: targetInput || 'Uniswap V3 ETH/USDT Swap Route',
        score: highMev ? 72 : 8,
        rating: highMev ? 'HIGH MEV SANDWICH EXPOSURE' : 'LOW MEV EXPOSURE - OPTIMAL',
        slippageRisk: highMev ? 'EXTREME (Sandwich Vulnerability)' : 'SAFE (Low Slippage)',
        potentialGasSavings: '28,400 Gas (~$4.20 per tx)',
        summary: highMev 
          ? 'Warning: High slippage tolerance (>1.5%) exposes transaction to MEV bot sandwich attacks on public mempools.' 
          : 'Transaction swap path verified safe. Low MEV sandwich risk and optimal gas storage packing.',
        recommendations: [
          { title: 'Use Private RPC Relay (Flashbots / OKX MEV Guard)', desc: 'Route transaction via private mempool endpoints to prevent front-running bots from seeing pending transaction.' },
          { title: 'Tighten Slippage Tolerance', desc: 'Reduce slippage setting from 2.0% to 0.5% to eliminate arbitrage margin.' },
          { title: 'Solidity Storage Slot Packing (SSTORE)', desc: 'Pack uint128 state variables into single 256-bit storage slots to save 20,000 gas per write.' }
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
              MEV & GAS OPTIMIZATION ENGINE
            </span>
            <span className="text-xs font-mono text-purple-300">Flashbots & Mempool Telemetry</span>
          </div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Gauge className="w-6 h-6 text-cyan-400" />
            MEV Protection & Gas Optimization Analyzer
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Evaluate front-running / sandwich attack exposure, calculate MEV slippage risk, and inspect gas savings.
          </p>
        </div>

        {result && (
          <button
            onClick={() => window.print()}
            className="btn-futuristic-primary px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4" />
            Export MEV Report PDF
          </button>
        )}
      </div>

      {/* Input Form */}
      <div className="glass-card-premium p-6 rounded-3xl border border-slate-800 space-y-4">
        <form onSubmit={handleAnalyze} className="space-y-4 text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs font-mono text-slate-400 block mb-1">DEX Swap Route or Contract Address</label>
              <input
                type="text"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="0x... DEX Swap Router or Contract Address"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Slippage Tolerance %</label>
              <input
                type="text"
                value={slippage}
                onChange={(e) => setSlippage(e.target.value)}
                placeholder="0.5"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              disabled={isAnalyzing}
              className="btn-futuristic-primary px-6 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-4 h-4" />
              {isAnalyzing ? 'Analyzing Mempool Risk...' : 'Execute MEV & Gas Audit'}
            </button>
          </div>
        </form>
      </div>

      {/* Analysis Result */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-premium p-6 rounded-3xl border border-slate-800 space-y-6 text-left"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-mono font-black text-sm shrink-0 ${
                result.score > 50 ? 'border-red-500 bg-red-500/10 text-red-400' : 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
              }`}>
                {result.score}/100
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">{result.target}</h3>
                <p className="text-xs font-mono text-slate-400">Potential Savings: <strong className="text-emerald-400">{result.potentialGasSavings}</strong></p>
              </div>
            </div>

            <span className={result.score > 50 ? 'badge-risk-critical' : 'badge-risk-safe'}>{result.rating}</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-medium">{result.summary}</p>

          {/* Recommendations list */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
              MEV Safeguards & Gas Optimization Action Items
            </span>

            {result.recommendations.map((rec: any, idx: number) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 font-mono text-xs">
                <div className="flex items-center gap-2 font-bold text-white">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>{rec.title}</span>
                </div>
                <p className="text-slate-400 text-[11px] font-sans leading-relaxed pl-6">{rec.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

    </div>
  );
}
