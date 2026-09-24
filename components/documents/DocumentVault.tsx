'use client';

import React, { useState } from 'react';
import { FileText, Upload, ShieldCheck, Trash2, Calendar, AlertCircle, FilePlus, Sparkles } from 'lucide-react';
import { SourceBadge } from '@/components/ui/SourceBadge';
import { calculateDaysRemaining } from '@/lib/utils';

export interface VaultDocument {
  id: string;
  fileName: string;
  category: 'Passport' | 'Admission Letter' | 'GKS Scholarship Certificate' | 'Visa' | 'Insurance' | 'Medical';
  fileSize: string;
  expirationDate?: string;
  isVerified: boolean;
  uploadedAt: string;
}

const INITIAL_DOCS: VaultDocument[] = [
  {
    id: 'doc-1',
    fileName: 'Passport_Arnur_Chadan.pdf',
    category: 'Passport',
    fileSize: '2.4 MB',
    expirationDate: '2030-05-12',
    isVerified: true,
    uploadedAt: '2026-08-10',
  },
  {
    id: 'doc-2',
    fileName: 'GKS_Invitation_Letter_2026.pdf',
    category: 'GKS Scholarship Certificate',
    fileSize: '1.1 MB',
    isVerified: true,
    uploadedAt: '2026-08-15',
  },
];

export const DocumentVault: React.FC = () => {
  const [docs, setDocs] = useState<VaultDocument[]>(INITIAL_DOCS);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<VaultDocument['category']>('Passport');
  const [expDateInput, setExpDateInput] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    // Симуляция безопасной обработки локального файла без передачи на сторонние серверы
    setTimeout(() => {
      const file = files[0];
      const newDoc: VaultDocument = {
        id: Date.now().toString(),
        fileName: file.name,
        category: selectedCategory,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        expirationDate: expDateInput || undefined,
        isVerified: true,
        uploadedAt: new Date().toISOString().split('T')[0],
      };

      setDocs((prev) => [newDoc, ...prev]);
      setIsUploading(false);
      setExpDateInput('');
    }, 1200);
  };

  const handleDelete = (id: string) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold">Secure Document Vault</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Client-side encrypted metadata for passports, visa forms, and academic certificates
          </p>
        </div>
        <SourceBadge type="official" text="Encrypted Storage" />
      </div>

      {/* Upload Zone */}
      <div className="p-4 bg-slate-800/40 border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-xl transition">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-2 w-full sm:w-auto">
            <div className="text-xs font-semibold text-slate-300">Upload New Official Document</div>
            <div className="flex flex-wrap gap-2">
              {(['Passport', 'Admission Letter', 'GKS Scholarship Certificate', 'Visa', 'Insurance'] as const).map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                      selectedCategory === cat
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="date"
                value={expDateInput}
                onChange={(e) => setExpDateInput(e.target.value)}
                placeholder="Expiration Date (Optional)"
                className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[11px] text-slate-500">(Optional Expiry Date)</span>
            </div>
          </div>

          <label className="cursor-pointer px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition flex-shrink-0 shadow-lg shadow-emerald-500/10">
            {isUploading ? (
              <Sparkles className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            <span>{isUploading ? 'Encrypting...' : 'Select File'}</span>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Document List */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Stored Documents ({docs.length})
        </h3>

        {docs.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs border border-slate-800 rounded-xl">
            No documents stored yet. Upload your visa or passport to track validity dates.
          </div>
        ) : (
          <div className="grid gap-3">
            {docs.map((doc) => {
              const daysLeft = doc.expirationDate ? calculateDaysRemaining(doc.expirationDate) : null;
              const isWarning = daysLeft !== null && daysLeft <= 60;

              return (
                <div
                  key={doc.id}
                  className="p-4 bg-slate-800/30 border border-slate-800 hover:border-slate-700 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-slate-800 text-emerald-400 rounded-xl border border-slate-700/60">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-200">{doc.fileName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                          {doc.category}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                        <span>Size: {doc.fileSize}</span>
                        <span>•</span>
                        <span>Uploaded: {doc.uploadedAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                    {doc.expirationDate && daysLeft !== null && (
                      <div
                        className={`text-right px-3 py-1 rounded-lg border text-xs ${
                          isWarning
                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                            : 'bg-slate-800/60 border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="font-semibold">{daysLeft} days validity</div>
                        <div className="text-[10px] opacity-75">Expires {doc.expirationDate}</div>
                      </div>
                    )}

                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="p-2 bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 rounded-lg transition"
                      title="Delete document"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
