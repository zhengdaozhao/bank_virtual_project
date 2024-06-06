package com.zz.lmjmqservice.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.zz.lmjmqservice.service.KafkaProducer;

@RestController
@RequestMapping("/kafka/produce")
@CrossOrigin
public class KafkaProducerController {
    @Autowired
    private KafkaProducer kafkaProducer;

    @PostMapping("/pub")
    public ResponseEntity<String> publish(@RequestParam("message") String message){
        kafkaProducer.sendMessage(message);
        return ResponseEntity.ok("Message sent to kafka topic");
    }
}