package com.zz.lmjloginservice.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.zz.lmjloginservice.entity.Card;
import com.zz.lmjloginservice.entity.CardReq;
import com.zz.lmjloginservice.entity.UserBig;

@Service
public interface CardService {

    List<CardReq> getRequests();
    
    List<CardReq> getRequestsAll();

    String createPan();

    void updateCardDbs(CardReq cr);

    List<Card> getCards(String token, Boolean isAmdin);

    // List<UserBig> getCardRequests();
    
}
