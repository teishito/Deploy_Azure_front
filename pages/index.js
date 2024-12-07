import { useState, useEffect } from "react";

export default function Home() {
  // 状態管理
  const [homeResponse, setHomeResponse] = useState("");
  const [getResponse, setGetResponse] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-900 p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">FortuneDinner</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>予約・履歴</li>
            <li>お気に入り</li>
            <li>レポート</li>
          </ul>
        </nav>
      </header>

      <main className="max-w-screen-lg mx-auto py-6 px-4">
        <section className="bg-gray-800 p-6 rounded-lg mb-4">
          <h2 className="text-xl font-bold">Flaskサーバーの起動確認</h2>
          <button
            onClick={fetchHome}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            ホームエンドポイントにアクセス
          </button>
          {homeResponse && <p className="mt-4">{homeResponse}</p>}
        </section>

        <section className="bg-gray-800 p-6 rounded-lg mb-4">
          <h2 className="text-xl font-bold">GETリクエスト</h2>
          <button
            onClick={handleGetRequest}
            className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            GETリクエストを送信
          </button>
          {getResponse && <p className="mt-4">{getResponse}</p>}
        </section>

        <section className="bg-gray-800 p-6 rounded-lg mb-4">
          <h2 className="text-xl font-bold">検索条件を入力</h2>
          <div className="flex flex-col space-y-4">
            <label>
              エリア:
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="block w-full mt-1 p-2 bg-gray-900 text-white border border-gray-700 rounded"
              >
                <option value="">エリアを選択</option>
                <option value="福岡">福岡</option>
                <option value="博多">博多</option>
              </select>
            </label>
            <label>
              人数:
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="block w-full mt-1 p-2 bg-gray-900 text-white border border-gray-700 rounded"
              />
            </label>
            <label>
              ジャンル:
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="block w-full mt-1 p-2 bg-gray-900 text-white border border-gray-700 rounded"
              >
                <option value="">ジャンルを選択</option>
                <option value="和食">和食</option>
                <option value="洋食">洋食</option>
              </select>
            </label>
            <button
              onClick={handleSearch}
              className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
            >
              検索
            </button>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg mb-4">
          <h2 className="text-xl font-bold">検索結果</h2>
          {loading && <p>データを取得中...</p>}
          {filteredRestaurants.length > 0 ? (
            <ul className="space-y-4">
              {filteredRestaurants.map((restaurant, index) => (
                <li key={index} className="border p-4 rounded-md bg-gray-900 text-white">
                  <h3 className="font-bold">{restaurant[1]}</h3>
                  <p>住所: {restaurant[2]}</p>
                  <p>
                    評価: {restaurant[3]} ({restaurant[4]}件のレビュー)
                  </p>
                  <a
                    href={restaurant[5]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
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
