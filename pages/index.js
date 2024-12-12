import { useState } from "react";
import SimpleSearchForm from "../components/SimpleSearchForm";

export default function Home() {
  const [area, setArea] = useState("");
  const [guests, setGuests] = useState(2);
  const [genre, setGenre] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");

    try {
      const query = new URLSearchParams({ area, guests, genre }).toString();
      const response = await fetch(`/results?${query}`);
      if (!response.ok) {
        throw new Error("検索に失敗しました");
      }

      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (err) {
      setError(err.message || "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SimpleSearchForm
        area={area}
        setArea={setArea}
        guests={guests}
        setGuests={setGuests}
        genre={genre}
        setGenre={setGenre}
        handleSearch={handleSearch}
      />
      <div className="mt-6">
        {loading && <p>検索中...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && searchResults.length > 0 && (
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                <h3>{result.name}</h3>
                <p>{result.address}</p>
                <p>ジャンル: {result.category}</p>
                <p>予算: ¥{result.budget_min} ~ ¥{result.budget_max}</p>
              </li>
            ))}
          </ul>
        )}
        {!loading && !error && searchResults.length === 0 && (
          <p>検索結果がありません。</p>
        )}
      </div>
    </div>
  );
}
