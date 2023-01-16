package com.agora.server.user.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KakaoAuthUtils {

    @Value("${spring.OAuth2.kakao.url}")
    private String KAKAO_REQUEST_URL;

    @Value("${spring.OAuth2.kakao.api-key}")
    private String KAKAO_REST_API_KEY;

    @Value("${spring.OAuth2.kakao.join-url}")
    private String KAKAO_JOIN_URL;
    public String getKakaoJoinURL() {
        StringBuilder sb = new StringBuilder();
        sb.append(KAKAO_REQUEST_URL);
        sb.append("?client_id=");
        sb.append(KAKAO_REST_API_KEY);
        sb.append("&redirect_uri=");
        sb.append(KAKAO_JOIN_URL);
        sb.append("&response_type=code");

        String redirectURL =sb.toString();
        return redirectURL;

    }
}
