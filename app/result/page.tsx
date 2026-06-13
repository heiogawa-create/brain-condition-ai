'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import BreakdownBar from '@/components/BreakdownBar';
import Footer from '@/components/Footer';
import {
  loadUserData,
  saveUserData,
  getTodayString,
  addExpAndLevel,
  checkAndUpdateStreak,
  determineCharacterStage,
  getUnlockedStages,
} from '@/lib/storage';
import {
  calculateScore,
  getFatigueLevel,
  getFatigueType,
  getBreakdown,
  getImprovementActions,
} from '@/lib/score';
import type { DiagnosisRecord, FatigueLevel, UserData } from '@/types';

const LEVEL_STYLE: Record<FatigueLevel, { badge: string; ring: string; label: string; bg: string; emoji: string }> = {
  良好:     { badge: 'bg-green-100 text-green-700 border-green-200',   ring: '#22c55e', label: 'text-green-600',  bg: 'from-green-50 to-teal-50',   emoji: '🌟' },
  軽度疲労: { badge: 'bg-blue-100 text-blue-700 border-blue-200',     ring: '#60a5fa', label: 'text-blue-600',   bg: 'from-blue-50 to-indigo-50',  emoji: '😌' },
  中等度疲労:{ badge: 'bg-orange-100 text-orange-700 border-orange-200', ring: '#fb923c', label: 'text-orange-600', bg: 'from-orange-50 to-amber-50',  emoji: '😓' },
  重度疲労: { badge: 'bg-red-100 text-red-700 border-red-200',        ring: '#f87171', label: 'text-red-600',    bg: 'from-red-50 to-pink-50',     emoji: '😵' },
};

const RESULT_CHARACTER: Record<FatigueLevel, { emoji: string; message: string }> = {
  良好:     { emoji: '🐿️✨', message: '今日も絶好調だね！この調子で過ごしていこう♪' },
  軽度疲労: { emoji: '🐿️😌', message: '少しお疲れみたい。無理せずペースを保ってね。' },
  中等度疲労:{ emoji: '🐿️💦', message: '疲れがたまってきてるよ。今日は労ってあげて。' },
  重度疲労: { emoji: '🐿️😪', message: 'かなり疲れてるみたい…しっかり休息をとってね。' },
};

