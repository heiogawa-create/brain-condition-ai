# 🧠 脳コンディションAI

毎日30秒で脳疲労をチェック。睡眠・ストレス・集中力を見える化してキャラクターを育てよう。

## セットアップ

```bash
npm install
cp .env.local.example .env.local
# .env.local に CLAUDE_API_KEY を設定（なくても動作します）
npm run dev
```

## Vercel デプロイ

1. このリポジトリを GitHub に push
2. Vercel でインポート
3. 環境変数 `CLAUDE_API_KEY` を設定（任意）
4. デプロイ完了！

## 技術スタック

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Recharts
- Claude API (claude-haiku-4-5)
- localStorage

## ページ構成

| パス | 内容 |
|------|------|
| `/` | ホーム・スコア・ミッション・キャラクター |
| `/check` | 10問診断 |
| `/result` | 診断結果・AIコメント |
| `/report` | 週間レポート |
| `/collection` | キャラクター図鑑 |

## 注意

本サービスは医療診断を目的としたものではありません。
