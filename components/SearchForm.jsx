import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

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
  
    const query = new URLSearchParams({
      area: encodeURIComponent(area || ""),
      guests: guests || "",
      genre: encodeURIComponent(genre || ""),
      budgetMin: budgetMin || "",
      budgetMax: budgetMax || "",
      privateRoom: privateRoom || "",
      drinkIncluded: drinkIncluded || "",
    }).toString();
  
    router.push(`/results?${query}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6"
    >
      <h2 className="text-lg font-bold text-center mt-[50px]">会食用のお店を検索</h2>

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
          min="1"
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
          <option value="中華料理">中華料理</option>
        </select>
      </div>

      {/* 予算 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">予算下限</label>
          <input
            type="number"
            value={budgetMin}
            onChange={(e) => setBudgetMin(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="例: 1000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">予算上限</label>
          <input
            type="number"
            value={budgetMax}
            onChange={(e) => setBudgetMax(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="例: 5000"
          />
        </div>
      </div>

      {/* 個室希望 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">個室希望</label>
        <select
          value={privateRoom}
          onChange={(e) => setPrivateRoom(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
        >
          <option value="">指定なし</option>
          <option value="有">有</option>
          <option value="無">無</option>
        </select>
      </div>

      {/* 飲み放題希望 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">飲み放題希望</label>
        <select
          value={drinkIncluded}
          onChange={(e) => setDrinkIncluded(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
        >
          <option value="">指定なし</option>
          <option value="有">有</option>
          <option value="無">無</option>
        </select>
      </div>

      {/* 検索ボタン */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        お店を検索する
      </button>
    </form>
  );
}
