import type { UserData, MissionItem } from '@/types';

const STORAGE_KEY = 'brain_condition_user_data';

export const MISSIONS_POOL = [
  { text: '水を500ml飲む', isNight: false },
  { text: '5分散歩する', isNight: false },
  { text: '深呼吸を20回する', isNight: false },
  { text: '首肩ストレッチをする', isNight: false },
  { text: '30分スマホを休む', isNight: false },
  { text: '朝日を浴びる', isNight: false },
  { text: '目を1分休める', isNight: false },
  { text: '軽く背伸びをする', isNight: false },
  { text: '夕方に外を見る', isNight: false },
  { text: '好きな音楽を1曲聴く', isNight: false },
  { text: '10分間読書をする', isNight: false },
  { text: '温かい飲み物を飲む', isNight: false },
  { text: '5分間目をつむる', isNight: false },
  { text: '今日のよかったことを3つ思い浮かべる', isNight: false },
  { text: '就寝1時間前にスマホを置く', isNight: true },
  { text: '寝る前に軽くストレッチをする', isNight: true },
  { text: '部屋を暗くして静かにする', isNight: true },
  { text: '明日の準備を今日のうちにする', isNight: true },
  { text: '寝る前に日記を書く', isNight: true },
];

const DEFAULT_USER_DATA: UserData = {
  diagnosisHistory: [],
  currentAnswers: [],
  exp: 0,
  level: 1,
  diagnosisCount: 0,
  totalMissionsCompleted: 0,
  nightMissionsCompleted: 0,
  todayMissions: [],
  todayMissionsDate: '',
  streak: 0,
  lastDiagnosisDate: '',
  characterStage: 0,
  unlockedStages: [0],
  unlockedCharacterIds: [0],
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
  } catch {}
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function generateTodayMissions(): MissionItem[] {
  const shuffled = [...MISSIONS_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map((m, i) => ({
    id: `mission_${i}`,
    text: m.text,
    isNight: m.isNight,
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

export function computeStats(data: UserData) {
  const history = data.diagnosisHistory;
  const recent7 = history.slice(-7);
  const weekAvgScore = recent7.length > 0
    ? Math.round(recent7.reduce((a, b) => a + b.score, 0) / recent7.length)
    : 0;

  return {
    diagnosisCount: data.diagnosisCount,
    totalMissionsCompleted: data.totalMissionsCompleted,
    nightMissionsCompleted: data.nightMissionsCompleted ?? 0,
    streak: data.streak,
    exp: data.exp,
    level: data.level,
    weekAvgScore,
    goodScoreCount: history.filter(r => r.score >= 80).length,
    highScoreCount75: history.filter(r => r.score >= 75).length,
    highScoreCount80: history.filter(r => r.score >= 80).length,
    highScoreCount85: history.filter(r => r.score >= 85).length,
    highScoreCount90: history.filter(r => r.score >= 90).length,
    highScoreCount95: history.filter(r => r.score >= 95).length,
    perfectScoreCount: history.filter(r => r.score >= 100).length,
    diagnosisHistory: history,
  };
}
