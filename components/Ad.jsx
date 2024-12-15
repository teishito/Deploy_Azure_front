export default function Ad() {
  const footerImageUrl =
    "https://prcdn.freetls.fastly.net/release_image/17692/682/17692-682-f34e9af01af09312c77d588504087517-1075x650.jpg?width=1950&height=1350&quality=85%2C75&format=jpeg&auto=webp&fit=bounds&bg-color=fff";
  const footerLink = "https://prtimes.jp/main/html/rd/p/000000682.000017692.html";

  return (
    <div
      style={{
        marginTop: "40px", // フッターとの余白を確保
        paddingBottom: "20px", // 下に余白を追加してより調整
        textAlign: "center",
      }}
    >
      <h5 style={{ marginBottom: "10px" }}>広告</h5>
      <a href={footerLink} target="_blank" rel="noopener noreferrer">
        <img
          src={footerImageUrl}
          alt="Ad Image"
          style={{ height: "200px", margin: "0 auto" }}
        />
      </a>
    </div>
  );
}
