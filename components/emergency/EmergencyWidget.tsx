'use client';

import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, Hospital, Building, AlertTriangle, ExternalLink } from 'lucide-react';

const EMERGENCY_CONTACTS = [
  { name: 'Police Department', number: '112', icon: ShieldAlert, desc: 'Crime, safety, and urgent emergencies' },
  { name: 'Fire & Ambulance', number: '119', icon: Hospital, desc: 'Medical emergencies and fire accidents' },
  { name: 'Immigration Helpline', number: '1345', icon: Building, desc: 'Multi-language immigration assistance' },
  { name: 'Foreigner Medical Referral', number: '1339', icon: PhoneCall, desc: '24/7 Medical advice for foreigners' }
];

export const EmergencyWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-rose-950/20 border border-rose-500/40 rounded-2xl p-5 text-slate-100 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30 animate-pulse">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-rose-200">Korea Emergency Hotline</h3>
            <p className="text-xs text-rose-300/70">Verified official contacts in South Korea</p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-slate-950 font-extrabold text-xs rounded-xl transition shadow-lg shadow-rose-500/20"
        >
          {isOpen ? 'Close Hotline' : '🚨 EMERGENCY'}
        </button>
      </div>

      {isOpen && (
        <div className="mt-5 pt-4 border-t border-rose-500/30 grid sm:grid-cols-2 gap-3">
          {EMERGENCY_CONTACTS.map((contact) => {
            const Icon = contact.icon;
            return (
              <a
                key={contact.number}
                href={`tel:${contact.number}`}
                className="p-3 bg-slate-900/80 border border-rose-500/30 hover:border-rose-400 rounded-xl flex items-center justify-between group transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-100">{contact.name}</div>
                    <div className="text-[11px] text-slate-400">{contact.desc}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-rose-400 group-hover:underline flex items-center gap-1">
                    {contact.number} <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};
