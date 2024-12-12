import { useState } from "react";
import SimpleSearchForm from "../components/SimpleSearchForm";
import Link from "next/link";

export default function Home() {
  const [area, setArea] = useState(""); // エリア
  const [guests, setGuests] = useState(2); // 人数
  const [genre, setGenre] = useState(""); // ジャンル
  const [searchResults, setSearchResults] = useState([]); // 検索結果
  const [loading, setLoading] = useState(false); // ローディング状態
  const [error, setError] = useState(""); // エラーメッセージ
  const [homeResponse, setHomeResponse] = useState(""); // ホームエンドポイントの応答
  const BACKEND_URL = "https://tech0-gen-8-step3-app-py-10.azurewebsites.net"; // バックエンドのURL

  // ホームエンドポイント確認
  const fetchHome = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTPエラー: ${response.status}`);
      }
      const data = await response.json();
      setHomeResponse(data.message || "応答なし");
    } catch (error) {
      console.error("ホームエンドポイントエラー:", error);
      setHomeResponse("エラーが発生しました");
    }
  };

  // 検索処理の実装
  const handleSearch = async () => {
    setLoading(true); // 検索開始時にローディングを有効化
    setError(""); // エラー状態をリセット

    try {
      const query = new URLSearchParams({
        area: area === "指定なし" ? "" : area,
        guests,
        genre: genre === "指定なし" ? "" : genre,
      }).toString();

      const response = await fetch(`${BACKEND_URL}/results?${query}`);
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
      {/* ホームエンドポイント確認 */}
      <div className="mb-6">
        <h2>Flaskサーバーの起動確認</h2>
        <button
          onClick={fetchHome}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          ホームエンドポイントにアクセス
        </button>
        {homeResponse && <p>サーバーからの応答: {homeResponse}</p>}
      </div>

      {/* 検索フォーム */}
      <SimpleSearchForm
        area={area}
        setArea={setArea}
        guests={guests}
        setGuests={setGuests}
        genre={genre}
        setGenre={setGenre}
        handleSearch={handleSearch}
      />

      {/* 検索結果表示 */}
      <div className="mt-6">
        {loading && <p>検索中...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && searchResults.length > 0 && (
          <ul className="space-y-4">
            {searchResults.map((result) => (
              <li
                key={result.id}
                className="border rounded-lg p-4 shadow-md bg-white"
              >
                <h3 className="text-lg font-bold">{result.name}</h3>
                <p>{result.address}</p>
                <p>ジャンル: {result.category}</p>
                <p>予算: ¥{result.budget_min} ~ ¥{result.budget_max}</p>
                <p>食べログ評価: {result.tabelog_rating || "なし"}</p>
                <p>Google評価: {result.google_rating || "なし"}</p>
              </li>
            ))}
          </ul>
        )}
        {!loading && !error && searchResults.length === 0 && (
          <p>検索結果がありません。</p>
        )}
      </div>

      {/* 他ページリンク */}
      //<Link href="/other-page">
        //<a className="mt-6 inline-block text-blue-600 hover:underline">
          //他のページへ
        //</a>
      //</Link>
    </div>
  );
}
