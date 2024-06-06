package com.zz.lmjloginservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.zz.lmjloginservice.entity.UserBig;


@Repository
public interface UserBigRepository extends JpaRepository<UserBig,Long> {
    Optional<UserBig> findByEmail(String email);

    // @Query("select ub from UserBig ub where ub. = CheckResult.Pending")
    // List<UserBig> findUserWithPendingCardRequest();

}
