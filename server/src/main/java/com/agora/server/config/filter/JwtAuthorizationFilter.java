package com.agora.server.config.filter;

import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.common.dto.UserToken;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import com.agora.server.common.dto.UserAccessTokenInfo;
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

    private UserToken userToken;
    private UserRepository userRepository;

    public JwtAuthorizationFilter(UserToken userToken, UserRepository userRepository) {
        this.userToken = userToken;
        this.userRepository = userRepository;
    }

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(authorizationHeader);
        if (header == null || !header.startsWith(headerPrefix)) {
            // header가 없거나 Bearer 토큰이 아닌 경우
            ResponseDTO res = new ResponseDTO();
            res.setState(false);
            res.setMessage("no header");
            request.setAttribute("error", res);
        } else {
            // token
            String token = request.getHeader(authorizationHeader).replace(headerPrefix, "");
            try {
                userToken.getUserInfo(token, jwtSecret);
                if (userInfo != null) {
                    User user = userRepository.findByUserAccessTokenInfo(userInfo.getId(), userInfo.getSocialType());
                    request.setAttribute("user", user);
                }
            } catch (Exception e) {
                response.sendError(403, "access token expires");
            }
        }
        chain.doFilter(request, response);
    }
}
