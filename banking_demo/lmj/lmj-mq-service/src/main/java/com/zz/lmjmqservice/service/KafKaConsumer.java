package com.zz.lmjmqservice.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.zz.lmjmqservice.utils.AppConstants;

@Service
public class KafKaConsumer {

    private final List<String> messages = new ArrayList<>();

    @KafkaListener(topics = AppConstants.TOPIC_NAME1,
                    groupId = AppConstants.GROUP_ID)
    public void listen(String message) {
        messages.add(message);
    }

    public List<String> getMessages() {
        List<String> currentMessages = new ArrayList<>(messages);
        messages.clear();
        return currentMessages;
    }}