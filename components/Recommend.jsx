export default function Ad() {
  const footerImageUrl =
    "https://tblg.k-img.com/restaurant/images/Rvw/216005/640x640_rect_7ab3569b370a39e9d00f73dd2599b6b5.jpg";
  const footerLink = "https://tabelog.com/fukuoka/A4001/A400102/40000029/";
  const footerImageUrl2 =
    "https://tblg.k-img.com/resize/660x370c/restaurant/images/Rvw/249471/7d3ce9fa269fa93091f798c7d4ac9bb8.jpg?token=7f4ed4f&api=v2";
  const footerLink2 = "https://tabelog.com/fukuoka/A4001/A400101/40051684/";
  const footerImageUrl3 =
    "https://tblg.k-img.com/resize/660x370c/restaurant/images/Rvw/117452/117452773.jpg?token=6858fac&api=v2";
  const footerLink3 = "https://tabelog.com/fukuoka/A4001/A400104/40045539/";

  return (
    <div
      style={{
        marginTop: "40px", // フッターとの余白を確保
        paddingBottom: "100px", // 下に余白を追加して調整
        textAlign: "center",
      }}
    >

      {/* Flexboxで横並び */}
      <div
        style={{
          display: "flex", // 横並びにする
          justifyContent: "center", // 中央揃え
          flexWrap: "wrap", // 折り返し可能
          gap: "20px", // 画像間の余白
        }}
      >
        {/* せいもん払い */}
        <div>
          <h5 style={{ marginBottom: "10px" }}>せいもん払い</h5>
          <a href={footerLink} target="_blank" rel="noopener noreferrer">
            <img
              src={footerImageUrl}
              alt="Ad Image"
              style={{ width: "250px", height: "200px", objectFit: "cover" }}
            />
          </a>
        </div>

        {/* なかもと */}
        <div>
          <h5 style={{ marginBottom: "10px" }}>なかもと</h5>
          <a href={footerLink2} target="_blank" rel="noopener noreferrer">
            <img
              src={footerImageUrl2}
              alt="Ad Image"
              style={{ width: "250px", height: "200px", objectFit: "cover" }}
            />
          </a>
        </div>

        {/* ひょご鳥 */}
        <div>
          <h5 style={{ marginBottom: "10px" }}>ひょご鳥</h5>
          <a href={footerLink3} target="_blank" rel="noopener noreferrer">
            <img
              src={footerImageUrl3}
              alt="Ad Image"
              style={{ width: "250px", height: "200px", objectFit: "cover" }}
            />
          </a>
        </div>
      </div>

      {/* スタイルの追加 */}
      <style jsx>{`
        @media (max-width: 1500px) {
          /* スマホビューでは縦並び */
          div {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
