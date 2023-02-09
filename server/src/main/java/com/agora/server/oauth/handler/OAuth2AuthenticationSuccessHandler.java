package com.agora.server.oauth.handler;

import com.agora.server.oauth.principal.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        Boolean state = principal.getState();
        if (!state) {
            log.info("no user id --------------------" + principal.getUserId());
            response.sendRedirect(UriComponentsBuilder.fromUriString("https://i8a705.p.ssafy.io/user/signup/input")
                    .queryParam("userId", principal.getUserId())
                    .queryParam("type", principal.getSocialType())
                    .queryParam("nickname", principal.getNickname())
                    .queryParam("profile", principal.getProfile())
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString()
            );
        } else {
            log.info("회원가입 진행 불필요");
            response.sendRedirect(UriComponentsBuilder.fromUriString("https://i8a705.p.ssafy.io/user/login/redirect-handler")
                    .queryParam("userId", principal.getUserId())
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString());
        }
    }
}
