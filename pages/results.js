"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Ad from "../components/Ad";

export default function Results() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);

      const filters = {
        area: searchParams.get("area") || "",
        genre: searchParams.get("genre") || "",
        guests: parseInt(searchParams.get("guests")) || 0,
        budgetMin: parseInt(searchParams.get("budgetMin")) || null,
        budgetMax: parseInt(searchParams.get("budgetMax")) || null,
        privateRoom: searchParams.get("privateRoom") || "",
        drinkIncluded: searchParams.get("drinkIncluded") || "",
      };

      try {
        const response = await fetch(
          `https://tech0-gen-8-step3-app-py-10.azurewebsites.net/results`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filters),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        setResults(data.restaurants?.slice(0, 6) || []);
      } catch (err) {
        console.error("POSTリクエストエラー:", err);

        // デフォルトデータ取得
        try {
          const fallbackResponse = await fetch(
            `https://tech0-gen-8-step3-app-py-10.azurewebsites.net/api/allrestaurants`
          );

          if (!fallbackResponse.ok) {
            throw new Error(`Fallback HTTP Error: ${fallbackResponse.status}`);
          }

          const fallbackData = await fallbackResponse.json();
          setResults(fallbackData.restaurants?.slice(0, 6) || []);
        } catch (fallbackErr) {
          console.error("デフォルトデータ取得エラー:", fallbackErr);
          setError(fallbackErr.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]);

  if (loading) return <p className="text-center mt-6">読み込み中...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-xl font-bold mb-4 mt-[50px]">検索結果</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((res) => (
            <div key={res.id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold">{res.name}</h2>
              <p><strong>エリア:</strong> {res.area || "指定なし"}</p>
              <p><strong>ジャンル:</strong> {res.category || "指定なし"}</p>
              <p><strong>予算:</strong> ¥{res.budget_min || "N/A"} ~ ¥{res.budget_max || "N/A"}</p>
              <p><strong>Google評価:</strong> {res.google_rating || "N/A"}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            window.location.href = "https://tech0-gen-8-step3-app-node-10.azurewebsites.net/";
          }}
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          検索画面に戻る
        </button>
        <Ad />
      </main>
      <Footer />
    </div>
  );
}
