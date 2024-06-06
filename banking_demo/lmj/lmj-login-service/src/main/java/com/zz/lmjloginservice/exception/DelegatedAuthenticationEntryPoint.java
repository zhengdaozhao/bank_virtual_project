package com.zz.lmjloginservice.exception;

import java.io.IOException;
import java.io.OutputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zz.lmjloginservice.entity.RestError;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component("delegatedAuthenticationEntryPoint")
public class DelegatedAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver resolver;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) 
      throws IOException, ServletException {
        // RestError re=new RestError("401", "権限不足");
        // response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        // response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        // OutputStream responseStream = response.getOutputStream();
        // ObjectMapper mapper = new ObjectMapper();
        // mapper.writeValue(responseStream, re);
        // responseStream.flush();
        resolver.resolveException(request, response, null, authException);
    }
}