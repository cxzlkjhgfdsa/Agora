package com.agora.server.user.controller;

import com.agora.server.common.ResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("naver")
@RequiredArgsConstructor
public class NaverAuthController {
    @GetMapping("auth")
    public ResponseEntity<ResponseDTO> login() {
        ResponseDTO res = new ResponseDTO();
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

}
