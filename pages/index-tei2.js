import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  // 状態管理
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const [getResponse, setGetResponse] = useState(""); // GETリクエストの応答
  const [homeResponse, setHomeResponse] = useState(""); // ホームエンドポイントの応答
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState("指定なし");
  const [guests, setGuests] = useState(2);
  const [genre, setGenre] = useState("指定なし");
  const [favorites, setFavorites] = useState([]);
  const BACKEND_URL = "https://tech0-gen-8-step3-app-py-10.azurewebsites.net";

  // 初回ロード時にお気に入りを復元
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // お気に入りの永続化
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (restaurant) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(restaurant)
        ? prevFavorites.filter((fav) => fav !== restaurant)
        : [...prevFavorites, restaurant]
    );
  };
  
  // GETリクエスト（/api/hello）
  const handleGetRequest = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/hello`, {
        method: "GET",
      });
      if (!res.ok) throw new Error(`GETリクエスト失敗: ${res.status}`);
      const data = await res.json();
      setGetResponse(data.message || "応答形式が不正です");
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
  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/restaurants`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          area: area === "指定なし" ? "" : area,
          people: guests,
          genre: genre === "指定なし" ? "" : genre,
        }),
      });
      if (!res.ok) throw new Error(`検索失敗: ${res.status}`);
      const data = await res.json();
      setSearchResults(data.restaurants || []);
    } catch (error) {
      console.error("検索エラー:", error);
      alert(`エラーが発生しました: ${error.message}`);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // 条件リセット
  const resetFilters = () => {
    setArea("指定なし");
    setGuests(2);
    setGenre("指定なし");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <Header />
      <main className="w-full max-w-md bg-white rounded-lg shadow-lg mt-6 p-6">
        <form onSubmit={handleSearch} className="space-y-6">
          <h2 className="text-lg font-bold text-center">会食用のお店を検索</h2>

          {/* エリア */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              エリア
            </label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="指定なし">指定なし</option>
              <option value="福岡県福岡市中央区">福岡県福岡市中央区</option>
              <option value="福岡県福岡市博多区">福岡県福岡市博多区</option>
              <option value="福岡県福岡市早良区">福岡県福岡市早良区</option>
              <option value="福岡県福岡市東区">福岡県福岡市東区</option>
              <option value="福岡県福岡市南区">福岡県福岡市南区</option>
              <option value="福岡県福岡市西区">福岡県福岡市西区</option>
              <option value="福岡県福岡市城南区">福岡県福岡市城南区</option>
              <option value="福岡県北九州市小倉北区">福岡県北九州市小倉北区</option>
            </select>
          </div>

          {/* 人数 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              人数
            </label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              min={1}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="例: 2"
            />
          </div>

          {/* ジャンル */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ジャンル
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
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
          </div>

          {/* 詳細検索 */}
          <div className="text-center">
             <Link href="/details">
              <a className="text-sm text-blue-600 hover:underline">詳細検索はこちら</a>
            </Link>
          </div>
  
          {/* ボタン */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            お店を検索する
          </button>
          <button
            type="button"
            onClick={resetFilters}
            className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition mt-2"
          >
            条件をリセット
          </button>
        </form>

        {/* 検索結果 */}
        <div className="mt-6">
          {loading && <p>検索中...</p>}
          {searchResults.length > 0 ? (
            <ul className="space-y-4">
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow relative"
                >
                  <button
                    onClick={() => toggleFavorite(result)}
                    className={`absolute top-2 right-2 ${
                      favorites.includes(result) ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    {favorites.includes(result) ? "お気に入り解除" : "お気に入り"}
                  </button>
                  <h3 className="text-lg font-bold">{result.name}</h3>
                  <p>エリア: {result.area}</p>
                  <p>ジャンル: {result.category}</p>
                  <p>予算: ¥{result.budget_min} ~ ¥{result.budget_max}</p>
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p className="text-gray-500">条件に一致するお店が見つかりませんでした。</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
