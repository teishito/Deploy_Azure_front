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
      try {
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
        setResults(data.restaurants || []);
      } catch (err) {
        setError(err.message || "エラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [area, guests, genre, budgetMin, budgetMax, privateRoom, drinkIncluded]);

  if (loading) {
    return <p className="text-center mt-6">読み込み中...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-6">エラー: {error}</p>;
  }

  if (results.length === 0) {
    return <p className="text-center mt-6">該当するお店が見つかりませんでした。</p>;
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
            <p><strong>ジャンル:</strong> {restaurant.category || "N/A"}</p>
            <p><strong>エリア:</strong> {restaurant.area || "N/A"}</p>
            <p><strong>食べログ評価:</strong> {restaurant.tabelog_rating || "N/A"}</p>
            <p><strong>Google Map評価:</strong> {restaurant.google_rating || "N/A"}</p>
            <p><strong>単価:</strong> ¥{restaurant.budget_min || 0} ~ ¥{restaurant.budget_max || "N/A"}</p>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}
