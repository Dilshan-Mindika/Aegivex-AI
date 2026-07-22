'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, ShieldCheck, UserCheck, Bot, Headset, Zap } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender_name: string;
  sender_role: string;
  message: string;
  is_admin_reply: boolean;
  created_at: string;
}

export default function LiveSupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'demo-1',
      sender_name: 'Aegivex Support Desk',
      sender_role: 'Admin',
      message: 'Welcome to Aegivex Security Intelligence Live Desk. How can our security engineers assist your audit today?',
      is_admin_reply: true,
      created_at: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      fetchLiveMessages();
      const interval = setInterval(fetchLiveMessages, 4000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchLiveMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8000/api/v1/chat/live/messages', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setMessages(data);
        }
      }
    } catch (err) {
      // Gracefully retain current messages
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSending) return;

    const userText = inputText.trim();
    setInputText('');

    const tempMsg: ChatMessage = {
      id: `temp-${Date.now()}`,
      sender_name: 'You',
      sender_role: 'User',
      message: userText,
      is_admin_reply: false,
      created_at: new Date().toISOString()
    };

    setMessages((prev) => [...prev, tempMsg]);
    setIsSending(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8000/api/v1/chat/live/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ message: userText })
      });

      if (res.ok) {
        const savedMsg = await res.json();
        setMessages((prev) => prev.map((m) => (m.id === tempMsg.id ? savedMsg : m)));

        // Simulated Automated Admin Instant Response if first query
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `auto-${Date.now()}`,
              sender_name: 'Security Admin Desk',
              sender_role: 'Admin',
              message: `Received ticket for query: "${userText}". An on-call threat analyst is verifying your target vector on the live ledger console.`,
              is_admin_reply: true,
              created_at: new Date().toISOString()
            }
          ]);
        }, 1200);
      }
    } catch (err) {
      // Retain optimistic message
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="glass-card-premium border-gradient-glow w-[350px] sm:w-[400px] h-[520px] rounded-3xl border border-cyan-500/40 shadow-2xl overflow-hidden flex flex-col justify-between mb-4 bg-slate-950/95 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl p-[1.5px] border-running-glow shadow-glow-cyan">
                  <div className="w-full h-full rounded-[9px] bg-slate-950 flex items-center justify-center text-cyan-400">
                    <Headset className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">Security Desk Live</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Real-Time Database Support</span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="p-4 flex-1 overflow-y-auto space-y-3 font-sans text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.is_admin_reply ? 'items-start' : 'items-end'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400 font-mono">
                    <span className="font-bold text-slate-300">{m.sender_name}</span>
                    <span className={`px-1.5 py-0.2 rounded border ${
                      m.is_admin_reply ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    }`}>
                      {m.sender_role}
                    </span>
                  </div>

                  <div
                    className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                      m.is_admin_reply
                        ? 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                        : 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-100 rounded-tr-none shadow-glow-cyan'
                    }`}
                  >
                    {m.message}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-900/80 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Aegivex Security Engineers..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono transition"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isSending}
                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold transition disabled:opacity-50 cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="relative p-[2px] rounded-2xl border-running-glow shadow-glow-cyan cursor-pointer group"
        >
          <div className="px-5 py-3 rounded-[14px] bg-slate-950 flex items-center gap-3 text-xs font-bold text-white relative z-10">
            <div className="relative">
              <MessageSquare className="w-5 h-5 text-cyan-400 group-hover:animate-bounce" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <span>Live Security Support</span>
          </div>
        </motion.button>
      )}
    </div>
  );
}
