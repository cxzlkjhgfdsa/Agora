package com.agora.server.config.filter;

import com.agora.server.auth.dto.JwtAuthenticationDto;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticateFilter extends AbstractAuthenticationProcessingFilter {
    // todo: https://velog.io/@jkijki12/Spring-Security-%EC%95%84%EB%8A%94%EC%B2%99%ED%95%98%EA%B8%B0 보고 하는 중

    public JwtAuthenticateFilter(String defaultFilterProcessesUrl) {
        super(defaultFilterProcessesUrl);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        // Authorization header에서 값 받아오기
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        String accessToken = header.replace("Bearer ", "");
        JwtAuthenticationDto jwtAuthenticationDto = new JwtAuthenticationDto(accessToken);

        return this.getAuthenticationManager().authenticate(jwtAuthenticationDto);
    }
}
