package com.zz.lmjmqservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(scanBasePackages="com.zz")
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
public class LmjMqServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(LmjMqServiceApplication.class, args);
	}

}
