import { useState } from 'react';

export default function Home() {
  // GETリクエスト（/api/hello）用の状態
  const [getResponse, setGetResponse] = useState('');

  const handleGetRequest = async () => {
    const res = await fetch('https://tech0-gen-8-step3-app-py-10.azurewebsites.net/api/hello', {
      method: 'GET',
    });
    const data = await res.json();

    // GETリクエストの結果を更新
    console.log("GETリクエストの結果:", data.message);
    setGetResponse(data.message);
  };

  // ホームエンドポイント（/）用の状態
  const [homeResponse, setHomeResponse] = useState('');

  const fetchHome = async () => {
    const res = await fetch('https://tech0-gen-8-step3-app-py-10.azurewebsites.net/', {
      method: 'GET',
    });
    const data = await res.json();

    // ホームエンドポイントの結果を更新
    console.log("ホームエンドポイントの結果:", data.message);
    setHomeResponse(data.message);
  };

  // レストランデータ取得用の状態管理
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRestaurants = async () => {
    setLoading(true); // ローディング状態を設定
    try {
      const res = await fetch('https://tech0-gen-8-step3-app-py-10.azurewebsites.net/api/restaurants', {
        method: 'GET',
      });
      const data = await res.json();
      setRestaurants(data); // レストランデータを状態に保存
    } catch (error) {
      console.error("エラーが発生しました:", error);
    } finally {
      setLoading(false); // ローディング状態を解除
    }
  };
  
  
  return (
    <div
      style={{
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* メイン検索部分 */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "24px", color: "#333", marginBottom: "20px" }}>
          会食用のお店を検索
        </h1>
        <button
          onClick={() => setShowDetailSearch(!showDetailSearch)}
          style={{
            backgroundColor: "#007BFF",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          詳細検索はこちら
        </button>
      </div>

      {/* 詳細検索フォーム */}
      {showDetailSearch && (
        <div
          style={{
            marginTop: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <h2 style={{ fontSize: "18px", color: "#333", marginBottom: "10px" }}>
            詳細検索
          </h2>
          <label style={{ fontSize: "14px", color: "#555", display: "block", marginBottom: "5px" }}>
            エリア
          </label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <option value="">エリアを選択</option>
            <option value="Tokyo">東京</option>
            <option value="Osaka">大阪</option>
          </select>

          <label style={{ fontSize: "14px", color: "#555", display: "block", marginBottom: "5px" }}>
            人数
          </label>
          <input
            type="number"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            placeholder="2"
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />

          <label style={{ fontSize: "14px", color: "#555", display: "block", marginBottom: "5px" }}>
            ジャンル
          </label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <option value="">ジャンルを選択</option>
            <option value="Japanese">和食</option>
            <option value="Italian">イタリアン</option>
          </select>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="number"
              value={budgetMin}
              onChange={(e) => setBudgetMin(e.target.value)}
              placeholder="予算（下限）"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <input
              type="number"
              value={budgetMax}
              onChange={(e) => setBudgetMax(e.target.value)}
              placeholder="予算（上限）"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <button
            onClick={handleSearch}
            style={{
              marginTop: "20px",
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
      )}

      {/* 検索結果表示 */}
      {loading ? (
        <p style={{ marginTop: "20px", color: "#555" }}>検索中...</p>
      ) : (
        searchResults.length > 0 && (
          <div
            style={{
              marginTop: "20px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "20px",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <h2 style={{ fontSize: "18px", color: "#333", marginBottom: "10px" }}>検索結果</h2>
            <ul>
              {searchResults.map((result, index) => (
                <li key={index} style={{ marginBottom: "10px" }}>
                  {result.name} - {result.area} - ¥{result.price}
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
}
