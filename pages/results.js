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
        people: searchParams.get("guests") || 0,
        budgetMin: searchParams.get("budgetMin") || null,
        budgetMax: searchParams.get("budgetMax") || null,
        privateRoom: searchParams.get("privateRoom") || "",
        drinkIncluded: searchParams.get("drinkIncluded") || "",
      };
    
      try {
        const response = await fetch(
          `https://tech0-gen-8-step3-app-node-10.azurewebsites.net/results`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filters),
          }
        );
    
        if (!response.ok) {
          console.error(`HTTP Error: ${response.status}`);
          throw new Error("検索結果を取得できませんでした。");
        }
    
        const data = await response.json();
        setResults(data.restaurants || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]);

  

  if (loading) return <p className="text-center mt-6">読み込み中...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;
  if (!results.length)
    return <p className="text-center mt-6">条件に一致するお店がありません。</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-xl font-bold mb-4">検索結果</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {results.map((res) => (
            <div key={res.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-bold">{res.name}</h2>
              <p>エリア: {res.area || "指定なし"}</p>
              <p>ジャンル: {res.category || "指定なし"}</p>
              <p>予算: ¥{res.budget_min || "N/A"} ~ ¥{res.budget_max || "N/A"}</p>
              <p>
                食べログ評価: {res.tabelog_rating || "N/A"} (
                {res.tabelog_review_count || 0}件)
              </p>
              <p>Google評価: {res.google_rating || "N/A"}</p>
            </div>
          ))}
        </div>
        <Ad />
      </main>
      <Footer />
    </div>
  );
}
