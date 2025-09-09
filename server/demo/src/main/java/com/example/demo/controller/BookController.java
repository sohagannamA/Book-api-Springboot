package com.example.demo.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Book;
import com.example.demo.services.BookService;
import com.example.demo.utility.Response;
import com.example.demo.utility.ResponseEntityBuilter;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    private BookService bookservice;

    public BookController(BookService bookService) {
        this.bookservice = bookService;
    }

    @PostMapping("/addbook")
    public ResponseEntity<Response<Book>> addNewBook(@RequestBody Book newBook) {

        try {
            if (bookservice.checkDuplicate(newBook.getName())) {
                return ResponseEntityBuilter.checkDuplicate("Already added this book");

            } else {
                Book addedBook = bookservice.addNewBook(newBook);
                return ResponseEntityBuilter.successMessage(addedBook, "New book added success");
            }
        } catch (Exception ex) {
            return ResponseEntityBuilter.serverError("Internal server error");
        }
    }

    @GetMapping("/allbooks")
    public ResponseEntity<Response<Page<Book>>> getAllBooks(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size) {
        try {
            if (bookservice.isBookListEmpty()) {
                return ResponseEntityBuilter.notfound("No book found");
            } else {
                return ResponseEntityBuilter.successMessage(bookservice.getBook(page, size), "Here is your all book");
            }
        } catch (Exception ex) {
            return ResponseEntityBuilter.serverError("Internal server error");
        }
    }

    @GetMapping("/search/{searchKey}")
    public ResponseEntity<Response<List<Book>>> searchByKey(@PathVariable String searchKey) {
        try {
            if (bookservice.isBookListEmpty()) {
                return ResponseEntityBuilter.notfound("No book found");
            } else {
                List<Book> searchResult = bookservice.searchByKey(searchKey);
                if (searchResult.size() == 0) {
                    return ResponseEntityBuilter.notfound("No data found");
                }
                return ResponseEntityBuilter.successMessage(searchResult,
                        "here is your search result");
            }
        } catch (Exception ex) {
            return ResponseEntityBuilter.serverError("Internal server error");
        }
    }

    @DeleteMapping("/delete/{Id}")
    public ResponseEntity<Response<Book>> deleteBook(@PathVariable("Id") Long bookId) {
        try {
            if (bookservice.isBookListEmpty()) {
                return ResponseEntityBuilter.notfound("No book found");
            } else {
                if (!bookservice.isBookFound(bookId)) {
                    return ResponseEntityBuilter.notfound("Deleted book not found");
                } else {
                    return ResponseEntityBuilter.successMessage(bookservice.deleteBook(bookId), "Book deleted success");
                }
            }
        } catch (Exception ex) {
            return ResponseEntityBuilter.serverError("Internal server error");
        }
    }

    @PutMapping("/update/{Id}")
    public ResponseEntity<Response<Book>> updateBook(@PathVariable("Id") Long bookId,
            @RequestParam("name") String bookname) {
        System.out.println(bookname);
        try {
            if (!bookservice.isBookListEmpty() && bookservice.isBookFound(bookId)) {
                if (!bookservice.checkDuplicate(bookname)) {
                    return ResponseEntityBuilter.successMessage(bookservice.updateBook(bookId, bookname),
                            "Book update success");
                } else {
                    return ResponseEntityBuilter.checkDuplicate("Already added this book");
                }
            } else {
                return ResponseEntityBuilter.notfound("Book not found");
            }
        } catch (Exception ex) {
            return ResponseEntityBuilter.serverError("Internal server error");
        }
    }

}
