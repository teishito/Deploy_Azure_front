import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // APIからお気に入りリストを取得
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch("https://your-api-endpoint.com/api/favorites");
                if (!response.ok) {
                    throw new Error(`HTTPエラー! ステータス: ${response.status}`);
                }
                const data = await response.json();
                setFavorites(data.favorites); // サーバーから返されたお気に入りデータをセット
                setLoading(false);
            } catch (err) {
                console.error("お気に入りデータの取得中にエラーが発生しました:", err);
                setError("お気に入りデータの取得に失敗しました。");
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    // お気に入り解除
    const removeFromFavorites = async (id) => {
        try {
            const response = await fetch(`https://your-api-endpoint.com/api/favorites/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`HTTPエラー! ステータス: ${response.status}`);
            }
            // サーバー側で削除成功後に、クライアント側の状態も更新
            setFavorites(favorites.filter((restaurant) => restaurant.id !== id));
        } catch (err) {
            console.error("お気に入りの削除中にエラーが発生しました:", err);
            setError("お気に入りの削除に失敗しました。");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="max-w-screen-md mx-auto py-6 px-4">
                    <p>読み込み中...</p>
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="max-w-screen-md mx-auto py-6 px-4">
                    <p className="text-red-500">{error}</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-screen-md mx-auto py-6 px-4">
                <h1 className="text-lg font-bold mb-4">お気に入り</h1>
                {favorites.length > 0 ? (
                    favorites.map((restaurant) => (
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
                                <p>食べログ評価: {restaurant.tabelog_rating}</p>
                                <p>Google Map評価: {restaurant.google_rating}</p>
                                <p>単価: ¥{restaurant.budget_min} ~ ¥{restaurant.budget_max}</p>
                            </div>
                            <button
                                onClick={() => removeFromFavorites(restaurant.id)}
                                className="ml-4 bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-700"
                            >
                                お気に入り解除
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">お気に入りに登録された店舗はありません。</p>
                )}
            </main>
            <Footer />
        </div>
    );
}
