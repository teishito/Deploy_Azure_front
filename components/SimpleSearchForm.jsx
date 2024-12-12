import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SimpleSearchForm() {
  const [area, setArea] = useState("指定なし"); // エリア
  const [guests, setGuests] = useState(2); // 人数
  const [genre, setGenre] = useState("指定なし"); // ジャンル
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();

    const query = Object.fromEntries(
      Object.entries({
        area: area !== "指定なし" ? area : "",
        guests: guests !== 2 ? guests : "",
        genre: genre !== "指定なし" ? genre : "",
      }).filter(([_, value]) => value !== "" && value !== null)
    );

    try {
      router.push({
        pathname: "/results",
        query: query,
      });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <Header />
      <main className="w-full max-w-md bg-white rounded-lg shadow-lg mt-6 p-6">
        <form onSubmit={handleSearch} className="space-y-6">
          <h2 className="text-lg font-bold text-center">会食用のお店を検索</h2>

          {/* エリア */}
          <div className="relative mb-4">
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
          
          {/* 検索ボタン */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            お店を検索する
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
