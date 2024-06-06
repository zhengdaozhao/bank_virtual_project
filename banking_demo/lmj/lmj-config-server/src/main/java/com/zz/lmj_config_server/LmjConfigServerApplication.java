package com.zz.lmj_config_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
public class LmjConfigServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(LmjConfigServerApplication.class, args);
	}

}
