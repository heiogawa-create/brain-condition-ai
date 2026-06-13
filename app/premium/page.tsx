'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/supabase/AuthProvider';
import { isSupabaseConfigured } from '@/lib/supabase/client';

const FEATURES = [
  '🤖 AIコーチ（詳細版）',
  '📊 月間レポート',
  '🐿️ キャラクター全段階',
  '📖 脳疲労改善図鑑',
  '📈 詳細分析グラフ',
  '🔥 連続記録特典',
];

export default function PremiumPage() {
  const { user, loading, isPremium } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error ?? '決済ページの作成に失敗しました。');
        setSubmitting(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError('決済ページの作成に失敗しました。');
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <header className="pt-6 pb-4 fade-slide-up">
        <h1 className="text-xl font-bold text-gray-800">✨ プレミアムプラン</h1>
        <p className="text-xs text-gray-400 mt-1">もっと詳しく、もっと楽しく</p>
      </header>

      <div className="space-y-4 pb-24">
        <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-5 text-white shadow-lg card-enter overflow-hidden">
          <div className="absolute top-0 right-0 text-6xl opacity-10 -mt-2 -mr-2">✨</div>
          <div className="relative">
            <p className="font-bold text-lg mb-1">脳コンディションAI プレミアム</p>
            <p className="text-sm text-indigo-100 mb-4">
              詳しい分析とキャラクター育成のすべてが解放されます
            </p>
            <div className="grid grid-cols-2 gap-1.5 mb-4">
              {FEATURES.map((item) => (
                <div key={item} className="text-xs text-indigo-100 flex items-center gap-1">
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div>
              <span className="text-2xl font-bold">¥100</span>
              <span className="text-sm text-indigo-200"> / 月</span>
            </div>
          </div>
        </div>

        {!isSupabaseConfigured && (
          <Card color="orange" className="card-enter delay-100">
            <p className="text-sm text-orange-700">現在プレミアム機能の設定が完了していません。</p>
          </Card>
        )}

        {isSupabaseConfigured && isPremium && (
          <Card color="green" className="card-enter delay-100">
            <p className="text-sm text-green-700 font-bold text-center py-2">
              ✅ プレミアムプランをご利用中です
            </p>
          </Card>
        )}

        {isSupabaseConfigured && !loading && !isPremium && (
          <Card color="white" className="card-enter delay-100">
            {!user ? (
              <div className="text-center py-2">
                <p className="text-sm text-gray-600 mb-3">
                  プレミアムプランのご購入にはログインが必要です。
                </p>
                <Link
                  href="/login"
                  className="block w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 active:scale-95 text-white text-center py-3.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-indigo-200"
                >
                  ログイン / 新規登録
                </Link>
              </div>
            ) : (
              <div>
                {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
                <button
                  onClick={handleCheckout}
                  disabled={submitting}
                  className="block w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 active:scale-95 text-white text-center py-3.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-indigo-200 disabled:opacity-60"
                >
                  {submitting ? '処理中...' : '¥100/月で始める'}
                </button>
              </div>
            )}
          </Card>
        )}

        <Card color="blue" className="card-enter delay-200">
          <p className="text-sm text-gray-600 leading-relaxed">
            診断・キャラクター育成の基本機能は、ログイン・購入なしでも引き続きご利用いただけます 🌿
          </p>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
