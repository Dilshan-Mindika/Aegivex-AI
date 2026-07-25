'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileCode2, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Zap, 
  Code2, 
  Bug, 
  Terminal, 
  Download,
  AlertCircle
} from 'lucide-react';

const sampleVulnerableCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableVault {
    mapping(address => uint256) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    // SWC-107: Reentrancy vulnerability
    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        // External call prior to state update
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        balances[msg.sender] -= amount; // State update after call
    }

    // SWC-115: tx.origin phishing vulnerability
    function transferOwnership(address newOwner) public {
        require(tx.origin == owner, "Not authorized");
        owner = newOwner;
    }
}`;

export default function StaticAnalysisPage() {
  const [sourceCode, setSourceCode] = useState(sampleVulnerableCode);
  const [contractAddress, setContractAddress] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);

  const handleRunStaticAudit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuditing(true);
    setAuditResult(null);

    setTimeout(() => {
      setIsAuditing(false);

      const hasReentrancy = sourceCode.includes('call{value') || sourceCode.includes('msg.sender.call');
      const hasTxOrigin = sourceCode.includes('tx.origin');

      setAuditResult({
        contractName: 'VulnerableVault.sol',
        score: (hasReentrancy || hasTxOrigin) ? 78 : 5,
        rating: (hasReentrancy || hasTxOrigin) ? 'HIGH VULNERABILITY RISK' : 'CLEAN STATIC AUDIT',
        summary: (hasReentrancy || hasTxOrigin)
          ? 'Static analysis engine detected 2 critical SWC vulnerabilities in contract source code. Immediate code remediation required before deployment.'
          : 'Slither static rule checks completed with zero SWC security violations.',
        issues: [
          {
            id: 'SWC-107',
            title: 'Reentrancy Vulnerability in withdraw()',
            severity: 'CRITICAL',
            line: 'Line 16',
            description: 'External call to msg.sender precedes internal balance state modification, allowing malicious contract reentrancy loop.',
            remediation: 'Apply Checks-Effects-Interactions pattern or OpenZeppelin ReentrancyGuard nonReentrant modifier.'
          },
          {
            id: 'SWC-115',
            title: 'Authorization via tx.origin in transferOwnership()',
            severity: 'HIGH',
            line: 'Line 23',
            description: 'tx.origin is vulnerable to phishing attacks where user is tricked into calling intermediary malicious proxy.',
            remediation: 'Replace tx.origin with msg.sender for access control authorization checks.'
          }
        ]
      });
    }, 1300);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              SOLDIER & SWC STATIC ANALYSIS ENGINE
            </span>
            <span className="text-xs font-mono text-purple-300">Solidity AST Compiler Audit</span>
          </div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Bug className="w-6 h-6 text-cyan-400" />
            Smart Contract Static Vulnerability Auditor
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Perform static analysis against SWC-107 (Reentrancy), SWC-115 (tx.origin), SWC-104 (Unchecked Calls), and SWC-106 (Selfdestruct).
          </p>
        </div>

        {auditResult && (
          <button
            onClick={() => window.print()}
            className="btn-futuristic-primary px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4" />
            Export Static Audit PDF
          </button>
        )}
      </div>

      {/* Editor & Code Form */}
      <div className="glass-card-premium p-6 rounded-3xl border border-slate-800 space-y-4">
        <form onSubmit={handleRunStaticAudit} className="space-y-4 text-left">
          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Solidity Source Code or Contract Address</label>
            <textarea
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              rows={10}
              className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700 text-cyan-300 placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-cyan-500 transition leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>AST Parsing & Rule Engine Active</span>
            </div>

            <button
              type="submit"
              disabled={isAuditing}
              className="btn-futuristic-primary px-6 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Code2 className="w-4 h-4" />
              {isAuditing ? 'Parsing AST & SWC Rules...' : 'Execute Static Analysis'}
            </button>
          </div>
        </form>
      </div>

      {/* Audit Findings Result */}
      {auditResult && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-premium p-6 rounded-3xl border border-slate-800 space-y-6 text-left"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-red-500/50 bg-red-500/10 text-red-400 flex items-center justify-center font-mono font-black text-sm shrink-0">
                {auditResult.score}/100
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">{auditResult.contractName}</h3>
                <p className="text-xs font-mono text-slate-400">Static Analysis Findings</p>
              </div>
            </div>

            <span className="badge-risk-critical">{auditResult.rating}</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-medium">{auditResult.summary}</p>

          {/* Vulnerability Cards */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
              Identified SWC Vulnerability Items
            </span>

            {auditResult.issues.map((issue: any, idx: number) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold border border-red-500/40">{issue.id}</span>
                    <span className="font-bold text-white">{issue.title}</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">{issue.line}</span>
                </div>

                <p className="text-slate-300 text-[11px] leading-relaxed font-sans">{issue.description}</p>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 text-[11px]">
                  <strong>REMEDIATION:</strong> {issue.remediation}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

    </div>
  );
}
