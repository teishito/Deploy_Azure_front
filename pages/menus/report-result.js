import { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2"; // レーダーチャート用
import Header from "../../components/Header";

export default function ReportResult() {
    const [recommendations, setRecommendations] = useState([]);
    const [chartData, setChartData] = useState({
        labels: ["食事", "雰囲気", "接客"],
        datasets: [
            {
                label: "会食評価",
                data: [7, 8, 6], // 仮データ: 実際は report-details での評価値を取得
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        // 仮レコメンドデータ: 実際は API などから取得
        setRecommendations([
            { id: 1, name: "店名1", area: "エリア1", image: "/images/store1.jpg" },
            { id: 2, name: "店名2", area: "エリア2", image: "/images/store2.jpg" },
            { id: 3, name: "店名3", area: "エリア3", image: "/images/store3.jpg" },
        ]);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Header />
            <main className="max-w-screen-lg mx-auto">
                <h1 className="text-xl font-bold mb-4">
                    AIがあなたのニーズを学習して次回以降のお店を提案します
                </h1>

                {/* レーダーチャート */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">会食評価</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <Radar data={chartData} />
                    </div>
                </div>

                {/* レコメンドされたお店 */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">
                        AIがおすすめするあなたのニーズに近いお店
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        {recommendations.map((rec) => (
                            <div
                                key={rec.id}
                                className="bg-white p-4 rounded-lg shadow"
                            >
                                <img
                                    src={rec.image}
                                    alt={rec.name}
                                    className="w-full h-32 object-cover rounded-md mb-2"
                                />
                                <h3 className="font-bold">{rec.name}</h3>
                                <p className="text-sm text-gray-600">{rec.area}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 広告枠 */}
                <div className="mt-6">
                    <h2 className="text-lg font-bold mb-2">広告枠</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <img
                                src="/images/ad1.jpg"
                                alt="広告1"
                                className="w-full h-32 object-cover rounded-md"
                            />
                            <p className="mt-2 text-center">広告内容1</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <img
                                src="/images/ad2.jpg"
                                alt="広告2"
                                className="w-full h-32 object-cover rounded-md"
                            />
                            <p className="mt-2 text-center">広告内容2</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
