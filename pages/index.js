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
      </main>

      {/* 広告とフッター */}
      <Ad />
      <Footer />
    </div>
  );
}
