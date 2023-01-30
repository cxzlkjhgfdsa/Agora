package com.agora.server.auth.controller;

import com.agora.server.auth.dto.RefreshAccessToken;
import com.agora.server.auth.dto.UserAuthenticateInfo;
import com.agora.server.auth.exception.TokenValidFailedException;
import com.agora.server.auth.service.TokenService;
import com.agora.server.common.dto.ResponseDTO;
import io.swagger.annotations.Authorization;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.util.UUID;

@RequestMapping("api/v1")
@RestController
@RequiredArgsConstructor
public class TokenController {
    private final TokenService tokenService;

    @GetMapping("refresh")
    public ResponseEntity<ResponseDTO> refresh(HttpServletRequest request, HttpServletResponse response) throws TokenValidFailedException, NoSuchFieldException, IOException {
        ResponseDTO res = new ResponseDTO();
        String accessToken = tokenService.refreshAccessTokenByRefreshToken(request, response);
        res.setBody(new RefreshAccessToken(accessToken));
        res.setState(true);
        res.setMessage("access token is refreshed");
        return ResponseEntity.ok(res);
    }
}
