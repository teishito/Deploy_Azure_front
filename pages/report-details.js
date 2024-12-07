import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useRouter } from "next/router";

export default function ReportDetails() {
    const [isPopupOpen, setPopupOpen] = useState(false); // ポップアップ状態管理
    const [isMounted, setIsMounted] = useState(false); // クライアントでのマウント確認
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true); // クライアントサイドでのみ実行
    }, []);

    const handlePopupOpen = () => {
        setPopupOpen(true); // ポップアップを表示
    };

    const handlePopupClose = () => {
        setPopupOpen(false); // ポップアップを閉じる
        router.push("/report-result"); // 背景画面に遷移
    };

    // サーバー側で何も描画しないようにする
    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-gray-50 relative">
            <Header />
            <main className="max-w-screen-md mx-auto py-6 px-4">
                <h1 className="text-xl font-bold mb-4">レポート詳細</h1>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="mb-4">
                        <h2 className="text-lg font-bold">予約したお店 : on A TABLE（オン ア テーブル）</h2>
                        <p>会食日時 : 0月0日</p>
                        <p>会食目的 : 商談フェーズの促進</p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-lg font-bold">会食への評価を入力</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                目的達成度
                            </label>
                            <input type="range" min="1" max="10" className="w-full" />
                        </div>
                        {/* 他のスライダーや入力項目 */}
                    </div>
                    <button
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
                        onClick={handlePopupOpen} // 提出ボタンでポップアップ表示
                    >
                        提出する
                    </button>
                </div>
            </main>

            {/* ポップアップ */}
            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-sm w-full">
                        <button
                            onClick={handlePopupClose} // ×ボタンでポップアップ閉じる＆遷移
                            className="absolute top-2 right-2 text-black"
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <h2 className="text-lg font-bold mb-4">入力ありがとうございました！</h2>
                        <ul className="mb-4 text-sm text-gray-700">
                            <li>・今回のレビュー内容をもとに、次回以降の検索結果が改善されます</li>
                            <li>・今回の会食メモを社内への共有にも使いましょう</li>
                        </ul>
                        <button
                            onClick={handlePopupClose} // 了解ボタンでポップアップ閉じる＆遷移
                            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
                        >
                            了解
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
