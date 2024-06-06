package com.zz.lmjloginservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zz.lmjloginservice.dto.AuthUser;
import com.zz.lmjloginservice.dto.LoginDto;
import com.zz.lmjloginservice.dto.UserDto;
import com.zz.lmjloginservice.entity.User;
import com.zz.lmjloginservice.service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserService userService;

   // handler method to handle home page request
    @GetMapping("/index")
    public ResponseEntity<String> home(){
        // return new UserDto( "hu", "zhaojing", "hzp@zpddyz.cn", "cfxzhaojzhipingzhuzhuchuxuanminjuantonight");
        return new ResponseEntity<String>("this is huzhipingdadingyanzi which is caoed by zhoujd all the time",HttpStatus.OK);
    }
    
    @RequestMapping("/register/save")
    public ResponseEntity<String> registration(@RequestBody UserDto userDto){
        if (userDto.getEmail() == null || userDto.getPassword() == null){
            return new ResponseEntity<String>("input is null",
            HttpStatus.BAD_REQUEST);
        }
        User userByEmail = userService.findUserByEmail(userDto.getEmail());
        if (userByEmail != null){
            return new ResponseEntity<String>("email is duplicated",
            HttpStatus.NOT_ACCEPTABLE);
        }

        userService.saveUser(userDto);
        return new ResponseEntity<String>(HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthUser> login(@RequestBody LoginDto loginDto) {
        return ResponseEntity.ofNullable(userService.login(loginDto));
    }
}