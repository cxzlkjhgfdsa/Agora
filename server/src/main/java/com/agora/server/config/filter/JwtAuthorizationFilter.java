package com.agora.server.config.filter;

import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import com.agora.server.util.JwtAuthorizationUtil;
import com.agora.server.util.dto.UserAccessTokenInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@RequiredArgsConstructor
@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {
    @Value("${jwt-config.secret}")
    private String jwtSecret;
    @Value("${jwt-config.expires-in}")
    private String expiresIn;
    @Value("${jwt-config.token-type}")
    private String tokenType;
    @Value("${jwt-config.header}")
    private String authorizationHeader;


    private final JwtAuthorizationUtil jwtAuthorizationUtil;
    private final UserRepository userRepository;


    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(authorizationHeader);
        if (header == null || !header.startsWith(tokenType)) {
            chain.doFilter(request, response);
            return;
        }
        // token
        String token = request.getHeader(authorizationHeader).replace(tokenType, "");
        UserAccessTokenInfo userInfo = jwtAuthorizationUtil.getUserInfo(token);
        if (userInfo != null) {
            User user = userRepository.findByUserAccessTokenInfo(userInfo.getId(), userInfo.getSocialType());
            request.setAttribute("user", user);
        }
        chain.doFilter(request, response);
    }
}