function ScoreGauge({ score, fatigueLevel }: { score: number; fatigueLevel: FatigueLevel }) {
  const [displayScore, setDisplayScore] = useState(0);
  const style = LEVEL_STYLE[fatigueLevel];

  useEffect(() => {
    let s = 0;
    const timer = setInterval(() => {
      s += 2;
      if (s >= score) { setDisplayScore(score); clearInterval(timer); }
      else setDisplayScore(s);
    }, 20);
    return () => clearInterval(timer);
  }, [score]);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (displayScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center py-4">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="12" />
          <circle
            cx="80" cy="80" r={radius} fill="none"
            stroke={style.ring} strokeWidth="12"
            strokeDasharray={`${strokeDash} ${circumference}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.1s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl">{style.emoji}</span>
          <span className={`text-3xl font-bold ${style.label}`}>{displayScore}</span>
          <span className="text-xs text-gray-400">/ 100</span>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <span className={`text-sm px-3 py-1 rounded-full font-bold border ${style.badge}`}>
          {fatigueLevel}
        </span>
      </div>
    </div>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const [record, setRecord] = useState<DiagnosisRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [expGained, setExpGained] = useState(0);
  const [levelUp, setLevelUp] = useState(false);
  const [newStreakBonus, setNewStreakBonus] = useState(0);
  const fetchedRef = useRef(false);

  useEffect(() => {
    const data = loadUserData();
    const today = getTodayString();
    const existing = data.diagnosisHistory.find((r) => r.date === today);

    if (existing) {
      setRecord(existing);
      setSaved(true);
      setLoading(false);
      return;
    }

    const answers = data.currentAnswers;
    if (!answers || answers.length < 10 || answers.every((a) => a === 0)) {
      router.push('/check');
      return;
    }

    const score = calculateScore(answers);
    const fatigueLevel = getFatigueLevel(score);
    const fatigueType = getFatigueType(answers);
    const breakdown = getBreakdown(answers);
    const actions = getImprovementActions(fatigueType, score);

    const newRecord: DiagnosisRecord = {
      date: today,
      score,
      fatigueLevel,
      fatigueType,
      breakdown,
      answers,
      aiComment: '',
      actions,
    };

    setRecord(newRecord);
    setLoading(false);

    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const recentScores = data.diagnosisHistory.slice(-7).map((r) => r.score);
    fetch('/api/coach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score, fatigueType, breakdown, recentScores, answers }),
    })
      .then((r) => r.json())
      .then((d) => {
        newRecord.aiComment = d.comment ?? '';
        setRecord({ ...newRecord });
      })
      .catch(() => {});
  }, [router]);

  const handleSave = () => {
    if (!record || saved) return;
    const data = loadUserData();
    const today = getTodayString();

    const newStreak = checkAndUpdateStreak(data, today);
    let expGain = 50;
    let streakBonus = 0;

    if (newStreak === 7)  { expGain += 100; streakBonus = 100; }
    if (newStreak === 30) { expGain += 500; streakBonus = 500; }

    const { newExp, newLevel, levelUp: lu } = addExpAndLevel(data, expGain);

    const updatedData: UserData = {
      ...data,
      diagnosisHistory: [
        ...data.diagnosisHistory.filter((r) => r.date !== today),
        record,
      ],
      currentAnswers: [],
      exp: newExp,
      level: newLevel,
      diagnosisCount: data.diagnosisCount + 1,
      streak: newStreak,
      lastDiagnosisDate: today,
      todayDiagnosisDone: true,
    };
    updatedData.characterStage = determineCharacterStage(updatedData);
    updatedData.unlockedStages = getUnlockedStages(updatedData);

    saveUserData(updatedData);
    setSaved(true);
    setExpGained(expGain);
    setLevelUp(lu);
    setNewStreakBonus(streakBonus);
  };

  if (loading) {
    return (
      <div className="page-container flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-5xl pop-in">🧠</div>
          <p className="text-sm text-gray-400 mt-3">結果を計算中...</p>
        </div>
      </div>
    );
  }

  if (!record) return null;

  const style = LEVEL_STYLE[record.fatigueLevel];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${style.bg}`}>
      <div className="page-container">
        <header className="pt-6 pb-4 fade-slide-up">
          <h1 className="text-xl font-bold text-gray-800">📋 診断結果</h1>
          <p className="text-xs text-gray-400 mt-1">{record.date.replace(/-/g, '/')}</p>
        </header>

        <div className="space-y-4 pb-4">

          {/* Score Gauge */}
          <div className="bg-white rounded-3xl shadow-sm p-4 card-enter">
            <ScoreGauge score={record.score} fatigueLevel={record.fatigueLevel} />
            <div className="text-center mt-1">
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {record.fatigueType}
              </span>
            </div>
          </div>

          {/* Character reaction */}
          <Card color="white" className="card-enter delay-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-2xl shrink-0">
                {RESULT_CHARACTER[record.fatigueLevel].emoji}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed flex-1">
                {RESULT_CHARACTER[record.fatigueLevel].message}
              </p>
            </div>
          </Card>

          {/* Breakdown */}
          <Card color="white" className="card-enter delay-100">
            <p className="text-sm font-bold text-gray-700 mb-3">📊 疲労の原因割合</p>
            <BreakdownBar breakdown={record.breakdown} />
          </Card>

          {/* AI Comment */}
          <Card color="white" className="card-enter delay-200">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-xl">🤖</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-indigo-600 mb-1">AIコーチより</p>
                {record.aiComment ? (
                  <p className="text-sm text-gray-700 leading-relaxed">{record.aiComment}</p>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce delay-200" />
                    <span className="text-xs text-gray-400 ml-1">コメント生成中...</span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Actions */}
          <Card color="green" className="card-enter delay-300">
            <p className="text-sm font-bold text-green-700 mb-3">✅ 今日やるべきこと</p>
            <div className="space-y-2">
              {record.actions.map((action, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl px-3 py-2.5">
                  <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-700">{action}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* EXP notification after save */}
          {saved && expGained > 0 && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-4 text-center card-enter">
              <p className="text-2xl mb-1">🎉</p>
              <p className="font-bold text-yellow-700">+{expGained} EXP 獲得！</p>
              {levelUp && <p className="text-sm text-orange-600 font-bold mt-1">⬆️ レベルアップ！</p>}
              {newStreakBonus > 0 && (
                <p className="text-xs text-orange-500 mt-1">🔥 連続記録ボーナス +{newStreakBonus} EXP</p>
              )}
            </div>
          )}

          {/* Save / Home buttons */}
          <div className="space-y-3 card-enter delay-400">
            {!saved ? (
              <button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 active:scale-95 text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-200"
              >
                💾 保存して EXP を獲得する (+50 EXP)
              </button>
            ) : (
              <div className="w-full bg-green-50 border-2 border-green-200 text-green-700 py-3 rounded-2xl text-center text-sm font-bold">
                ✅ 保存済み
              </div>
            )}

            <button
              onClick={() => router.push('/')}
              className="w-full bg-white border border-gray-200 text-gray-600 py-3 rounded-2xl font-medium text-sm hover:bg-gray-50 active:scale-95 transition-all"
            >
              🏠 ホームへ戻る
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center leading-relaxed px-4 py-2">
            本サービスは医療診断を目的としたものではありません。<br />
            体調不良が続く場合は医療機関にご相談ください。
          </p>
        </div>

        <Footer />
      </div>
    </div>
  );
}
