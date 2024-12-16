export default function Ad() {
  const footerImageUrl =
    "https://prcdn.freetls.fastly.net/release_image/17692/682/17692-682-f34e9af01af09312c77d588504087517-1075x650.jpg?width=1950&height=1350&quality=85%2C75&format=jpeg&auto=webp&fit=bounds&bg-color=fff";
  const footerLink = "https://prtimes.jp/main/html/rd/p/000000682.000017692.html";
  const footerImageUrl2 =
    "https://onefukuokahotel.jp/assets/img/common/ogp.png";
  const footerLink2 = "https://onefukuokahotel.jp/";
  const footerImageUrl3 =
    "https://prcdn.freetls.fastly.net/release_image/17692/677/17692-677-a1eab6c4884971af38d96d01f6761985-2048x1365.jpg?width=1950&height=1350&quality=85%2C65&format=jpeg&auto=webp&fit=bounds&bg-color=fff";
  const footerLink3 = "https://prtimes.jp/main/html/rd/p/000000677.000017692.html";
  
  return (
    <div
      style={{
        marginTop: "40px", // フッターとの余白を確保
        paddingBottom: "100px", // 下に余白を追加してより調整
        textAlign: "center",
      }}
    >
      <h5 style={{ marginBottom: "10px" }}>広告</h5>
      <a href={footerLink} target="_blank" rel="noopener noreferrer">
        <img
          src={footerImageUrl}
          alt="Ad Image"
          style={{ width: "250px", margin: "10px auto" }}
        />
      </a>
      <a href={footerLink2} target="_blank" rel="noopener noreferrer">
        <img
          src={footerImageUrl2}
          alt="Ad Image"
          style={{ width: "250px", margin: "10px auto" }}
        />
      </a>
     <a href={footerLink3} target="_blank" rel="noopener noreferrer">
        <img
          src={footerImageUrl3}
          alt="Ad Image"
          style={{ width: "250px", margin: "10px auto" }}
        />
      </a>
    </div>
  );
}
