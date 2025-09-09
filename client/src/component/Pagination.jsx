import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../features/book/BookSlice";

export default function Pagination() {
  const dispatch = useDispatch();

  const { page, totalPages } = useSelector((store) => store.books);

  const maxPageButtons = 4;
  let startPage = Math.max(0, page - 1); 
  let endPage = Math.min(totalPages, startPage + maxPageButtons);

  if (endPage - startPage < maxPageButtons) {
    startPage = Math.max(0, endPage - maxPageButtons);
  }

  const visiblePages = [];
  for (let i = startPage; i < endPage; i++) {
    visiblePages.push(i);
  }

  return (
    <div className="mb-5 fixed bottom-0 w-full left-0 px-[5%] md:px-[30%]">
      <div className="flex bg-gray-300 px-2 md:px-5 py-2 rounded items-center justify-between">
        
        <div
          onClick={() => {
            if (page > 0) dispatch(setPage(page - 1));
          }}
          className={`p-2 rounded hover:cursor-pointer ${
            page === 0 ? "bg-gray-200 cursor-not-allowed" : "bg-gray-400"
          }`}
        >
          Previous
        </div>

        
        <div className="flex w-1/2 items-center justify-center space-x-4">
          {visiblePages.map((inx) => {
            const pageNumber = inx + 1;
            return (
              <button
                onClick={() => dispatch(setPage(pageNumber - 1))}
                key={pageNumber}
                className={`h-[30px] w-[30px] border-1 border-gray-400 ${
                  pageNumber === page + 1 ? "bg-gray-400" : ""
                } rounded-2xl flex items-center justify-center cursor-pointer hover:bg-gray-400`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

      
        <div
          onClick={() => {
            if (page < totalPages - 1) dispatch(setPage(page + 1));
          }}
          className={`p-2 rounded hover:cursor-pointer ${
            page === totalPages - 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-gray-400"
          }`}
        >
          Next
        </div>
      </div>
    </div>
  );
}
