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
    <div>
      <h1>Fortune-Dinner</h1>

      {/* ホームエンドポイント */}
      <h2>Flaskサーバーの起動確認</h2>
      <button onClick={fetchHome}>ホームエンドポイントにアクセス</button>
      {homeResponse && <p>サーバーからの応答: {homeResponse}</p>}

      {/* GETリクエスト */}
      <h2>GETリクエストを送信</h2>
      <button onClick={handleGetRequest}>GETリクエストを送信</button>
      {getResponse && <p>サーバーからのGET応答: {getResponse}</p>}

      {/* レストランデータ取得 */}
      <h2>レストランデータを取得</h2>
      <button onClick={fetchRestaurants}>レストラン情報を取得</button>
      {loading && <p>データを取得中...</p>}
      {restaurants.length > 0 && (
        <div>
          <h3>レストラン一覧</h3>
          <ul>
            {restaurants.map((restaurant, index) => (
              <li key={index}>
                <strong>{restaurant[1]}</strong> ({restaurant[2]})<br />
                評価: {restaurant[3]} ({restaurant[4]}件のレビュー)<br />
                <a href={restaurant[5]} target="_blank" rel="noopener noreferrer">食べログリンク</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
