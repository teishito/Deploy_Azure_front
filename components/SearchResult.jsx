import Link from "next/link";
import PropTypes from "prop-types";

export default function SearchResult({ id, name, description }) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-4 hover:shadow-lg transition">
      {/* 店名 */}
      <h3 className="text-lg font-bold" aria-label={`店名: ${name}`}>
        {name}
      </h3>

      {/* 説明 */}
      <p className="text-sm text-gray-700">{description}</p>

      {/* 詳細リンク */}
      <Link href={`/details/${id}`}>
        <a
          className="text-blue-600 hover:underline"
          aria-label={`${name}の詳細を見る`}
        >
          詳細を見る
        </a>
      </Link>
    </div>
  );
}

// プロパティの型チェック
SearchResult.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

// プロパティのデフォルト値
SearchResult.defaultProps = {
  description: "説明がありません。",
};
