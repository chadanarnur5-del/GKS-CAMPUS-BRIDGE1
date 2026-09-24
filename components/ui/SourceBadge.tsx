import React from 'react';
import { VerificationBadge } from '@/types';
import { ShieldCheck, Building2, UserCheck, Sparkles } from 'lucide-react';

interface Props {
  type: VerificationBadge;
  text?: string;
}

export const SourceBadge: React.FC<Props> = ({ type, text }) => {
  const configs = {
    official: {
      label: text || 'Official Source',
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      icon: ShieldCheck,
    },
    university: {
      label: text || 'University Notice',
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      icon: Building2,
    },
    student_experience: {
      label: text || 'Student Experience',
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      icon: UserCheck,
    },
    ai_generated: {
      label: text || 'AI Guidance',
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      icon: Sparkles,
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{config.label}</span>
    </span>
  );
};
