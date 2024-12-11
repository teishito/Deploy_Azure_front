import { Radar } from "react-chartjs-2";
import Header from "../../components/Header";
import { setupChart } from "../../utils/chartSetup";

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

setupChart(); // 必ず呼び出す
// 必要なスケールやコントローラーを登録
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);


export default function ReportResult() {
    // レーダーチャートデータ
    const radarData = {
        labels: ["雰囲気", "食事", "接客"],
        datasets: [
            {
                label: "あなたの評価",
                data: [7, 8, 9], // ここにレポート結果の評価値を反映
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
            },
        ],
    };

    const radarOptions = {
        scales: {
            r: {
                suggestedMin: 0,
                suggestedMax: 10,
            },
        },
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-screen-md mx-auto py-6 px-4">
                <h1 className="text-xl font-bold mb-6 text-center">
                    AIがあなたのニーズを学習して次回以降のお店を提案します
                </h1>
                {/* レーダーチャート */}
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                    <Radar data={radarData} options={radarOptions} />
                </div>

                {/* 次に行くべきお店の候補 */}
                <h2 className="text-lg font-bold mb-4">
                    AIがおすすめするあなたのニーズに近いお店
                </h2>
                <div className="grid grid-cols-3 gap-4">
                    {/* サンプルデータ */}
                    {[
                        { name: "店名", area: "エリア", image: "/path/to/image1.jpg" },
                        { name: "店名", area: "エリア", image: "/path/to/image2.jpg" },
                        { name: "店名", area: "エリア", image: "/path/to/image3.jpg" },
                    ].map((store, index) => (
                        <div key={index} className="text-center">
                            <img
                                src={store.image}
                                alt={store.name}
                                className="w-full h-32 object-cover rounded-lg mb-2"
                            />
                            <p className="font-semibold">{store.name}</p>
                            <p className="text-sm text-gray-600">{store.area}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
