import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Results() {
  const router = useRouter();
  const { area, guests, genre, budgetMin, budgetMax, privateRoom, drinkIncluded } = router.query;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);

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
        if (!response.ok) throw new Error(`Failed to fetch data. Status: ${response.status}`);

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Invalid response format");

        setResults(data.slice(0, 5)); // 最大5件表示
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("検索中にエラーが発生しました。条件を見直して再度お試しください。");
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
          <div className="text-center">
            <p className="text-gray-500">検索中...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        ) : results.length > 0 ? (
          results.map((restaurant) => (
            <div key={restaurant.id} className="bg-white shadow p-4 rounded-lg mb-4 flex">
              <img
                src={restaurant.store_top_image || "/placeholder.jpg"} // 画像がない場合のプレースホルダー
                alt={restaurant.name || "レストラン"}
                className="w-24 h-24 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="text-lg font-bold">{restaurant.name || "名称不明"}</h3>
                <p>ジャンル: {restaurant.category || "未設定"}</p>
                <p>エリア: {restaurant.area || "不明"}</p>
                <p>食べログ評価: {restaurant.tabelog_rating || "評価なし"}</p>
                <p>Google Map評価: {restaurant.google_rating || "評価なし"}</p>
                <p>単価: ¥{restaurant.budget_min || "未設定"} ~ ¥{restaurant.budget_max || "未設定"}</p>
                <button
                  onClick={() => handleDetail(restaurant.id)}
                  className="mt-2 bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700"
                >
                  詳細ページへ
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p className="text-gray-500">条件に当てはまるお店はありませんでした。</p>
            <p className="text-gray-400 text-sm">条件を変更して再検索してください。</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
