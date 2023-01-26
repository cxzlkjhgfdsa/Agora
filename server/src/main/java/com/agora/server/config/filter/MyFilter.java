package com.agora.server.config.filter;

import javax.servlet.*;
import java.io.IOException;

/**
 * 추후 삭제 예정
 */
public class MyFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println("여기가 제일 먼저 시작되나요?");
        chain.doFilter(request, response);
    }
}
