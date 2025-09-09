package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.models.Book;
import com.example.demo.repository.BookRepository;

@Service
public class BookService {
    private BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book addNewBook(Book newBook) {
        bookRepository.save(newBook);
        return newBook;
    }

    public boolean isBookListEmpty() {
        return bookRepository.count() > 0 ? false : true;
    }

    public Page<Book> getBook(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return bookRepository.findAll(pageable);
    }

    public boolean checkDuplicate(String bookName) {
        return bookRepository.existsByName(bookName);
    }

    public boolean isBookFound(Long bookId) {
        if (!isBookListEmpty()) {
            Optional<Book> findBook = bookRepository.findById(bookId);
            return findBook.isPresent();
        }
        return false;
    }

    public List<Book> searchByKey(String searchKey) {
        return bookRepository.findAll()
                .stream()
                .filter(book -> book.getName() != null
                        && book.getName().toLowerCase().contains(searchKey.toLowerCase()))
                .collect(Collectors.toList());
    }

    public Book deleteBook(Long bookId) {
        if (!isBookListEmpty()) {
            if (isBookFound(bookId)) {
                Book deletedBook = bookRepository.findById(bookId).orElse(null);
                if (deletedBook != null) {
                    bookRepository.deleteById(bookId);
                    return deletedBook;
                }
            }
        }
        return null;
    }

    public Book updateBook(Long bookId, String bookname) {
        if (!isBookListEmpty()) {
            return bookRepository.findById(bookId).map(book -> {
                book.setName(bookname);
                return bookRepository.save(book);
            }).orElse(null);
        }
        return null;
    }
}
