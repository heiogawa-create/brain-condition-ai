import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/supabase/AuthProvider';

export const metadata: Metadata = {
  title: '脳コンディションAI',
  description: '毎日30秒で脳疲労をチェック。睡眠・ストレス・集中力を見える化してキャラクターを育てよう。',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#6366f1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
