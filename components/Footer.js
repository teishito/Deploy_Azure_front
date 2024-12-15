const Footer = () => {
    const footerImageUrl = "https://prcdn.freetls.fastly.net/release_image/17692/690/17692-690-7240e9b8cae51139bcb28176bf5d3d19-1256x897.png?width=1950&height=1350&quality=85%2C75&format=jpeg&auto=webp&fit=bounds&bg-color=fff";
    const footerLink = "https://prtimes.jp/main/html/rd/p/000000690.000017692.html";

    return (
        <footer className="fixed bottom-0 left-0 w-full bg-gray-200 py-4 text-center shadow-md">
            {/* 区切り線 */}
            <hr className="border-t border-gray-300 mb-4" />
            
            {/* 広告タイトル */}
            <h5 className="text-gray-700 text-base">広告</h5>

            {/* 広告画像リンク */}
            <div className="mt-4">
                <a href={footerLink} target="_blank" rel="noopener noreferrer">
                    <img
                        src={footerImageUrl}
                        alt="Footer Ad"
                        style={{ height: "200px", margin: "0 auto" }}
                    />
                </a>
            </div>

            {/* コピーライト */}
            <p className="text-sm text-gray-500 mt-4">© 2024 FortuneDinner. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
