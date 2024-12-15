import { useState } from "react";
import SearchForm from "../components/SearchForm";
import Header from "../components/Header";
import Ad from "../components/Ad";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Home() {
  const [area, setArea] = useState("");
  const [guests, setGuests] = useState(2);
  const [genre, setGenre] = useState("");

  const handleSearch = () => {
    console.log("検索条件:", { area, guests, genre });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-screen-lg mx-auto py-6 px-4">
        <SearchForm onSearch={handleSearch} />
      </main>
      {/* AdをFooterの上に配置 */}
      <Ad />
      <Footer />
    </div>
  );
}
