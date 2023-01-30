package com.agora.server.auth.provider;

import com.agora.server.auth.dto.TokenType;
import com.agora.server.auth.dto.UserAuthenticateInfo;
import com.agora.server.user.controller.dto.SocialType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.lang.Nullable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
@Slf4j
public class JwtTokenProvider {
    @Value("${jwt.secret}")
    private String jwtSecret;

    private String fromConfigSecret;

    public JwtTokenProvider(String fromConfigSecret) {
        this.fromConfigSecret = getEncodedSecret(fromConfigSecret);
    }

    private String getEncodedSecret(String secret) {
        return Base64.getEncoder().encodeToString(secret.getBytes());

    }

    public String createAccessToken(UUID userId) throws NoSuchFieldException {
        if (userId == null) throw new NoSuchFieldException("사용자 정보가 없습니다.");
        return generateToken(TokenType.ACCESS, userId);
    }

    public String createRefreshToken() {
        return generateToken(TokenType.REFRESH, null);
    }

    protected String generateToken(
            TokenType tokenType,
            @Nullable UUID userId
    ) {
        log.info("generate token secret " + getEncodedSecret(jwtSecret));
        Date now = new Date();
        switch (tokenType) {
            case ACCESS:
                return Jwts.builder()
                        .claim("id", userId)
                        .setIssuedAt(now)
                        .setExpiration(new Date(now.getTime() + Duration.ofMinutes(10).toMillis()))
                        .signWith(SignatureAlgorithm.HS256, getEncodedSecret(jwtSecret))
                        .compact();
            case REFRESH:
                return Jwts.builder()
                        .setIssuedAt(now)
                        .setExpiration(new Date(now.getTime() + Duration.ofDays(10).toMillis()))
                        .signWith(SignatureAlgorithm.HS256, getEncodedSecret(jwtSecret))
                        .compact();
        }
        return null;
    }

    public Claims accessTokenValidation(HttpServletRequest req) {
        String token = req.getHeader(HttpHeaders.AUTHORIZATION);
        if (isEmpty(token)) {
            return null;
        } else if (isBearerToken(token)) {
            String accessToken = token.replace("Bearer ", "");
            return resolveToken(accessToken).getBody();
        }
        return null;
    }

    public Jws<Claims> resolveToken(String token) {
        if (fromConfigSecret == null)
            fromConfigSecret = getEncodedSecret(jwtSecret);
        return Jwts.parser()
                .setSigningKey(this.fromConfigSecret)
                .parseClaimsJws(token);
    }

    private boolean isBearerToken(String header) {
        return header.startsWith("Bearer ");
    }

    private boolean isEmpty(String header) {
        return header == null;
    }

    public Authentication getAuthentication(Claims claims) {
        return new UsernamePasswordAuthenticationToken(new UserAuthenticateInfo(claims), "", getAuthorities(claims));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(Claims claims) {
        return Arrays.stream(new String[]{claims.get("id").toString()})
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}
