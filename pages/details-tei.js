import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DetailsSearch() {
  const [area, setArea] = useState("");
  const [guests, setGuests] = useState(2);
  const [genre, setGenre] = useState("");
  const [budgetMin, setBudgetMin] = useState(2000);
  const [budgetMax, setBudgetMax] = useState(5000);
  const [privateRoom, setPrivateRoom] = useState("");
  const [drinkIncluded, setDrinkIncluded] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);

  const BACKEND_URL = "https://tech0-gen-8-step3-app-py-10.azurewebsites.net";

  // お気に入りを復元
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // お気に入りを永続化
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

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSearchResults([]);

    try {
      const res = await fetch(`${BACKEND_URL}/api/detailrestaurants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          area,
          genre,
          people: guests,
          budgetMin,
          budgetMax,
          privateRoom,
          drinkIncluded,
        }),
      });

      if (!res.ok) {
        throw new Error(`検索が失敗しました: ${res.status}`);
      }

      const data = await res.json();
      setSearchResults(data.restaurants || []);
    } catch (err) {
      setError("検索中にエラーが発生しました。");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setArea("");
    setGuests(2);
    setGenre("");
    setBudgetMin(2000);
    setBudgetMax(5000);
    setPrivateRoom("");
    setDrinkIncluded("");
    setSearchResults([]);
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow mt-20 p-4 flex justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <h2 className="text-lg font-bold text-center">会食用のお店を検索</h2>

            {/* エリア */}
            <div>
              <label className="block text-sm font-medium text-gray-700">エリア</label>
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
              <label className="block text-sm font-medium text-gray-700">人数</label>
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                min={1}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            {/* ジャンル */}
            <div>
              <label className="block text-sm font-medium text-gray-700">ジャンル</label>
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

            {/* 予算 */}
            <div className="flex space-x-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">予算 (下限)</label>
                <input
                  type="number"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">予算 (上限)</label>
                <input
                  type="number"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            </div>

            {/* 個室 */}
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setPrivateRoom(privateRoom === "有" ? "" : "有")}
                className={`w-1/2 py-2 text-sm rounded-lg ${
                  privateRoom === "有" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                個室: 有
              </button>
              <button
                type="button"
                onClick={() => setPrivateRoom(privateRoom === "無" ? "" : "無")}
                className={`w-1/2 py-2 text-sm rounded-lg ${
                  privateRoom === "無" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                個室: 無
              </button>
            </div>

            {/* 飲み放題 */}
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setDrinkIncluded(drinkIncluded === "有" ? "" : "有")}
                className={`w-1/2 py-2 text-sm rounded-lg ${
                  drinkIncluded === "有" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                飲み放題: 有
              </button>
              <button
                type="button"
                onClick={() => setDrinkIncluded(drinkIncluded === "無" ? "" : "無")}
                className={`w-1/2 py-2 text-sm rounded-lg ${
                  drinkIncluded === "無" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                飲み放題: 無
              </button>
            </div>

            {/* 簡易検索 */}
            <div className="text-center">
              <Link href="/">
                <a className="text-sm text-blue-600 hover:underline">簡易検索はこちら</a>
              </Link>
            </div>

            {/* ボタン */}
            <div className="space-y-2">
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
              >
                お店を検索する
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
              >
                条件をリセット
              </button>
            </div>
          </form>
          {/* 検索結果 */}
          <div className="mt-6">
            {loading && <p>検索中...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && searchResults.length > 0 && (
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
            )}
            {!loading && searchResults.length === 0 && !error && (
              <p className="text-gray-500">条件に一致するお店が見つかりませんでした。</p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
