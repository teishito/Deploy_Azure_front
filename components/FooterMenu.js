import React, { useState } from "react";

export default function FooterMenu({ phoneNumber, shareData }) {
    const [showModal, setShowModal] = useState(false); // モーダル表示用の状態

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log("共有成功！");
            } catch (error) {
                console.error("共有中にエラーが発生しました:", error);
            }
        } else {
            console.error("Web Share APIはサポートされていません。");
            alert("お使いのブラウザでは共有機能がサポートされていません。");
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around p-3">
            {/* 共有ボタン */}
            <button
                onClick={handleShare}
                className="flex flex-col items-center text-gray-600 hover:text-black"
            >
                <span className="material-icons">share</span>
                <span>共有する</span>
            </button>

            {/* お気に入りボタン */}
            <button className="flex flex-col items-center text-gray-600 hover:text-black">
                <span className="material-icons">favorite</span>
                <span>お気に入り</span>
            </button>

            {/* 電話予約ボタン */}
            <button
                onClick={() => setShowModal(true)} // モーダルを表示
                className="flex flex-col items-center text-orange-600 hover:text-orange-700"
            >
                <span className="material-icons">call</span>
                <span>電話予約</span>
            </button>

            {/* モーダル */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 text-center">
                        <p className="text-lg font-bold mb-4">Call {phoneNumber}?</p>
                        <div className="flex justify-center space-x-4">
                            <a
                                href={`tel:${phoneNumber}`}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                Call {phoneNumber}
                            </a>
                            <button
                                onClick={() => setShowModal(false)} // モーダルを閉じる
                                className="bg-gray-300 px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
