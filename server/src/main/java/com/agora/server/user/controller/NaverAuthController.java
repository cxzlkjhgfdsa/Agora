package com.agora.server.user.controller;

import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.user.service.NaverAuthService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("naver")
@RequiredArgsConstructor
public class NaverAuthController {
    private final NaverAuthService naverAuthService;

    /**
     * join 시 get 요청
     */
    @Operation(summary = "join button", description = "소셜 회원 가입 시 redirect")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK")
    })
    @GetMapping("join/oauth")
    public void join() {
        try {
            naverAuthService.sendRedirectNaverAuthJoin();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * login 시 get 요청
     */
    @GetMapping("login/oauth")
    public void login() {
        try {
            naverAuthService.sendRedirectNaverAuthLogin();
        }catch (IOException e){
            throw new RuntimeException(e);
        }
    }

    /**
     * login redirect
     * @param code naver가 주는 code
     * TODO code를 가지고 accessToken을 얻기 위한 요청을 해야 함
     */
    @GetMapping("auth/login")
    public ResponseEntity<ResponseDTO> login(@RequestParam String code) {
        ResponseDTO res = new ResponseDTO();

        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

    @GetMapping("auth/join")
    public ResponseEntity<ResponseDTO> join(@RequestParam String code) {
        ResponseDTO res = new ResponseDTO();

        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }
}
