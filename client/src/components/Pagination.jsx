import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null; 

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav aria-label="Page navigation">
            <ul className="flex items-center -space-x-px h-10 text-base justify-center mt-4">
                {/* Previous */}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center px-4 h-10 leading-tight border rounded-s-lg ${currentPage === 1
                                ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                                : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            }`}
                    >
                        Prev
                    </button>
                </li>

                {/* Page Numbers */}
                {pages.map((page) => (
                    <li key={page}>
                        <button
                            onClick={() => onPageChange(page)}
                            className={`flex items-center justify-center px-4 h-10 leading-tight border ${page === currentPage
                                    ? "z-10 text-blue-600 border-blue-300 bg-blue-50 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                }`}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                {/* Next */}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`flex items-center justify-center px-4 h-10 leading-tight border rounded-e-lg ${currentPage === totalPages
                                ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                                : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            }`}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
