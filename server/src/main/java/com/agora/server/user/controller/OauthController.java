package com.agora.server.user.controller;

import com.agora.server.user.controller.dto.SocialType;
import com.agora.server.user.oauth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class OauthController {

    /**
     * 모든 Oauth 로그인이 완료될시 해당 컨트롤러로 옴
     * @param principal  (Spring Security Session에서 로그인한 유저 정보를 갖고옴)
     * @param response  (Redirect 를 위한 HttpServletResponse)
     * @throws IOException
     */
    @GetMapping("/total/oauth")
    public void totalOauth(@AuthenticationPrincipal PrincipalDetails principal, HttpServletResponse response) throws IOException {
        UUID userId = principal.getUser().getUser_id();
        Map<String, Object> item = principal.getAttributes();

        if(userId == null){
            log.info("회원가입 진행 필요");
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
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString());
        }


    }
}
