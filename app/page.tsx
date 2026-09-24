'use client';

import React, { useState } from 'react';
import { UserProfile } from '@/types';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { GksTimeline } from '@/components/dashboard/GksTimeline';
import { FinanceWidget } from '@/components/dashboard/FinanceWidget';
import { ArcExpirationWidget } from '@/components/dashboard/ArcExpirationWidget';
import { SourceBadge } from '@/components/ui/SourceBadge';

export default function Home() {
  const [profile, setProfile] = useState<Partial<UserProfile> | null>(null);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-black text-emerald-400">GKS Campus Bridge</h1>
            <p className="text-xs text-slate-400">Your bridge from GKS to life in Korea</p>
          </div>
          <SourceBadge type="official" text="GKS Official Partner" />
        </header>

        {/* Если Onboarding не пройден — показываем его */}
        {!profile ? (
          <OnboardingFlow onComplete={(data) => setProfile(data)} />
        ) : (
          /* Если Onboarding пройден — показываем Dashboard */
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <div>
                <h2 className="text-lg font-bold">Welcome, Student!</h2>
                <p className="text-xs text-slate-400">
                  {profile.universityName} • {profile.degreeLevel} in {profile.major}
                </p>
              </div>
              <button
                onClick={() => setProfile(null)}
                className="text-xs text-slate-400 hover:text-rose-400 transition"
              >
                Reset Setup
              </button>
            </div>

            {/* ARC Expiration Widget (рассчитывает дни) */}
            <ArcExpirationWidget expirationDate="2026-11-05" />

            {/* Timeline */}
            <GksTimeline currentStage={profile.stage || 'winner'} />

            {/* Finance Widget */}
            <FinanceWidget
              monthlyAllowance={1000000}
              housingExpense={350000}
              otherExpenses={200000}
              nextPayoutDate="2026-10-25"
            />
          </div>
        )}
      </div>
    </main>
  );
}
