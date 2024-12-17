import { useRouter } from 'next/router';
import Header from '../../components/Header';
import FooterMenu from '../../components/FooterMenu';
import Head from 'next/head';
import Map from '../../components/Map';

export default function RestaurantDetails({ restaurant }) {
    const router = useRouter();

    const handleMenuClick = () => {
        router.push(`/restaurant/${restaurant.id}/menu`);
    };

    if (!restaurant) {
        return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1>店舗情報が見つかりませんでした。</h1>
        </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
        <Head>
            <title>{restaurant.name}</title>
            <meta name="description" content={`${restaurant.name}の詳細ページ`} />
            <script
            src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCURyWrewVgNbBjGx2cwhrN92Qzg7VuQPg`}
            async
            defer
            ></script>
        </Head>

        <Header />
        <main className="max-w-screen-md mx-auto py-6 px-4">
            <h1 className="text-2xl font-bold mb-4">{restaurant.name}</h1>
            <img
            src={restaurant.store_top_image}
            alt={restaurant.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
            />

            {/* 評価 */}
            <div className="p-4 bg-gray-100 rounded-lg mb-4">
            <h3 className="text-lg font-bold mb-4 text-center">評価</h3>
            <div className="flex justify-center items-center space-x-16">
                <div className="text-center">
                <p className="text-5xl font-bold text-yellow-500 mb-2">
                    {restaurant.tabelog_rating || 'N/A'}
                </p>
                <p className="text-lg font-medium text-gray-600">食べログ評価</p>
                </div>
                <div className="text-center">
                <p className="text-5xl font-bold text-green-500 mb-2">
                    {restaurant.google_rating || 'N/A'}
                </p>
                <p className="text-lg font-medium text-gray-600">Google Map評価</p>
                </div>
            </div>
            </div>
            <h2 className="text-md font-bold mt-6 mb-2">ジャンル</h2>
            <p className="text-lg font-medium mb-2">{restaurant.category}</p>

            {/* その他のセクション */}
            <h2 className="text-md font-bold mt-6 mb-2">メニュー（料理・ドリンク）/コース</h2>
            <button
            onClick={handleMenuClick}
            className="text-blue-600 hover:underline mt-2"
            >
            詳細はこちら ＞
            </button>
            {/* Google Maps */}
            <h2 className="text-md font-bold mt-6 mb-2">Google Map</h2>
            <Map latitude={restaurant.latitude} longitude={restaurant.longitude} />

            {/* 店舗情報 */}
            <h2 className="text-md font-bold mt-6">店舗情報</h2>
            <p>住所: {restaurant.address || '情報がありません。'}</p>
            <p>電話番号: {restaurant.phone_number || '情報がありません。'}</p>
            <p>営業時間: {restaurant.opening_hours || '情報がありません。'}</p>
            <p>最寄り駅: {restaurant.nearest_station || '情報がありません。'}</p>

        </main>
        <FooterMenu />
        </div>
    );
    }

    export async function getServerSideProps(context) {
    const { id } = context.params;

    try {
        const res = await fetch(`https://tech0-gen-8-step3-app-py-10.azurewebsites.net/restaurant/${id}`);
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
