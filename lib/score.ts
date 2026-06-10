import type {
  DiagnosisAnswer,
  FatigueBreakdown,
  FatigueLevel,
  FatigueType,
} from '@/types';

// Questions (index 0-9)
// 0: 昨夜ぐっすり眠れた (good)
// 1: 朝スッキリ起きられた (good)
// 2: 集中が切れやすかった (bad)
// 3: 物忘れ・ミスが増えた (bad)
// 4: イライラしやすかった (bad)
// 5: 首・肩・目の疲れを感じた (bad)
// 6: スマホやSNSを長時間見た (bad)
// 7: 軽い運動や散歩ができた (good)
// 8: 食事のリズムが整っていた (good)
// 9: 休んでも疲れが抜けにくかった (bad)

const GOOD_QUESTIONS = [0, 1, 7, 8];
const BAD_QUESTIONS = [2, 3, 4, 5, 6, 9];

export function calculateScore(answers: number[]): number {
  if (answers.length < 10) return 0;

  let total = 0;
  for (let i = 0; i < 10; i++) {
    const val = answers[i] ?? 3;
    if (GOOD_QUESTIONS.includes(i)) {
      total += val; // 1-5, higher = better
    } else {
      total += 6 - val; // reverse: 5 → 1, 1 → 5
    }
  }

  // total range: 10-50, map to 0-100
  return Math.round(((total - 10) / 40) * 100);
}

export function getFatigueLevel(score: number): FatigueLevel {
  if (score >= 80) return '良好';
  if (score >= 60) return '軽度疲労';
  if (score >= 40) return '中等度疲労';
  return '重度疲労';
}

export function getFatigueType(answers: number[]): FatigueType {
  if (answers.length < 10) return '回復不足型';

  const sleepScore = ((answers[0] + answers[1]) / 10) * 100;
  const stressScore = ((6 - answers[4] + (6 - answers[3])) / 10) * 100;
  const smartphoneScore = ((6 - answers[6]) / 5) * 100;
  const exerciseScore = (answers[7] / 5) * 100;
  const recoveryScore = ((answers[8] + (6 - answers[9])) / 10) * 100;

  const scores: [FatigueType, number][] = [
    ['睡眠不足型', 100 - sleepScore],
    ['ストレス蓄積型', 100 - stressScore],
    ['情報過多型', 100 - smartphoneScore],
    ['運動不足型', 100 - exerciseScore],
    ['回復不足型', 100 - recoveryScore],
  ];

  scores.sort((a, b) => b[1] - a[1]);
  return scores[0][0];
}

export function getBreakdown(answers: number[]): FatigueBreakdown {
  if (answers.length < 10) {
    return { sleep: 20, stress: 20, smartphone: 20, exercise: 20, physical: 20 };
  }

  const sleepRaw = (6 - answers[0] + (6 - answers[1]));
  const stressRaw = (6 - answers[4] + (6 - answers[3]));
  const smartphoneRaw = (6 - answers[6]);
  const exerciseRaw = (6 - answers[7]);
  const physicalRaw = (6 - answers[5] + (6 - answers[9]));

  const total = sleepRaw + stressRaw + smartphoneRaw + exerciseRaw + physicalRaw;
  if (total === 0) {
    return { sleep: 20, stress: 20, smartphone: 20, exercise: 20, physical: 20 };
  }

  return {
    sleep: Math.round((sleepRaw / total) * 100),
    stress: Math.round((stressRaw / total) * 100),
    smartphone: Math.round((smartphoneRaw / total) * 100),
    exercise: Math.round((exerciseRaw / total) * 100),
    physical: Math.round((physicalRaw / total) * 100),
  };
}

export function getImprovementActions(
  fatigueType: FatigueType,
  score: number
): string[] {
  const actions: Record<FatigueType, string[]> = {
    '睡眠不足型': [
      '今夜は23時までに就寝する',
      '寝る30分前はスマホを置く',
      '部屋を暗くして静かな環境を作る',
    ],
    '情報過多型': [
      'スマホを1時間オフにする',
      'SNSを見る時間を30分に制限する',
      '自然や遠くを見て目を休める',
    ],
    'ストレス蓄積型': [
      '深呼吸を10回ゆっくり行う',
      '好きな音楽を聴いてリラックス',
      '今日のよかったことを3つ思い出す',
    ],
    '運動不足型': [
      '5〜10分の軽い散歩をする',
      '首・肩を回してストレッチする',
      '外の空気を吸いに出かける',
    ],
    '回復不足型': [
      '今日は無理をしないと決める',
      '温かい飲み物でゆっくり休む',
      '好きなことを15分だけ楽しむ',
    ],
  };

  return actions[fatigueType] ?? actions['回復不足型'];
}

export const QUESTIONS = [
  '昨夜はぐっすり眠れた',
  '朝スッキリ起きられた',
  '作業中に集中が切れやすかった',
  '物忘れやミスが増えた',
  'イライラしやすかった',
  '首・肩・目の疲れを感じた',
  'スマホやSNSを長時間見た',
  '軽い運動や散歩ができた',
  '食事のリズムが整っていた',
  '休んでも疲れが抜けにくかった',
];

export const SCALE_LABELS: Record<number, string> = {
  1: 'まったく',
  2: 'あまり',
  3: 'まあまあ',
  4: 'かなり',
  5: 'とても',
};
