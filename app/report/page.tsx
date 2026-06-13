'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Card from '@/components/Card';
import Footer from '@/components/Footer';
import { loadUserData } from '@/lib/storage';
import type { DiagnosisRecord } from '@/types';

const ScoreChart = dynamic(() => import('@/components/ScoreChart'), { ssr: false });

export default function ReportPage() {
  const router = useRouter();
  const [history, setHistory] = useState<DiagnosisRecord[]>([]);
  const [totalExp, setTotalExp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const data = loadUserData();
    setHistory(data.diagnosisHistory.slice(-7));
    setTotalExp(data.exp);
    setStreak(data.streak);
  }, []);

  if (!mounted) return null;

  const scores = history.map((r) => r.score);
  const avg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const max = scores.length > 0 ? Math.max(...scores) : 0;
  const min = scores.length > 0 ? Math.min(...scores) : 0;

  const typeCount: Record<string, number> = {};
  history.forEach((r) => { typeCount[r.fatigueType] = (typeCount[r.fatigueType] ?? 0) + 1; });
  const worstType = Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'なし';

  const improving = scores.length >= 2 && scores[scores.length - 1] > scores[scores.length - 2];

  const scoreColor = (s: number) =>
    s >= 80 ? 'text-green-600' : s >= 60 ? 'text-blue-600' : s >= 40 ? 'text-orange-500' : 'text-red-500';

  const weeklyComment =
    avg >= 80
      ? `今週は平均${avg}点と絶好調！この調子でセルフケアを続けましょう。`
      : avg >= 60
      ? `今週の平均は${avg}点。概ね安定していますが、${worstType}に注意が必要です。`
      : avg >= 40
      ? `今週の平均は${avg}点。${worstType}が課題です。意識的に休憩を取りましょう。`
      : `今週は疲れが溜まっています。まず睡眠と休養を最優先にしてください。`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="page-container">
        <header className="pt-6 pb-4 fade-slide-up">
          <h1 className="text-xl font-bold text-gray-800">📊 週間レポート</h1>
          <p className="text-xs text-gray-400 mt-1">直近7日間の記録</p>
        </header>

        <div className="space-y-4 pb-24">

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-2 card-enter">
            {[
              { label: '平均', value: avg, suffix: '点' },
              { label: '最高', value: max, suffix: '点' },
              { label: '最低', value: min, suffix: '点' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-3 text-center shadow-sm border border-gray-100">
                <p className={`text-xl font-bold ${scoreColor(s.value)}`}>{s.value}{s.suffix}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.label}スコア</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <Card color="white" className="card-enter delay-100">
            <p className="text-sm font-bold text-gray-700 mb-3">📈 スコア推移</p>
            <ScoreChart records={history} />
          </Card>

          {/* Analysis */}
          <Card color="orange" className="card-enter delay-200">
            <p className="text-sm font-bold text-orange-700 mb-3">🔍 週間分析</p>
            {history.length === 0 ? (
              <p className="text-sm text-gray-500">診断を行うと分析が表示されます</p>
            ) : (
              <div className="space-y-2.5">
                <div className="flex items-start gap-2 bg-white rounded-xl px-3 py-2">
                  <span>📌</span>
                  <p className="text-sm text-gray-700">
                    最多疲労タイプ：<span className="font-bold text-orange-700">{worstType}</span>
                  </p>
                </div>
                <div className={`flex items-start gap-2 rounded-xl px-3 py-2 ${improving ? 'bg-green-50' : 'bg-red-50'}`}>
                  <span>{improving ? '📈' : '📉'}</span>
                  <p className={`text-sm font-medium ${improving ? 'text-green-700' : 'text-gray-600'}`}>
                    {improving
                      ? '直近のスコアが改善傾向です！この調子で！'
                      : 'スコアが下がっています。休養を優先しましょう。'}
                  </p>
                </div>
                {streak > 0 && (
                  <div className="flex items-start gap-2 bg-orange-50 rounded-xl px-3 py-2">
                    <span>🔥</span>
                    <p className="text-sm text-orange-700 font-medium">{streak}日連続記録中！</p>
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* AI Weekly comment */}
          {history.length > 0 && (
            <Card color="white" className="card-enter delay-300">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-indigo-600 mb-1">週間AIコメント</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{weeklyComment}</p>
                </div>
              </div>
            </Card>
          )}

          {/* History list */}
          {history.length > 0 && (
            <Card color="white" className="card-enter delay-400">
              <p className="text-sm font-bold text-gray-700 mb-3">📅 記録一覧</p>
              <div className="space-y-0">
                {[...history].reverse().map((r, i) => (
                  <div
                    key={r.date}
                    className={`flex items-center justify-between py-3 ${
                      i < history.length - 1 ? 'border-b border-gray-50' : ''
                    }`}
                  >
                    <div>
                      <p className="text-xs font-medium text-gray-600">{r.date.replace(/-/g, '/')}</p>
                      <p className="text-xs text-gray-400">{r.fatigueType}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${scoreColor(r.score)}`}>{r.score}点</p>
                      <p className="text-xs text-gray-400">{r.fatigueLevel}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Premium upgrade card */}
          <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-5 text-white shadow-lg card-enter delay-500 overflow-hidden">
            <div className="absolute top-0 right-0 text-6xl opacity-10 -mt-2 -mr-2">✨</div>
            <div className="relative">
              <p className="font-bold text-lg mb-1">✨ プレミアムプラン</p>
              <p className="text-sm text-indigo-100 mb-4">さらに詳しい分析とキャラクター育成が解放されます</p>
              <div className="grid grid-cols-2 gap-1.5 mb-4">
                {[
                  '🤖 AIコーチ（詳細版）',
                  '📊 月間レポート',
                  '🐿️ キャラクター全段階',
                  '📖 脳疲労改善図鑑',
                  '📈 詳細分析グラフ',
                  '🔥 連続記録特典',
                ].map((item) => (
                  <div key={item} className="text-xs text-indigo-100 flex items-center gap-1">
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold">¥100</span>
                  <span className="text-sm text-indigo-200"> / 月</span>
                </div>
                <Link
                  href="/premium"
                  className="bg-white text-indigo-600 px-5 py-2 rounded-xl text-sm font-bold active:scale-95 transition-all shadow-sm"
                >
                  購入する
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
