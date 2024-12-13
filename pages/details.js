import { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DetailsSearch() {
  const [area, setArea] = useState("");
  const [guests, setGuests] = useState(2);
  const [genre, setGenre] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [privateRoom, setPrivateRoom] = useState("");
  const [drinkIncluded, setDrinkIncluded] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BACKEND_URL = "https://tech0-gen-8-step3-app-py-10.azurewebsites.net";

  // 検索処理
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSearchResults([]);

    // バリデーション: 予算の下限と上限
    if (budgetMin && budgetMax && Number(budgetMin) > Number(budgetMax)) {
      setError("予算の下限は上限以下に設定してください。");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/restaurants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          area: area || "",
          genre: genre || "",
          people: guests || "",
          budgetMin: budgetMin || "",
          budgetMax: budgetMax || "",
          privateRoom: privateRoom === "有" ? "有" : "無",
          drinkIncluded: drinkIncluded === "有" ? "有" : "無",
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

  // 条件リセット
  const resetFilters = () => {
    setArea("");
    setGuests(2);
    setGenre("");
    setBudgetMin("");
    setBudgetMax("");
    setPrivateRoom("");
    setDrinkIncluded("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <Header />
      <header className="bg-black text-white w-full py-4 flex justify-center">
        <h1 className="text-xl font-bold">詳細検索</h1>
      </header>

      <main className="w-full max-w-md bg-white rounded-lg shadow-lg mt-6 p-6">
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
              placeholder="例: 2"
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
                onChange={(e) => setBudgetMin(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">予算 (上限)</label>
              <input
                type="number"
                value={budgetMax}
                onChange={(e) => setBudgetMax(e.target.value)}
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

          {/* 詳細検索 */}
          <div className="text-center">
             <Link href="/index">
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
              {searchResults.map((result) => (
                <li key={result.id} className="bg-gray-100 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-bold">{result.name}</h3>
                  <p>エリア: {result.area}</p>
                  <p>ジャンル: {result.category}</p>
                  <p>予算: ¥{result.budget_min} ~ ¥{result.budget_max}</p>
                  <p>個室: {result.has_private_room}</p>
                  <p>飲み放題: {result.has_drink_all_included}</p>
                </li>
              ))}
            </ul>
          )}
          {!loading && searchResults.length === 0 && !error && (
            <p className="text-gray-500">条件に一致するお店が見つかりませんでした。</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
