package com.zz.lmjloginservice.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="user_details")
@NoArgsConstructor
public class UserBig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String email;
    private String name;

    @Enumerated(EnumType.STRING)
    private Gender gender;
    private int age;
    private String occupation;
    private int earning;

    @Enumerated(EnumType.STRING)
    private Marital marital;
    private long account;
    // the address is an avatar image link to a URL
    private String address;
    private String phone;

    // @JoinColumn(name = "email",referencedColumnName="email")
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER,mappedBy = "email")
    private List<CardReq> requests;

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER,mappedBy = "email")
    // @JoinColumn(name = "email",referencedColumnName="email")
    private List<Card> cards;
}
