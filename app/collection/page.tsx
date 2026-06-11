'use client';

import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import { loadUserData, computeStats } from '@/lib/storage';
import { ALL_CHARACTERS, SERIES_INFO, getUnlockedCharacterIds } from '@/lib/character';

export default function CollectionPage() {
  const [unlockedIds, setUnlockedIds] = useState<number[]>([0]);
  const [mounted, setMounted] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState<number | null>(null);
  const [selectedChar, setSelectedChar] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const data = loadUserData();
    const stats = computeStats(data);
    const ids = getUnlockedCharacterIds(stats);
    setUnlockedIds(ids);
  }, []);

  if (!mounted) return null;

  const totalUnlocked = unlockedIds.length;
  const achievementRate = Math.round((totalUnlocked / 100) * 100);

  const displayChars = selectedSeries !== null
    ? ALL_CHARACTERS.filter(c => c.series === selectedSeries)
    : ALL_CHARACTERS;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="page-container">
        <header className="pt-6 pb-4 fade-slide-up">
          <h1 className="text-xl font-bold text-gray-800">📖 キャラクター図鑑</h1>
          <p className="text-xs text-gray-400 mt-1">全100種類のキャラクターを集めよう！</p>
        </header>

        <div className="space-y-4 pb-24">

          {/* 達成率 */}
          <div className="bg-white rounded-2xl border border-purple-100 p-4 shadow-sm card-enter">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-purple-700">コレクション達成率</p>
              <p className="text-sm font-bold text-purple-600">{totalUnlocked} / 100 体</p>
            </div>
            <div className="w-full bg-purple-100 rounded-full h-3 mb-1">
              <div
                className="bg-gradient-to-r from-purple-400 to-indigo-400 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${achievementRate}%` }}
              />
            </div>
            <p className="text-xs text-purple-400 text-right">{achievementRate}% 達成</p>
          </div>

          {/* 系統フィルター */}
          <div className="card-enter delay-100">
            <p className="text-xs font-bold text-gray-500 mb-2 px-1">系統で絞り込む</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedSeries(null)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedSeries === null
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white text-gray-500 border border-gray-200'
                }`}
              >
                すべて
              </button>
              {SERIES_INFO.map((s, i) => {
                const seriesUnlocked = ALL_CHARACTERS.filter(c => c.series === i && unlockedIds.includes(c.id)).length;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedSeries(selectedSeries === i ? null : i)}
                    className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedSeries === i
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white text-gray-500 border border-gray-200'
                    }`}
                  >
                    {s.emoji} {s.name}
                    <span className="ml-1 opacity-70">{seriesUnlocked}/10</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 系統説明 */}
          {selectedSeries !== null && (
            <div className="bg-white rounded-2xl border border-indigo-100 p-3 text-sm text-gray-600 card-enter">
              <span className="font-bold text-indigo-600">{SERIES_INFO[selectedSeries].emoji} {SERIES_INFO[selectedSeries].name}</span>
              　{SERIES_INFO[selectedSeries].theme}
            </div>
          )}

          {/* キャラクターグリッド */}
          <div className="grid grid-cols-4 gap-2 card-enter delay-200">
            {displayChars.map((char) => {
              const isUnlocked = unlockedIds.includes(char.id);
              const isSelected = selectedChar === char.id;

              return (
                <button
                  key={char.id}
                  onClick={() => setSelectedChar(isSelected ? null : char.id)}
                  className={`relative bg-white rounded-2xl p-2 border transition-all active:scale-95 ${
                    isSelected
                      ? 'border-indigo-400 ring-2 ring-indigo-200 shadow-md'
                      : 'border-gray-100 shadow-sm'
                  } ${!isUnlocked ? 'opacity-40 grayscale' : ''}`}
                >
                  <div className="text-2xl text-center mb-1">
                    {isUnlocked ? char.emoji : '❓'}
                  </div>
                  <p className="text-xs text-center text-gray-600 leading-tight truncate">
                    {isUnlocked ? char.name : '???'}
                  </p>
                  {isUnlocked && (
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-green-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* 選択中キャラクター詳細 */}
          {selectedChar !== null && (() => {
            const char = ALL_CHARACTERS[selectedChar];
            const isUnlocked = unlockedIds.includes(char.id);
            return (
              <div className="bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm card-enter">
                <div className="flex gap-4 items-start">
                  <div className="text-5xl">{isUnlocked ? char.emoji : '❓'}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="font-bold text-gray-800">{isUnlocked ? char.name : '???'}</p>
                      <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">
                        {SERIES_INFO[char.series].emoji} {SERIES_INFO[char.series].name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">ランク {char.rank + 1} / 10</p>
                    {isUnlocked ? (
                      <p className="text-sm text-gray-700 leading-relaxed">{char.description}</p>
                    ) : (
                      <div className="bg-indigo-50 rounded-xl p-2">
                        <p className="text-xs text-indigo-500 font-medium">🔒 解放条件</p>
                        <p className="text-xs text-gray-600 mt-0.5">{char.unlockDesc}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* 系統別進捗 */}
          <div className="bg-white rounded-2xl border border-blue-100 p-4 shadow-sm card-enter delay-300">
            <p className="text-sm font-bold text-blue-700 mb-3">🏆 系統別コレクション進捗</p>
            <div className="space-y-2">
              {SERIES_INFO.map((s, i) => {
                const got = ALL_CHARACTERS.filter(c => c.series === i && unlockedIds.includes(c.id)).length;
                const pct = (got / 10) * 100;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-base w-6">{s.emoji}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-indigo-400 h-2 rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-8 text-right">{got}/10</span>
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
