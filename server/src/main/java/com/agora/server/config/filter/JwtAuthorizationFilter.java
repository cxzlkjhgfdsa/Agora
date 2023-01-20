package com.agora.server.config.filter;

import com.agora.server.auth.util.AccessTokenUtil;
import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.user.repository.UserRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthorizationFilter extends OncePerRequestFilter {

    //    private String tokenType = "Bearer ";

    private final AccessTokenUtil accessTokenUtil;
    private final UserRepository userRepository;

    public JwtAuthorizationFilter(AccessTokenUtil accessTokenUtil, UserRepository userRepository) {
        this.accessTokenUtil = accessTokenUtil;
        this.userRepository = userRepository;
    }

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        String headerPrefix = "Bearer ";
        if (header == null || !header.startsWith(headerPrefix)) {
            chain.doFilter(request, response);
            return;
        }
        String accessToken = header.replace(headerPrefix, "");
        ResponseEntity<ResponseDTO> userInfo = accessTokenUtil.getUserInfo(accessToken);
        System.out.println(userInfo);
    }
}
