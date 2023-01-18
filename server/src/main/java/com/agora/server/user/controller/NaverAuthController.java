package com.agora.server.user.controller;

import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.user.domain.User;
import com.agora.server.user.service.NaverAuthService;

import com.agora.server.user.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
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
    private final UserService userService;

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
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * login redirect
     *
     * @param code naver가 주는 code
     *                                     TODO code를 가지고 accessToken을 얻기 위한 요청을 해야 함
     */
    @GetMapping("auth/login")
    public ResponseEntity<ResponseDTO> login(@RequestParam String code) {
        ResponseDTO res = new ResponseDTO();
        try {
            User user = naverAuthService.getToken(code);

        } catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

    /**
     * naver 에서 얻은 정보로 클라이언트에게 정보를 던져준다
     *
     * @param code naver에서 준 code
     * @return
     */
    @GetMapping("auth/join")
    public ResponseEntity<ResponseDTO> join(@RequestParam String code) throws IOException {
        ResponseDTO res = new ResponseDTO();
        User user = naverAuthService.getToken(code);
        User checkDuplicateUser = userService.checkDuplicateUser(user.getUser_social_id(), user.getUser_social_type());
        if (checkDuplicateUser != null)
            throw new RuntimeException("이미 가입되어 있습니다 로그인 페이지로 이동합니다.");
        res.setBody(user);
        res.setState(true);
        res.setMessage("ok");
        res.setStatusCode(200);
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);

    }
}
