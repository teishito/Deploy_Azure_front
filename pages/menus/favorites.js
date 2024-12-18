import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);

    // ダミーデータを直接ローカルストレージにセット
    useEffect(() => {
        if (typeof window !== "undefined") {
            const dummyData = [
                {
                    id: 1,
                    name: "博多炉端 炉邸",
                    price: "¥4,000~¥4,999",
                    description: "このお店の特徴と特別な情報が表示されます。",
                    rating: 3.38,
                    googleRating: 3.9,
                    image: "https://via.placeholder.com/150", // サンプル画像URL
                },
            ];
            localStorage.setItem("favorites", JSON.stringify(dummyData));
            setFavorites(dummyData);
        }
    }, []);

    // 特定のお店を参照
    const selectedRestaurant = favorites.find(
        (restaurant) => restaurant.name === "博多炉端 炉邸"
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-screen-lg mx-auto py-6 px-4">
                <h1 className="text-xl font-bold mb-6">お気に入り</h1>

                {selectedRestaurant ? (
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <img
                            src={selectedRestaurant.image || "/placeholder.png"}
                            alt={selectedRestaurant.name}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-lg font-bold">{selectedRestaurant.name}</h2>
                        <p>価格: {selectedRestaurant.price}</p>
                        <p>説明: {selectedRestaurant.description}</p>
                        <p>食べログ評価: {selectedRestaurant.rating}</p>
                        <p>Google Map評価: {selectedRestaurant.googleRating}</p>
                    </div>
                ) : (
                    <p className="text-gray-500">該当するお店はお気に入りに登録されていません。</p>
                )}
            </main>
            <Footer />
        </div>
    );
}
