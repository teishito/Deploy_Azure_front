"use client";

import { useRouter } from 'next/router';
import Header from '../../components/Header';
import FooterMenu from '../../components/FooterMenu';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../../components/Map'), { ssr: false });

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
    <div className="bg-white min-h-screen">
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
      <main className="max-w-screen-md mx-auto py-6 px-4 mb-[100px]">
        {/* 店名 */}
        <h1 className="text-2xl font-bold mb-4 text-center mt-[50px]">{restaurant.name}</h1>
        <img
          src={restaurant.store_top_image}
          alt={restaurant.name}
          className="w-full h-56 object-cover rounded-lg mb-4"
        />

        {/* 評価 */}
        <div className="p-4 bg-gray-100 rounded-lg mb-4">
          <h3 className="text-lg font-bold mb-4 text-center">評価</h3>
          <div className="flex justify-around items-center space-x-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-yellow-500 mb-2">
                {restaurant.tabelog_rating || 'N/A'}
              </p>
              <p className="text-sm text-gray-600">食べログ評価</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-500 mb-2">
                {restaurant.google_rating || 'N/A'}
              </p>
              <p className="text-sm text-gray-600">Google Map評価</p>
            </div>
          </div>
        </div>

        {/* ジャンル */}
        <div className="mb-4">
          <h2 className="text-md font-bold mb-2">ジャンル</h2>
          <p className="text-sm text-gray-800">{restaurant.category || '情報がありません'}</p>
        </div>

        {/* メニュー */}
        <div className="mb-4">
          <h2 className="text-md font-bold mb-2">メニュー（料理・ドリンク）/コース</h2>
          <button
            onClick={handleMenuClick}
            className="text-blue-600 hover:underline mt-2"
          >
            詳細はこちら ＞
          </button>
        </div>

         {/* お店のこだわりセクション */}
        <h2 className="text-xl font-bold mb-4">お店のこだわり</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1枚目の画像 */}
            <div className="text-center">
                <img
                    src={restaurant.detail_image1}
                    alt="お店のこだわり1"
                    className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-sm text-gray-600 mt-2">5席のプライベート空間</p>
            </div>
            {/* 2枚目の画像 */}
            <div className="text-center">
                <img
                    src={restaurant.detail_image2}
                    alt="お店のこだわり2"
                    className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-sm text-gray-600 mt-2">鮨に合う日本酒・ワイン</p>
            </div>
            {/* 3枚目の画像 */}
            <div className="text-center">
                <img
                    src={restaurant.detail_image3}
                    alt="お店のこだわり3"
                    className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-sm text-gray-600 mt-2">昼は握り、夜はおまかせ。</p>
            </div>
        </div>

        {/* 店舗情報 */}
          <div className="p-4 bg-gray-100 rounded-lg mb-4">
            {/* Google Maps */}
            <h2 className="text-md font-bold mt-6">店舗情報</h2>
            <p>住所：{restaurant.address || '情報がありません。'}</p>
            <p>最寄り駅： {restaurant.nearest_station || '情報がありません。'}</p>
            {/* 店舗情報 */}
            <p>電話番号：{restaurant.phone_number || '情報がありません。'}</p>
            <p>営業時間：{restaurant.opening_hours || '情報がありません。'}</p>
            <h2 className="text-md font-bold mt-6 mb-2">Google Map</h2>
            <Map latitude={restaurant.latitude} longitude={restaurant.longitude} />
            </div>
      </main>

      <FooterMenu />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(
      `https://tech0-gen-8-step3-app-py-10.azurewebsites.net/restaurant/${id}`
    );
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
