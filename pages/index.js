import { useState } from "react";
import SearchForm from "../components/SearchForm";
import Header from "../components/Header";
import Footer from "../components/Ad";
import Footer from "../components/Footer";
import Link from "next/link";


export default function Home() {
  // 状態管理
  const [area, setArea] = useState("");
  const [guests, setGuests] = useState(2);
  const [genre, setGenre] = useState("");
  const [getResponse, setGetResponse] = useState("");
  const [id, setId] = useState("");
  const [idResponse, setIdResponse] = useState("");
  const [input, setInput] = useState("");
  const [postResponse, setPostResponse] = useState("");
  const [translateInput, setTranslateInput] = useState("");
  const [translateResponse, setTranslateResponse] = useState("");

  // 検索ハンドラー
  const handleSearch = () => {
    console.log("検索条件:", { area, guests, genre });
    // ここに検索ロジックを追加可能
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-screen-lg mx-auto py-6 px-4">
        <SearchForm onSearch={handleSearch} />
      </main>
      <Ad />
      <Footer />
    </div>
  );
}
