package com.example.demo.utility;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseEntityBuilter {
    public static <T> ResponseEntity<Response<T>> successMessage(T data, String message) {
        return ResponseEntity.status(HttpStatus.OK).body(new Response<>(data, message));
    }

    public static <T> ResponseEntity<Response<T>> notfound(String message) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response<>(null, message));
    }

    public static <T> ResponseEntity<Response<T>> checkDuplicate(String message) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new Response<>(null, message));
    }

    public static <T> ResponseEntity<Response<T>> serverError(String message) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(null, message));
    }
}
