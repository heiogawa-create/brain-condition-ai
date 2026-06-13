'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/supabase/AuthProvider';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const supabase = createClient();
    if (!supabase) {
      setError('現在ログイン機能はご利用いただけません。');
      return;
    }

    setSubmitting(true);

    if (mode === 'login') {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      setSubmitting(false);
      if (signInError) {
        setError('メールアドレスまたはパスワードが正しくありません。');
        return;
      }
      router.push('/');
      router.refresh();
    } else {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      setSubmitting(false);
      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      setMessage('登録が完了しました。確認メールをご確認ください。');
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="page-container">
      <header className="pt-6 pb-4 fade-slide-up">
        <h1 className="text-xl font-bold text-gray-800">👤 ログイン</h1>
        <p className="text-xs text-gray-400 mt-1">メールアドレスでログイン・新規登録</p>
      </header>

      <div className="space-y-4 pb-24">
        {!isSupabaseConfigured && (
          <Card color="orange" className="card-enter">
            <p className="text-sm text-orange-700">
              現在ログイン機能の設定が完了していません。診断・キャラクター育成はログインなしでもご利用いただけます。
            </p>
          </Card>
        )}

        {isSupabaseConfigured && !loading && user && (
          <Card color="green" className="card-enter">
            <p className="text-sm text-gray-700 mb-3">
              <span className="font-bold">{user.email}</span> としてログイン中です。
            </p>
            <button
              onClick={handleLogout}
              className="w-full bg-white border border-gray-200 text-gray-600 text-sm font-medium py-2.5 rounded-xl active:scale-95 transition-all"
            >
              ログアウト
            </button>
          </Card>
        )}

        {isSupabaseConfigured && !loading && !user && (
          <Card color="white" className="card-enter">
            <div className="flex mb-4 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 text-sm font-medium py-2 rounded-lg transition-all ${
                  mode === 'login' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                }`}
              >
                ログイン
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`flex-1 text-sm font-medium py-2 rounded-lg transition-all ${
                  mode === 'signup' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                }`}
              >
                新規登録
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">メールアドレス</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">パスワード</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  placeholder="6文字以上"
                />
              </div>

              {error && <p className="text-xs text-red-500">{error}</p>}
              {message && <p className="text-xs text-green-600">{message}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 active:scale-95 text-white text-center py-3 rounded-xl font-bold text-sm transition-all shadow-md shadow-indigo-200 disabled:opacity-60"
              >
                {submitting ? '処理中...' : mode === 'login' ? 'ログイン' : '新規登録'}
              </button>
            </form>
          </Card>
        )}

        <Card color="blue" className="card-enter delay-100">
          <p className="text-sm text-gray-600 leading-relaxed">
            ログインしなくても、診断やキャラクター育成は引き続きご利用いただけます。✨<br />
            プレミアム機能のご利用にはログインが必要です。
          </p>
          <Link
            href="/premium"
            className="mt-3 block text-center text-sm font-medium text-indigo-600 underline"
          >
            プレミアムプランについて見る
          </Link>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
