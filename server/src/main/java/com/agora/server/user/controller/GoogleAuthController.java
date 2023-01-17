package com.agora.server.user.controller;

import com.agora.server.user.controller.dto.google.GetGoogleOAuthRes;
import com.agora.server.user.service.GoogleAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class GoogleAuthController {

    private final GoogleAuthService googleOAuthService;

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
        GetGoogleOAuthRes getGoogleOAuthRes=googleOAuthService.oAuthJoin(code);
        return getGoogleOAuthRes;
    }
}
