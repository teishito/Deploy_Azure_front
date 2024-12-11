import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";


export default function SearchForm() {
  const [area, setArea] = useState(""); // エリア
  const [guests, setGuests] = useState(2); // 人数
  const [genre, setGenre] = useState(""); // ジャンル
  const [budgetMin, setBudgetMin] = useState(""); // 予算下限
  const [budgetMax, setBudgetMax] = useState(""); // 予算上限
  const [privateRoom, setPrivateRoom] = useState(""); // 個室希望
  const [drinkIncluded, setDrinkIncluded] = useState(""); // 飲み放題希望
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    // 検索クエリを作成
    const query = {
      area: area || "",
      guests: guests || "",
      genre: genre || "",
      budgetMin: budgetMin || "",
      budgetMax: budgetMax || "",
      privateRoom: privateRoom || "",
      drinkIncluded: drinkIncluded || "",
    };

    // 検索結果ページにリダイレクト
    router.push({
      pathname: "/results", // 結果ページのパス
      query: query,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <Header />
      <main className="w-full max-w-md bg-white rounded-lg shadow-lg mt-6 p-6">
        <form onSubmit={handleSearch} className="space-y-6">
          <h2 className="text-lg font-bold text-center">会食用のお店を検索</h2>

          {/* エリア */}
          <div className="relative mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">エリア</label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">指定なし</option>
              <option value="福岡県福岡市中央区">福岡市中央区</option>
              <option value="福岡県福岡市博多区">福岡市博多区</option>
              <option value="福岡県福岡市早良区">福岡市早良区</option>
              <option value="福岡県福岡市東区">福岡市東区</option>
              <option value="福岡県福岡市南区">福岡市南区</option>
              <option value="福岡県福岡市西区">福岡市西区</option>
              <option value="福岡県福岡市城南区">福岡市城南区</option>
              <option value="福岡県北九州市小倉北区">北九州市小倉北区</option>
            </select>
          </div>

          {/* 人数 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">人数</label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="例: 2"
            />
          </div>

          {/* ジャンル */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ジャンル</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">指定なし</option>
              <option value="寿司">寿司</option>
              <option value="日本料理">日本料理</option>
              <option value="焼肉">焼肉</option>
              <option value="イタリアン">イタリアン</option>
              <option value="フレンチ">フレンチ</option>
            </select>
          </div>

          {/* 詳細検索 */}
          <div className="text-center">
            <Link href="/details" className="text-sm text-blue-600 hover:underline">
              詳細検索はこちら
            </Link>
          </div>

          {/* 検索ボタン */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-700 transition"
          >
            お店を検索する
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
