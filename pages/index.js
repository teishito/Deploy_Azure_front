import { useState } from "react";
import SearchForm from "../components/SimpleSearchForm";
import Link from "next/link";

export default function Home() {
  const [area, setArea] = useState(""); // エリア
  const [guests, setGuests] = useState(2); // 人数
  const [genre, setGenre] = useState(""); // ジャンル
  const [searchResults, setSearchResults] = useState([]); // 検索結果
  const [loading, setLoading] = useState(false); // ローディング状態
  const [error, setError] = useState(""); // エラーメッセージ

  // 検索処理の実装
  const handleSearch = async () => {
    setLoading(true); // 検索開始時にローディングを有効化
    setError(""); // エラー状態をリセット

    try {
      const query = new URLSearchParams({
        area,
        guests,
        genre,
      }).toString();

      const response = await fetch(`/results?${query}`);
      if (!response.ok) {
        throw new Error("検索に失敗しました");
      }

      const data = await response.json();
      setSearchResults(data.results || []); // 結果を状態に設定
    } catch (err) {
      setError(err.message || "エラーが発生しました");
    } finally {
      setLoading(false); // 検索完了時にローディングを無効化
    }
  };

  return (
    <div>
      <SimpleSearchForm
        area={area}
        setArea={setArea}
        guests={guests}
        setGuests={setGuests}
        genre={genre}
        setGenre={setGenre}
        handleSearch={handleSearch}
      />
      <div className="mt-6">
        {loading && <p>検索中...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && searchResults.length > 0 && (
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                <h3>{result.name}</h3>
                <p>{result.address}</p>
                <p>ジャンル: {result.category}</p>
                <p>予算: {result.budget_min} ~ {result.budget_max}</p>
              </li>
            ))}
          </ul>
        )}
        {!loading && !error && searchResults.length === 0 && (
          <p>検索結果がありません。</p>
        )}
      </div>
      <Link href="/other-page">
        <a>他のページへ</a>
      </Link>
    </div>
  );
}
