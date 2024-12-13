import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  // 状態管理
  const [area, setArea] = useState("指定なし");
  const [people, setPeople] = useState(2);
  const [genre, setGenre] = useState("指定なし");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const BACKEND_URL = "https://tech0-gen-8-step3-app-py-10.azurewebsites.net";

  // 検索処理
  const handleSearch = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/restaurants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          area: area === "指定なし" ? "" : area,
          genre: genre === "指定なし" ? "" : genre,
          people,
        }),
      });

      if (!response.ok) {
        throw new Error(`検索に失敗しました: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data.restaurants || []);
    } catch (err) {
      setError(err.message || "予期しないエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Arial', sans-serif", padding: "20px" }}>
      <header style={{ backgroundColor: "#000", color: "#fff", padding: "10px" }}>
        <h1 style={{ margin: 0 }}>FortuneDinner</h1>
      </header>

      <main style={{ maxWidth: "600px", margin: "20px auto" }}>
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ textAlign: "center" }}>会食用のお店を検索</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            {/* エリア */}
            <label style={{ display: "block", marginBottom: "10px" }}>
              エリア
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                style={{ width: "100%", padding: "8px", marginTop: "5px", border: "1px solid #ccc", borderRadius: "4px" }}
              >
                <option value="指定なし">指定なし</option>
                <option value="福岡県福岡市中央区">福岡市中央区</option>
                <option value="福岡県福岡市博多区">福岡市博多区</option>
                <option value="福岡県福岡市早良区">福岡市早良区</option>
                <option value="福岡県福岡市東区">福岡市東区</option>
                <option value="福岡県福岡市南区">福岡市南区</option>
                <option value="福岡県福岡市西区">福岡市西区</option>
                <option value="福岡県福岡市城南区">福岡市城南区</option>
                <option value="福岡県北九州市小倉北区">北九州市小倉北区</option>
              </select>
            </label>

            {/* 人数 */}
            <label style={{ display: "block", marginBottom: "10px" }}>
              人数
              <input
                type="number"
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
                style={{ width: "100%", padding: "8px", marginTop: "5px", border: "1px solid #ccc", borderRadius: "4px" }}
                min={1}
              />
            </label>

            {/* ジャンル */}
            <label style={{ display: "block", marginBottom: "10px" }}>
              ジャンル
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                style={{ width: "100%", padding: "8px", marginTop: "5px", border: "1px solid #ccc", borderRadius: "4px" }}
              >
              <option value="指定なし">指定なし</option>
              
              {/* 日本料理 */}
              <option value="寿司">寿司</option>
              <option value="日本料理">日本料理</option>
              <option value="そば">そば</option>
              <option value="うなぎ">うなぎ</option>
              <option value="鍋">鍋</option>
              <option value="水炊き">水炊き</option>
              <option value="しゃぶしゃぶ">しゃぶしゃぶ</option>
              <option value="すっぽん">すっぽん</option>
              <option value="もつ鍋">もつ鍋</option>
              
              {/* グローバル料理 */}
              <option value="イタリアン">イタリアン</option>
              <option value="フレンチ">フレンチ</option>
              <option value="韓国料理">韓国料理</option>
              <option value="インド料理">インド料理</option>
              <option value="中華料理">中華料理</option>
              
              {/* 肉料理 */}
              <option value="焼肉">焼肉</option>
              <option value="焼き鳥">焼き鳥</option>
              <option value="鳥料理">鳥料理</option>
              <option value="ステーキ">ステーキ</option>
              <option value="肉料理">肉料理</option>
              <option value="ジンギスカン">ジンギスカン</option>
              
              {/* バー・居酒屋 */}
              <option value="居酒屋">居酒屋</option>
              <option value="ダイニングバー">ダイニングバー</option>
              
              {/* カジュアル */}
              <option value="ビストロ">ビストロ</option>
              <option value="レストラン">レストラン</option>
              <option value="餃子">餃子</option>
              <option value="ラーメン">ラーメン</option>
              
              {/* 海鮮料理 */}
              <option value="海鮮">海鮮</option>
              
              {/* その他 */}
              <option value="鉄板焼き">鉄板焼き</option>
              <option value="串揚げ">串揚げ</option>
              </select>
            </label>

            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#007BFF",
                color: "#fff",
                padding: "10px",
                border: "none",
                borderRadius: "4px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              検索する
            </button>
          </form>
        </div>

        {/* 検索結果 */}
        <div style={{ marginTop: "20px" }}>
          {loading && <p style={{ textAlign: "center", color: "#555" }}>検索中...</p>}
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          {searchResults.length > 0 && (
            <ul style={{ padding: "0", listStyleType: "none" }}>
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    padding: "20px",
                    marginBottom: "10px",
                  }}
                >
                  <h3>{result.name}</h3>
                  <p>エリア: {result.area}</p>
                  <p>ジャンル: {result.category}</p>
                  <p>予算: ¥{result.budget_min} ~ ¥{result.budget_max}</p>
                </li>
              ))}
            </ul>
          )}
          {searchResults.length === 0 && !loading && !error && <p style={{ textAlign: "center" }}>条件に一致するお店が見つかりませんでした。</p>}
        </div>
      </main>
    </div>
  );
}
