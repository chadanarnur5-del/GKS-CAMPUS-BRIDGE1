import React from 'react';
import { calculateDaysRemaining } from '@/lib/utils';
import { AlertTriangle, Clock } from 'lucide-react';

interface Props {
  expirationDate: string; // ISO String format YYYY-MM-DD
}

export const ArcExpirationWidget: React.FC<Props> = ({ expirationDate }) => {
  const daysLeft = calculateDaysRemaining(expirationDate);
  const isUrgent = daysLeft <= 45;

  return (
    <div
      className={`p-4 rounded-xl border backdrop-blur-md transition-all ${
        isUrgent
          ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
          : 'bg-slate-900/50 border-slate-800 text-slate-200'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${
              isUrgent ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {isUrgent ? <AlertTriangle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Immigration Status
            </div>
            <div className="text-sm font-medium mt-0.5">
              ARC / Residence Expiration
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className={`text-2xl font-bold ${isUrgent ? 'text-rose-400 animate-pulse' : 'text-slate-100'}`}>
            {daysLeft} <span className="text-sm font-normal text-slate-400">days left</span>
          </div>
          <div className="text-xs text-slate-400 mt-0.5">Expires: {expirationDate}</div>
        </div>
      </div>
    </div>
  );
};
