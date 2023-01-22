package com.agora.server.auth.provider;

import com.agora.server.auth.dto.TokenType;
import com.agora.server.auth.dto.UserAccessTokenInfo;
import com.agora.server.user.controller.dto.SocialType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Cache;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.codec.DecodingException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.lang.Nullable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.time.Duration;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
@Slf4j
public class JwtTokenProvider {
    private String jwtSecret;

    public JwtTokenProvider(String jwtSecret) {
        this.jwtSecret = jwtSecret;
    }

    public String createAccessToken(UUID userId, SocialType socialType) {
        return generateToken(TokenType.ACCESS, userId, socialType);
    }

    public String createRefreshToken() {
        return generateToken(TokenType.REFRESH, null, null);
    }

    protected String generateToken(
            TokenType tokenType,
            @Nullable UUID userId,
            @Nullable SocialType socialType
    ) {
        log.info("jwt jwtSecret" + jwtSecret);
        Date now = new Date();
        switch (tokenType) {
            case ACCESS:
                return Jwts.builder()
                        .claim("id", userId)
                        .claim("socialType", socialType)
                        .setIssuedAt(now)
                        .setExpiration(new Date(now.getTime() + Duration.ofMinutes(10).toMillis()))
                        .signWith(SignatureAlgorithm.HS256, jwtSecret)
                        .compact();
            case REFRESH:
                return Jwts.builder()
                        .setIssuedAt(now)
                        .setExpiration(new Date(now.getTime() + Duration.ofDays(10).toMillis()))
                        .signWith(SignatureAlgorithm.HS256, jwtSecret)
                        .compact();
        }
        return null;
    }

    public Claims accessTokenValidation(HttpServletRequest req) {
        log.info("validate access token start");
        String token = req.getHeader(HttpHeaders.AUTHORIZATION);
        if (isEmpty(token)) {
            log.error("access token is null");
            return null;
        } else if (isBearerToken(token)) {
            String accessToken = token.replace("Bearer ", "");
            return resolveToken(accessToken);
        }
        return null;
    }

    public boolean refreshTokenValidation(String refreshToken) {
        return resolveToken(refreshToken) != null;
    }

    public Claims resolveToken(String token) {
        log.info("token resolver working.....");
        return Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();
    }


    private boolean isBearerToken(String header) {
        return header.startsWith("Bearer ");
    }

    private boolean isEmpty(String header) {
        return header == null;
    }

    public Authentication getAuthentication(Claims claims) {
        return new UsernamePasswordAuthenticationToken(new UserAccessTokenInfo(claims), "", getAuthorities(claims));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(Claims claims) {
        return Arrays.stream(new String[]{claims.get("id").toString()})
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}
