import type { CharacterInfo, CharacterStage } from '@/types';

export const CHARACTERS: Record<CharacterStage, CharacterInfo> = {
  0: {
    stage: 0,
    name: 'ブレインエッグ',
    emoji: '🥚',
    description: '大切に育てると、きっと素敵な姿に…',
    unlockCondition: '初回登録時',
  },
  1: {
    stage: 1,
    name: 'ねむリス',
    emoji: '🐿️',
    description: 'まだ眠たそう。もう少し休みたい様子。',
    unlockCondition: '診断3回達成',
  },
  2: {
    stage: 2,
    name: 'すっきリス',
    emoji: '✨',
    description: '少しずつ元気になってきた！',
    unlockCondition: 'ミッション合計10個達成',
  },
  3: {
    stage: 3,
    name: '集中リス',
    emoji: '📘',
    description: '集中力バッチリ！何でもこなせる気分。',
    unlockCondition: '7日連続記録達成',
  },
  4: {
    stage: 4,
    name: 'ブレインリス',
    emoji: '🧠',
    description: '最高のコンディション！脳も体も絶好調！',
    unlockCondition: '30日継続＋ミッション100個達成',
  },
};

export const STAGE_EMOJIS: Record<CharacterStage, string> = {
  0: '🥚',
  1: '🐿️💤',
  2: '🐿️✨',
  3: '🐿️📘',
  4: '🧠🐿️👑',
};

export function getNextEvolutionCondition(stage: CharacterStage): string {
  const next = (stage + 1) as CharacterStage;
  if (next > 4) return 'すべて解放済み！';
  return CHARACTERS[next].unlockCondition;
}

export function getExpToNextLevel(level: number): number {
  return level * 100;
}

export function getLevelProgress(exp: number, level: number): number {
  const levelStart = (level - 1) * 100;
  const levelEnd = level * 100;
  return Math.min(100, Math.round(((exp - levelStart) / (levelEnd - levelStart)) * 100));
}

export function getExpInCurrentLevel(exp: number, level: number): number {
  return exp - (level - 1) * 100;
}
