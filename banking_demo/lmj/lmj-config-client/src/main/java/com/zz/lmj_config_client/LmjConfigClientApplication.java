package com.zz.lmj_config_client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@RefreshScope
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
public class LmjConfigClientApplication {

	@Value("${user.role}")
	private String role;

	@Value("${user.password}")
	private String password;

	public static void main(String[] args) {
		SpringApplication.run(LmjConfigClientApplication.class, args);
	}

	@GetMapping(value = "/whoami/{username}",
		produces = MediaType.TEXT_PLAIN_VALUE)
	public String whoami(@PathVariable("username") String username) {
		return String.format("hello! you're %s and you'll become a(n) %s,"
		+ "but only if your password is '%s'!\n", 
		username,role, password);
	}
}
