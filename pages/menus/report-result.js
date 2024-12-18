import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Recommend from "../../components/Recommend";
import { Radar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";

// 必要なモジュールを登録
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export default function ReportResult() {
    const router = useRouter();
    const {
        overallSatisfaction,
        atmosphere,
        taste,
        speed,
        hospitality,
        dinnerMemo,
        storeReview,
    } = router.query;

    const radarData = {
        labels: ["雰囲気", "食事・味", "接客", "提供スピード"],
        datasets: [
            {
                label: "あなたの評価",
                data: [
                    atmosphere || 5,
                    taste || 5,
                    hospitality || 5,
                    speed || 5,
                ],
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
                <h1 className="text-xl font-bold mb-6 text-center mt-[50px]">
                    AIがあなたのニーズを学習して次回以降のお店を提案します
                </h1>
                {/* レーダーチャート */}
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                    <Radar data={radarData} options={radarOptions} />
                </div>

                {/* レビュー内容 */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">レビュー内容</h3>
                    <p>会食メモ: {dinnerMemo || "なし"}</p>
                    <p>お店へのレビュー: {storeReview || "なし"}</p>
                </div>

                {/* 次に行くべきお店の候補 */}
                <h2 className="text-lg font-bold mb-4">
                    AIがおすすめするあなたのニーズに近いお店
                </h2>
                <div className="grid grid-cols-3 gap-4">
                <Recommend />
                </div>
            </main>
            <Footer />
        </div>
    );
}
