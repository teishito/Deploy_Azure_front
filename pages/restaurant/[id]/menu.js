import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function MenuDetails({ menuData }) {
    const [activeTab, setActiveTab] = useState('food'); // タブの状態管理

    // メニューが存在しない場合
    if (!menuData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1>メニュー情報が見つかりませんでした。</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-screen-md mx-auto py-6 px-4 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-6 text-center mt-[50px]">メニュー詳細</h1>

                {/* タブメニュー */}
                <div className="flex border-b mb-4">
                    <button
                        onClick={() => setActiveTab('food')}
                        className={`w-1/3 py-2 text-center ${
                            activeTab === 'food'
                                ? 'border-b-2 border-black font-bold'
                                : 'text-gray-500'
                        }`}
                    >
                        料理
                    </button>
                    <button
                        onClick={() => setActiveTab('drink')}
                        className={`w-1/3 py-2 text-center ${
                            activeTab === 'drink'
                                ? 'border-b-2 border-black font-bold'
                                : 'text-gray-500'
                        }`}
                    >
                        ドリンク
                    </button>
                </div>

                {/* タブ切り替えのコンテンツ */}
                <div>
                    {/* 料理メニュー */}
                    {activeTab === 'food' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">料理メニュー</h2>
                            {menuData.foodMenu && menuData.foodMenu.length > 0 ? (
                                <ul className="list-disc list-inside space-y-2">
                                    {menuData.foodMenu.map((item, index) => (
                                        <li key={index} className="text-gray-700">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">料理の情報がありません。</p>
                            )}
                        </div>
                    )}

                    {/* ドリンクメニュー */}
                    {activeTab === 'drink' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">ドリンクメニュー</h2>
                            {menuData.drinkMenu && menuData.drinkMenu.length > 0 ? (
                                <ul className="list-disc list-inside space-y-2">
                                    {menuData.drinkMenu.map((item, index) => (
                                        <li key={index} className="text-gray-700">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">ドリンクの情報がありません。</p>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;

    try {
        // メニュー情報を取得
        const res = await fetch(
            `https://tech0-gen-8-step3-app-py-10.azurewebsites.net/restaurant/${id}/menu`
        );

        if (!res.ok) {
            throw new Error('Failed to fetch menu data');
        }

        const menuData = await res.json();

        return {
            props: {
                menuData,
            },
        };
    } catch (error) {
        console.error('Error fetching menu data:', error);
        return {
            props: {
                menuData: null,
            },
        };
    }
}
