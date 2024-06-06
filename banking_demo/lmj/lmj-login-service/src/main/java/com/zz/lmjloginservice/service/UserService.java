package com.zz.lmjloginservice.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.zz.lmjloginservice.dto.AuthUser;
import com.zz.lmjloginservice.dto.LoginDto;
import com.zz.lmjloginservice.dto.UserDto;
import com.zz.lmjloginservice.dto.UserExt;
import com.zz.lmjloginservice.entity.User;

@Service
public interface UserService {
    void saveUser(UserDto userDto);
    
    void createCardRequest(UserExt reqUser);

    User findUserByEmail(String email);

    List<UserDto> findAllUsers();

    AuthUser login(LoginDto loginDto);

    User getUser();
}
