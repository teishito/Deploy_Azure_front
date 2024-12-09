import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

export default function Results({ results }) {
  const router = useRouter();
  const { area, guests, genre } = router.query;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-screen-lg mx-auto py-6 px-4">
        <h1 className="text-lg font-bold mb-4">検索結果</h1>
        <div className="bg-white shadow-md p-6 rounded-lg mb-6">
          <h2 className="text-md font-bold mb-2">検索条件</h2>
          <p>エリア: {area || "指定なし"}</p>
          <p>人数: {guests || "指定なし"}人</p>
          <p>ジャンル: {genre || "指定なし"}</p>
        </div>
        <h2 className="text-md font-bold mb-4">お店一覧</h2>
        {results.length > 0 ? (
          results.map((store) => (
            <div
              key={store.id}
              className="bg-white shadow-md p-4 rounded-lg mb-4"
            >
              <h3 className="text-lg font-bold">{store.name}</h3>
              <p>ジャンル: {store.genre}</p>
              <p>エリア: {store.area}</p>
              <p>人数対応: 最大{store.capacity}人</p>
              <p>説明: {store.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">該当するお店が見つかりませんでした。</p>
        )}
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { area, guests, genre } = context.query;

  try {
    const res = await fetch(
      `http://localhost:5000/search?area=${area}&guests=${guests}&genre=${genre}`
  );  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const results = await res.json();
    return { props: { results } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { results: [] } }; // エラー時は空のリストを返す
  }
}