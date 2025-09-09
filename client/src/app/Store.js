import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../features/book/BookSlice";
const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});
export default store;
