package com.agora.server.user.controller;

import com.agora.server.user.controller.dto.CommonDto;
import com.agora.server.user.controller.dto.google.GetGoogleOAuthRes;
import com.agora.server.user.controller.dto.google.GoogleOAuthToken;
import com.agora.server.user.service.GoogleAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class GoogleAuthController {

    private final GoogleAuthService googleOAuthService;

    // 프론트단에서 처리 할 예정
    @GetMapping("request/auth/login/google")
    public void googleLoginRedirect() throws IOException {
        googleOAuthService.loginRequest();
    }

    @GetMapping("request/auth/join/google")
    public void googleJoinRedirect() throws IOException {
        googleOAuthService.joinRequest();
    }

    @ResponseBody
    @GetMapping(value = "request/auth/login/google/callback")
    public GetGoogleOAuthRes googleLoginCallback(
            @RequestParam(name = "code") String code)throws IOException{
        GetGoogleOAuthRes getGoogleOAuthRes=googleOAuthService.oAuthLogin(code);
        return getGoogleOAuthRes;
    }

    @ResponseBody
    @GetMapping(value = "request/auth/join/google/callback")
    public GetGoogleOAuthRes googleJoinCallback(
            @RequestParam(name = "code") String code)throws IOException{

        // 토큰 받기
        GoogleOAuthToken googleOAuthToken = googleOAuthService.getGoogleOAuthToken(code);
        // 유저정보 받기
        CommonDto googleUser = googleOAuthService.getGoogleUserInfo(googleOAuthToken);



        GetGoogleOAuthRes getGoogleOAuthRes=googleOAuthService.oAuthJoin(code);
        return getGoogleOAuthRes;
    }
}
