import { useState } from "react";
import SearchForm from "../components/SearchForm";
import Header from "../components/Header";
import Link from "next/link";

export default function Home() {
  // 状態管理
  const [area, setArea] = useState("");
  const [guests, setGuests] = useState(2);
  const [genre, setGenre] = useState("");
  const [searchResults, setSearchResults] = useState([]); // 検索結果
  const [loading, setLoading] = useState(false); // ローディング状態

  // 検索ハンドラー
  const handleSearch = async () => {
    setLoading(true);
    console.log("検索条件:", { area, guests, genre });
    try {
      const response = await fetch(
        `https://tech0-gen-8-step3-app-node-10.azurewebsites.net/search?area=${area}&guests=${guests}&genre=${genre}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("検索リクエストが失敗しました");
      }
      const data = await response.json();
      setSearchResults(data.restaurants || []);
    } catch (error) {
      console.error("検索中にエラーが発生しました:", error);
      alert("検索中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <SearchForm
        area={area}
        setArea={setArea}
        guests={guests}
        setGuests={setGuests}
        genre={genre}
        setGenre={setGenre}
        handleSearch={handleSearch}
      />
      {/* 検索結果の表示 */}
      <div style={{ padding: "20px" }}>
        {loading ? (
          <p>検索中...</p>
        ) : searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                <h3>{result.name}</h3>
                <p>{result.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>検索結果がありません。</p>
        )}
      </div>
      <Link href="/other-page">
        <a>他のページへ</a>
      </Link>
    </div>
  );
}
