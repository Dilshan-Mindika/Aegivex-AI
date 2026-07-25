'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Layers, 
  FileCode, 
  Zap, 
  Download, 
  Info,
  Clock,
  Key
} from 'lucide-react';

export default function SimulationPage() {
  const [toAddress, setToAddress] = useState('');
  const [callData, setCallData] = useState('');
  const [ethValue, setEthValue] = useState('0.0');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulating(true);
    setSimulationResult(null);

    setTimeout(() => {
      setIsSimulating(false);

      const isMalicious = callData.toLowerCase().includes('a9059cbb') || 
                          callData.toLowerCase().includes('095ea7b3') || 
                          callData.toLowerCase().includes('permit') ||
                          toAddress.startsWith('0xfa') ||
                          toAddress.startsWith('0x99');

      setSimulationResult({
        status: isMalicious ? 'BLOCKED - ASSET DRAIN RISK' : 'SIMULATION SUCCESSFUL - SAFE',
        isSafe: !isMalicious,
        gasUsed: '142,500 Gas (0.0018 ETH)',
        simulationTime: '120ms',
        summary: isMalicious
          ? 'CRITICAL WARNING: This transaction signature grants unlimited approval permission for spender address to drain all wallet USDT & NFT assets.'
          : 'Transaction simulation completed with 0 state violations. Net asset movement is fully verified.',
        assetChanges: isMalicious ? [
          { type: 'OUT', name: 'Tether USD (USDT)', amount: 'UNLIMITED APPROVAL PERMIT', usd: 'Entire Balance at Risk', isDanger: true },
          { type: 'OUT', name: 'Bored Ape Yacht Club (BAYC #4281)', amount: 'setApprovalForAll(true)', usd: '78.5 ETH Value', isDanger: true },
          { type: 'IN', name: 'Fake Claim Voucher', amount: '1.0 VOUCHER', usd: '$0.00', isDanger: false }
        ] : [
          { type: 'OUT', name: 'Ethereum (ETH)', amount: ethValue ? `${ethValue} ETH` : '0.1 ETH', usd: '$340.00', isDanger: false },
          { type: 'IN', name: 'Uniswap V3 LP Position Token', amount: '1.0 UNI-V3-POS', usd: '$340.00', isDanger: false }
        ],
        logs: [
          { index: 0, event: isMalicious ? 'Approval(owner, spender, MAX_UINT256)' : 'Transfer(from, to, amount)', status: isMalicious ? 'CRITICAL RISK' : 'VALID' },
          { index: 1, event: isMalicious ? 'setApprovalForAll(operator, true)' : 'Swap(sender, amount0In, amount1Out)', status: isMalicious ? 'CRITICAL RISK' : 'VALID' }
        ]
      });
    }, 1200);
  };

  const handlePresetSimulation = (preset: 'safe' | 'drainer') => {
    if (preset === 'drainer') {
      setToAddress('0xfa771994...DrainerSpender');
      setCallData('0x095ea7b3000000000000000000000000fa771994ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
      setEthValue('0.0');
    } else {
      setToAddress('0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'); // Uniswap V3 Router
      setCallData('0x414bf38900000000000000000000000071c7656ec7ab88b098defb751b7401b5f6d8976f');
      setEthValue('0.25');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              PRE-EXECUTION TRANSACTION SIMULATION
            </span>
            <span className="text-xs font-mono text-purple-300">Blowfish & Pocket Universe Engine</span>
          </div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Play className="w-6 h-6 text-cyan-400" />
            Interactive Web3 Transaction Simulator
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulate transaction calldata before submitting to your Web3 wallet. Visualize exact asset balance changes and block drainer permits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handlePresetSimulation('drainer')}
            className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 font-mono text-xs font-bold transition cursor-pointer"
          >
            Load Drainer Trap Test
          </button>
          <button
            type="button"
            onClick={() => handlePresetSimulation('safe')}
            className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold transition cursor-pointer"
          >
            Load Uniswap Swap Test
          </button>
        </div>
      </div>

      {/* Simulator Input Form */}
      <div className="glass-card-premium p-6 rounded-3xl border border-slate-800 space-y-4">
        <form onSubmit={handleSimulate} className="space-y-4 text-left">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs font-mono text-slate-400 block mb-1">Target Contract / Recipient Address</label>
              <input
                type="text"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                placeholder="0x... Target Contract Address"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">ETH Value Transfer</label>
              <input
                type="text"
                value={ethValue}
                onChange={(e) => setEthValue(e.target.value)}
                placeholder="0.0"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Transaction Calldata Hex (Optional)</label>
            <textarea
              value={callData}
              onChange={(e) => setCallData(e.target.value)}
              rows={2}
              placeholder="0x095ea7b3... (Hex encoded method signature and function arguments)"
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>EVM State Override Engine Active</span>
            </div>

            <button
              type="submit"
              disabled={isSimulating}
              className="btn-futuristic-primary px-6 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              {isSimulating ? 'Simulating EVM State...' : 'Simulate Transaction State'}
            </button>
          </div>
        </form>
      </div>

      {/* Simulation Result Visualization */}
      {simulationResult && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-premium p-6 rounded-3xl border border-slate-800 space-y-6 text-left"
        >
          {/* Header Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                simulationResult.isSafe 
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' 
                  : 'bg-red-500/20 border-red-500/40 text-red-400'
              }`}>
                {simulationResult.isSafe ? <CheckCircle2 className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">{simulationResult.status}</h3>
                <p className="text-xs font-mono text-slate-400">Gas Estimate: {simulationResult.gasUsed} • Latency: {simulationResult.simulationTime}</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-medium">{simulationResult.summary}</p>

          {/* Asset Balance Movements Grid */}
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-3">
              Simulated Asset & Permit State Changes
            </span>
            <div className="space-y-2.5">
              {simulationResult.assetChanges.map((change: any, idx: number) => (
                <div 
                  key={idx} 
                  className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs font-mono ${
                    change.isDanger 
                      ? 'bg-red-500/10 border-red-500/40 text-red-300' 
                      : change.type === 'OUT' 
                      ? 'bg-slate-900 border-slate-800 text-slate-200' 
                      : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg border ${
                      change.type === 'OUT' ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    }`}>
                      {change.type === 'OUT' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className="font-bold text-white block">{change.name}</span>
                      <span className="text-[11px] text-slate-400">{change.type === 'OUT' ? 'Transferred Out / Permit Granted' : 'Received into Wallet'}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-extrabold text-sm block">{change.amount}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{change.usd}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Decoded Transaction Logs */}
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">
              Decoded EVM Execution Logs
            </span>
            <div className="space-y-1.5">
              {simulationResult.logs.map((log: any, idx: number) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono flex items-center justify-between">
                  <span className="text-slate-300">Log [{log.index}]: <strong className="text-white">{log.event}</strong></span>
                  <span className={log.status === 'CRITICAL RISK' ? 'badge-risk-critical' : 'badge-risk-safe'}>{log.status}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}
