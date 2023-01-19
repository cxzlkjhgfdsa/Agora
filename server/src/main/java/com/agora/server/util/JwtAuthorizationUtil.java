package com.agora.server.util;

import com.agora.server.user.controller.dto.SocialType;
import com.agora.server.util.dto.UserAccessTokenInfo;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtAuthorizationUtil {
    //    private String jwtSecret = "ksajdhfkj";
    @Value("${jwt-config.secret}")
    private String jwtSecret;

    public String createAccessToken(UUID id, String socialType) {
        Date now = new Date();
        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setSubject("access-token")
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + Duration.ofMinutes(60).toMillis()))
                .claim("id", id)
                .claim("socialType", socialType)
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .compact();
    }

    public UserAccessTokenInfo getUserInfo(String accessToken) {
        UserAccessTokenInfo userAccessTokenInfo = new UserAccessTokenInfo();
        Claims body = null;
        try {
            body = Jwts.parser()
                    .setSigningKey(jwtSecret)
                    .parseClaimsJws(accessToken)
                    .getBody();
            userAccessTokenInfo.setId(UUID.fromString(body.get("id", String.class)));
            userAccessTokenInfo.setSocialType(SocialType.valueOf(body.get("socialType", String.class)));
            return userAccessTokenInfo;
        } catch (ExpiredJwtException expire) {
            throw new ExpiredJwtException(expire.getHeader(), body, "세션이 만료되었습니다.");
        }
    }
}
