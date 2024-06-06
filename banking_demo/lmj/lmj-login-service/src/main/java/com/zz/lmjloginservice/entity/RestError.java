package com.zz.lmjloginservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RestError {
    private String status;
    private String message;
}
