package com.zz.lmjloginservice.dto;

import lombok.Data;

@Data
public class UserExt {
    private String email;

    private int cardtype;
    private String name;
    private String gender;
    private int age;
    private String occupation;
    private int earning;
    private int marital;
    private Long account;

}
