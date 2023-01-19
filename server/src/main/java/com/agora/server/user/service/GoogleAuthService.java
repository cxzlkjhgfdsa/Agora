package com.agora.server.user.service;

import com.agora.server.user.controller.dto.CommonDto;
import com.agora.server.user.controller.dto.SocialType;
import com.agora.server.user.controller.dto.google.GoogleOAuthToken;
import com.agora.server.user.controller.dto.google.GoogleUser;
import com.agora.server.user.controller.dto.google.GetGoogleOAuthRes;
import com.agora.server.user.domain.User;
import com.agora.server.user.utils.GoogleAuthUtils;
import com.agora.server.util.JwtAuthorizationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class GoogleAuthService {
    private final GoogleAuthUtils googleAuthUtils;
    private final HttpServletResponse response;

    private final JwtAuthorizationUtil jwtAuthorizationUtil;

    public void loginRequest() throws IOException {
        String redirectURL = googleAuthUtils.getLoginRedirectURL();
        response.sendRedirect(redirectURL);
    }
    public void joinRequest() throws IOException {
        String redirectURL = googleAuthUtils.getJoinRedirectURL();
        response.sendRedirect(redirectURL);
    }


    public GoogleOAuthToken getGoogleLoginOAuthToken(String code) throws IOException {
        //구글로 일회성 코드를 보내 액세스 토큰이 담긴 응답객체를 받는다.
        ResponseEntity<String> accessTokenResponse= googleAuthUtils.requestLoginAccessToken(code);
        //응답 객체가 JSON형식으로 되어 있으므로, 이를 deserialization해서 자바 객체에 담는다.
        GoogleOAuthToken oAuthToken=googleAuthUtils.getLoginAccessToken(accessTokenResponse);
        return oAuthToken;
    }

    public GoogleOAuthToken getGoogleJoinOAuthToken(String code) throws IOException {
        //구글로 일회성 코드를 보내 액세스 토큰이 담긴 응답객체를 받는다.
        ResponseEntity<String> accessTokenResponse= googleAuthUtils.requestJoinAccessToken(code);
        //응답 객체가 JSON형식으로 되어 있으므로, 이를 deserialization해서 자바 객체에 담는다.
        GoogleOAuthToken oAuthToken=googleAuthUtils.getJoinAccessToken(accessTokenResponse);
        return oAuthToken;
    }

    public CommonDto getGoogleUserInfo(GoogleOAuthToken oAuthToken) throws IOException {
        //액세스 토큰을 다시 구글로 보내 구글에 저장된 사용자 정보가 담긴 응답 객체를 받는다.
        ResponseEntity<String> userInfoResponse=googleAuthUtils.requestUserInfo(oAuthToken);
        //다시 JSON 형식의 응답 객체를 자바 객체로 역직렬화한다.
        GoogleUser googleUser= googleAuthUtils.getUserInfo(userInfoResponse);

        CommonDto commonUserDto = new CommonDto();
        commonUserDto.createCommonDto(googleUser.getId(),googleUser.getEmail(),null,SocialType.GOOGLE);

        return commonUserDto;
    }

    public String getJwtAccessToken(UUID id, String socialType){
        return jwtAuthorizationUtil.createAccessToken(id, socialType);
    }


}

