import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import LimitPerPage from "./LimitPerPage";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;

  showLimit?: boolean;
  limitPerPage?: number;
  options?: number[];
  onLimitChange?: (limit: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,

  showLimit,
  limitPerPage,
  options,
  onLimitChange,
}) => {
  const pagesAroundCurrent = Array.from(
    { length: Math.min(3, totalPages) },
    (_, i) => i + Math.max(currentPage - 1, 1)
  );

  return (
    <div className="flex justify-center gap-5">
      <div className="flex items-center ">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalPages === 0}
          className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
        >
          <FaChevronLeft/>
        </button>
        <div className="flex items-center gap-2">
          {currentPage > 3 && <span className="px-2">...</span>}
          {pagesAroundCurrent.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded ${
                currentPage === page
                  ? "bg-primary1 dark:bg-brand-700 text-white"
                  : "text-gray-700 dark:text-gray-400"
              } flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium ${currentPage !== page && "hover:bg-primary1/[0.2] hover:text-primary1 dark:hover:text-primary1"}`}
            >
              {page}
            </button>
          ))}
          {currentPage < totalPages - 2 && <span className="px-2">...</span>}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
        >
          <FaChevronRight/>
        </button>
      </div>
      { showLimit && (
        <LimitPerPage
          onChangeLimit={onLimitChange}
          limit={limitPerPage}
          options={options || []}
        />
      )}
    </div>
  );
};

export default Pagination;
