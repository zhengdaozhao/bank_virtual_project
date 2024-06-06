package com.zz.lmjmqservice.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    @Bean
    public NewTopic lmjTopic(){
        return TopicBuilder.name("lmj")
                .build();
    }
    @Bean
    public NewTopic zpddyz(){
        return TopicBuilder.name("zpddyz")
                .build();
    }
}