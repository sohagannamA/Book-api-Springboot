import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook, clearmessage, fetchBooks } from "../features/book/BookSlice";

export default function AddBook() {
  const { message,page,size } = useSelector((store) => store.books);

  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Book name cannot be empty");
      return;
    }

    dispatch(addBook({ name }));
    dispatch(fetchBooks({ page, size }));
    setName("");
  };

  useEffect(() => {
    if (message) {
      alert(message);
      dispatch(clearmessage());
    }
  }, [message]);

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the book name"
            className="w-full border-1 border-gray-300 px-3 py-2 rounded outline-0 text-gray-600"
          />
        </div>
        <div className="text-center">
          <button className="px-[30px] py-[5px] w-full text-gray-200 text-[16px] cursor-pointer rounded bg-[#9813d1] mt-5 ">
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}
