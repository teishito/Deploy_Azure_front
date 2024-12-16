import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Ad from "../components/Ad"; // Adコンポーネントをインポート
import Footer from "../components/Footer";

export default function Results() {
  const router = useRouter(); // URLクエリパラメータを取得
  const { area, guests, genre } = router.query; // クエリパラメータを変数として取得
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // クエリパラメータを文字列化してAPIに送信
        const query = new URLSearchParams({ area, guests, genre }).toString();
        const response = await fetch(`https://tech0-gen-8-step3-app-node-10.azurewebsites.net/results?${query}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResults(data); // 結果をステートに設定
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // クエリパラメータが変更された場合にのみデータをフェッチ
    if (area || guests || genre) fetchResults();
  }, [area, guests, genre]); // 依存配列にパラメータを設定

  if (loading) return <p className="text-center mt-6">読み込み中...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">エラー: {error}</p>;
  if (results.length === 0) return <p className="text-center mt-6">該当するお店が見つかりませんでした。</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-screen-lg mx-auto py-6 px-4">
        <h1 className="text-xl font-bold mb-6">検索結果</h1>
        {results.map((restaurant) => (
          <div key={restaurant.id} className="bg-white p-4 rounded-lg shadow mb-4">
            <h2 className="text-lg font-bold">{restaurant.name}</h2>
            <p>住所: {restaurant.address}</p>
            <p>ジャンル: {restaurant.category}</p>
            <p>最大人数: {restaurant.capacity}</p>
            <p>予算: ¥{restaurant.budget_min} ~ ¥{restaurant.budget_max}</p>
          </div>
        ))}
      </main>
      
      {/* Adコンポーネントを追加 */}
      <Ad />

      <Footer />
    </div>
  );
}
