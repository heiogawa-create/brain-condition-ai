export interface DiagnosisAnswer {
  questionIndex: number;
  score: number;
}

export interface FatigueBreakdown {
  sleep: number;
  stress: number;
  smartphone: number;
  exercise: number;
  physical: number;
}

export type FatigueLevel = '良好' | '軽度疲労' | '中等度疲労' | '重度疲労';
export type FatigueType =
  | '睡眠不足型'
  | '情報過多型'
  | 'ストレス蓄積型'
  | '運動不足型'
  | '回復不足型';

export interface DiagnosisRecord {
  date: string;
  score: number;
  fatigueLevel: FatigueLevel;
  fatigueType: FatigueType;
  breakdown: FatigueBreakdown;
  answers: number[];
  aiComment: string;
  actions: string[];
}

export type CharacterStage = 0 | 1 | 2 | 3 | 4;

export interface CharacterInfo {
  stage: number;
  name: string;
  emoji: string;
  description: string;
  unlockCondition: string;
}

export interface MissionItem {

export interface MissionItem {
  id: string;
  text: string;
  completed: boolean;
  isNight?: boolean;
}

export interface UserData {
  diagnosisHistory: DiagnosisRecord[];
  currentAnswers: number[];
  exp: number;
  level: number;
  diagnosisCount: number;
  totalMissionsCompleted: number;
  nightMissionsCompleted: number;
  todayMissions: MissionItem[];
  todayMissionsDate: string;
  streak: number;
  lastDiagnosisDate: string;
  characterStage: CharacterStage;
  unlockedStages: CharacterStage[];
  unlockedCharacterIds: number[];
  todayDiagnosisDone: boolean;
}
