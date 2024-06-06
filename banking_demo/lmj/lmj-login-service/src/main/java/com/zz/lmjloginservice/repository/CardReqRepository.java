package com.zz.lmjloginservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.zz.lmjloginservice.entity.CardReq;

@Repository
public interface CardReqRepository extends JpaRepository<CardReq,String> {

    List<CardReq> findByEmail(String email);

    @Query("select cdr from CardReq cdr where cdr.status = CheckResult.Pending")
    List<CardReq> findAllCardReqs();

    Optional<CardReq> findById(String id);
}
