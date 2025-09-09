import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk(
  "book/fetchbook",
  async ({ page, size }) => {
    const response = await axios.get(
      `http://localhost:8080/api/books/allbooks?page=${page}&size=${size}`
    );
    return response.data;
  }
);

export const addBook = createAsyncThunk(
  "book/addBook",
  async (newbook, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/books/addbook",
        newbook
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    }
  }
);

export const searchBook = createAsyncThunk(
  "book/searchBook",
  async (searchKey, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/books/search/${searchKey}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "book/deletebook",
  async (bookid, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/books/delete/${bookid}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    }
  }
);

export const UpdateBook = createAsyncThunk(
  "book/update",
  async ({ bookid, name }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/books/update/${bookid}?name=${encodeURIComponent(
          name
        )}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    }
  }
);

const BookSlice = createSlice({
  name: "book",
  initialState: {
    allBookList: [],
    filteredBookList: [],
    isLoading: false,
    error: null,
    message: "",

    notfoundmessage: "",

    page: 0,
    size: 5,
    totalPages: 0,
  },
  reducers: {
    clearmessage: (state) => {
      state.message = "";
      state.notfoundmessage = "";
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      console.log(action.payload);
      state.allBookList = [...action.payload.data.content];
      state.filteredBookList = [...state.allBookList];
      state.totalPages = action.payload.data.totalPages;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(addBook.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const newBook = action.payload?.data;
      if (newBook) {
        state.allBookList = [...state.allBookList, newBook];
        state.filteredBookList = [...state.filteredBookList, newBook];
      }
    });
    builder.addCase(addBook.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = action.error.message;
    });

    builder.addCase(searchBook.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const searchData = action.payload?.data;
      if (searchData && searchData.length > 0) {
        state.filteredBookList = [...searchData];
      } else {
        state.filteredBookList = [...state.allBookList];
      }
    });
    builder.addCase(searchBook.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.notfoundmessage = action.payload;
    });

    builder.addCase(deleteBook.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      if (action.payload?.data) {
        state.isLoading = false;
        state.filteredBookList = state.filteredBookList.filter(
          (book) => book.id != action.payload.data.id
        );

        state.allBookList = state.allBookList.filter(
          (book) => book.id != action.payload.data.id
        );
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(UpdateBook.pending, (state) => {
      state.isLoading = true;
      console.log("Check-1");
    });

    builder.addCase(UpdateBook.fulfilled, (state, action) => {
      console.log(action.payload.data);
      if (action.payload?.data) {
        state.isLoading = false;
        const updateBook = action.payload?.data;

        state.allBookList = state.allBookList.map((book) =>
          book.id === updateBook.id ? updateBook : book
        );

        state.filteredBookList = state.filteredBookList.map((book) =>
          book.id === updateBook.id ? updateBook : book
        );
      } else {
        state.error = action.payload.message;
      }
    });
    builder.addCase(UpdateBook.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = action.error.message;
    });
  },
});

export const { clearmessage, setPage } = BookSlice.actions;
export default BookSlice.reducer;
