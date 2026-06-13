import Link from 'next/link';
import Card from '@/components/Card';
import Footer from '@/components/Footer';

export default function PremiumSuccessPage() {
  return (
    <div className="page-container">
      <div className="space-y-4 pt-12 pb-24">
        <Card color="green" className="card-enter">
          <div className="text-center py-6">
            <div className="text-5xl mb-3 pop-in">🎉</div>
            <h1 className="font-bold text-lg text-gray-800 mb-2">ご購入ありがとうございます！</h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              プレミアムプランへのご登録が完了しました。<br />
              すべての機能をお楽しみください ✨
            </p>
          </div>
        </Card>

        <Link
          href="/"
          className="block w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 active:scale-95 text-white text-center py-3.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-indigo-200"
        >
          ホームに戻る
        </Link>
      </div>

      <Footer />
    </div>
  );
}
