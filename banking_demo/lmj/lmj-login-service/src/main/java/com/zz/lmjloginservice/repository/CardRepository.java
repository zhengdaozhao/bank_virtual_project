package com.zz.lmjloginservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zz.lmjloginservice.entity.Card;

@Repository
public interface CardRepository extends JpaRepository<Card,Long> {

    List<Card> findAll();

    List<Card> findByEmail(String email);
}
