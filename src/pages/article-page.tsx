import { useParams, useNavigate } from "react-router-dom";
import { usePopularArticles } from "../hooks/use-popular-articles";
import { ArrowLeft } from "lucide-react";

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = usePopularArticles();

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading article</p>;

  const article = data?.results.find((item) => item.id === Number(id));

  if (!article) return <p className="p-4">Article not found</p>;

  const featuredImage = article.media?.[0]?.["media-metadata"]?.[2]?.url ?? "";

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Go back home
      </button>

      {/* Featured Image */}
      {featuredImage && (
        <img
          src={featuredImage}
          alt={article.title}
          className="w-full h-64 sm:h-96 object-cover rounded-xl shadow"
        />
      )}

      {/* Article Content */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>

        <div className="text-sm text-gray-600">
          <p>{article.byline}</p>
          <p>{new Date(article.published_date).toLocaleDateString()}</p>
        </div>

        <p className="text-lg text-gray-700">{article.abstract}</p>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Read Full Article on NYTimes
        </a>
      </div>
    </div>
  );
};

export default ArticlePage;
