package com.zz.lmjloginservice.entity;

public enum RoleType {
    USER("ROLE_USER"),
    ADMIN("ROLE_ADMIN"),
    HZP("ROLE_HZP"),
    LCX("ROLE_LCX"),
    LMJ("ROLE_LMJ"),
    TLN("ROLE_TLN");

    private String value;

    RoleType(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
    
}
