interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center space-x-2 pt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange((prev) => Math.max(1, prev - 1))}
        className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 disabled:opacity-50"
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-full text-sm ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange((prev) => Math.min(totalPages, prev + 1))}
        className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
