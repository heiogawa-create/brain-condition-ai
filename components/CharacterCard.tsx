'use client';

import React from 'react';
import Card from './Card';
import { CHARACTERS, STAGE_EMOJIS, getNextEvolutionCondition, getLevelProgress, getExpInCurrentLevel } from '@/lib/character';
import type { CharacterStage } from '@/types';

interface CharacterCardProps {
  stage: CharacterStage;
  level: number;
  exp: number;
  todayMissionsDone: number;
}

export default function CharacterCard({ stage, level, exp, todayMissionsDone }: CharacterCardProps) {
  const char = CHARACTERS[stage];
  const progress = getLevelProgress(exp, level);
  const expInLevel = getExpInCurrentLevel(exp, level);
  const nextCond = getNextEvolutionCondition(stage);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-100 p-4 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Character emoji */}
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-3xl shrink-0">
          {STAGE_EMOJIS[stage]}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-purple-800">{char.name}</span>
            <span className="text-xs bg-purple-200 text-purple-700 px-2 py-0.5 rounded-full font-medium">
              Lv.{level}
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-2 truncate">{char.description}</p>

          {/* EXP bar */}
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-purple-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-400 to-indigo-400 h-2 rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-purple-500 shrink-0">{expInLevel}/100</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        {stage < 4 && (
          <div className="flex-1 bg-white rounded-xl px-3 py-2 text-xs text-purple-600">
            <span className="text-gray-400">次の進化: </span>{nextCond}
          </div>
        )}
        <div className="bg-white rounded-xl px-3 py-2 text-xs text-center shrink-0">
          <span className="text-gray-400">今日 </span>
          <span className="font-bold text-purple-600">{todayMissionsDone}/3</span>
          <span className="text-gray-400"> 達成</span>
        </div>
      </div>
    </div>
  );
}
