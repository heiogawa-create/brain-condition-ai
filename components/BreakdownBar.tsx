'use client';

import React from 'react';
import type { FatigueBreakdown } from '@/types';

interface BreakdownBarProps {
  breakdown: FatigueBreakdown;
}

const LABELS: { key: keyof FatigueBreakdown; label: string; color: string }[] = [
  { key: 'sleep', label: '睡眠', color: 'bg-blue-400' },
  { key: 'stress', label: 'ストレス', color: 'bg-purple-400' },
  { key: 'smartphone', label: 'スマホ疲れ', color: 'bg-orange-400' },
  { key: 'exercise', label: '運動不足', color: 'bg-green-400' },
  { key: 'physical', label: '身体疲労', color: 'bg-red-300' },
];

export default function BreakdownBar({ breakdown }: BreakdownBarProps) {
  return (
    <div className="space-y-2">
      {LABELS.map(({ key, label, color }) => (
        <div key={key} className="flex items-center gap-2">
          <span className="text-xs text-gray-500 w-20 shrink-0">{label}</span>
          <div className="flex-1 bg-gray-100 rounded-full h-3">
            <div
              className={`${color} h-3 rounded-full transition-all duration-700`}
              style={{ width: `${breakdown[key]}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 w-8 text-right">{breakdown[key]}%</span>
        </div>
      ))}
    </div>
  );
}
