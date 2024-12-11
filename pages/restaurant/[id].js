import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function RestaurantDetails({ restaurant }) {
    if (!restaurant) {
        return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1>店舗情報が見つかりませんでした。</h1>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-screen-md mx-auto py-6 px-4">
            <h1 className="text-lg font-bold mb-4">{restaurant.name}</h1>
            <img
            src={restaurant.store_top_image}
            alt={restaurant.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p>ジャンル: {restaurant.category}</p>
            <p>Google Map評価: {restaurant.google_rating}</p>
            <p>説明: {restaurant.description}</p>

            <h2 className="text-md font-bold mt-6">メニュー</h2>
            <p>{restaurant.menu ? restaurant.menu : 'メニュー情報がありません。'}</p>

            <h2 className="text-md font-bold mt-6">コース</h2>
            <p>{restaurant.course ? restaurant.course : 'コース情報がありません。'}</p>

            <h2 className="text-md font-bold mt-6">写真・動画</h2>
            <div className="grid grid-cols-3 gap-2">
            {[restaurant.detail_image1, restaurant.detail_image2, restaurant.detail_image3]
                .filter(Boolean)
                .map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Detail ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                />
                ))}
            </div>

            <h2 className="text-md font-bold mt-6">店舗情報</h2>
            <p>住所: {restaurant.address || '情報がありません。'}</p>
            <p>電話番号: {restaurant.phone_number || '情報がありません。'}</p>
            <p>営業時間: {restaurant.opening_hours || '情報がありません。'}</p>
            <p>最寄り駅: {restaurant.nearest_station || '情報がありません。'}</p>
        </main>
        <Footer />
        </div>
    );
    }

    export async function getServerSideProps(context) {
    const { id } = context.params;

    try {
        const res = await fetch(`http://127.0.0.1:5000/restaurant/${id}`);
        if (!res.ok) {
        throw new Error('Failed to fetch');
        }
        const restaurant = await res.json();
        return { props: { restaurant } };
    } catch (error) {
        console.error('Error fetching restaurant:', error);
        return { props: { restaurant: null } };
    }
}
