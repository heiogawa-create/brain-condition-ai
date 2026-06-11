'use client';

import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import { loadUserData } from '@/lib/storage';
import { CHARACTERS, STAGE_EMOJIS } from '@/lib/character';
import type { CharacterStage } from '@/types';

const ALL_STAGES: CharacterStage[] = [0, 1, 2, 3, 4];

export default function CollectionPage() {
  const [unlockedStages, setUnlockedStages] = useState<CharacterStage[]>([0]);
  const [currentStage, setCurrentStage] = useState<CharacterStage>(0);
  const [diagnosisCount, setDiagnosisCount] = useState(0);
  const [totalMissions, setTotalMissions] = useState(0);
  const [streak, setStreak] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<CharacterStage | null>(null);

  useEffect(() => {
    setMounted(true);
    const data = loadUserData();
    setUnlockedStages(data.unlockedStages);
    setCurrentStage(data.characterStage);
    setDiagnosisCount(data.diagnosisCount);
    setTotalMissions(data.totalMissionsCompleted);
    setStreak(data.streak);
  }, []);

  if (!mounted) return null;

  const totalUnlocked = unlockedStages.length;
  const achievementRate = Math.round((totalUnlocked / ALL_STAGES.length) * 100);

  const progressItems = [
    { label: '診断回数', current: diagnosisCount, max: 30, targets: [3, 10, 30], unit: '回' },
    { label: 'ミッション', current: totalMissions, max: 100, targets: [10, 50, 100], unit: '個' },
    { label: '連続記録', current: streak, max: 30, targets: [7, 14, 30], unit: '日' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="page-container">
        <header className="pt-6 pb-4 fade-slide-up">
          <h1 className="text-xl font-bold text-gray-800">📖 キャラクター図鑑</h1>
          <p className="text-xs text-gray-400 mt-1">ブレインリスの成長ストーリー</p>
        </header>

        <div className="space-y-4 pb-24">

          <div className="bg-white rounded-2xl border border-purple-100 p-4 shadow-sm card-enter">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-purple-700">解放率</p>
              <p className="text-sm font-bold text-purple-600">{totalUnlocked} / {ALL_STAGES.length} 体</p>
            </div>
            <div className="w-full bg-purple-100 rounded-full h-3 mb-1">
              <div
                className="bg-gradient-to-r from-purple-400 to-indigo-400 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${achievementRate}%` }}
              />
            </div>
            <p className="text-xs text-purple-400 text-right">{achievementRate}% 達成</p>
          </div>

          <div className="grid grid-cols-2 gap-3 card-enter delay-100">
            {ALL_STAGES.map((stage) => {
              const char = CHARACTERS[stage];
              const isUnlocked = unlockedStages.includes(stage);
              const isCurrent = stage === currentStage;

              return (
                <button
                  key={stage}
                  onClick={() => setSelected(selected === stage ? null : stage)}
                  className={`relative text-left bg-white rounded-2xl p-4 border transition-all active:scale-95 ${
                    isCurrent
                      ? 'border-purple-400 ring-2 ring-purple-200 shadow-md'
                      : selected === stage
                      ? 'border-indigo-300 shadow-md'
                      : 'border-gray-100 shadow-sm hover:shadow-md'
                  } ${!isUnlocked ? 'opacity-60' : ''}`}
                >
                  {isCurrent && (
                    <span className="absolute top-2 right-2 text-xs bg-purple-500 text-white px-1.5 py-0.5 rounded-full">
                      いま
                    </span>
                  )}
                  <div className="text-3xl mb-2 text-center">
                    {isUnlocked ? STAGE_EMOJIS[stage] : '❓'}
                  </div>
                  <p className="text-sm font-bold text-gray-800 text-center">
                    {isUnlocked ? char.name : '???'}
                  </p>
                  <p className="text-xs text-gray-400 text-center mt-0.5">段階 {stage + 1}</p>
                  {selected === stage && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      {isUnlocked ? (
                        <p className="text-xs text-gray-600 leading-relaxed">{char.description}</p>
                      ) : (
                        <p className="text-xs text-indigo-500 leading-relaxed">🔒 {char.unlockCondition}</p>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl border border-blue-100 p-4 shadow-sm card-enter delay-200">
            <p className="text-sm font-bold text-blue-700 mb-4">🏆 進化条件の進捗</p>
            <div className="space-y-5">
              {progressItems.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium text-gray-600">{item.label}</span>
                    <span className="font-bold text-gray-700">{item.current} {item.unit}</span>
                  </div>
                  <div className="relative w-full bg-gray-100 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-indigo-400 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(100, (item.current / item.max) * 100)}%` }}
                    />
                    {item.targets.map((t) => (
                      <div
                        key={t}
                        className={`absolute top-0 h-3 w-0.5 rounded-full ${
                          item.current >= t ? 'bg-white/70' : 'bg-gray-300'
                        }`}
                        style={{ left: `${(t / item.max) * 100}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-1 px-1">
                    {item.targets.map((t) => (
                      <span
                        key={t}
                        className={`text-xs ${item.current >= t ? 'text-blue-500 font-medium' : 'text-gray-400'}`}
                      >
                        {t}{item.unit}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-orange-100 p-4 shadow-sm card-enter delay-300">
            <p className="text-sm font-bold text-orange-700 mb-3">📋 進化条件ガイド</p>
            <div className="space-y-3">
              {ALL_STAGES.map((stage) => {
                const char = CHARACTERS[stage];
                const isUnlocked = unlockedStages.includes(stage);
                return (
                  <div key={stage} className={`flex items-center gap-3 p-2 rounded-xl ${isUnlocked ? 'bg-green-50' : 'bg-gray-50'}`}>
                    <span className="text-2xl w-10 text-center">
                      {isUnlocked ? STAGE_EMOJIS[stage] : '🔒'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${isUnlocked ? 'text-gray-800' : 'text-gray-400'}`}>
                        {char.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">{char.unlockCondition}</p>
                    </div>
                    {isUnlocked && <span className="text-green-500 text-sm shrink-0">✅</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
