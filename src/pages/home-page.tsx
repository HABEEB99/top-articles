import { useState, useMemo } from "react";
import { usePopularArticles } from "../hooks/use-popular-articles";
import { Result } from "../interfaces/articles-interface";
import { ArticleCard, Pagination } from "../components";
import { Loader2, Search } from "lucide-react";

const ITEMS_PER_PAGE = 8;

const HomePage = () => {
  const { data, isLoading, error } = usePopularArticles();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSection, setSearchSection] = useState("");
  const [searchByline, setSearchByline] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = useMemo(() => {
    return (data?.results ?? [])
      .filter((item) => {
        const matchesSearch =
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.abstract.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSection =
          searchSection === "" || item.section === searchSection;

        const matchesByline =
          searchByline === "" || item.byline === searchByline;

        return matchesSearch && matchesSection && matchesByline;
      })
      .sort((a, b) => {
        const dateA = new Date(a.published_date).getTime();
        const dateB = new Date(b.published_date).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
  }, [data?.results, searchTerm, searchSection, searchByline, sortOrder]);

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

  if (isLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );

  if (error)
    return <p className="text-center mt-10">Error fetching articles</p>;

  if (!data) return <p className="text-center mt-10">No Articles</p>;

  return (
    <div className="p-4 md:px-20 space-y-10">
      {/* Filters */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Search Bar */}

        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-3 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter by Section */}
        <select
          value={searchSection}
          onChange={(e) => setSearchSection(e.target.value)}
          className="p-2 border rounded-md w-full"
        >
          <option value="">All Sections</option>
          {Array.from(new Set(data?.results.map((item) => item.section)))
            .filter(Boolean)
            .map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
        </select>

        {/* Filter by Author */}
        <select
          value={searchByline}
          onChange={(e) => setSearchByline(e.target.value)}
          className="p-2 border rounded-md w-full"
        >
          <option value="">All Authors</option>
          {Array.from(new Set(data?.results.map((item) => item.byline)))
            .filter(Boolean)
            .map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
        </select>

        {/* Sort by Date */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded-md w-full"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Article Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedArticles.map((article: Result) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default HomePage;
