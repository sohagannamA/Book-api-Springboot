package com.example.demo.utility;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class Response<T> {
    private T data;
    private String message;
}
