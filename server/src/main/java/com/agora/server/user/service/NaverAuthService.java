package com.agora.server.user.service;

import com.agora.server.user.controller.response.NaverTokenDTO;
import com.agora.server.user.domain.User;
import com.agora.server.user.util.NaverAuthUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.http.HttpResponse;

@Service
@RequiredArgsConstructor
public class NaverAuthService {
    private final HttpServletResponse httpResponse;
    private final NaverAuthUtil naverAuthUtil;

    /**
     * send redirect
     */
    public void sendRedirectNaverAuthJoin() throws IOException {
        String url = naverAuthUtil.getRedirectUrlJoin();
        System.out.println(url);
        httpResponse.sendRedirect(url);
    }

    public void sendRedirectNaverAuthLogin() throws IOException {
        String url = naverAuthUtil.getRedirectUrlLogin();
        httpResponse.sendRedirect(url);
    }

    public User getToken(String code) throws IOException {
        HttpEntity<MultiValueMap<String, String>> httpEntity = naverAuthUtil.getTokenHttpEntity(code);
        String tokenBody = naverAuthUtil.getTokenBody(httpEntity);
        String accessToken = naverAuthUtil.getAccessToken(tokenBody);
        return naverAuthUtil.getUserInfo(accessToken);
    }
}

