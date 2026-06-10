'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import type { DiagnosisRecord } from '@/types';

interface ScoreChartProps {
  records: DiagnosisRecord[];
}

export default function ScoreChart({ records }: ScoreChartProps) {
  const data = records.slice(-7).map((r) => ({
    date: r.date.slice(5), // MM-DD
    score: r.score,
  }));

  if (data.length === 0) {
    return (
      <div className="h-32 flex items-center justify-center text-sm text-gray-400">
        診断を行うとグラフが表示されます
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={160}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
        <Tooltip
          contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
          formatter={(v) => [`${v}点`, 'スコア']}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#818cf8"
          strokeWidth={2.5}
          dot={{ fill: '#818cf8', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
