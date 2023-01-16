package com.agora.server.user.service;

import com.agora.server.user.utils.KakaoAuthUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class KakaoAuthService {

    private final KakaoAuthUtils kakaoAuthUtils;
    private final HttpServletResponse response;

    /**
     * 회원가입 요청으로 redirect 하기 위한 URL 생성
     */
    public void joinRequest() throws IOException {
        String redirectURL;
        redirectURL = kakaoAuthUtils.getKakaoJoinURL();
        response.sendRedirect(redirectURL);
    }

    public void getKakaoToken(String code) {
        
    }
}
