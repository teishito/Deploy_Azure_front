import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const [area, setArea] = useState("指定なし"); // エリア
  const [guests, setGuests] = useState(2); // 人数
  const [genre, setGenre] = useState("指定なし"); // ジャンル
  const [searchResults, setSearchResults] = useState([]); // 検索結果
  const [loading, setLoading] = useState(false); // ローディング状態
  const [error, setError] = useState(""); // エラーメッセージ

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const query = Object.fromEntries(
      Object.entries({
        area: area !== "指定なし" ? area : "",
        guests: guests !== 2 ? guests : "",
        genre: genre !== "指定なし" ? genre : "",
      }).filter(([_, value]) => value !== "" && value !== null)
    );

    try {
      const response = await fetch(`/results?${new URLSearchParams(query).toString()}`);
      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        throw new Error(`HTTPエラー: ${response.status}`);
      }

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("サーバーから予期しない形式のレスポンスが返されました");
      }

      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error("検索エラー:", err);
      setError(err.message || "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <Header />
      <main className="w-full max-w-md bg-white rounded-lg shadow-lg mt-6 p-6">
        <form onSubmit={handleSearch} className="space-y-6">
          <h2 className="text-lg font-bold text-center">会食用のお店を検索</h2>

          {/* エリア */}
          <div className="relative mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">エリア</label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="指定なし">指定なし</option>
              <option value="福岡県福岡市中央区">福岡県福岡市中央区</option>
              <option value="福岡県福岡市博多区">福岡県福岡市博多区</option>
              <option value="福岡県福岡市早良区">福岡県福岡市早良区</option>
              <option value="福岡県福岡市東区">福岡県福岡市東区</option>
              <option value="福岡県福岡市南区">福岡県福岡市南区</option>
              <option value="福岡県福岡市西区">福岡県福岡市西区</option>
              <option value="福岡県福岡市城南区">福岡県福岡市城南区</option>
              <option value="福岡県北九州市小倉北区">福岡県北九州市小倉北区</option>
            </select>
          </div>

          {/* 人数 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">人数</label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              min={1}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="例: 2"
            />
          </div>

          {/* ジャンル */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ジャンル</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="指定なし">指定なし</option>
              <option value="寿司">寿司</option>
              <option value="日本料理">日本料理</option>
              <option value="そば">そば</option>
              <option value="うなぎ">うなぎ</option>
              <option value="鍋">鍋</option>
              <option value="水炊き">水炊き</option>
              <option value="しゃぶしゃぶ">しゃぶしゃぶ</option>
              <option value="もつ鍋">もつ鍋</option>
              <option value="イタリアン">イタリアン</option>
              <option value="フレンチ">フレンチ</option>
              <option value="韓国料理">韓国料理</option>
              <option value="インド料理">インド料理</option>
              <option value="中華料理">中華料理</option>
            </select>
          </div>

          {/* 検索ボタン */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            お店を検索する
          </button>
        </form>
      </main>

      {/* 検索結果 */}
      <section className="w-full max-w-md bg-white rounded-lg shadow-lg mt-6 p-6">
        {loading ? (
          <p>検索中...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : searchResults.length > 0 ? (
          <ul className="space-y-4">
            {searchResults.map((result) => (
              <li key={result.id} className="border-b pb-4">
                <h3 className="text-lg font-bold">{result.name}</h3>
                <p>住所: {result.address}</p>
                <p>ジャンル: {result.category}</p>
                <p>予算: ¥{result.budget_min} ~ ¥{result.budget_max}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>該当するお店が見つかりませんでした。</p>
        )}
      </section>
      <Footer />
    </div>
  );
}
