'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Headset, HelpCircle } from 'lucide-react';
import { faqKnowledgeBase, findMatchingFAQ } from '../data/faqData';

import { apiClient, handleApiCall } from '../services/api';

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
  const [showPopBubble, setShowPopBubble] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'demo-1',
      sender_name: 'Aegivex Security Desk',
      sender_role: 'Admin',
      message: 'Hello! Welcome to Aegivex Security Intelligence Live Desk. Ask any Web3 security question or select a quick topic below.',
      is_admin_reply: true,
      created_at: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const checkAdminStatus = () => {
    const storedUserStr = localStorage.getItem('aegivex_user');
    if (storedUserStr) {
      try {
        const u = JSON.parse(storedUserStr);
        if (u.role === 'Admin' || u.email === 'admin@aegivex.ai') {
          setIsAdmin(true);
          return;
        }
      } catch (e) {}
    }
    setIsAdmin(false);
  };

  useEffect(() => {
    checkAdminStatus();
    window.addEventListener('aegivex_user_updated', checkAdminStatus);
    window.addEventListener('storage', checkAdminStatus);
    return () => {
      window.removeEventListener('aegivex_user_updated', checkAdminStatus);
      window.removeEventListener('storage', checkAdminStatus);
    };
  }, []);

  useEffect(() => {
    if (isOpen && !isAdmin) {
      setShowPopBubble(false);
      fetchLiveMessages();
      const interval = setInterval(fetchLiveMessages, 4000);
      return () => clearInterval(interval);
    }
  }, [isOpen, isAdmin]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchLiveMessages = async () => {
    try {
      const data = await handleApiCall(apiClient.get('/chat/live/messages'), []);
      if (Array.isArray(data) && data.length > 0) {
        setMessages(data);
      }
    } catch (err) {}
  };

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || isSending) return;

    const trimmedText = userText.trim();
    setInputText('');

    const tempMsg: ChatMessage = {
      id: `temp-${Date.now()}`,
      sender_name: 'You',
      sender_role: 'User',
      message: trimmedText,
      is_admin_reply: false,
      created_at: new Date().toISOString()
    };

    setMessages((prev) => [...prev, tempMsg]);
    setIsSending(true);

    // Save to Database
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:8000/api/v1/chat/live/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ message: trimmedText })
      });
    } catch (err) {}

    // Check 50+ FAQ Auto-Reply Database
    const matchedFaq = findMatchingFAQ(trimmedText);

    setTimeout(() => {
      if (matchedFaq) {
        setMessages((prev) => [
          ...prev,
          {
            id: `faq-${Date.now()}`,
            sender_name: 'Aegivex Security Desk',
            sender_role: 'FAQ Bot',
            message: `Q: ${matchedFaq.question}\n\n${matchedFaq.answer}`,
            is_admin_reply: true,
            created_at: new Date().toISOString()
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `auto-${Date.now()}`,
            sender_name: 'Security Admin Desk',
            sender_role: 'Admin',
            message: `Your query "${trimmedText}" has been logged into the security threat queue. An on-call engineer is reviewing your target vector on the live ledger console.`,
            is_admin_reply: true,
            created_at: new Date().toISOString()
          }
        ]);
      }
      setIsSending(false);
    }, 600);
  };

  const handleQuickFaqClick = (faq: typeof faqKnowledgeBase[0]) => {
    handleSendMessage(faq.question);
  };

  if (isAdmin) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans pointer-events-auto flex flex-col items-end">
      
      {/* Auto Pop-Up Greeting Speech Bubble */}
      <AnimatePresence>
        {!isOpen && showPopBubble && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="mb-3 max-w-[260px] p-3.5 rounded-2xl bg-slate-950/95 border border-cyan-400/50 shadow-glow-cyan backdrop-blur-2xl text-left relative cursor-pointer group"
            onClick={() => setIsOpen(true)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPopBubble(false);
              }}
              className="absolute top-2 right-2 p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition"
              aria-label="Dismiss Greeting"
            >
              <X className="w-3 h-3" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span className="text-[11px] font-bold text-emerald-400 font-mono">Support Online Now</span>
            </div>

            <p className="text-xs text-slate-200 leading-snug group-hover:text-cyan-300 transition">
              We are here to help you! Chat live with Aegivex AI Security Engineers.
            </p>

            <div className="absolute -bottom-2 right-6 w-3 h-3 bg-slate-950 border-r border-b border-cyan-400/50 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Simple Live Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="glass-card-premium border-gradient-glow w-[calc(100vw-24px)] max-w-[380px] h-[calc(100vh-100px)] max-h-[500px] rounded-3xl border border-cyan-500/40 shadow-2xl overflow-hidden flex flex-col justify-between mb-4 bg-slate-950/95 backdrop-blur-2xl text-left"

          >
            {/* Simple Clean Header */}
            <div className="px-5 py-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-glow-cyan">
                  <Headset className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">Security Desk Live</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Real-Time FAQ & Support Engine</span>
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

            {/* Messages Area */}
            <div className="p-4 flex-1 overflow-y-auto space-y-3 font-sans text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.is_admin_reply ? 'items-start' : 'items-end'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400 font-mono">
                    <span className="font-bold text-slate-300">{m.sender_name}</span>
                    <span className={`px-1.5 py-0.2 rounded border ${
                      m.sender_role === 'FAQ Bot'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : m.is_admin_reply
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                        : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    }`}>
                      {m.sender_role}
                    </span>
                  </div>

                  <div
                    className={`p-3 rounded-2xl max-w-[88%] leading-relaxed whitespace-pre-line ${
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

            {/* Quick 50+ FAQ Chips Bar */}
            <div className="px-3 py-2 bg-slate-950/80 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px]">
              <span className="text-[10px] font-mono text-slate-500 shrink-0 flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-cyan-400" />
                FAQs:
              </span>
              {[
                faqKnowledgeBase[0],  // What is a token honeypot?
                faqKnowledgeBase[10], // What is a wallet drainer?
                faqKnowledgeBase[20], // What is reentrancy attack?
                faqKnowledgeBase[30], // What is typosquatting?
                faqKnowledgeBase[42], // How does OKX X Layer work?
              ].map((faq) => (
                <button
                  key={faq.id}
                  onClick={() => handleQuickFaqClick(faq)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition whitespace-nowrap shrink-0"
                >
                  {faq.question}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3 border-t border-slate-800 bg-slate-900/90 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask any Web3 security question..."
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

      {/* Floating Live Chat Icon Button */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(true)}
          className="relative p-[2px] rounded-2xl border-running-glow shadow-glow-cyan cursor-pointer group"
          aria-label="Open Live Security Chat"
        >
          <div className="w-14 h-14 rounded-[14px] bg-slate-950 flex items-center justify-center relative z-10">
            <div className="relative flex items-center justify-center">
              <Headset className="w-7 h-7 text-cyan-300 group-hover:scale-110 transition duration-300" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border border-slate-950" />
            </div>
          </div>
        </motion.button>
      )}
    </div>
  );
}
