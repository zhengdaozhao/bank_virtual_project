package com.zz.lmjloginservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.zz.lmjloginservice.dto.UserDto;
import com.zz.lmjloginservice.dto.UserExt;
import com.zz.lmjloginservice.entity.User;
import com.zz.lmjloginservice.service.UserService;


@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/one")
    public ResponseEntity<User> userProfile() {
        return ResponseEntity.ok(userService.getUser());
    }
    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> allUsers() {
        return ResponseEntity.ok(userService.findAllUsers());
    }

    @PostMapping("/card/req")
    public ResponseEntity<String> createCardRequest(@RequestBody UserExt reqUser){
        userService.createCardRequest(reqUser);
        return ResponseEntity.ok("create completed");
    }

}
