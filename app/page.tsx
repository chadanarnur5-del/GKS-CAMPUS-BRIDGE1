'use client';

import React, { useState } from 'react';
import { UserProfile } from '@/types';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { GksTimeline } from '@/components/dashboard/GksTimeline';
import { FinanceWidget } from '@/components/dashboard/FinanceWidget';
import { ArcExpirationWidget } from '@/components/dashboard/ArcExpirationWidget';
import { SourceBadge } from '@/components/ui/SourceBadge';
import { GksAiAssistant } from '@/components/ai/GksAiAssistant';
import { KoreanSurvivalMode } from '@/components/korean/KoreanSurvivalMode';
import { EmergencyWidget } from '@/components/emergency/EmergencyWidget';

export default function Home() {
  const [profile, setProfile] = useState<Partial<UserProfile> | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'ai' | 'korean'>('dashboard');

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
          <div>
            <h1 className="text-2xl font-black text-emerald-400">GKS Campus Bridge</h1>
            <p className="text-xs text-slate-400">Your bridge from GKS to life in Korea</p>
          </div>
          <SourceBadge type="official" text="GKS Official Partner" />
        </header>

        {/* Emergency Always Accessible */}
        <EmergencyWidget />

        {!profile ? (
          <OnboardingFlow onComplete={(data) => setProfile(data)} />
        ) : (
          <div className="space-y-6">
            {/* User Navigation Bar */}
            <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-2 rounded-xl overflow-x-auto">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                    activeTab === 'dashboard' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                    activeTab === 'ai' ? 'bg-purple-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  AI Assistant
                </button>
                <button
                  onClick={() => setActiveTab('korean')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                    activeTab === 'korean' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Korean Helper
                </button>
              </div>

              <button
                onClick={() => setProfile(null)}
                className="text-xs text-slate-400 hover:text-rose-400 transition px-3"
              >
                Reset
              </button>
            </div>

            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <ArcExpirationWidget expirationDate="2026-11-05" />
                <GksTimeline currentStage={profile.stage || 'winner'} />
                <FinanceWidget
                  monthlyAllowance={1000000}
                  housingExpense={350000}
                  otherExpenses={200000}
                  nextPayoutDate="2026-10-25"
                />
              </div>
            )}

            {activeTab === 'ai' && <GksAiAssistant userProfile={profile} />}

            {activeTab === 'korean' && <KoreanSurvivalMode />}
          </div>
        )}
      </div>
    </main>
  );
}
