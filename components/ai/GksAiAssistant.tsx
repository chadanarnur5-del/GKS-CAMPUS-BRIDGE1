'use client';

import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { UserProfile } from '@/types';
import { SourceBadge } from '@/components/ui/SourceBadge';

interface Props {
  userProfile?: Partial<UserProfile>;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  sourceType?: 'official' | 'university' | 'student_experience' | 'ai_generated';
  steps?: string[];
  warning?: string;
  timestamp: string;
}

export const GksAiAssistant: React.FC<Props> = ({ userProfile }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello! I am your personal GKS AI Assistant. I can help you with your visa, university administrative tasks, residence registration, and daily life in Korea. What would you like to know today?`,
      sourceType: 'ai_generated',
      timestamp: '9:00 PM'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: input,
          userContext: userProfile,
          mode: 'general'
        })
      });

      const data = await response.json();

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.answer || 'Sorry, I could not retrieve an answer at this moment.',
        sourceType: data.sourceType || 'ai_generated',
        steps: data.steps,
        warning: data.warning,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'Network connection issue. Please check your internet connection or try again.',
          sourceType: 'ai_generated',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl h-[550px] flex flex-col text-slate-100 shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80 backdrop-blur-md rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm">GKS AI Assistant</h3>
            <p className="text-xs text-slate-400">Contextual guidance for {userProfile?.universityName || 'GKS Scholars'}</p>
          </div>
        </div>
        <SourceBadge type="ai_generated" text="AI Companion" />
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 flex-shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[80%] rounded-2xl p-4 text-sm space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none'
                  : 'bg-slate-800/80 border border-slate-700/60 text-slate-100 rounded-tl-none'
              }`}
            >
              <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

              {msg.steps && msg.steps.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-700/50 space-y-1">
                  <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Recommended Steps</div>
                  {msg.steps.map((step, sIdx) => (
                    <div key={sIdx} className="text-xs text-slate-300 flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              )}

              {msg.warning && (
                <div className="mt-2 p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-300">
                  ⚠️ {msg.warning}
                </div>
              )}

              <div className={`text-[10px] text-right ${msg.sender === 'user' ? 'text-slate-800' : 'text-slate-400'}`}>
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 flex-shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 items-center text-slate-400 text-xs italic">
            <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
            <span>AI is processing official regulations and campus guidance...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/60 rounded-b-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about visa, dormitory, stipend, ARC, classes..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 text-slate-100 placeholder-slate-500"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2.5 bg-purple-500 hover:bg-purple-600 disabled:opacity-40 text-slate-950 font-bold rounded-xl transition flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
