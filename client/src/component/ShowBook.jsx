import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearmessage,
  deleteBook,
  fetchBooks,
  searchBook,
  setPage,
} from "../features/book/BookSlice";
import store from "../app/Store";
import Pagination from "./Pagination";
import Update from "./Update";

export default function ShowBook() {
  const [updateUIinfo, setUpdateUIinfo] = useState({
    isUpdateUIshow: false,
    title: null,
  });

  const {
    filteredBookList,
    notfoundmessage,
    isLoading,
    page,
    size,
    totalPages,
  } = useSelector((store) => store.books);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooks({ page, size }));
  }, [dispatch, page, size]);

  const handleChange = (e) => {
    e.preventDefault();
    const searchKey = e.target.value;
    if (searchKey != null && searchKey.trim()) {
      dispatch(searchBook(searchKey));
      return;
    }
    dispatch(fetchBooks());
    dispatch(clearmessage());
  };

  const handleUpdateUI = (bookid, title) => {
    setUpdateUIinfo({
      isUpdateUIshow: true,
      title: title,
      id: bookid,
    });
  };

  return (
    <div className="mt-20 mb-20">
      {isLoading && (
        <div className="text-center text-xl text-gray-400">LOADING...</div>
      )}
      {filteredBookList && filteredBookList.length > 0 ? (
        <div>
          <div className="mb-5">
            <input
              type="text"
              placeholder="Search your book"
              onChange={handleChange}
              className="w-full border-1 border-gray-300 px-[15px] py-[5px] text-gray-600 outline-0 text-[15px]"
            />
          </div>
          {notfoundmessage && (
            <div className="mb-5 text-center text-gray-500">
              {notfoundmessage}
            </div>
          )}
          {filteredBookList.map((book) => (
            <div className="flex items-center justify-between bg-gray-300 px-[15px] py-[10px] rounded mb-2">
              <p className=" text-[15px] md:text-xl">{book.name}</p>
              <div className="ml-10">
                <button
                  onClick={async () => {
                    await dispatch(deleteBook(book.id));
                    dispatch(fetchBooks({ page, size })).then((res) => {
                      if (res.payload.data.content.length === 0 && page > 0) {
                        dispatch(setPage(page - 1));
                      }
                    });
                  }}
                  className="bg-red-700 p-1 cursor-pointer rounded text-[12px] text-gray-100"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdateUI(book.id, book.name)}
                  className="bg-green-700 p-1 cursor-pointer ml-3 rounded text-[12px] text-gray-100"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-xl text-gray-400">NO BOOK FOUND</div>
      )}
      {totalPages > 1 ? <Pagination /> : ""}

      {updateUIinfo && updateUIinfo.isUpdateUIshow ? (
        <Update setUpdateUIinfo={setUpdateUIinfo} updateUIinfo={updateUIinfo} />
      ) : (
        ""
      )}
    </div>
  );
}
