export type GksStage =
  | 'winner'
  | 'documents'
  | 'visa'
  | 'flight'
  | 'arrival'
  | 'language_program'
  | 'degree_program'
  | 'internship'
  | 'graduation';

export type VerificationBadge = 'official' | 'university' | 'student_experience' | 'ai_generated';

export type SupportedLanguage =
  | 'kr' | 'kz' | 'ru' | 'en' | 'cn' | 'jp'
  | 'es' | 'fr' | 'pt' | 'de' | 'in' | 'ar'
  | 'id' | 'vn' | 'tr' | 'bd';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  countryCode: string;
  gksYear: number;
  degreeLevel: 'Associate' | 'Bachelor' | 'Master' | 'R&D' | 'Doctoral';
  major: string;
  universityId: string;
  universityName: string;
  koreanLevel: 'TOPIK 0' | 'TOPIK 1' | 'TOPIK 2' | 'TOPIK 3' | 'TOPIK 4' | 'TOPIK 5' | 'TOPIK 6';
  preferredLanguage: SupportedLanguage;
  arrivalDate: string;
  dormitoryName?: string;
  stage: GksStage;
  monthlyStipendKrw: number;
}

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  category: 'Visa' | 'Documents' | 'Dormitory' | 'Bank' | 'SIM' | 'Health' | 'University';
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isCompleted: boolean;
  sourceType: VerificationBadge;
}

export interface FinanceSummary {
  monthlyAllowance: number;
  housingExpense: number;
  otherExpenses: number;
  nextPayoutDate: string;
  availableBalance: number;
}
