import { useState } from "react";
import SearchForm from "../components/SearchForm";
import Header from "../components/Header";
import Ad from "../components/Ad";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Home() {
  const [area, setArea] = useState("");
  const [guests, setGuests] = useState(2);
  const [genre, setGenre] = useState("");
  const [results, setResults] = useState([]); // 検索結果
  const [loading, setLoading] = useState(false); // ローディング状態
  const [error, setError] = useState(""); // エラーメッセージ

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setResults([]);
    try {
      // API呼び出し（検索条件をクエリとして送信）
      const query = new URLSearchParams({ area, guests, genre }).toString();
      const response = await fetch(`http://127.0.0.1:5000/results?${query}`);

      if (!response.ok) throw new Error("検索結果の取得に失敗しました。");

      const data = await response.json();
      setResults(data); // 検索結果をセット
    } catch (err) {
      setError(err.message || "エラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-screen-lg mx-auto py-6 px-4">
        {/* 検索フォーム */}
        <SearchForm
          onSearch={handleSearch}
          area={area}
          setArea={setArea}
          guests={guests}
          setGuests={setGuests}
          genre={genre}
          setGenre={setGenre}
        />

        {/* 検索ボタン */}
        <div className="text-center my-4">
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            検索する
          </button>
        </div>

        {/* ローディングとエラーメッセージ */}
        {loading && <p className="text-center">検索中...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* 検索結果表示 */}
        {results.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-4">検索結果</h2>
            {results.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white p-4 mb-4 rounded-lg shadow flex"
              >
                {/* 画像 */}
                <img
                  src={restaurant.store_top_image || "/placeholder.png"}
                  alt={restaurant.name}
                  className="w-1/4 h-24 object-cover rounded-lg mr-4"
                />

                {/* 店舗情報 */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
                  <p>ジャンル: {restaurant.category}</p>
                  <p>エリア: {restaurant.area}</p>
                  <p>食べログ評価: {restaurant.tabelog_rating || "N/A"}</p>
                  <p>Google評価: {restaurant.google_rating || "N/A"}</p>
                </div>

                {/* 詳細ページリンク */}
                <div className="flex items-center">
                  <Link href={`/restaurant/${restaurant.id}`}>
                    <a className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition">
                      詳細ページへ
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 検索結果がない場合 */}
        {!loading && !error && results.length === 0 && (
          <p className="text-center text-gray-500">検索結果がありません。</p>
        )}
      </main>

      {/* 広告とフッター */}
      <Ad />
      <Footer />
    </div>
  );
}
