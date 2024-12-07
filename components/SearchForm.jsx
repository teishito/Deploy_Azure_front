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

  const handleSearch = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/results",
      query: { area, guests, genre },
    });
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
              <option value="">エリアを選択</option>
              <option value="博多">博多</option>
              <option value="中央">中央</option>
              <option value="小倉北">小倉北</option>
              <option value="久留米">久留米</option>
              <option value="北九州">北九州</option>
              <option value="福岡">福岡</option>
              <option value="大牟田">大牟田</option>
              <option value="飯塚">飯塚</option>
              <option value="筑紫野">筑紫野</option>
              <option value="糸島">糸島</option>
              <option value="直方">直方</option>
              <option value="田川">田川</option>
              <option value="行橋">行橋</option>
              <option value="八女">八女</option>
              <option value="柳川">柳川</option>
              <option value="春日">春日</option>
              <option value="朝倉">朝倉</option>
              <option value="宗像">宗像</option>
              <option value="大野城">大野城</option>
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
              <option value="">選択してください</option>
              <option value="和食">和食</option>
              <option value="洋食">洋食</option>
            </select>
          </div>

          <div className="text-center">
            <Link href="/details" className="text-sm text-blue-600 hover:underline">詳細検索はこちら
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