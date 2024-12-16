"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Results() {
  const searchParams = useSearchParams();

  // クエリパラメータの取得
  const area = searchParams.get("area") || "";
  const guests = searchParams.get("guests") || "";
  const genre = searchParams.get("genre") || "";
  const budgetMin = searchParams.get("budgetMin") || "";
  const budgetMax = searchParams.get("budgetMax") || "";
  const privateRoom = searchParams.get("privateRoom") || "";
  const drinkIncluded = searchParams.get("drinkIncluded") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError("");
      try {
        // クエリパラメータをURLに組み立てる
        const query = new URLSearchParams({
          area,
          guests,
          genre,
          budgetMin,
          budgetMax,
          privateRoom,
          drinkIncluded,
        }).toString();

        const response = await fetch(
          `https://tech0-gen-8-step3-app-node-10.azurewebsites.net/results?${query}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError(err.message || "エラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [area, guests, genre, budgetMin, budgetMax, privateRoom, drinkIncluded]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-screen-lg mx-auto py-6 px-4">
          <p className="text-center">読み込み中...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-screen-lg mx-auto py-6 px-4">
          <p className="text-center text-red-500">エラー: {error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-screen-lg mx-auto py-6 px-4">
          <p className="text-center text-gray-500">該当するお店が見つかりませんでした。</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-screen-lg mx-auto py-6 px-4">
        <h1 className="text-lg font-bold mb-4">検索結果</h1>
        {results.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white p-4 rounded-lg shadow mb-4"
          >
            <h2 className="text-xl font-bold">{restaurant.name}</h2>
            <p>エリア: {restaurant.area}</p>
            <p>ジャンル: {restaurant.category}</p>
            <p>
              予算: ¥{restaurant.budget_min} ~ ¥{restaurant.budget_max}
            </p>
            <p>収容人数: {restaurant.capacity}</p>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}
