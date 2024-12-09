import { useState } from "react";
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
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        const query = {
            area: area || "",
            guests: guests || "",
            genre: genre || "",
            budgetMin: budgetMin || "",
            budgetMax: budgetMax || "",
            privateRoom: privateRoom || "",
            drinkIncluded: drinkIncluded || ""
        };

        const queryString = new URLSearchParams(query).toString();

        try {
            const response = await fetch(`http://127.0.0.1:5000/search?${queryString}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
            <Header />
            <header className="bg-black text-white w-full py-4 flex justify-center">
                <h1 className="text-xl font-bold">詳細検索</h1>
            </header>

            <main className="w-full max-w-md bg-white rounded-lg shadow-lg mt-6 p-6">
                <form onSubmit={handleSearch} className="space-y-4">
                    {/* エリア */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">エリア</label>
                        <select
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2"
                        >
                            <option value="指定なし">指定なし</option>
                            <option value="福岡県福岡市中央区">福岡市中央区</option>
                            <option value="福岡県福岡市博多区">福岡市博多区</option>
                            <option value="福岡県福岡市早良区">福岡市早良区</option>
                            <option value="福岡県福岡市東区">福岡市東区</option>
                            <option value="福岡県福岡市南区">福岡市南区</option>
                            <option value="福岡県福岡市西区">福岡市西区</option>
                            <option value="福岡県福岡市城南区">福岡市城南区</option>
                            <option value="福岡県北九州市小倉北区">北九州市小倉北区</option>
                            {/* その他のエリア */}
                        </select>
                    </div>

                    {/* 人数 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">人数</label>
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
                            onClick={() => setPrivateRoom("希望する")}
                            className={`w-1/2 py-2 text-sm rounded-lg ${
                                privateRoom === "希望する" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            個室: 希望する
                        </button>
                        <button
                            type="button"
                            onClick={() => setPrivateRoom("希望しない")}
                            className={`w-1/2 py-2 text-sm rounded-lg ${
                                privateRoom === "希望しない" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            個室: 希望しない
                        </button>
                    </div>

                    {/* 飲み放題 */}
                    <div className="flex space-x-2">
                        <button
                            type="button"
                            onClick={() => setDrinkIncluded("希望する")}
                            className={`w-1/2 py-2 text-sm rounded-lg ${
                                drinkIncluded === "希望する" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            飲み放題: 希望する
                        </button>
                        <button
                            type="button"
                            onClick={() => setDrinkIncluded("希望しない")}
                            className={`w-1/2 py-2 text-sm rounded-lg ${
                                drinkIncluded === "希望しない" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            飲み放題: 希望しない
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        お店を検索する
                    </button>
                </form>
            </main>

            <div className="w-full max-w-2xl mt-6 p-4">
                {loading ? (
                    <p>検索中...</p>
                ) : (
                    results.map((restaurant) => (
                        <div key={restaurant.id} className="bg-white shadow p-4 rounded-lg mb-4">
                            <h3 className="text-lg font-bold">{restaurant.name}</h3>
                            <p>ジャンル: {restaurant.category}</p>
                            <p>エリア: {restaurant.area}</p>
                            <p>説明: {restaurant.description}</p>
                        </div>
                    ))
                )}
            </div>

            <Footer />
        </div>
    );
}
