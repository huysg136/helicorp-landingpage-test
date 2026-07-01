import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../../types';
import { askGemini } from '../../services/gemini';
import { Send, X, Bot, User } from 'lucide-react';

interface ChatWindowProps {
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Xin chào! Tôi có thể giúp gì cho bạn về các tính năng, pin, và cấu hình của AuraRing X?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessageText = input.trim();
    setInput('');

    // Append User message
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: userMessageText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Format chat history for Gemini API — include all previous messages
    // (excluding the welcome greeting) PLUS the new user message so Gemini
    // always receives the full conversation context.
    const history = messages
      .filter((m) => m.id !== 'welcome')
      .map((m) => ({
        role: m.sender === 'user' ? ('user' as const) : ('model' as const),
        parts: [m.text],
      }));

    // Append the current user turn to the history slice that is sent to the
    // model.  We do NOT include it as a separate `prompt` argument so the
    // Gemini chat session sees a coherent, uninterrupted conversation thread.
    history.push({ role: 'user', parts: [userMessageText] });

    // Call service to request response (history already contains the latest
    // user message, so we pass an empty string as the prompt).
    const botReplyText = await askGemini('', history);
    
    // Append Bot message response
    const botMsg: Message = {
      id: Math.random().toString(),
      sender: 'bot',
      text: botReplyText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 w-[360px] sm:w-[380px] h-[500px] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fadeIn">
      {/* Chat Window Header */}
      <div className="px-5 py-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#004ac6]/10 dark:bg-[#6ffbbe]/10 flex items-center justify-center text-[#004ac6] dark:text-[#6ffbbe]">
            <Bot size={18} />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white leading-none">
              AuraRing Assistant
            </h3>
            <span className="text-[10px] text-emerald-500 font-medium">Online</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages viewport */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Avatar icon display */}
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                  : 'bg-[#004ac6]/10 text-[#004ac6] dark:bg-[#6ffbbe]/10 dark:text-[#6ffbbe]'
              }`}
            >
              {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs text-left leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#004ac6] text-white rounded-tr-none'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-tl-none border border-slate-100 dark:border-slate-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#004ac6]/10 text-[#004ac6] dark:bg-[#6ffbbe]/10 dark:text-[#6ffbbe] flex items-center justify-center">
              <Bot size={14} />
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Input controls form */}
      <form
        onSubmit={handleSend}
        className="p-4 border-t border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Ask something about AuraRing X..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping}
          className="flex-1 bg-white dark:bg-slate-900 text-xs px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#004ac6] text-slate-800 dark:text-slate-100 placeholder-slate-400"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="p-2.5 rounded-xl bg-[#004ac6] hover:bg-[#2563eb] text-white disabled:opacity-50 disabled:hover:bg-[#004ac6] transition-all"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
};
