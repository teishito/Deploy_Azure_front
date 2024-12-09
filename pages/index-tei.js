import { useState } from "react";
  
export default function Home() {
  // 状態管理
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const [getResponse, setGetResponse] = useState(""); // GETリクエストの応答
  const [homeResponse, setHomeResponse] = useState(""); // ホームエンドポイントの応答
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState("指定なし");
  const [people, setPeople] = useState(2);
  const [genre, setGenre] = useState("指定なし");
  
  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = (restaurant) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(restaurant)
        ? prevFavorites.filter((fav) => fav !== restaurant) // 既にお気に入りの場合は削除
        : [...prevFavorites, restaurant] // 追加
    );
  };
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
    console.log("fetchHome関数が呼び出されました");
    try {
      const res = await fetch('https://tech0-gen-8-step3-app-py-10.azurewebsites.net/', {
        method: 'GET',
      });
      console.log("HTTPリクエストが送信されました");
  
      if (!res.ok) {
        throw new Error(`HTTPエラー: ${res.status} - ${res.statusText}`);
      }
  
      const data = await res.json();
      console.log("レスポンスを受信しました:", data);
  
      // サーバーからのレスポンスをセット
      setHomeResponse(data.message || "応答の形式が不正です");
    } catch (error) {
      console.error("fetchHome関数内のエラー:", error);
      setHomeResponse("エラーが発生しました");
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
    <>
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
        <h1 style={{ fontSize: "20px", margin: 0 }}>FortuneDinner</h1>

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
              minWidth: "150px", // メニューの最小幅を設定
              whiteSpace: "nowrap", // テキストの折り返しを防止
            }}
          >
            <li style={{ padding: "8px 0", cursor: "pointer" }}>予約・閲覧履歴</li>
            <li style={{ padding: "8px 0", cursor: "pointer" }}>お気に入り</li>
            <li style={{ padding: "8px 0", cursor: "pointer" }}>レポート</li>
            <li style={{ padding: "8px 0", cursor: "pointer" }}>マイページ</li>
            <li style={{ padding: "8px 0", cursor: "pointer" }}>プラン</li>
            <li style={{ padding: "8px 0", cursor: "pointer" }}>ログアウト</li>
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
  
          <h2>------------------------------</h2>
  
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
                 <div
                  key={index}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    padding: "20px",
                    marginBottom: "20px",
                    textAlign: "left", // 左寄せ
                    position: "relative", // ハートの位置調整用
                  }}
                >
                  {/* お気に入りボタン */}
                  <button
                    onClick={() => toggleFavorite(result)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "none",
                      border: "none",
                      color: favorites.includes(result) ? "red" : "gray",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    {favorites.includes(result) ? "お気に入り解除" : "お気に入り"}
                  </button>
                
                  {/* 店名と住所 */}
                  <h2 style={{ margin: "40px 0 10px 0", fontSize: "18px", fontWeight: "bold" }}>
                    {result.name}
                  </h2>
                  <p style={{ marginBottom: "10px", color: "#555" }}>{result.address}</p>
                
                  {/* 説明 */}
                  <p style={{ margin: "10px 0" }}>{result.description}</p>
                
                  {/* 価格、評価 */}
                  <p style={{ margin: "10px 0" }}>
                    <strong>価格:</strong> ¥{result.budget_min}〜¥{result.budget_max}
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <strong>食べログ評価:</strong> {result.tabelog_rating || "評価なし"}
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <strong>Google Map評価:</strong> {result.google_rating || "評価なし"}
                  </p>
                
                  {/* 詳細ページボタン */}
                  <a
                    href={result.detailPageLink}
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      padding: "10px 20px",
                      backgroundColor: "#007BFF",
                      color: "#fff",
                      textDecoration: "none",
                      borderRadius: "4px",
                      fontWeight: "bold",
                    }}
                  >
                    詳細ページへ
                  </a>
                </div>
              ))}
            </ul>
          ) : (
            <p style={{ textAlign: "center", color: "#555" }}>
              該当するお店が見つかりませんでした。
            </p>
          )}
        </div>
      </div>

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
    </>
  );
}
