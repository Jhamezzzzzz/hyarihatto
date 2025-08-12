import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import LimitPerPage from "./LimitPerPage";
import { useSidebar } from "../../../context/SidebarContext";

export type PaginationProps = {
  page: number;
  totalPages: number;
  limit: number;
}

type PaginationComponent = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;

  showLimit?: boolean;
  limitPerPage?: number;
  options?: number[];
  onLimitChange?: (limit: number) => void;
};

const Pagination: React.FC<PaginationComponent> = ({
  currentPage,
  totalPages,
  onPageChange,

  showLimit,
  limitPerPage,
  options,
  onLimitChange,
}) => {
  const { isMobile } = useSidebar()

  const pagesAroundCurrent = Array.from(
    { length: Math.min(isMobile ? 2 : 3, totalPages) },
    (_, i) => i + Math.max(currentPage - 1, 1)
  );

  return (
    <div className="flex justify-center gap-5 flex-wrap">
      <div className="flex items-center ">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1 || totalPages === 0}
          className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
        >
          <FaAngleDoubleLeft/>
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalPages === 0}
          className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
        >
          <FaAngleLeft/>
        </button>
        <div className="flex items-center gap-2">
          { (!isMobile && currentPage > 3) && <span className="px-2">...</span>}
          {pagesAroundCurrent.map((page) => {
            if(page <= totalPages){
              return(
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
              )}
            }
          )}
          { (!isMobile && currentPage < ( totalPages - 2)) && <span className="px-2">...</span>}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
        >
          <FaAngleRight/>
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
        >
          <FaAngleDoubleRight/>
        </button>
      </div>
      { showLimit && (
        <div className={`${isMobile && "flex items-center gap-4 justify-end w-full"}`}>
          {isMobile && (
            <p>
              Showing :
            </p>
          )}
          <LimitPerPage
            onChangeLimit={onLimitChange}
            limit={limitPerPage}
            options={options || []}
          />
        </div>
      )}
    </div>
  );
};

export default Pagination;
