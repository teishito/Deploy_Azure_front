import { useState } from "react";
import SearchForm from "../components/SearchForm";
import Header from "../components/Header";
import Ad from "../components/Ad";
import Footer from "../components/Footer";

export default function Home() {
  const [area, setArea] = useState(""); // エリア
  const [guests, setGuests] = useState(2); // 人数
  const [genre, setGenre] = useState(""); // ジャンル
  const [loading, setLoading] = useState(false); // ローディング状態
  const [error, setError] = useState(""); // エラーメッセージ

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      // 検索条件をAPIに送信
      const query = new URLSearchParams({ area, guests, genre }).toString();
      const response = await fetch(`https://tech0-gen-8-step3-app-node-10.azurewebsites.net/results?${query}`);

      if (!response.ok) throw new Error("検索結果の取得に失敗しました。");

      const data = await response.json();
      console.log("検索結果:", data); // デバッグ用
    } catch (err) {
      setError(err.message || "エラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-md mx-auto py-6 px-4">
        <h1 className="text-center text-xl font-bold mb-6">簡易検索</h1>

        {/* 検索フォーム */}
        <SearchForm
          area={area}
          setArea={setArea}
          guests={guests}
          setGuests={setGuests}
          genre={genre}
          setGenre={setGenre}
        />

        {/* 検索ボタン */}
        <div className="text-center mt-6">
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            検索する
          </button>
        </div>

        {/* ローディング状態 */}
        {loading && <p className="text-center mt-4">検索中...</p>}

        {/* エラーメッセージ */}
        {error && <p className="text-center mt-4 text-red-500">{error}</p>}
      </main>

      <Ad />
      <Footer />
    </div>
  );
}
