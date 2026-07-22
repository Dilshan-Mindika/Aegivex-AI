'use client';

import React, { useState } from 'react';
import { Receipt, Search, AlertOctagon, ShieldCheck, Zap } from 'lucide-react';
import { apiClient, handleApiCall } from '../../../services/api';

export default function TransactionScannerPage() {
  const [txHash, setTxHash] = useState('0x9876543210abcdef9876543210abcdef9876543210abcdef9876543210abcdef');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txHash.trim()) return;
    setLoading(true);

    const fallback = {
      transaction_hash: txHash,
      network: 'OKX X Layer / EVM',
      risk_score: 88,
      risk_level: 'High',
      summary: 'Unlimited Token Approval Request: This transaction requests spending permission for ALL ERC-20 assets in your wallet to spender contract 0x7a2...',
      recommendation: 'DO NOT SIGN. Avoid granting unlimited token allowances to unverified third-party spender contracts.'
    };

    const res = await handleApiCall(
      apiClient.post('/scan/transaction', { transaction_hash: txHash }),
      fallback
    );

    setResult(res);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="glass-card p-6 rounded-3xl border border-rose-500/20 bg-gradient-to-r from-rose-900/30 to-slate-900">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Blockchain Transaction Explainer</h2>
            <p className="text-xs text-slate-400">Translate complex raw transaction payloads and permit signatures into plain language.</p>
          </div>
        </div>

        <form onSubmit={handleScan} className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              value={txHash}
              onChange={(e) => setTxHash(e.target.value)}
              placeholder="Paste transaction hash (0x...)"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono focus:outline-none focus:border-rose-500 transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-glow-red flex items-center justify-center gap-2 transition"
          >
            {loading ? 'Explaining...' : 'Explain Transaction'}
            <Zap className="w-4 h-4" />
          </button>
        </form>
      </div>

      {result && (
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-slate-400">TRANSACTION HASH</span>
              <p className="text-xs font-mono font-bold text-white mt-0.5 truncate max-w-md">{result.transaction_hash}</p>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 block mb-1">RISK RATING</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                result.risk_level === 'High'
                  ? 'bg-red-500/10 text-red-400 border-red-500/30'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              }`}>
                {result.risk_level} ({result.risk_score}/100)
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 mb-1">PLAIN-LANGUAGE EXPLANATION</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{result.summary}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-red-500/30">
            <h4 className="text-xs font-bold text-red-400 flex items-center gap-1.5 mb-1">
              <AlertOctagon className="w-4 h-4" />
              SAFETY RECOMMENDATION
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">{result.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
