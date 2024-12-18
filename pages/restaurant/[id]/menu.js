import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function MenuDetails({ menuData }) {
    const [activeTab, setActiveTab] = useState('food'); // タブの状態管理

    if (!menuData || !menuData.foodMenu || !menuData.drinkMenu || !menuData.courseMenu) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1>メニュー情報が見つかりませんでした。</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-screen-md mx-auto py-6 px-4 bg-white shadow-lg rounded-lg mb-[100px]">
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
                    <button
                        onClick={() => setActiveTab('course')}
                        className={`w-1/3 py-2 text-center ${
                            activeTab === 'course'
                                ? 'border-b-2 border-black font-bold'
                                : 'text-gray-500'
                        }`}
                    >
                        コース
                    </button>
                </div>

                {/* タブ切り替えのコンテンツ */}
                <div>
                    {activeTab === 'food' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">料理メニュー</h2>
                            {menuData.foodMenu.map((item, index) => (
                                <p key={index} className="text-gray-700">{item}</p>
                            ))}
                        </div>
                    )}
                    {activeTab === 'drink' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">ドリンクメニュー</h2>
                            {menuData.drinkMenu.map((item, index) => (
                                <p key={index} className="text-gray-700">{item}</p>
                            ))}
                        </div>
                    )}
                    {activeTab === 'course' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">コースメニュー</h2>
                            {menuData.courseMenu.map((item, index) => (
                                <p key={index} className="text-gray-700">{item}</p>
                            ))}
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
        const res = await fetch(
            `https://tech0-gen-8-step3-app-py-10.azurewebsites.net/restaurant/${id}/menu`
        );
        if (!res.ok) {
            throw new Error('Failed to fetch');
        }
        const menuData = await res.json();
        return { props: { menuData } };
    } catch (error) {
        console.error('Error fetching menu data:', error);
        return { props: { menuData: null } };
    }
}
