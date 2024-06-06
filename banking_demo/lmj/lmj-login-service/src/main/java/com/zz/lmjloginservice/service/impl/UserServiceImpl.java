package com.zz.lmjloginservice.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zz.lmjloginservice.config.JwtTokenService;
import com.zz.lmjloginservice.dto.AuthUser;
import com.zz.lmjloginservice.dto.LoginDto;
import com.zz.lmjloginservice.dto.UserDto;
import com.zz.lmjloginservice.dto.UserExt;
import com.zz.lmjloginservice.entity.CardReq;
import com.zz.lmjloginservice.entity.CardType;
import com.zz.lmjloginservice.entity.CheckResult;
import com.zz.lmjloginservice.entity.Gender;
import com.zz.lmjloginservice.entity.Marital;
import com.zz.lmjloginservice.entity.Role;
import com.zz.lmjloginservice.entity.RoleType;
import com.zz.lmjloginservice.entity.User;
import com.zz.lmjloginservice.entity.UserBig;
import com.zz.lmjloginservice.repository.CardReqRepository;
import com.zz.lmjloginservice.repository.RoleRepository;
import com.zz.lmjloginservice.repository.UserBigRepository;
import com.zz.lmjloginservice.repository.UserRepository;
import com.zz.lmjloginservice.service.UserService;

@Service
public class UserServiceImpl implements UserService {
    // @Autowired
    // private BCryptPasswordEncoder bcryptEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserBigRepository userBigRepository;

    @Autowired
    private CardReqRepository cardReqRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // public UserServiceImpl(UserRepository userRepository,
    //                        RoleRepository roleRepository,
    //                        PasswordEncoder passwordEncoder) {
    //     this.userRepository = userRepository;
    //     this.roleRepository = roleRepository;
    //     this.passwordEncoder = passwordEncoder;
    // }    
    @Override
    public void saveUser(UserDto userDto) {
        User user = new User();
        user.setName(userDto.getFirstname() + " " + userDto.getLastname());
        user.setEmail(userDto.getEmail());
        // encrypt the password using spring security
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        List<RoleType> zpd001=new ArrayList<>();
        if(user.getName().contains("zhiping")) {
            zpd001.add(RoleType.USER);
            zpd001.add(RoleType.HZP);
        }
        else if(user.getName().contains("chuxuan")){
            zpd001.add(RoleType.USER);
            zpd001.add(RoleType.LCX);
        }
        else if(user.getName().contains("minjuan")){
            zpd001.add(RoleType.USER);
            zpd001.add(RoleType.LMJ);
        }
        else if(user.getName().contains("lina")){
            zpd001.add(RoleType.USER);
            zpd001.add(RoleType.TLN);
        }
        else if(user.getName().contains("jiandong")){
            zpd001.add(RoleType.ADMIN);
        }
        else {
            zpd001.add(RoleType.USER);
        }
        Role[] role=new Role[zpd001.size()];
        for(int i=0;i<zpd001.size();i++){
            role[i]=roleRepository.findByRole(zpd001.get(i));
            if(role[i] == null){
                role[i] = checkRoleExist(zpd001.get(i));
            }  
        }

        // Role role = roleRepository.findByRole(RoleType.ADMIN);
        // if(role == null){
        //     role = checkRoleExist();
        // }
        user.setRoles(Arrays.asList(role));
        userRepository.updateOrInsert(user);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<UserDto> findAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map((user) -> mapToUserDto(user))
                .collect(Collectors.toList());
    }

    private UserDto mapToUserDto(User user){
        UserDto userDto = new UserDto();
        String[] str = user.getName().split(" ");
        userDto.setFirstname(str[0]);
        userDto.setLastname(str[1]);
        userDto.setEmail(user.getEmail());
        return userDto;
    }

    private Role checkRoleExist(RoleType rt){
        Role role = new Role();
        role.setRole(rt);
        // return roleRepository.save(role);
        return roleRepository.saveOrUpRole(role);
    }

    @Override
    public AuthUser login(LoginDto loginDto) {
        try{
            final Authentication authentication = authenticationProvider.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getEmail(),
                            loginDto.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }catch(Exception err){
            return null;
        }
        final User user = userRepository.findByEmail(loginDto.getEmail());
        String token= jwtTokenService.generateToken(user.getEmail(), user.getRoles());

        List<Role> zpd001 =user.getRoles();
        String auth="USER";
        for (Role role:zpd001){
            if (role.getRole().getValue()=="ROLE_ADMIN"){
                auth="ADMIN";
                break;
            }
        }
        return new AuthUser(user,auth,token);
        // return null;
    }
    @Override
    public User getUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByEmail(userDetails.getUsername());
    }

    @Override
    @Transactional
    public void createCardRequest(UserExt reqUser) {


        //1. watch if user_detail table has records
        Optional<UserBig> lcx001 = userBigRepository.findByEmail(reqUser.getEmail());
        lcx001.ifPresentOrElse(
            xyz->{
                // 2024/5/13 do nothing
                // List<CardReq> lcx002 = cardReqRepository.findByEmail(reqUser.getEmail());
                // xyz.setRequests(lcx002);
                // userBigRepository.save(xyz);
            },
            ()->{
                //create a new record in user_details table
                UserBig lmj001=new UserBig();
                lmj001.setEarning(reqUser.getEarning());
                lmj001.setCards(null);
                lmj001.setAccount(reqUser.getAccount());
                lmj001.setOccupation(reqUser.getOccupation());
                lmj001.setAddress(
                    reqUser.getGender().equals("female") ?
                     "https://tse4-mm.cn.bing.net/th/id/OIP-C.zWf-nFdicY7dHTjaXZ04SgHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" :
                      "https://tse3-mm.cn.bing.net/th/id/OIP-C.tFemdz97iyT9hgZ3g3tJmgHaIO?w=168&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7");
                lmj001.setEmail(reqUser.getEmail());
                lmj001.setAge(reqUser.getAge());
                lmj001.setGender(reqUser.getGender().equals("female") ? Gender.女 : Gender.男);
                lmj001.setMarital(reqUser.getMarital()==1?Marital.未婚
                    :reqUser.getMarital()==2?Marital.既婚:Marital.離婚);
                lmj001.setName(reqUser.getName());
                // List<CardReq> lcx002 = cardReqRepository.findByEmail(reqUser.getEmail());
                // lmj001.setRequests(lcx002);
                // 2004/5/13 modify
                // lcx002.forEach(lcx->{lcx.setCxddyz(lmj001);
                //     cardReqRepository.save(lcx);});

                userBigRepository.save(lmj001);
            }
        ); 
        
        // 1. create careReq table record
        CardReq cardReq=new CardReq();
        cardReq.setEmail(reqUser.getEmail());
        cardReq.setApplyDate(LocalDateTime.now());
        cardReq.setName(reqUser.getName());
        cardReq.setStatus(CheckResult.Pending);
        cardReq.setType(reqUser.getCardtype()==1?CardType.VISA:
            reqUser.getCardtype()==2?CardType.JCB:CardType.CBU);
        // 2024/5/13 add toczpd
        cardReq.setCxddyz(userBigRepository.findByEmail(reqUser.getEmail()).get());
        cardReqRepository.save(cardReq);
        
    }    
}
