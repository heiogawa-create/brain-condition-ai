'use client';

import React from 'react';
import type { FatigueLevel } from '@/types';

interface ScoreCircleProps {
  score: number;
  fatigueLevel: FatigueLevel;
  size?: 'sm' | 'md' | 'lg';
}

const levelColors: Record<FatigueLevel, string> = {
  良好: 'text-green-500',
  軽度疲労: 'text-blue-500',
  中等度疲労: 'text-orange-500',
  重度疲労: 'text-red-500',
};

const levelBg: Record<FatigueLevel, string> = {
  良好: 'bg-green-50 border-green-200',
  軽度疲労: 'bg-blue-50 border-blue-200',
  中等度疲労: 'bg-orange-50 border-orange-200',
  重度疲労: 'bg-red-50 border-red-200',
};

const sizeMap = {
  sm: { circle: 'w-20 h-20', score: 'text-2xl', label: 'text-xs' },
  md: { circle: 'w-28 h-28', score: 'text-3xl', label: 'text-sm' },
  lg: { circle: 'w-36 h-36', score: 'text-5xl', label: 'text-base' },
};

export default function ScoreCircle({
  score,
  fatigueLevel,
  size = 'md',
}: ScoreCircleProps) {
  const s = sizeMap[size];
  return (
    <div
      className={`${s.circle} rounded-full border-4 flex flex-col items-center justify-center ${levelBg[fatigueLevel]}`}
    >
      <span className={`${s.score} font-bold ${levelColors[fatigueLevel]}`}>
        {score}
      </span>
      <span className={`${s.label} text-gray-500`}>/ 100</span>
    </div>
  );
}
