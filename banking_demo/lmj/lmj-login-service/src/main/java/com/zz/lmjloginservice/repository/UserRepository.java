package com.zz.lmjloginservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.zz.lmjloginservice.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByEmail(String email);
    Boolean existsByName(String username);
    Boolean existsByEmail(String email);

    @Query(value =  "select * from users where id in (select distinct a.user_id  FROM users_roles as a inner join roles as b on a.role_id=b.id where b.role_name <>'ADMIN')",nativeQuery = true)
    List<User> findAll();

    @Transactional
    default User updateOrInsert(User user) {
        return save(user);
    }    

  }
