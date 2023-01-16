package com.agora.server.user.controller;

import com.agora.server.common.ResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("naver")
@RequiredArgsConstructor
public class NaverAuthController {
    /**
     * redirect 되었을때 받는 경로
     * @param state
     * @return
     */
    @GetMapping("auth")
    public ResponseEntity<ResponseDTO> login(@RequestParam String state) {
        ResponseDTO res = new ResponseDTO();

        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }
}
