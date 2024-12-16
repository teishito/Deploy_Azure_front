import Header from "../components/Header";
import Footer from "../components/Footer";
import Ad from "../components/Ad";
import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center p-4">
        {/* SearchForm コンポーネントを利用 */}
        <SearchForm />
        <Ad />
      </main>
      <Footer />
    </div>
  );
}
