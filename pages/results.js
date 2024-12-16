import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Ad from "../components/Ad";
import Footer from "../components/Footer";

export default function Results() {
  const router = useRouter();
  const { area, guests, genre, budgetMin, budgetMax, privateRoom, drinkIncluded } = router.query;
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
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
        const response = await fetch(`https://tech0-gen-8-step3-app-node-10.azurewebsites.net/result?${query}`);
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

  // お気に入りの追加/解除
  const toggleFavorite = (restaurant) => {
    let updatedFavorites;

    if (favorites.some((fav) => fav.id === restaurant.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== restaurant.id);
    } else {
      updatedFavorites = [...favorites, restaurant];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-screen-lg mx-auto py-6 px-4">
        <h1 className="text-lg font-bold mb-4">検索結果</h1>
        {loading ? (
          <p>検索中...</p>
        ) : results.length > 0 ? (
          results.map((restaurant) => (
            <div key={restaurant.id} className="bg-white shadow-md rounded-lg mb-6 flex">
              {/* 画像エリア */}
              <img
                src={restaurant.store_top_image}
                alt={restaurant.name}
                className="w-1/3 h-48 object-cover rounded-l-lg"
              />

            {/* 区切り線 */}
            <hr className="border-t border-gray-500 my-4" />
              {/* コンテンツエリア */}
              <div className="p-4 w-2/3 flex flex-col">
                {/* タイトルと評価 */}
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>

                  <div className="flex space-x-6">
                    {/* 食べログ評価 */}
                    <div className="text-center">
                      <p className="text-3xl font-bold text-yellow-500 mb-1">
                        {restaurant.tabelog_rating || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">食べログ評価</p>
                    </div>
                    {/* Google Map評価 */}
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-500 mb-1">
                        {restaurant.google_rating || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">Google Map評価</p>
                    </div>
                  </div>
                </div>

                {/* 店舗情報 */}
                <p className="text-gray-700 text-sm mb-1">ジャンル: {restaurant.category}</p>
                <p className="text-gray-700 text-sm mb-1">エリア: {restaurant.area}</p>
                <p className="text-gray-700 text-sm mb-1">
                  単価: ¥{restaurant.budget_min} ~ ¥{restaurant.budget_max}
                </p>
                <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                  {restaurant.description}
                </p>

                {/* ボタン */}
                <div className="flex space-x-2 mt-auto">
                  <button
                    className={`py-1 px-4 rounded-lg ${
                      favorites.find((fav) => fav.id === restaurant.id)
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                    onClick={() => toggleFavorite(restaurant)}
                  >
                    {favorites.find((fav) => fav.id === restaurant.id)
                      ? "お気に入り登録済み"
                      : "お気に入り登録"}
                  </button>
                  <button
                    onClick={() => router.push(`/restaurant/${restaurant.id}`)}
                    className="bg-gray-800 text-white py-1 px-4 rounded-lg hover:bg-gray-900"
                  >
                    詳細ページへ
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">条件に当てはまるお店はありませんでした。</p>
        )}
      </main>
      <Ad />
      <Footer />
    </div>
  );
}
