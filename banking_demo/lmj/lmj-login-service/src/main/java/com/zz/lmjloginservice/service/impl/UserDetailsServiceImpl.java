package com.zz.lmjloginservice.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.zz.lmjloginservice.entity.Role;
import com.zz.lmjloginservice.entity.User;
import com.zz.lmjloginservice.repository.UserRepository;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if(user == null){
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        // 2024/4/26 此处的username是用户的e-mail
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), getAuthority(user.getRoles()));
    }

    private List<SimpleGrantedAuthority> getAuthority(List<Role> roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getRole().getValue())).collect(Collectors.toUnmodifiableList());
    }
}
