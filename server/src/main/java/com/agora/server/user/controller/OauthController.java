package com.agora.server.user.controller;

import com.agora.server.user.controller.dto.SocialType;
import com.agora.server.user.oauth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class OauthController {

    @GetMapping("/total/oauth")
    public void totalOauth(@AuthenticationPrincipal PrincipalDetails principal, HttpServletResponse response) throws IOException {
        UUID userId = principal.getUser().getUser_id();
        Map<String, Object> item = principal.getAttributes();

        if(userId == null){
            System.out.println("회원가입 진행 필요");
            response.sendRedirect(UriComponentsBuilder.fromUriString("http://localhost:9999/regist")
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
            System.out.println("로그인 진행 필요");
        }


    }
}
