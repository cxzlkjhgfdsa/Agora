package com.agora.server.user.service;

import com.agora.server.user.util.NaverAuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
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
}
