package com.zz.lmjloginservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zz.lmjloginservice.entity.Card;
import com.zz.lmjloginservice.entity.CardReq;
import com.zz.lmjloginservice.service.CardService;

@RestController
@CrossOrigin
@RequestMapping("/card")
public class CardController {

    @Autowired
    private CardService cardService;

    @GetMapping("/request")
    public ResponseEntity<List<CardReq>> allPendingRequests() {
        return ResponseEntity.ok(cardService.getRequests());
    }
    @GetMapping("/request/all")
    public ResponseEntity<List<CardReq>> allRequests() {
        return ResponseEntity.ok(cardService.getRequestsAll());
    }

    @GetMapping("/genpan")
    public ResponseEntity<String> genPanNumber() {
        return ResponseEntity.ok(cardService.createPan());
    }
    @RequestMapping("/all/{token}/{isAdmin}")
    public ResponseEntity<List<Card>> getAllCardsOfThisUser(
            @PathVariable(value="token") String token,
            @PathVariable(value="isAdmin") Boolean isAmdin
    ){
        return ResponseEntity.ok(cardService.getCards(token,isAmdin));
    }

    @PostMapping("/update")
    public ResponseEntity<String> updatePanRequestInfo(@RequestBody CardReq cr) {
        cardService.updateCardDbs(cr);
        return ResponseEntity.ok("success to update related card tables");
    }
}
