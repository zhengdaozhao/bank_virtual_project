package com.zz.lmjloginservice.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zz.lmjloginservice.config.JwtTokenService;
import com.zz.lmjloginservice.entity.Card;
import com.zz.lmjloginservice.entity.CardReq;
import com.zz.lmjloginservice.entity.CheckResult;
import com.zz.lmjloginservice.entity.CreditCardNo;
import com.zz.lmjloginservice.entity.UserBig;
import com.zz.lmjloginservice.repository.CardRepository;
import com.zz.lmjloginservice.repository.CardReqRepository;
import com.zz.lmjloginservice.repository.CreditCardNoRepository;
import com.zz.lmjloginservice.repository.UserBigRepository;
import com.zz.lmjloginservice.service.CardService;

@Service
public class CardServiceImpl implements CardService {

    @Autowired
    private CardReqRepository cardReqRepository;

    @Autowired
    private CreditCardNoRepository creditCardNoRepository;

    @Autowired
    private UserBigRepository userBigRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Override
    public List<CardReq> getRequests() {
        return cardReqRepository.findAllCardReqs();
    }

    @Override
    public List<CardReq> getRequestsAll() {
        return cardReqRepository.findAll();
    }

    @Override
    public String createPan() {
        List<CreditCardNo> allpan = creditCardNoRepository.findAll();
        StringBuilder sb=new StringBuilder("");
        Long rs = (Long) Math.round((Math.random() * 9 + 1) * Math.pow(10, 13));
        // sb.append(rs);
        String zpddyz001="8888" + rs.toString();
        long cnt=allpan.stream().filter(xyz->xyz.getNo().equals(zpddyz001)).count();
        if (cnt==0) {
            // CreditCardNo ccn=new CreditCardNo();
            // ccn.setNo(zpddyz001);
            // creditCardNoRepository.save(ccn);
            return rs.toString();
        } else
        {
            return null;
        }
        
    }

    @Override
    @Transactional
    public void updateCardDbs(CardReq cr) {
        //1 update CardReq table
        Optional< CardReq> crr=cardReqRepository.findById(cr.getId());
        crr.ifPresent(xyz->{
            xyz.setStatus(cr.getStatus());
            // xyz.setStatus(cr.getStatus().equals("Reject")?CheckResult.Reject :
            // cr.getStatus().equals("Accept")?CheckResult.Accept:null
            //     );
            cardReqRepository.save(xyz);
        });
        //2 insert the cards table
        if(cr.getStatus()==CheckResult.Accept){
            //2.1
            //creditcardno table insert
            CreditCardNo ccn=new CreditCardNo();
            ccn.setNo(cr.getName());
            creditCardNoRepository.save(ccn);

            Optional<UserBig> zpddyz001 = userBigRepository.findByEmail(cr.getEmail());
            //2.2 card table insert
            Card cd=new Card();
            LocalDate zpddyz002=LocalDate.now();
            cd.setBeginday(zpddyz002);
            //the card no is saved in the name column
            cd.setCardno(cr.getName());
            // cd.setCxddyz(cr.getCxddyz());
            cd.setCxddyz(zpddyz001.get());
            cd.setEmail(cr.getEmail());
            cd.setEndday( zpddyz002.plusYears(15L));
            cd.setName(cr.getCxddyz().getName());
            cardRepository.save(cd);
        }
    }

    @Override
    public List<Card> getCards(String token,Boolean isAdmin) {
        String email = jwtTokenService.extractUsernameFromToken(token);
        List<Card> zpddyz;
        if(isAdmin) {
            zpddyz = cardRepository.findAll();
        }else {
            zpddyz = cardRepository.findByEmail(email);
        }
        return zpddyz;
        // throw new UnsupportedOperationException("Unimplemented method 'getCards'");
    }
}
