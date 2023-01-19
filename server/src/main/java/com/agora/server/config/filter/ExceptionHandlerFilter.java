package com.agora.server.config.filter;

import com.agora.server.common.dto.ResponseDTO;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// // https://velog.io/@dltkdgns3435/스프링시큐리티-JWT-예외처리

public class ExceptionHandlerFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // TODO: JWT 예외처리 필터 만들기
        // https://velog.io/@coastby/SpringSecurity-filter-%EB%82%B4%EC%97%90%EC%84%9C-%EB%B0%9C%EC%83%9D%ED%95%9C-%EC%98%88%EC%99%B8-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0
        ResponseDTO res = new ResponseDTO();
        try {
            filterChain.doFilter(request, response);
        } catch (Exception e) {

        }

    }
}
