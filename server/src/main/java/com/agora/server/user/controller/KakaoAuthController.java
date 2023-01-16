package com.agora.server.user.controller;

import com.agora.server.user.controller.dto.CommonDto;
import com.agora.server.user.service.KakaoAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class KakaoAuthController {

    private final KakaoAuthService kakaoAuthService;

    /**
     *
     * @throws IOException
     */
    @GetMapping("request/join/auth/kakao")
    public void kakaoLoginRedirect() throws IOException {
        kakaoAuthService.joinRequest();
    }

    /**
     * 회원가입 요청을 리다이렉트 받은 메소드
     * @param code : 유저 토큰을 받기 위한 code
     */
    @GetMapping("join/auth/kakao")
    public String kakaoLogin(@RequestParam String code) throws IOException {
        String token = kakaoAuthService.getKakaoToken(code);
        // 유저 확인
        CommonDto kakaoUserInfo = kakaoAuthService.getKakaoUserInfo(token);
        // 이미 회원가입 되어있는지 확인
        //... 회원가입 확인 메소드
        return kakaoUserInfo.getEmail(); // dto 반환
    }



}
