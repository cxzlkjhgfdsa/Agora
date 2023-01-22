package com.agora.server.config.controller;

import com.agora.server.auth.dto.UserAccessTokenInfo;
import com.agora.server.auth.provider.JwtTokenProvider;
import com.agora.server.user.controller.dto.SocialType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Slf4j
public class JwtTestController {
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${oauth.naver.redirect.header}")
    private String getRedirectHeader;

    @Value("${oauth.naver.redirect.header-value}")
    private String getRedirectHeaderValue;

    @GetMapping("create")
    public String createToken() {
        return jwtTokenProvider.createAccessToken(UUID.randomUUID(), SocialType.GOOGLE);
    }

    @PostMapping("valide")
    public void validation(@AuthenticationPrincipal UserAccessTokenInfo userAccessTokenInfo, HttpServletRequest request) {
        log.info("validate exec");
        log.info(userAccessTokenInfo.getSocialType().toString());
    }
}
