package com.agora.server.user.controller;

import com.agora.server.common.ResponseDTO;
import com.agora.server.user.service.NaverAuthService;
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

    @GetMapping("join/oauth")
    public void join() {
        try {
            naverAuthService.sendRedirectNaverAuthJoin();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("login/oauth")
    public void login() {
        try {
            naverAuthService.sendRedirectNaverAuthLogin();
        }catch (IOException e){
            throw new RuntimeException(e);
        }
    }

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
