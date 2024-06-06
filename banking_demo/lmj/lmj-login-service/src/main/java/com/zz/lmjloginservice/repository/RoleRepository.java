package com.zz.lmjloginservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.zz.lmjloginservice.entity.Role;
import com.zz.lmjloginservice.entity.RoleType;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long>  {
    Role findByRole(RoleType role);

    @Transactional
    default Role saveOrUpRole(Role role){
        return save(role);
    }
}
