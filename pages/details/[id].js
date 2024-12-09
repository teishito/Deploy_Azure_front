import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const StoreDetails = () => {
  const router = useRouter();
  const { id } = router.query; // URLからIDを取得
  const [storeDetails, setStoreDetails] = useState(null);

  useEffect(() => {
    if (id) {
      // APIから詳細情報を取得
      fetch(`https://your-backend-url/api/stores/${id}`)
        .then((res) => res.json())
        .then((data) => setStoreDetails(data))
        .catch((err) => console.error("詳細データ取得エラー:", err));
    }
  }, [id]);

  if (!storeDetails) {
    return <p>詳細情報を読み込み中...</p>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "'Arial', sans-serif" }}>
      <h1>{storeDetails.name}</h1>
      <p><strong>住所:</strong> {storeDetails.address}</p>
      <p><strong>価格帯:</strong> ¥{storeDetails.budget_min}〜¥{storeDetails.budget_max}</p>
      <p><strong>説明:</strong> {storeDetails.description}</p>
      <p><strong>食べログ評価:</strong> {storeDetails.tabelog_rating || "評価なし"}</p>
      <p><strong>Google Map評価:</strong> {storeDetails.google_rating || "評価なし"}</p>
      <a
        href={storeDetails.detailPageLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "4px",
          fontWeight: "bold",
        }}
      >
        詳細ページを見る
      </a>
    </div>
  );
};

export default StoreDetails;
