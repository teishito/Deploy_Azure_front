import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Results() {
  const router = useRouter();
  const { area, guests, genre, budgetMin, budgetMax, privateRoom, drinkIncluded } = router.query;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const query = new URLSearchParams({
        area: area || "",
        guests: guests || "",
        genre: genre || "",
        budgetMin: budgetMin || "",
        budgetMax: budgetMax || "",
        privateRoom: privateRoom || "",
        drinkIncluded: drinkIncluded || "",
      }).toString();

      try {
        const response = await fetch(`https://tech0-gen-8-step3-app-node-10.azurewebsites.net/search?${query}`);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setResults(data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) fetchResults();
  }, [router.isReady, area, guests, genre, budgetMin, budgetMax, privateRoom, drinkIncluded]);

  const handleDetail = (id) => {
    router.push(`/restaurant/${id}`);
  };

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
                src={restaurant.store_top_image}
                alt={restaurant.name}
                className="w-24 h-24 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="text-lg font-bold">{restaurant.name}</h3>
                <p>ジャンル: {restaurant.category}</p>
                <p>エリア: {restaurant.area}</p>
                <p>食べログ評価: {restaurant.tabelog_rating}</p>
                <p>Google Map評価: {restaurant.google_rating}</p>
                <p>単価: ¥{restaurant.budget_min} ~ ¥{restaurant.budget_max}</p>
                <button
                  onClick={() => router.push(`/restaurant/${restaurant.id}`)}
                  className="mt-2 bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700"
                >
                  詳細ページへ
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">条件に当てはまるお店はありませんでした。</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
