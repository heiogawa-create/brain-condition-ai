'use client';

import React, { useState } from 'react';
import type { MissionItem } from '@/types';

interface MissionCardProps {
  missions: MissionItem[];
  onComplete: (id: string) => void;
}

export default function MissionCard({ missions, onComplete }: MissionCardProps) {
  const [justCompleted, setJustCompleted] = useState<string | null>(null);
  const done = missions.filter((m) => m.completed).length;

  const handleComplete = (id: string) => {
    setJustCompleted(id);
    onComplete(id);
    setTimeout(() => setJustCompleted(null), 800);
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl border border-green-100 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <span className="font-bold text-green-700">今日のミッション</span>
        </div>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i < done ? 'bg-green-500 scale-110' : 'bg-green-100'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {missions.map((m) => (
          <div
            key={m.id}
            className={`flex items-center justify-between rounded-xl px-3 py-3 transition-all duration-300 ${
              m.completed
                ? 'bg-green-100 opacity-75'
                : justCompleted === m.id
                ? 'bg-yellow-50 scale-[1.02]'
                : 'bg-white'
            }`}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-base shrink-0">
                {m.completed ? '✅' : '⬜'}
              </span>
              <span className={`text-sm ${m.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {m.text}
              </span>
            </div>
            {!m.completed && (
              <button
                onClick={() => handleComplete(m.id)}
                className="ml-2 shrink-0 text-xs bg-green-500 text-white rounded-lg px-3 py-1.5 font-medium hover:bg-green-600 active:scale-95 transition-all"
              >
                できた！
              </button>
            )}
            {m.completed && (
              <span className="ml-2 text-xs text-green-600 font-medium shrink-0">+20 EXP</span>
            )}
          </div>
        ))}
      </div>

      {done === 3 && (
        <div className="mt-3 bg-green-500 text-white rounded-xl py-2 text-center text-sm font-bold">
          🎉 全ミッション達成！ ボーナス +30 EXP
        </div>
      )}
    </div>
  );
}
