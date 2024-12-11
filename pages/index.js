import { useState } from "react";
import SearchForm from "../components/SearchForm";
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

    // handleSearch関数の定義
  const handleSearch = () => {
    // 検索処理をここに記述
    console.log(`Searching for area: ${area}, guests: ${guests}, genre: ${genre}`);
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
