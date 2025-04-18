import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Result } from "../interfaces/articles-interface";

interface IArticleCardProps {
  article: Result;
}

const ArticleCard: React.FC<IArticleCardProps> = ({ article }) => {
  const image = article.media?.[0]?.["media-metadata"]?.[2]?.url;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      key={article.id}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      {image && (
        <img
          src={image}
          alt={article.title}
          className="h-48 w-full object-cover"
        />
      )}

      <div className="p-4 flex flex-col justify-between flex-grow">
        <div className="mb-4">
          <h2
            data-testid="article-title"
            className="text-lg font-semibold line-clamp-2"
          >
            {article.title}
          </h2>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {article.abstract}
          </p>
        </div>

        <Link
          to={`/article/${article.id}`}
          className="inline-block mt-auto px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors text-center"
        >
          View details
        </Link>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
