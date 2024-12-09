import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DetailsSearch() {
    const [area, setArea] = useState("");
    const [guests, setGuests] = useState(2);
    const [genre, setGenre] = useState("");
    const [budgetLower, setBudgetLower] = useState("");
    const [budgetUpper, setBudgetUpper] = useState("");
    const [privateRoom, setPrivateRoom] = useState("");
    const [freeDrink, setFreeDrink] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        console.log({
        area,
        guests,
        genre,
        budgetLower,
        budgetUpper,
        privateRoom,
        freeDrink,
        });
        // 検索ロジックを追加
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
        <Header />
        <header className="bg-black text-white w-full py-4 flex justify-center">
        <h1 className="text-xl font-bold">詳細検索</h1>
        </header>

        <main className="w-full max-w-md bg-white rounded-lg shadow-lg mt-6 p-6">
            <form onSubmit={handleSearch} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">エリア</label>
                <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                >
                <option value="">エリアを選択</option>
                <option value="博多">博多</option>
                <option value="中央">中央</option>
                {/* その他のエリア */}
                </select>
            </div>

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

            <div>
                <label className="block text-sm font-medium text-gray-700">ジャンル</label>
                <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                >
                <option value="">ジャンルを選択</option>
                <option value="和食">和食</option>
                <option value="洋食">洋食</option>
                </select>
            </div>

            <div className="flex space-x-2">
                <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">予算 (下限)</label>
                <input
                    type="number"
                    value={budgetLower}
                    onChange={(e) => setBudgetLower(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                />
                </div>
                <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">予算 (上限)</label>
                <input
                    type="number"
                    value={budgetUpper}
                    onChange={(e) => setBudgetUpper(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                />
                </div>
            </div>

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

            <div className="flex space-x-2">
                <button
                type="button"
                onClick={() => setFreeDrink("希望する")}
                className={`w-1/2 py-2 text-sm rounded-lg ${
                    freeDrink === "希望する" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
                >
                飲み放題: 希望する
                </button>
                <button
                type="button"
                onClick={() => setFreeDrink("希望しない")}
                className={`w-1/2 py-2 text-sm rounded-lg ${
                    freeDrink === "希望しない" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
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
        <Footer />
        </div>
    );
    }
