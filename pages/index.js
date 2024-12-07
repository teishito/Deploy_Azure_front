import { useState, useEffect } from "react";
// Headerコンポーネントの存在確認
let Header;
try {
  Header = require("../components/Header").default;
} catch (error) {
  console.warn("Headerコンポーネントが見つかりません:", error.message);
  Header = () => <div style={{ color: "red" }}>Headerコンポーネントが見つかりません</div>;
}

// react-chartjs-2 の存在確認
let Chart;
try {
  Chart = require("react-chartjs-2").Bar;
} catch (error) {
  console.warn("react-chartjs-2が見つかりません:", error.message);
  Chart = () => <div style={{ color: "red" }}>Chart.jsが見つかりません</div>;
}

export default function Home() {
  const [homeResponse, setHomeResponse] = useState("");
  const [getResponse, setGetResponse] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const [area, setArea] = useState("");
  const [guests, setGuests] = useState(2);
  const [genre, setGenre] = useState("");

  // ホームエンドポイントのデータを取得
  const fetchHome = async () => {
    try {
      const res = await fetch("https://tech0-gen-8-step3-app-py-10.azurewebsites.net/", { method: "GET" });
      const data = await res.text();
      setHomeResponse(data);
    } catch (error) {
      console.error("ホームエンドポイントの取得中にエラー:", error.message);
      setHomeResponse("エラーが発生しました");
    }
  };

  // GETリクエスト（/api/hello）
  const handleGetRequest = async () => {
    try {
      const res = await fetch("https://tech0-gen-8-step3-app-py-10.azurewebsites.net/api/hello", { method: "GET" });
      const data = await res.json();
      setGetResponse(data.message || "エラーが発生しました");
    } catch (error) {
      console.error("GETリクエストの取得中にエラー:", error.message);
      setGetResponse("エラーが発生しました");
    }
  };

  // レストランデータの取得
  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://tech0-gen-8-step3-app-py-10.azurewebsites.net/api/restaurants", { method: "GET" });
      const data = await res.json();
      setRestaurants(data);
      setFilteredRestaurants(data);
    } catch (error) {
      console.error("レストランデータの取得中にエラー:", error.message);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  // 検索機能
  const handleSearch = () => {
    const filtered = restaurants.filter((restaurant) => {
      const matchesArea = area ? restaurant[18]?.includes(area) : true;
      const matchesGuests = guests ? restaurant[20] >= guests : true;
      const matchesGenre = genre ? restaurant[22]?.includes(genre) : true;
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
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-screen-lg mx-auto py-6 px-4">
        <section className="bg-white p-6 rounded-lg shadow mb-4">
          <h1 className="text-2xl font-bold mb-4">FortuneDinner</h1>
          <h2 className="text-lg font-semibold">Flaskサーバーの状態</h2>
          <button
            onClick={fetchHome}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            ホームエンドポイントにアクセス
          </button>
          {homeResponse && <p className="mt-4">{homeResponse}</p>}
        </section>

        <section className="bg-white p-6 rounded-lg shadow mb-4">
          <h2 className="text-lg font-semibold">GETリクエスト</h2>
          <button
            onClick={handleGetRequest}
            className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            GETリクエストを送信
          </button>
          {getResponse && <p className="mt-4">{getResponse}</p>}
        </section>

        <section className="bg-white p-6 rounded-lg shadow mb-4">
          <h2 className="text-lg font-semibold">検索条件を入力</h2>
          <div className="mb-4">
            <label className="block">
              エリア:
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="block w-full mt-2 p-2 bg-gray-100 border rounded"
              >
                <option value="">エリアを選択</option>
                <option value="福岡">福岡</option>
                <option value="博多">博多</option>
              </select>
            </label>
          </div>
          <div className="mb-4">
            <label className="block">
              人数:
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="block w-full mt-2 p-2 bg-gray-100 border rounded"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block">
              ジャンル:
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="block w-full mt-2 p-2 bg-gray-100 border rounded"
              >
                <option value="">ジャンルを選択</option>
                <option value="和食">和食</option>
                <option value="洋食">洋食</option>
              </select>
            </label>
          </div>
          <button
            onClick={handleSearch}
            className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
          >
            検索
          </button>
        </section>

        <section className="bg-white p-6 rounded-lg shadow mb-4">
          <h2 className="text-lg font-semibold">検索結果</h2>
          {loading && <p>データを取得中...</p>}
          {filteredRestaurants.length > 0 ? (
            <ul>
              {filteredRestaurants.map((restaurant, index) => (
                <li key={index} className="border-b p-4">
                  <h3 className="font-bold">{restaurant[1]}</h3>
                  <p>住所: {restaurant[2]}</p>
                  <p>
                    評価: {restaurant[3]} ({restaurant[4]}件のレビュー)
                  </p>
                  <a
                    href={restaurant[5]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    食べログリンク
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>条件に一致するレストランが見つかりませんでした。</p>
          )}
        </section>
      </main>
    </div>
  );
}
