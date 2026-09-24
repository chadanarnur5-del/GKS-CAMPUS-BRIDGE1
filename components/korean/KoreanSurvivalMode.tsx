'use client';

import React, { useState } from 'react';
import { Volume2, Search, Sparkles, BookOpen } from 'lucide-react';
import { SourceBadge } from '@/components/ui/SourceBadge';

interface PhraseCategory {
  category: string;
  items: {
    korean: string;
    pronunciation: string;
    english: string;
    context: string;
  }[];
}

const SURVIVAL_PHRASES: PhraseCategory[] = [
  {
    category: 'University & Administration',
    items: [
      {
        korean: '서류를 제출하러 왔습니다.',
        pronunciation: 'Seoryureul jeatchulhareo wasseumnida.',
        english: 'I came to submit my documents.',
        context: 'Use when visiting the International Office or Academic Affairs.'
      },
      {
        korean: '재학증명서 발급받고 싶어요.',
        pronunciation: 'Jaehakjeungmyeongseo balgeupbatgo sip-eoyo.',
        english: 'I would like to issue a Certificate of Enrollment.',
        context: 'Required for visa extensions and bank account setup.'
      }
    ]
  },
  {
    category: 'Immigration & ARC',
    items: [
      {
        korean: '외국인등록증 연장 신청하려고 합니다.',
        pronunciation: 'Oegugin-deungnokjeung yeonjang sincheong-hareogo hamnida.',
        english: 'I would like to apply for an ARC extension.',
        context: 'Say this at the Immigration Office appointment counter.'
      }
    ]
  },
  {
    category: 'Medical & Hospital',
    items: [
      {
        korean: '머리가 아프고 열이 나요.',
        pronunciation: 'Meoriga apeugo yeori nayo.',
        english: 'I have a headache and a fever.',
        context: 'Expressing common symptoms at a local pharmacy or clinic.'
      }
    ]
  }
];

export const KoreanSurvivalMode: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredCategories = SURVIVAL_PHRASES.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.korean.includes(searchQuery) ||
      item.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pronunciation.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => selectedCategory === 'All' || cat.category === selectedCategory);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold">Korean Survival Phrasebook</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">Instant situational Korean with audio pronunciation guides</p>
        </div>
        <SourceBadge type="official" text="Verified Expressions" />
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search phrases (e.g., 'document', 'ARC', 'hospital')..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-sm focus:outline-none focus:border-emerald-500 text-slate-100 placeholder-slate-500"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {['All', 'University & Administration', 'Immigration & ARC', 'Medical & Hospital'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800/40 text-slate-400 border border-slate-700/40 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Phrase Cards */}
      <div className="space-y-4">
        {filteredCategories.map((catGroup) => (
          catGroup.items.length > 0 && (
            <div key={catGroup.category} className="space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{catGroup.category}</h3>
              <div className="grid gap-3">
                {catGroup.items.map((phrase, idx) => (
                  <div key={idx} className="p-4 bg-slate-800/30 border border-slate-800 rounded-xl hover:border-slate-700 transition">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-lg font-bold text-emerald-300 tracking-wide">{phrase.korean}</div>
                        <div className="text-xs text-amber-300/80 font-mono mt-0.5">{phrase.pronunciation}</div>
                      </div>
                      <button
                        onClick={() => {
                          if ('speechSynthesis' in window) {
                            const utterance = new SpeechSynthesisUtterance(phrase.korean);
                            utterance.lang = 'ko-KR';
                            window.speechSynthesis.speak(utterance);
                          }
                        }}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                        title="Listen Pronunciation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-800/60 flex flex-col gap-1 text-xs">
                      <div className="font-medium text-slate-200">🇬🇧 {phrase.english}</div>
                      <div className="text-slate-400 flex items-center gap-1 mt-1">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{phrase.context}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};
