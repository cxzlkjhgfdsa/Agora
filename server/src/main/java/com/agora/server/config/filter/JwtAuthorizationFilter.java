package com.agora.server.config.filter;

import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import com.agora.server.util.JwtAuthorizationUtil;
import com.agora.server.util.dto.UserAccessTokenInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthorizationFilter extends OncePerRequestFilter {

    //    private String tokenType = "Bearer ";

    private String headerPrefix = "Bearer ";
    private String authorizationHeader = "Authorization";

    private JwtAuthorizationUtil jwtAuthorizationUtil;
    private UserRepository userRepository;

    public JwtAuthorizationFilter(JwtAuthorizationUtil jwtAuthorizationUtil, UserRepository userRepository) {
        this.jwtAuthorizationUtil = jwtAuthorizationUtil;
        this.userRepository = userRepository;
    }

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(authorizationHeader);
        if (header == null || !header.startsWith(headerPrefix)) {
            chain.doFilter(request, response);
            return;
        }
        // token
        String token = request.getHeader(authorizationHeader).replace(headerPrefix, "");
        UserAccessTokenInfo userInfo = jwtAuthorizationUtil.getUserInfo(token);
        if (userInfo != null) {
            User user = userRepository.findByUserAccessTokenInfo(userInfo.getId(), userInfo.getSocialType());
            request.setAttribute("user", user);
        }
        chain.doFilter(request, response);
    }
}
