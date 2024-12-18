import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handlePopupOpen = () => {
    setMenuOpen(false);
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleUnderstandClick = () => {
    setPopupOpen(false);
    router.push("/menus/report-details");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black text-white py-4 z-50 shadow-md">
      <div className="flex justify-between items-center px-6">
        {/* ロゴ */}
        <Link href="/">
          <h1 className="text-xl font-bold cursor-pointer" aria-label="Home">
            FortuneDinner
          </h1>
        </Link>

        {/* ハンバーガーメニュー */}
        <button
          className="text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </button>
      </div>

      {/* メニュー */}
      {menuOpen && (
        <div className="absolute top-14 right-4 bg-white shadow-lg rounded-md p-4 z-50">
          <ul>
            <li className="mb-2">
              <Link href="/menus/reservation-history" className="text-black hover:text-blue-600">
                予約履歴
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/menus/favorites" className="text-black hover:text-blue-600">
                お気に入り
              </Link>
            </li>
            <li className="mb-2">
              <button
                onClick={handlePopupOpen}
                className="text-black hover:text-blue-600"
                aria-label="Open Report Popup"
              >
                レポート
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* ポップアップ */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handlePopupClose}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg relative max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handlePopupClose}
              className="absolute top-2 right-2 text-black"
              aria-label="Close Popup"
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4">レポートとは？</h2>
            <ul className="mb-4 text-sm text-gray-700">
              <li>・あなたの会食をより最適化するためのレポートをします</li>
              <li>・会食後のフィードバックに基づき、次回以降のお店提案を改善します</li>
            </ul>
            <button
              onClick={handleUnderstandClick}
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
              aria-label="Understand and Proceed"
            >
              了解
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
