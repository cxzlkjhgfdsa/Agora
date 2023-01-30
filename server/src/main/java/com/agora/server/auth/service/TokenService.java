package com.agora.server.auth.service;

import com.agora.server.auth.dto.UserAuthenticateInfo;
import com.agora.server.auth.exception.TokenValidFailedException;
import com.agora.server.auth.provider.JwtTokenProvider;
import com.agora.server.user.controller.dto.SocialType;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class TokenService {
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate<String, String> redisTemplate;

    public String refreshAccessTokenByRefreshToken(HttpServletRequest req, HttpServletResponse res) throws NoSuchFieldException, IOException {
        //ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        // access token resolve
        Claims claims = jwtTokenProvider.accessTokenValidation(req);
        UUID userId = UUID.fromString(claims.get("id").toString());
        log.info("userid : " + userId);

        String refreshToken = redisTemplate.opsForValue().get(userId.toString());
        log.info("refresh token: " + refreshToken);
        if (refreshToken == null)
            res.sendRedirect("/login");
        return jwtTokenProvider.createAccessToken(userId);
    }
}
