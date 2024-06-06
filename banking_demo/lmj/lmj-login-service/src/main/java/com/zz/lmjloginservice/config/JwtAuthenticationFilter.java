package com.zz.lmjloginservice.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.filter.OncePerRequestFilter;

import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtTokenService jwtTokenService;

    private static final String TOKEN_PREFIX = "Bearer ";
    private static final String HEADER_STRING = "Authorization";

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException {
        // toczpd 2024/4/26 非常重要，这里的if条件
        // https://blog.csdn.net/Box_clf/article/details/80973391#:~:text=%E6%AF%8F%E4%B8%80%E4%B8%AAcontroller%E7%B1%BB%E4%B8%8A%E9%9C%80%E8%A6%81%E6%B7%BB%E5%8A%A0CrossOrigin%E7%9A%84%E6%B3%A8%E8%A7%A3%E8%BF%9B%E8%A1%8C%E5%A4%84%E7%90%86%E3%80%82,%E6%B7%BB%E5%8A%A0%E4%B9%8B%E5%90%8E%E5%9C%A8%E4%BD%BF%E7%94%A8SpringSecurity%E6%97%B6%E5%85%81%E8%AE%B8%E5%8C%BF%E5%90%8D%E8%AE%BF%E9%97%AE%E7%9A%84%E6%8E%A5%E5%8F%A3%E9%83%BD%E6%B2%A1%E6%9C%89%E8%B7%A8%E5%9F%9F%E7%9A%84%E9%97%AE%E9%A2%98%E4%BA%86%EF%BC%8C%E4%B8%8D%E8%BF%87%E4%BD%BF%E7%94%A8JWT%E5%AF%B9%E7%94%A8%E6%88%B7%E8%BA%AB%E4%BB%BD%E8%BF%9B%E8%A1%8C%E9%AA%8C%E8%AF%81%E6%97%B6%E8%99%BD%E7%84%B6%E5%89%8D%E7%AB%AF%E5%B7%B2%E7%BB%8F%E5%B0%86token%E7%9A%84%E5%80%BC%E6%B7%BB%E5%8A%A0%E5%88%B0%E4%BA%86header%E4%B8%AD%EF%BC%8C%E8%BF%98%E6%98%AF%E5%80%BC%E8%8E%B7%E5%8F%96%E4%B8%8D%E5%88%B0header%E4%B8%AD%E7%9A%84token%E5%80%BC%E3%80%82
        // if (!req.getMethod().equals("OPTIONS")){

            String header = req.getHeader(HEADER_STRING);
            String username = null;
            if (header != null && header.startsWith(TOKEN_PREFIX)) {
                String authToken = header.replace(TOKEN_PREFIX,"");
                username = jwtTokenService.extractUsernameFromToken(authToken);
            } else {
                log.warn("couldn't find bearer string, will ignore the header");
            }
            if (StringUtils.hasText(username)) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
                log.info("authenticated user " + username + ", setting security context");
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            chain.doFilter(req, res);
        }
    // else {
    //     log.info("浏览器的预请求的处理..");
    //     res.setHeader("Access-Control-Allow-Origin", "*");
    //     res.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,OPTIONS,DELETE");
    //     res.setHeader("Access-Control-Max-Age", "3600");
    //     res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization,token");
    //     return;     
    // }
    // }

}