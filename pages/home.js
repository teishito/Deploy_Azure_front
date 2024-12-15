import React, { useState } from "react";
import Results from "../components/Results"; // components フォルダから Results をインポート

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState("指定なし");
  const [people, setPeople] = useState(2);
  const [genre, setGenre] = useState("指定なし");

  const BACKEND_URL = "https://tech0-gen-8-step3-app-py-10.azurewebsites.net";

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/restaurants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          area: area === "指定なし" ? "" : area,
          people,
          genre: genre === "指定なし" ? "" : genre,
        }),
      });

      if (!res.ok) {
        throw new Error(`レストラン検索が失敗しました: ${res.status}`);
      }

      const data = await res.json();
      setSearchResults(data.restaurants || []);
    } catch (error) {
      console.error("検索エラー:", error);
      alert("検索中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      {/* 検索フォーム */}
      <div style={{ padding: "20px" }}>
        <h2>会食用のお店を検索</h2>
        <div>
          <label>エリア</label>
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="指定なし">指定なし</option>
            <option value="福岡県福岡市中央区">福岡市中央区</option>
          </select>
        </div>
        <div>
          <label>人数</label>
          <input
            type="number"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          />
        </div>
        <div>
          <label>ジャンル</label>
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="指定なし">指定なし</option>
            <option value="寿司">寿司</option>
          </select>
        </div>
        <button onClick={handleSearch}>検索する</button>
      </div>

      {/* 検索結果 */}
      <Results searchResults={searchResults} loading={loading} />

    </div>
  );
}
