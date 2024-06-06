package com.zz.lmjmqservice.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.config.KafkaListenerEndpointRegistry;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zz.lmjmqservice.service.KafKaConsumer;

@RestController
@RequestMapping("/kafka/consume")
@CrossOrigin
public class KafkaConsumerController {
    @Autowired
    private KafKaConsumer kafkaConsumerService;

    @GetMapping("/sub")
    public ResponseEntity<List<String>> getAllMessages() {
        return ResponseEntity.ok(kafkaConsumerService.getMessages());
    }

    //
  /**
   * 应用程序上行文
   */
  @Autowired
  ApplicationContext context;
 
  /**
   * 消费者工厂
   */
  @Autowired
  ConsumerFactory<Object, Object> cf;
 
  /**
   * 监听器容器工厂
   */
  @Autowired
  ConcurrentKafkaListenerContainerFactory<Object, Object> containerFactory;
 
 
  /**
   * 所有@KafkaListener这个注解所标注的方法都会被注册在这里面中
   */
  @Autowired
  KafkaListenerEndpointRegistry registry;
 
  /**
   * 创建消费者分组
   */
  @GetMapping("/create")
  public void create() {
    //动态创建三个消费者分组
    String[] groupIds = {"group-0", "group-1", "group-2"};
 
    for (String groupId : groupIds) {
      // 初始化当前消费者分组的配置
      Map<String, Object> consumerProps = new HashMap<>(cf.getConfigurationProperties());
      consumerProps.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);
      // 设置监听器容器工厂
      containerFactory.setConsumerFactory(new DefaultKafkaConsumerFactory<>(consumerProps));
      // 获取监听类实例
    //   context.getBean(MyListener.class);
    }
  }
 
  /**
   * 停止所有消费监听
   */
  @GetMapping("/stop")
  public void stop() {
    registry.getListenerContainers().forEach(container -> {
      //System.out.println(container.getGroupId());
      //System.out.println(container.getListenerId());
      container.stop();
    });
  }
 
  /**
   * 获取监听类实例
   */
//   @Bean
//   @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
//   public MyListener listener() {
//     return new MyListener();
//   }
    ///
    
}
