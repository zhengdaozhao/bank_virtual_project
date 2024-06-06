package com.zz.lmjloginservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zz.lmjloginservice.entity.CreditCardNo;

@Repository
public interface CreditCardNoRepository extends JpaRepository<CreditCardNo,String> {
    List<CreditCardNo> findAll();
}
