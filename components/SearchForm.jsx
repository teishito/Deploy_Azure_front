import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SearchForm() {
  const [area, setArea] = useState("");
  const [guests, setGuests] = useState(2);
  const [genre, setGenre] = useState("");

  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();

    const query = {
      area: area || "",
      guests: guests || "",
      genre: genre || ""
    };

    const queryString = new URLSearchParams(query).toString();

    try {
      const response = await fetch(
        `https://tech0-gen-8-step3-app-node-10.azurewebsites.net/search?${queryString}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          console.error("エンドポイントが見つかりません。URLを確認してください。");
        } else {
          console.error(`エラーが発生しました: ${response.statusText}`);
        }
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log("検索結果:", data);
    } catch (error) {
      console.error("検索リクエストでエラーが発生しました:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <main className="w-full max-w-md bg-white rounded-lg shadow-lg mt-6 p-6">
        <form onSubmit={handleSearch} className="space-y-6">
          <h2 className="text-lg font-bold text-center">会食用のお店を検索</h2>

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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              人数
            </label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="例: 2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ジャンル
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">指定なし</option>
              <option value="寿司">寿司</option>
              <option value="日本料理">日本料理</option>
              <option value="そば">そば</option>
              <option value="うなぎ">うなぎ</option>
              <option value="鍋">鍋</option>
              <option value="水炊き">水炊き</option>
              <option value="しゃぶしゃぶ">しゃぶしゃぶ</option>
              <option value="イタリアン">イタリアン</option>
              <option value="フレンチ">フレンチ</option>
              <option value="中華料理">中華料理</option>
            </select>
          </div>

          <div className="text-center">
            <Link href="/details" className="text-sm text-blue-600 hover:underline">
              詳細検索はこちら
            </Link>
          </div>

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
