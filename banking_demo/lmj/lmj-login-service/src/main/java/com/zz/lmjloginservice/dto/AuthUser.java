package com.zz.lmjloginservice.dto;

import com.zz.lmjloginservice.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthUser {
    // private String email;
    private User user;
    private String role;
    private String token;
}
