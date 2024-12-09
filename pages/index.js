import { useState } from "react";

//export default function Header() {
//  const [menuOpen, setMenuOpen] = useState(false);

//  const toggleMenu = () => {
//    setMenuOpen(!menuOpen);
//  };
  
export default function Home() {
  // 状態管理
  const [menuOpen, setMenuOpen] = useState(false); // ハンバーガーメニューの状態
  const [getResponse, setGetResponse] = useState(""); // GETリクエストの応答
  const [homeResponse, setHomeResponse] = useState(""); // ホームエンドポイントの応答
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState("指定なし");
  const [people, setPeople] = useState(2);
  const [genre, setGenre] = useState("指定なし");

  const BACKEND_URL = "https://tech0-gen-8-step3-app-py-10.azurewebsites.net";

  // GETリクエスト（/api/hello）
  const handleGetRequest = async () => {
    try {
      console.log("GETリクエストを送信します...");
      const res = await fetch(`${BACKEND_URL}/api/hello`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error(`GETリクエストが失敗しました: ${res.status}`);
      }
      const data = await res.json();
      console.log("GETリクエストの結果:", data);
      setGetResponse(data.message || "応答の形式が不正です");
    } catch (error) {
      console.error("GETリクエストエラー:", error);
      setGetResponse("エラーが発生しました");
    }
  };

  // ホームエンドポイント（/）
  const fetchHome = async () => {
    try {
      console.log("ホームエンドポイントにアクセスします...");
      const res = await fetch(`${BACKEND_URL}/`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error(`ホームエンドポイントが失敗しました: ${res.status}`);
      }
      const data = await res.json();
      console.log("ホームエンドポイントの結果:", data);
      setHomeResponse(data.message || "応答の形式が不正です");
    } catch (error) {
      console.error("ホームエンドポイントエラー:", error);
      setHomeResponse("エラーが発生しました");
    }
  };

  // レストランデータ取得（/api/restaurants）
  const handleSearch = async () => {
    setLoading(true);
    try {
      console.log("レストランデータを検索します...");
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
      console.log("レストラン検索の結果:", data);
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
    <header
      style={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* ロゴ */}
      <h1
        style={{
          fontSize: "20px",
          margin: 0,
          fontWeight: "bold",
        }}
      >
        FortuneDinner
      </h1>

      {/* ハンバーガーメニュー */}
      <div style={{ position: "relative" }}>
        <button
          onClick={toggleMenu}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {/* ハンバーガーアイコン */}
          <div
            style={{
              width: "25px",
              height: "3px",
              backgroundColor: "#fff",
              margin: "4px 0",
            }}
          />
          <div
            style={{
              width: "25px",
              height: "3px",
              backgroundColor: "#fff",
              margin: "4px 0",
            }}
          />
          <div
            style={{
              width: "25px",
              height: "3px",
              backgroundColor: "#fff",
              margin: "4px 0",
            }}
          />
        </button>

        {/* ドロップダウンメニュー */}
        {menuOpen && (
          <ul
            style={{
              position: "absolute",
              top: "40px",
              right: 0,
              backgroundColor: "#fff",
              color: "#000",
              listStyle: "none",
              margin: 0,
              padding: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
              zIndex: 1000,
            }}
          >
            <li style={{ padding: "8px 0" }}>予約・閲覧履歴</li>
            <li style={{ padding: "8px 0" }}>お気に入り</li>
            <li style={{ padding: "8px 0" }}>レポート</li>
            <li style={{ padding: "8px 0" }}>マイページ</li>
            <li style={{ padding: "8px 0" }}>プラン</li>
            <li style={{ padding: "8px 0" }}>ログアウト</li>
          </ul>
        )}
      </div>
    </header>    
    <div style={containerStyle}>
      {/* 検索フォーム */}
      <div style={boxStyle}>
        {/* ホームエンドポイント */}
        <h2 style={{ fontSize: "16px", color: "#555", marginBottom: "20px" }}>Flaskサーバーの起動確認</h2>
        <button onClick={fetchHome} style={buttonStyle}>
          ホームエンドポイントにアクセス
        </button>
        {homeResponse ? (
          <p>サーバーからの応答: {homeResponse}</p>
        ) : (
          <p>応答を待機中...</p>
        )}

        {/* GETリクエスト */}
        <h2 style={{ fontSize: "16px", color: "#555", marginBottom: "20px" }}>GETリクエストを送信</h2>
        <button onClick={handleGetRequest} style={buttonStyle}>
          GETリクエストを送信
        </button>
        {getResponse ? (
          <p>サーバーからのGET応答: {getResponse}</p>
        ) : (
          <p>応答を待機中...</p>
        )}

        <h2>----------</h2>

        {/* レストランデータ取得 */}
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
            <option value="福岡県福岡市中央区">福岡市中央区</option>
            <option value="福岡県福岡市博多区">福岡市博多区</option>
            <option value="福岡県福岡市早良区">福岡市早良区</option>
            <option value="福岡県福岡市東区">福岡市東区</option>
            <option value="福岡県福岡市南区">福岡市南区</option>
            <option value="福岡県福岡市西区">福岡市西区</option>
            <option value="福岡県福岡市城南区">福岡市城南区</option>
            <option value="福岡県北九州市小倉北区">北九州市小倉北区</option>
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
            <option value="ビストロ">ビストロ</option>
            <option value="焼き鳥">焼き鳥</option>
            <option value="居酒屋">居酒屋</option>
            <option value="寿司">寿司</option>
            <option value="イタリアン">イタリアン</option>
            <option value="餃子">餃子</option>
            <option value="焼肉">焼肉</option>
            <option value="フレンチ">フレンチ</option>
            <option value="日本料理">日本料理</option>
            <option value="鍋">鍋</option>
            <option value="鉄板焼き">鉄板焼き</option>
            <option value="ステーキ">ステーキ</option>
            <option value="串揚げ">串揚げ</option>
            <option value="しゃぶしゃぶ">しゃぶしゃぶ</option>
            <option value="レストラン">レストラン</option>
            <option value="そば">そば</option>
            <option value="海鮮">海鮮</option>
            <option value="水炊き">水炊き</option>
            <option value="ジンギスカン">ジンギスカン</option>
            <option value="うなぎ">うなぎ</option>
            <option value="肉料理">肉料理</option>
            <option value="中華料理">中華料理</option>
            <option value="すっぽん">すっぽん</option>
            <option value="韓国料理">韓国料理</option>
            <option value="インド料理">インド料理</option>
            <option value="もつ鍋">もつ鍋</option>
            <option value="鳥料理">鳥料理</option>
            <option value="ラーメン">ラーメン</option>
            <option value="ダイニングバー">ダイニングバー</option>
          </select>

       {/* 詳細検索リンク */}
        <p style={{ fontSize: '14px', textAlign: 'right', color: '#007BFF', cursor: 'pointer', margin: '10px 0' }}>
          詳細検索はこちら
        </p>
            
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
