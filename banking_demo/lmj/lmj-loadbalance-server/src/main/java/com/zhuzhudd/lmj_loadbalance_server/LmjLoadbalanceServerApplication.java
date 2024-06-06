package com.zhuzhudd.lmj_loadbalance_server;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@CrossOrigin
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
public class LmjLoadbalanceServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(LmjLoadbalanceServerApplication.class, args);
	}

	@Value("${server.instance.id}")
	String instanceId;

	@GetMapping("/zhuzhu")
	public String hello(){
		return String.format("Hello from zhuzhuddyz %s", instanceId);
	}
}
