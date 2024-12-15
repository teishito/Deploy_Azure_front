export default function Ad() {
  const footerImageUrl =
    "https://prcdn.freetls.fastly.net/release_image/17692/690/17692-690-7240e9b8cae51139bcb28176bf5d3d19-1256x897.png?width=1950&height=1350&quality=85%2C75&format=jpeg&auto=webp&fit=bounds&bg-color=fff";
  const footerLink = "https://prtimes.jp/main/html/rd/p/000000682.000017692.html";

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <h5>広告</h5>
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
