package com.zz.lmjloginservice.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {

    private static final String[] WHITELIST_URLS = {"/auth/**"};

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtAuthenticationFilter jwtAuthFilter;

    // 2024/5/20 add 
    // @Autowired
    // @Qualifier("customAuthenticationEntryPoint")
    // AuthenticationEntryPoint authEntryPoint;
    @Autowired
    @Qualifier("delegatedAuthenticationEntryPoint")
    AuthenticationEntryPoint authEntryPoint;

    // @Autowired
    // private CustomCorsConfigurationSource customCorsConfigurationSource;
    //

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 2024/5/21 the most correct coding way of spring security CORS is bellow,
            // which referred https://docs.spring.io/spring-security/reference/servlet/integrations/cors.html
                .cors(cors->cors.configurationSource(null))
                // the bellow code is deprecated but if coding like this, it still works!
                // .cors().configurationSource(customCorsConfigurationSource).and()
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers(WHITELIST_URLS).permitAll();

                    // auth.requestMatchers("/v2/api-docs").permitAll();
                    // auth.requestMatchers("/configuration/ui").permitAll();
                    // auth.requestMatchers("/swagger-resources/**").permitAll();
                    // auth.requestMatchers("/configuration/security").permitAll();
                    auth.requestMatchers("/swagger-ui/**").permitAll();
                    // 2024/6/4 toczpd to enter swagger-ui webpage, if the bellow path
                    // is not added to skip the security filter,next error will happen
                    // 'failed to load remote configuration'
                    auth.requestMatchers("/v3/**").permitAll();
                    auth.requestMatchers("/actuator/**").permitAll();
                    // auth.requestMatchers("/swagger-ui/*").permitAll();
                    // auth.requestMatchers("/webjars/**").permitAll();
                    // auth.requestMatchers("/v2/**").permitAll();
                    
                    //toczpd 2024/5/8 add very powerful one line code!
                    auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();
                    auth.anyRequest().authenticated();
                })
                // 2024/5/20 add
                .httpBasic(basic->basic.authenticationEntryPoint(authEntryPoint))
                // .exceptionHandling(Customizer.withDefaults())
                // 
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // .addFilterBefore(corsFilter, jwtAuthFilter)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173/user/one"));
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    // @Bean
    // public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
    //     return authenticationConfiguration.getAuthenticationManager();
    //     // ProviderManager a;
    // }
}