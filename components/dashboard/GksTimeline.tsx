import React from 'react';
import { GksStage } from '@/types';
import { Check, Circle } from 'lucide-react';

interface Props {
  currentStage: GksStage;
}

const STAGES: { id: GksStage; label: string }[] = [
  { id: 'winner', label: 'GKS Winner' },
  { id: 'documents', label: 'Documents' },
  { id: 'visa', label: 'Visa' },
  { id: 'flight', label: 'Flight' },
  { id: 'arrival', label: 'Arrival' },
  { id: 'language_program', label: 'Language' },
  { id: 'degree_program', label: 'University' },
  { id: 'internship', label: 'Internship' },
  { id: 'graduation', label: 'Graduation' },
];

export const GksTimeline: React.FC<Props> = ({ currentStage }) => {
  const currentIndex = STAGES.findIndex((s) => s.id === currentStage);
  const progressPercent = Math.round(((currentIndex + 1) / STAGES.length) * 100);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-100 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-100">GKS Journey Progress</h3>
          <p className="text-xs text-slate-400">Current Stage: <span className="text-emerald-400 font-semibold">{STAGES[currentIndex]?.label}</span></p>
        </div>
        <span className="text-xl font-extrabold text-emerald-400">{progressPercent}%</span>
      </div>

      <div className="relative flex items-center justify-between overflow-x-auto py-2">
        {STAGES.map((stage, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={stage.id} className="flex flex-col items-center min-w-[70px] relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition ${
                  isCompleted
                    ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                    : isCurrent
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 ring-4 ring-emerald-500/10'
                    : 'bg-slate-800 border-slate-700 text-slate-500'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
              </div>
              <span
                className={`text-[11px] mt-2 font-medium text-center whitespace-nowrap ${
                  isCurrent ? 'text-emerald-400 font-bold' : isCompleted ? 'text-slate-300' : 'text-slate-500'
                }`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
