import { useState } from "react";

export default function Home() {
  // 状態管理
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState("指定なし");
  const [people, setPeople] = useState(2);
  const [genre, setGenre] = useState("指定なし");

  const BACKEND_URL = "https://tech0-gen-8-step3-app-py-10.azurewebsites.net";

    // GETリクエスト（/api/hello）
  const handleGetRequest = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/hello`, {
        method: "GET",
      });
      const data = await res.json();
      console.log("GETリクエストの結果:", data.message);
      setGetResponse(data.message);
    } catch (error) {
      console.error("GETリクエストエラー:", error);
    }
  };

  // ホームエンドポイント（/）
  const fetchHome = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/`, {
        method: "GET",
      });
      const data = await res.json();
      console.log("ホームエンドポイントの結果:", data.message);
      setHomeResponse(data.message);
    } catch (error) {
      console.error("ホームエンドポイントエラー:", error);
    }
  };

  // レストランデータ取得（/api/restaurants）
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
        throw new Error("検索に失敗しました");
      }

      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("検索エラー:", error);
      alert("検索中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  // スタイル設定
  const containerStyle = {
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const boxStyle = {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    marginBottom: "20px",
  };

  const buttonStyle = {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
  };

  return (
    <div style={containerStyle}>
      {/* 検索フォーム */}
      <div style={boxStyle}>
        <h1 style={{ fontSize: "24px", color: "#333", marginBottom: "20px" }}>
          FortuneDinner
        </h1>
        <h2 style={{ fontSize: "16px", color: "#555", marginBottom: "20px" }}>
          会食用のお店を検索
        </h2>
        <div style={{ marginBottom: "10px" }}>
          <label>エリア</label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <option value="指定なし">指定なし</option>
            <option value="東京">東京</option>
            <option value="大阪">大阪</option>
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>人数</label>
          <input
            type="number"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>ジャンル</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <option value="指定なし">指定なし</option>
            <option value="和食">和食</option>
            <option value="イタリアン">イタリアン</option>
          </select>
        </div>
        <button onClick={handleSearch} style={buttonStyle}>
          検索する
        </button>
      </div>

      {/* 検索結果表示 */}
      <div style={boxStyle}>
        <h2 style={{ fontSize: "20px", color: "#333", marginBottom: "10px" }}>
          検索結果
        </h2>
        {loading ? (
          <p style={{ textAlign: "center", color: "#555" }}>検索中...</p>
        ) : searchResults.length > 0 ? (
          <ul style={{ padding: 0, listStyleType: "none" }}>
            {searchResults.map((result, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  textAlign: "left",
                }}
              >
                <strong>{result.name}</strong> ({result.area})<br />
                評価: {result.rating} ({result.reviews}件のレビュー)<br />
                <a
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#007BFF" }}
                >
                  食べログリンク
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: "center", color: "#555" }}>
            該当するお店が見つかりませんでした。
          </p>
        )}
      </div>

      {/* フッター */}
      <footer
        style={{
          marginTop: "20px",
          fontSize: "12px",
          color: "#888",
          textAlign: "center",
        }}
      >
        © 2024 FortuneDinner. All rights reserved.
      </footer>
    </div>
  );
}
