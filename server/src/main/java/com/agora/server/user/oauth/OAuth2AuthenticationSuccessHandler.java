package com.agora.server.user.oauth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        UUID userId = principal.getUser().getUser_id();
        Map<String, Object> item = principal.getAttributes();
        if(userId == null){
            response.sendRedirect(UriComponentsBuilder.fromUriString("http://localhost:3000/user/signup/input")
                    .queryParam("userId", item.get("id"))
                    .queryParam("type", item.get("type"))
                    .queryParam("nickname", item.get("nickname"))
                    .queryParam("email", item.get("email"))
                    .queryParam("profile", item.get("profile"))
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString()
            );
        }else {
            log.info("회원가입 진행 불필요");
            response.sendRedirect(UriComponentsBuilder.fromUriString("http://localhost:3000/user/login/redirect-handler")
                            .queryParam("userId", userId)
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString());
        }

    }
}
