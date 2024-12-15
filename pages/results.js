import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Ad from "../components/Ad";

export default function Results() {
  const router = useRouter();
  const { area, guests, genre, budgetMin, budgetMax, privateRoom, drinkIncluded } = router.query;

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!router.isReady) return;

      setLoading(true);
      try {
        const query = new URLSearchParams({
          area: area || "",
          guests: guests || "",
          genre: genre || "",
          budgetMin: budgetMin || "",
          budgetMax: budgetMax || "",
          privateRoom: privateRoom || "",
          drinkIncluded: drinkIncluded || "",
        }).toString();

        const response = await fetch(`/api/process_query?${query}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setResults(data.restaurants || []);
        } else {
          console.error("Failed to fetch results:", response.status);
        }
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [router.isReady, area, guests, genre, budgetMin, budgetMax, privateRoom, drinkIncluded]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-screen-md mx-auto py-6 px-4">
        <h1 className="text-lg font-bold mb-4">検索結果</h1>
        {loading ? (
          <p>検索中...</p>
        ) : results.length > 0 ? (
          results.map((restaurant) => (
            <div key={restaurant.id} className="bg-white shadow p-4 rounded-lg mb-4 flex">
              <img
                src={restaurant.store_top_image || "/placeholder.png"}
                alt={restaurant.name}
                className="w-24 h-24 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="text-lg font-bold">{restaurant.name}</h3>
                <p>ジャンル: {restaurant.category}</p>
                <p>エリア: {restaurant.area}</p>
                <p>予算: ¥{restaurant.budget_min} ~ ¥{restaurant.budget_max}</p>
                <button className="mt-2 bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700">
                  詳細を見る
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>該当するレストランが見つかりませんでした。</p>
        )}
      </main>
      <Ad />
      <Footer />
    </div>
  );
}
