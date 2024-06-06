package com.zhuzhudd.lmj_loadbalance_service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.client.RestClient;
import org.springframework.web.reactive.function.client.WebClient;
// import org.springframework.web.clent.RestClient;

@SpringBootApplication
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
public class LmjLoadbalanceServiceApplication {

	public static void main(String[] args) {
		// SpringApplication.run(LmjLoadbalanceServiceApplication.class, args);
		ConfigurableApplicationContext ctx=new SpringApplicationBuilder(LmjLoadbalanceServiceApplication.class)
				.web(WebApplicationType.NONE)
				.run(args);

		List<String> zhuzhuddyz003 = Arrays.asList(ctx.getBeanDefinitionNames());
		zhuzhuddyz003.forEach(System.out::println);
		// 2024/5/29 add comment toczpd
		// although the WebClient was released in Sping 5.0 but the corresponding RestClient class
		// appears in Spring framework6.1 m2, so it's very important to gurantee the version of Springboot!!!
		// in this application,we should set the springboot version greater than 3.2.0
		WebClient loadbalancedClient=ctx.getBean(WebClient.Builder.class).build();
		for(int i=1;i<=10;i++){
			String response=
			loadbalancedClient.get().uri("http://lmj-loadbalance-server/zhuzhu")
			.retrieve().toEntity(String.class)
			.block().getBody();
			System.out.println(response);
		}
		// 2024/5/29 +++++++++++++++++++the code between the comment is for tracking error information
		// RestClient
		// BeanFactory zhuzhuddyz001;
		// ApplicationContext zhuzhuddyz002=new ClassPathXmlApplicationContext(ctx);
		// 2024/5/29 +++++++++++++++++++by inspecting the defination of the corresponding class.

	}

}
