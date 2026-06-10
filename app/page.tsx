'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Card from '@/components/Card';
import CharacterCard from '@/components/CharacterCard';
import MissionCard from '@/components/MissionCard';
import Footer from '@/components/Footer';
import ScoreCircle from '@/components/ScoreCircle';
import {
  loadUserData,
  saveUserData,
  getTodayString,
  generateTodayMissions,
  addExpAndLevel,
  determineCharacterStage,
  getUnlockedStages,
} from '@/lib/storage';
import type { UserData } from '@/types';

const ScoreChart = dynamic(() => import('@/components/ScoreChart'), { ssr: false });

export default function HomePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const data = loadUserData();
    const today = getTodayString();

    if (data.todayMissionsDate !== today || data.todayMissions.length === 0) {
      data.todayMissions = generateTodayMissions();
      data.todayMissionsDate = today;
    }

    if (data.lastDiagnosisDate !== today) {
      data.todayDiagnosisDone = false;
    }

    saveUserData(data);
    setUserData(data);
  }, []);

  const handleMissionComplete = (id: string) => {
    if (!userData) return;
    const updated = { ...userData };
    const mission = updated.todayMissions.find((m) => m.id === id);
    if (!mission || mission.completed) return;

    mission.completed = true;
    updated.totalMissionsCompleted += 1;

    let expGain = 20;
    const allDone = updated.todayMissions.every((m) => m.completed);
    if (allDone) expGain += 30;

    const { newExp, newLevel } = addExpAndLevel(updated, expGain);
    updated.exp = newExp;
    updated.level = newLevel;
    updated.characterStage = determineCharacterStage(updated);
    updated.unlockedStages = getUnlockedStages(updated);

    saveUserData(updated);
    setUserData({ ...updated });
  };

  if (!mounted || !userData) {
    return (
      <div className="page-container flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-5xl pop-in">🧠</div>
          <p className="text-sm text-gray-400 mt-3 fade-slide-up delay-300">読み込み中...</p>
        </div>
      </div>
    );
  }

  const today = getTodayString();
  const todayRecord = userData.diagnosisHistory.find((r) => r.date === today);
  const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const yesterdayRecord = userData.diagnosisHistory.find((r) => r.date === yesterdayStr);
  const todayMissionsDone = userData.todayMissions.filter((m) => m.completed).length;
  const isFirstTime = userData.diagnosisHistory.length === 0 && !userData.todayDiagnosisDone;

  const diff =
    todayRecord && yesterdayRecord ? todayRecord.score - yesterdayRecord.score : null;

  const levelBadgeColor: Record<string, string> = {
    良好: 'bg-green-100 text-green-700',
    軽度疲労: 'bg-blue-100 text-blue-700',
    中等度疲労: 'bg-orange-100 text-orange-700',
    重度疲労: 'bg-red-100 text-red-700',
  };

  return (
    <div className="page-container">
      {/* Header */}
      <header className="pt-6 pb-3 flex items-center justify-between fade-slide-up">
        <div>
          <h1 className="text-xl font-bold text-gray-800">🧠 脳コンディションAI</h1>
          <p className="text-xs text-gray-400 mt-0.5">{today.replace(/-/g, '/')}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/report"
            className="text-xs bg-white text-indigo-600 border border-indigo-100 px-3 py-1.5 rounded-full font-medium shadow-sm"
          >
            📊 レポート
          </Link>
          <Link
            href="/collection"
            className="text-xs bg-white text-purple-600 border border-purple-100 px-3 py-1.5 rounded-full font-medium shadow-sm"
          >
            📖 図鑑
          </Link>
        </div>
      </header>

      <div className="space-y-4 pb-4">

        {/* Welcome card for first-time users */}
        {isFirstTime && (
          <Card color="blue" className="card-enter">
            <div className="text-center py-2">
              <div className="text-4xl mb-2">👋</div>
              <h2 className="font-bold text-gray-800 mb-1">ようこそ！</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                毎日30秒の診断で<br />
                あなたの脳コンディションを見える化します。<br />
                キャラクターを育てながら、<br />
                少しずつ自分をケアしていきましょう 🌿
              </p>
            </div>
          </Card>
        )}

        {/* Today's Score Card */}
        <Card color="white" className="card-enter delay-100">
          <div className="flex items-center gap-4">
            <div className="relative">
              <ScoreCircle
                score={todayRecord ? todayRecord.score : 0}
                fatigueLevel={todayRecord ? todayRecord.fatigueLevel : '中等度疲労'}
                size="md"
              />
              {!todayRecord && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl opacity-40">？</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    todayRecord
                      ? levelBadgeColor[todayRecord.fatigueLevel]
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {todayRecord ? todayRecord.fatigueLevel : '未診断'}
                </span>
                {diff !== null && (
                  <span className={`text-xs font-medium ${diff >= 0 ? 'text-green-500' : 'text-red-400'}`}>
                    {diff >= 0 ? `▲${diff}` : `▼${Math.abs(diff)}`} 昨日比
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-700 font-medium mb-1">
                {todayRecord ? todayRecord.fatigueType : '今日はどんな調子？'}
              </p>
              {userData.streak > 1 && (
                <p className="text-xs text-orange-500 font-medium">🔥 {userData.streak}日連続記録中！</p>
              )}
              {userData.diagnosisCount > 0 && (
                <p className="text-xs text-gray-400">累計 {userData.diagnosisCount} 回診断</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            {!userData.todayDiagnosisDone ? (
              <Link
                href="/check"
                className="block w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 active:scale-95 text-white text-center py-3.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-indigo-200"
              >
                ✨ 今日の診断を始める（約30秒）
              </Link>
            ) : (
              <Link
                href="/result"
                className="block w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 active:scale-95 text-white text-center py-3.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-green-200"
              >
                📋 今日の結果を見る
              </Link>
            )}
          </div>
        </Card>

        {/* AI Comment */}
        {todayRecord?.aiComment && (
          <Card color="white" className="card-enter delay-200">
            <div className="flex gap-3">
              <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-lg">🤖</span>
              </div>
              <div>
                <p className="text-xs font-bold text-indigo-600 mb-1">AIコーチより</p>
                <p className="text-sm text-gray-700 leading-relaxed">{todayRecord.aiComment}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Character Card */}
        <div className="card-enter delay-200">
          <CharacterCard
            stage={userData.characterStage}
            level={userData.level}
            exp={userData.exp}
            todayMissionsDone={todayMissionsDone}
          />
        </div>

        {/* Missions */}
        <div className="card-enter delay-300">
          <MissionCard
            missions={userData.todayMissions}
            onComplete={handleMissionComplete}
          />
        </div>

        {/* Score Chart */}
        <Card color="white" className="card-enter delay-400">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-gray-700">📈 直近7日間のスコア</p>
            {userData.diagnosisHistory.length === 0 && (
              <span className="text-xs text-gray-400">診断後に表示</span>
            )}
          </div>
          <ScoreChart records={userData.diagnosisHistory} />
        </Card>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-3 card-enter delay-500">
          <Link href="/report" className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center hover:bg-indigo-50 transition-colors active:scale-95">
            <div className="text-2xl mb-1">📊</div>
            <p className="text-xs font-bold text-gray-700">週間レポート</p>
            <p className="text-xs text-gray-400 mt-0.5">7日間の記録</p>
          </Link>
          <Link href="/collection" className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center hover:bg-purple-50 transition-colors active:scale-95">
            <div className="text-2xl mb-1">📖</div>
            <p className="text-xs font-bold text-gray-700">キャラクター図鑑</p>
            <p className="text-xs text-gray-400 mt-0.5">進化を確認</p>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
