import { useState } from 'react';

export default function Home() {
  // 状態管理
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

        {/* エリア選択 */}
        <label style={{ fontSize: '14px', color: '#555' }}>エリア</label>
        <select
          style={{
            width: '100%',
            padding: '8px',
            margin: '8px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          <option>エリアを選択</option>
        </select>

        {/* 人数 */}
        <label style={{ fontSize: '14px', color: '#555' }}>人数</label>
        <input
          type="number"
          placeholder="2"
          style={{
            width: '100%',
            padding: '8px',
            margin: '8px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />

        {/* ジャンル */}
        <label style={{ fontSize: '14px', color: '#555' }}>ジャンル</label>
        <select
          style={{
            width: '100%',
            padding: '8px',
            margin: '8px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          <option>選択してください</option>
        </select>

        {/* 詳細検索リンク */}
        <p style={{ fontSize: '14px', textAlign: 'right', color: '#007BFF', cursor: 'pointer', margin: '10px 0' }}>
          詳細検索はこちら
        </p>

        {/* 検索ボタン */}
        <button
          onClick={fetchRestaurants}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          お店を検索する
        </button>
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
