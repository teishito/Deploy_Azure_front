import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Results({ results }) {
  const router = useRouter();
  const { area, guests, genre, budgetMin, budgetMax, privateRoom, drinkIncluded } = router.query;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-screen-md mx-auto py-6 px-4">
        <h1 className="text-lg font-bold mb-4">検索結果</h1>
        <div className="bg-white shadow-md p-6 rounded-lg mb-6">
          <h2 className="text-md font-bold mb-2">検索条件</h2>
          <p>エリア: {area || "指定なし"}</p>
          <p>人数: {guests || "指定なし"}人</p>
          <p>ジャンル: {genre || "指定なし"}</p>
          <p>予算: {budgetMin || "未指定"} - {budgetMax || "未指定"}</p>
          <p>個室: {privateRoom === "true" ? "希望する" : "希望しない"}</p>
          <p>飲み放題: {drinkIncluded === "true" ? "希望する" : "希望しない"}</p>
        </div>
        <h2 className="text-md font-bold mb-4">お店一覧</h2>
        {results.length > 0 ? (
          results.map((store) => (
            <div key={store.id} className="bg-white shadow-md p-4 rounded-lg mb-4">
              <h3 className="text-lg font-bold">{store.name}</h3>
              <p>ジャンル: {store.genre}</p>
              <p>エリア: {store.area}</p>
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
  const { area, guests, genre, budgetMin, budgetMax, privateRoom, drinkIncluded } = context.query;

  try {
    const res = await fetch(
      `https://tech0-gen-8-step3-app-node-10.azurewebsites.net/search?area=${area}&guests=${guests}&genre=${genre}&budgetMin=${budgetMin}&budgetMax=${budgetMax}&privateRoom=${privateRoom}&drinkIncluded=${drinkIncluded}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const results = await res.json();
    return { props: { results } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { results: [] } };
  }
}
