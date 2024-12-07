import { useState, useEffect } from "react";

export default function Home() {
  // 状態管理
  const [homeResponse, setHomeResponse] = useState("");
  const [getResponse, setGetResponse] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  // 検索条件
  const [area, setArea] = useState("");
  const [guests, setGuests] = useState(2);
  const [genre, setGenre] = useState("");

  // ホームエンドポイントのデータを取得
  const fetchHome = async () => {
    try {
      const res = await fetch("https://tech0-gen-8-step3-app-py-10.azurewebsites.net/", {
        method: "GET",
      });
      const data = await res.text(); // テキストレスポンスを取得
      setHomeResponse(data);
    } catch (error) {
      console.error("ホームエンドポイントの取得中にエラー:", error);
      setHomeResponse("エラーが発生しました");
    }
  };

  // GETリクエスト（/api/hello）
  const handleGetRequest = async () => {
    try {
      const res = await fetch("https://tech0-gen-8-step3-app-py-10.azurewebsites.net/api/hello", {
        method: "GET",
      });
      const data = await res.json();
      setGetResponse(data.message || "エラーが発生しました");
    } catch (error) {
      console.error("GETリクエストの取得中にエラー:", error);
      setGetResponse("エラーが発生しました");
    }
  };

  // `/api/restaurants` エンドポイントのデータを取得
  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://tech0-gen-8-step3-app-py-10.azurewebsites.net/api/restaurants", {
        method: "GET",
      });
      const data = await res.json();
      setRestaurants(data);
      setFilteredRestaurants(data); // 初期表示はすべてのレストランを表示
    } catch (error) {
      console.error("レストランデータの取得中にエラー:", error);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  // 検索機能
  const handleSearch = () => {
    const filtered = restaurants.filter((restaurant) => {
      const matchesArea = area ? restaurant[18]?.includes(area) : true; // エリアはインデックス18
      const matchesGuests = guests ? restaurant[20] >= guests : true; // キャパシティはインデックス20
      const matchesGenre = genre ? restaurant[22]?.includes(genre) : true; // ジャンルはインデックス22
      return matchesArea && matchesGuests && matchesGenre;
    });
    setFilteredRestaurants(filtered);
  };

  // 初期データ取得
  useEffect(() => {
    fetchHome();
    fetchRestaurants();
  }, []);

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

      {/* 検索フォーム */}
      <h2>検索条件を入力</h2>
      <div>
        <label>
          エリア:
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="">エリアを選択</option>
            <option value="福岡">福岡</option>
            <option value="博多">博多</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          人数:
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          ジャンル:
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">ジャンルを選択</option>
            <option value="和食">和食</option>
            <option value="洋食">洋食</option>
          </select>
        </label>
      </div>
      <button onClick={handleSearch}>検索</button>

      {/* レストランデータ */}
      <h2>レストランデータを取得</h2>
      <button onClick={fetchRestaurants}>レストラン情報を取得</button>
      {loading && <p>データを取得中...</p>}
      {filteredRestaurants.length > 0 ? (
        <div>
          <h3>レストラン一覧</h3>
          <ul>
            {filteredRestaurants.map((restaurant, index) => (
              <li key={index}>
                <strong>{restaurant[1]}</strong> ({restaurant[2]})<br />
                評価: {restaurant[3]} ({restaurant[4]}件のレビュー)<br />
                <a href={restaurant[5]} target="_blank" rel="noopener noreferrer">
                  食べログリンク
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>条件に一致するレストランが見つかりませんでした。</p>
      )}
    </div>
  );
}
