'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QUESTIONS, SCALE_LABELS } from '@/lib/score';
import { loadUserData, saveUserData } from '@/lib/storage';

const FACE_MAP: Record<number, string> = { 1: '😞', 2: '😕', 3: '😐', 4: '🙂', 5: '😄' };
const BG_COLORS = [
  'from-blue-50 to-indigo-50',
  'from-indigo-50 to-purple-50',
  'from-orange-50 to-amber-50',
  'from-red-50 to-orange-50',
  'from-pink-50 to-red-50',
  'from-purple-50 to-pink-50',
  'from-sky-50 to-blue-50',
  'from-green-50 to-teal-50',
  'from-teal-50 to-cyan-50',
  'from-amber-50 to-yellow-50',
];

export default function CheckPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<number[]>(new Array(10).fill(0));
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');

  const handleAnswer = (score: number) => {
    if (animating) return;
    const newAnswers = [...answers];
    newAnswers[current] = score;
    setAnswers(newAnswers);

    if (current < 9) {
      setAnimating(true);
      setDirection('forward');
      setTimeout(() => {
        setCurrent(current + 1);
        setAnimating(false);
      }, 250);
    } else {
      const data = loadUserData();
      data.currentAnswers = newAnswers;
      saveUserData(data);
      router.push('/result');
    }
  };

  const handleBack = () => {
    if (current === 0 || animating) return;
    setDirection('back');
    setAnimating(true);
    setTimeout(() => {
      setCurrent(current - 1);
      setAnimating(false);
    }, 200);
  };

  const progress = ((current + 1) / 10) * 100;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${BG_COLORS[current]} transition-all duration-500`}>
      <div className="page-container">
        {/* Header */}
        <header className="pt-6 pb-4 flex items-center gap-3">
          <button
            onClick={() => router.push('/')}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 hover:text-gray-600"
          >
            ←
          </button>
          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span className="font-medium">質問 {current + 1} / 10</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/60 rounded-full h-2 shadow-inner">
              <div
                className="bg-indigo-400 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </header>

        {/* Question */}
        <div
          className={`transition-all duration-250 ${
            animating
              ? direction === 'forward'
                ? 'opacity-0 translate-x-4'
                : 'opacity-0 -translate-x-4'
              : 'opacity-100 translate-x-0'
          }`}
        >
          <div className="bg-white rounded-3xl shadow-sm p-6 mb-6 text-center">
            <p className="text-base font-bold text-gray-800 leading-relaxed">
              {QUESTIONS[current]}
            </p>
            <p className="text-xs text-gray-400 mt-2">あてはまる度合いを選んでください</p>
          </div>

          {/* Answer buttons */}
          <div className="space-y-3 mb-4">
            {[1, 2, 3, 4, 5].map((score) => {
              const selected = answers[current] === score;
              return (
                <button
                  key={score}
                  onClick={() => handleAnswer(score)}
                  className={`w-full py-4 rounded-2xl font-medium text-sm transition-all active:scale-95 flex items-center px-5 gap-4 ${
                    selected
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-200 scale-[1.01]'
                      : 'bg-white text-gray-700 shadow-sm hover:shadow-md hover:bg-indigo-50'
                  }`}
                >
                  <span className="text-xl w-8">{FACE_MAP[score]}</span>
                  <span className="flex-1 text-left">{SCALE_LABELS[score]}</span>
                  <span className={`text-base font-bold w-5 text-right ${selected ? 'text-white' : 'text-gray-300'}`}>
                    {score}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Step dots */}
          <div className="flex justify-center gap-1.5 mb-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i < current
                    ? 'w-2 h-2 bg-indigo-400'
                    : i === current
                    ? 'w-4 h-2 bg-indigo-500'
                    : 'w-2 h-2 bg-gray-200'
                }`}
              />
            ))}
          </div>

          {current > 0 && (
            <button
              onClick={handleBack}
              className="w-full text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors"
            >
              ← 前の質問へ戻る
            </button>
          )}
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
