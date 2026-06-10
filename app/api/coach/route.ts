import { NextRequest, NextResponse } from 'next/server';
import type { FatigueBreakdown, FatigueType } from '@/types';

const FALLBACK_COMMENTS: Record<string, string> = {
  良好: '今日の脳コンディションはとても良好です！この調子を維持するために、今夜も質の良い睡眠を心がけましょう。水分補給と軽いストレッチも忘れずに。あなたの努力が実を結んでいます！',
  軽度疲労:
    '少し疲れのサインが出ています。今日は無理をせず、短い休憩を意識的に取り入れてみてください。深呼吸やストレッチで気分転換するだけで、脳がリフレッシュされますよ。',
  中等度疲労:
    '脳が疲れているサインです。頑張りすぎていませんか？今日は「休むことも仕事」と思って、意識的にオフタイムを作りましょう。早めに就寝することが一番の回復法です。',
  重度疲労:
    '脳がかなり疲弊しています。まず「自分を大切にすること」を優先しましょう。今日は最低限のことだけこなして、あとは休養に専念してください。あなたの回復を応援しています。',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      score,
      fatigueType,
      breakdown,
      recentScores,
      answers,
    }: {
      score: number;
      fatigueType: FatigueType;
      breakdown: FatigueBreakdown;
      recentScores: number[];
      answers: number[];
    } = body;

    const apiKey = process.env.CLAUDE_API_KEY;
    if (!apiKey) {
      const level =
        score >= 80
          ? '良好'
          : score >= 60
          ? '軽度疲労'
          : score >= 40
          ? '中等度疲労'
          : '重度疲労';
      return NextResponse.json({ comment: FALLBACK_COMMENTS[level] });
    }

    const prompt = `あなたは脳コンディション専門のAIコーチです。以下のデータを元に、ユーザーへの優しいアドバイスを100〜200文字で日本語で生成してください。

今日のスコア: ${score}/100
疲労タイプ: ${fatigueType}
原因割合: 睡眠${breakdown.sleep}% ストレス${breakdown.stress}% スマホ疲れ${breakdown.smartphone}% 運動不足${breakdown.exercise}% 身体疲労${breakdown.physical}%
直近7日間のスコア推移: ${recentScores.join(', ')}
今日の回答: ${answers.join(', ')}

以下の要素を含めてください：
- 今日の状態の要約
- 原因の推測
- 今日やるべき具体的な行動1つ
- 優しい励まし

医療診断ではなく、日常的なセルフケアの観点でアドバイスしてください。`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const level =
        score >= 80
          ? '良好'
          : score >= 60
          ? '軽度疲労'
          : score >= 40
          ? '中等度疲労'
          : '重度疲労';
      return NextResponse.json({ comment: FALLBACK_COMMENTS[level] });
    }

    const data = await response.json();
    const comment =
      data.content?.[0]?.text ?? FALLBACK_COMMENTS['中等度疲労'];

    return NextResponse.json({ comment });
  } catch {
    return NextResponse.json({
      comment:
        '今日も一日お疲れ様でした。脳に優しい休息を取ることが大切です。早めに就寝して、明日への英気を養いましょう。',
    });
  }
}
