import { useState } from "react";

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
      const res = await fetch(`${BACKEND_URL}/api/search`, {
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

  return (
    <div
      style={{
        fontFamily: "'Arial', sans-serif",
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h1 style={{ fontSize: '24px', textAlign: 'center', color: '#333', marginBottom: '20px' }}>
          FortuneDinner
        </h1>
        <h2 style={{ fontSize: '16px', marginBottom: '10px', color: '#555' }}>会食用のお店を検索</h2>
 
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
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: "#007BFF",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          検索する
        </button>
      </div>

      <div
        style={{
          marginTop: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          maxWidth: "600px",
          margin: "20px auto",
        }}
      >
        <h2 style={{ fontSize: "20px", color: "#333", marginBottom: "10px" }}>
          検索結果
        </h2>
        {loading ? (
          <p style={{ textAlign: "center", color: "#555" }}>検索中...</p>
        ) : searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                {result.name} - {result.area} - ¥{result.price}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: "center", color: "#555" }}>
            該当するお店が見つかりませんでした。
          </p>
        )}
      </div>
    </div>

      {/* フッター */}
      <footer
        style={{
          marginTop: '20px',
          fontSize: '12px',
          color: '#888',
        }}
      >
        © 2024 FortuneDinner. All rights reserved.
      </footer>
    </div>
  );
}
