import type { UserData, MissionItem } from '@/types';

const STORAGE_KEY = 'brain_condition_user_data';

export const MISSIONS_POOL = [
  '水を500ml飲む',
  '5分散歩する',
  '深呼吸を20回する',
  '首肩ストレッチをする',
  '30分スマホを休む',
  '朝日を浴びる',
  '就寝1時間前にスマホを置く',
  '目を1分休める',
  '軽く背伸びをする',
  '夕方に外を見る',
  '好きな音楽を1曲聴く',
  '10分間読書をする',
  '温かい飲み物を飲む',
  '5分間目をつむる',
  '今日のよかったことを3つ思い浮かべる',
];

const DEFAULT_USER_DATA: UserData = {
  diagnosisHistory: [],
  currentAnswers: [],
  exp: 0,
  level: 1,
  diagnosisCount: 0,
  totalMissionsCompleted: 0,
  todayMissions: [],
  todayMissionsDate: '',
  streak: 0,
  lastDiagnosisDate: '',
  characterStage: 0,
  unlockedStages: [0],
  todayDiagnosisDone: false,
};

export function loadUserData(): UserData {
  if (typeof window === 'undefined') return DEFAULT_USER_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_USER_DATA;
    return { ...DEFAULT_USER_DATA, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_USER_DATA;
  }
}

export function saveUserData(data: UserData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function generateTodayMissions(): MissionItem[] {
  const shuffled = [...MISSIONS_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map((text, i) => ({
    id: `mission_${i}`,
    text,
    completed: false,
  }));
}

export function addExpAndLevel(
  data: UserData,
  expGain: number
): { newExp: number; newLevel: number; levelUp: boolean } {
  const EXP_PER_LEVEL = 100;
  const newExp = data.exp + expGain;
  const newLevel = Math.floor(newExp / EXP_PER_LEVEL) + 1;
  const levelUp = newLevel > data.level;
  return { newExp, newLevel, levelUp };
}

export function checkAndUpdateStreak(data: UserData, today: string): number {
  if (!data.lastDiagnosisDate) return 1;
  const last = new Date(data.lastDiagnosisDate);
  const todayDate = new Date(today);
  const diff = Math.floor(
    (todayDate.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diff === 1) return data.streak + 1;
  if (diff === 0) return data.streak;
  return 1;
}

export function determineCharacterStage(data: UserData): UserData['characterStage'] {
  const { diagnosisCount, totalMissionsCompleted, streak } = data;
  if (diagnosisCount >= 1 && streak >= 30 && totalMissionsCompleted >= 100) return 4;
  if (diagnosisCount >= 1 && streak >= 7) return 3;
  if (totalMissionsCompleted >= 10) return 2;
  if (diagnosisCount >= 3) return 1;
  return 0;
}

export function getUnlockedStages(data: UserData): UserData['characterStage'][] {
  const stage = determineCharacterStage(data);
  const stages: UserData['characterStage'][] = [0];
  for (let s = 1; s <= stage; s++) {
    stages.push(s as UserData['characterStage']);
  }
  return stages;
}
