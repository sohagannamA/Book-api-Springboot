import React from "react";
import AddBook from "./component/AddBook";
import ShowBook from "./component/ShowBook";

export default function App() {
  return (
    <div className="md:flex items-center justify-center px-5">
      <div>
        <AddBook />
        <ShowBook />
      </div>
    </div>
  );
}
