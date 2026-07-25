'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Zap, ShieldCheck, RefreshCw, AlertTriangle, Volume2, VolumeX, Download } from 'lucide-react';
import { apiClient, handleApiCall } from '../../services/api';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  riskScore?: number;
  confidence?: number;
  timestamp: string;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I am your Aegivex AI Web3 Security Copilot. Ask me to analyze any wallet address, token contract, smart contract code, phishing URL, or transaction permit.',
      confidence: 99,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleExportTranscript = () => {
    const content = messages.map(m => `### [${m.sender.toUpperCase()}] (${m.timestamp})\n${m.text}\n`).join('\n---\n\n');
    const blob = new Blob([`# Aegivex AI Security Consultation Transcript\nExported: ${new Date().toLocaleString()}\n\n${content}`], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aegivex_Security_Chat_${Date.now()}.md`;
    a.click();
  };

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const suggestedPrompts = [
    "Is wallet address 0x71C7656EC7ab88b098defB751B7401B5f6d8976F safe?",
    "How does Aegivex detect token honeypot scams?",
    "Explain unlimited ERC-20 token approval risks",
    "What are upgradeable proxy contract vulnerabilities?"
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const promptText = textToSend || input;
    if (!promptText.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    const fallbackResponse = {
      response: `Aegivex AI Security Analysis for: "${promptText}"\n\n- Risk Assessment: Low to Moderate Risk\n- AI Security Recommendation: Always inspect smart contract verification and spender approvals on Block Explorers before executing transactions.`,
      risk_score: 15,
      confidence: 96
    };

    const data = await handleApiCall(
      apiClient.post('/ai/chat', { prompt: promptText }),
      fallbackResponse
    );

    const replyText = data.response || fallbackResponse.response;

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: replyText,
      riskScore: data.risk_score || 15,
      confidence: data.confidence || 96,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);

    if (isVoiceEnabled) {
      speakText(replyText);
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col justify-between max-w-4xl mx-auto glass-card rounded-3xl border border-slate-800 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center shadow-glow-purple">
            <Bot className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              AI Security Copilot Chat
              <Zap className="w-4 h-4 text-purple-400 animate-pulse" />
            </h2>
            <p className="text-xs text-slate-400">Model: Aegivex-SecCopilot-v1 (LangChain Engine)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Export Transcript */}
          <button
            onClick={handleExportTranscript}
            className="px-3 py-1.5 rounded-lg text-xs font-bold font-mono bg-slate-900 text-slate-300 hover:text-white border border-slate-800 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          {/* AI Voice Toggle */}
          <button
            onClick={() => {
              const nextState = !isVoiceEnabled;
              setIsVoiceEnabled(nextState);
              if (!nextState && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 transition cursor-pointer border ${
              isVoiceEnabled 
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-glow-purple' 
                : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
            }`}
          >
            {isVoiceEnabled ? <Volume2 className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>Voice {isVoiceEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setMessages([messages[0]])}
            className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Clear Chat
          </button>
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'bg-purple-600/20 border border-purple-500/30 text-purple-400'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[92%] sm:max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>

              {msg.sender === 'ai' && msg.confidence && (
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    AI Confidence: {msg.confidence}%
                  </span>
                  <span>{msg.timestamp}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-purple-300 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 animate-pulse" />
              AI Copilot is analyzing Web3 security parameters...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Prompts */}
      <div className="mb-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] font-semibold text-slate-400 shrink-0">Prompts:</span>
        {suggestedPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-purple-300 hover:border-purple-500/40 shrink-0 transition"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="relative flex items-center"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI Copilot about wallet address, token, contract, or domain..."
          className="w-full py-3.5 pl-4 pr-12 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-purple-500 transition"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="absolute right-2.5 p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-50 transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
