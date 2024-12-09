import { useState } from "react";
import SearchForm from "../components/SearchForm";
import Header from "../components/Header";
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
      <Link href="/other-page">
        <a>他のページへ</a>
      </Link>
    </div>
  );
}
