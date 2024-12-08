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
        padding: "20px",
      }}
    >
      {/* 検索フォーム */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          maxWidth: "400px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "24px", color: "#333", marginBottom: "20px" }}>
          会食用のお店を検索
        </h1>
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

      {/* 検索結果表示 */}
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
        <div
          style={{
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <p style={{ margin: "5px 0" }}>エリア: {area}</p>
          <p style={{ margin: "5px 0" }}>人数: {people}人</p>
          <p style={{ margin: "5px 0" }}>ジャンル: {genre}</p>
        </div>
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
  );
}
