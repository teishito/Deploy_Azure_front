import { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm";
import Header from "../components/Header";
import Ad from "../components/Ad";
import Footer from "../components/Footer";

export default function Home() {
  const [area, setArea] = useState(""); // エリア
  const [guests, setGuests] = useState(2); // 人数
  const [genre, setGenre] = useState(""); // ジャンル
  const [searchResults, setSearchResults] = useState([]); // 検索結果
  const [loading, setLoading] = useState(false); // ローディング状態
  const [error, setError] = useState(""); // エラーメッセージ
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // お気に入りの保存を復元
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    // お気に入りをローカルストレージに保存
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (restaurant) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(restaurant)
        ? prevFavorites.filter((fav) => fav !== restaurant)
        : [...prevFavorites, restaurant]
    );
  };

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setSearchResults([]);
    try {
      // 検索条件をAPIに送信
      const query = new URLSearchParams({ area, guests, genre }).toString();
      const response = await fetch(`https://tech0-gen-8-step3-app-node-10.azurewebsites.net/results?${query}`);

      if (!response.ok) throw new Error("検索結果の取得に失敗しました。");

      const data = await response.json();
      console.log("検索結果:", data); // デバッグ用
      setSearchResults(data.restaurants || []);
    } catch (err) {
      setError(err.message || "エラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-screen-lg mx-auto py-6 px-4">
        <h1 className="text-center text-xl font-bold mb-6">簡易検索</h1>

        {/* 検索フォーム */}
        <SearchForm
          area={area}
          setArea={setArea}
          guests={guests}
          setGuests={setGuests}
          genre={genre}
          setGenre={setGenre}
        />

        {/* 検索ボタン */}
        <div className="text-center mt-6">
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            検索する
          </button>
        </div>

        {/* ローディング状態 */}
        {loading && <p className="text-center mt-4">検索中...</p>}

        {/* エラーメッセージ */}
        {error && <p className="text-center mt-4 text-red-500">{error}</p>}

        {/* 検索結果 */}
        <div className="mt-6">
          {searchResults.length > 0 ? (
            <ul className="space-y-4">
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow relative"
                >
                  <button
                    onClick={() => toggleFavorite(result)}
                    className={`absolute top-2 right-2 ${
                      favorites.includes(result) ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    {favorites.includes(result) ? "お気に入り解除" : "お気に入り"}
                  </button>
                  <h3 className="text-lg font-bold">{result.name}</h3>
                  <p>エリア: {result.area}</p>
                  <p>ジャンル: {result.category}</p>
                  <p>予算: ¥{result.budget_min} ~ ¥{result.budget_max}</p>
                  <p>Google評価: {result.google_rating || "N/A"}</p>
                  <p>食べログ評価: {result.tabelog_rating || "N/A"}</p>
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p className="text-gray-500">条件に一致するお店が見つかりませんでした。</p>
          )}
        </div>
      </main>

      <Ad />
      <Footer />
    </div>
  );
}
