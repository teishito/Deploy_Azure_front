import React from "react";
import Header from "../components/Header";
import Ad from "../components/Ad";
import Footer from "../components/Footer";

export default function Results({ searchResults, loading }) {
  const [favorites, setFavorites] = React.useState([]);

  const toggleFavorite = (restaurant) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(restaurant)
        ? prevFavorites.filter((fav) => fav !== restaurant)
        : [...prevFavorites, restaurant]
    );
  };

  return (
    <div>
      {/* ヘッダー */}
      <Header />

      {/* コンテンツ */}
      <div style={{ padding: "20px" }}>
        <h2>検索結果</h2>
        {loading ? (
          <p>検索中...</p>
        ) : searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                background: "#f9f9f9",
              }}
            >
              <h3>{result.name}</h3>
              <p>{result.address}</p>
              <p>
                価格: ¥{result.budget_min}〜¥{result.budget_max}
              </p>
              <button
                onClick={() => toggleFavorite(result)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: favorites.includes(result) ? "red" : "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {favorites.includes(result) ? "お気に入り解除" : "お気に入り"}
              </button>
              <a
                href={result.detailPageLink}
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "4px",
                }}
              >
                詳細ページへ
              </a>
            </div>
          ))
        ) : (
          <p>該当するお店が見つかりませんでした。</p>
        )}
      </div>

      {/* 広告セクション */}
      <Ad />

      {/* フッター */}
      <Footer />
    </div>
  );
}
