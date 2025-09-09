import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { UpdateBook } from "../features/book/BookSlice";

export default function Update(props) {
  const { setUpdateUIinfo, updateUIinfo } = props;
  const [updateValue, setUpdateValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (updateUIinfo.title) {
      setUpdateValue(updateUIinfo.title);
    }
  }, [updateUIinfo.title]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateBook({ bookid: updateUIinfo.id, name: updateValue }));
  };
  return (
    <div className="fixed h-screen w-full bg-[#100f0fe6] top-0 left-0">
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-3 w-[300px] rounded"
        >
          <div>
            <div className=" mb-3 flex items-center justify-between">
              <p className="text-gray-600">Update Book</p>
              <p
                onClick={() => {
                  setUpdateUIinfo({
                    isUpdateUIshow: false,
                  });
                }}
                className="h-[30px] w-[30px] border-1 border-gray-300 flex items-center justify-center rounded-2xl text-[17px] cursor-pointer"
              >
                <IoMdClose />
              </p>
            </div>
            <input
              type="text"
              required
              value={updateValue}
              onChange={(e) => setUpdateValue(e.target.value)}
              placeholder="Enter the book name"
              className="w-full border-1 border-gray-300 px-3 py-2 rounded outline-0 text-gray-600"
            />
            <input
              type="submit"
              className="mt-3 w-full bg-[#5eb918] px-2 py-1 rounded text-gray-100 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
