package com.agora.server.user.service;

import com.agora.server.user.util.NaverAuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class NaverAuthService {
    private NaverAuthUtil naverAuthUtil;

    /**
     * send redirect
     */
    public void sendRedirectNaverAuth() {
        naverAuthUtil.getRedirectUrl("login");
    }
}
