package com.agora.server.user.oauth.dto;

import com.agora.server.auth.exception.OAuth2AuthenticationProcessingException;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;

import java.util.Map;

public class OAuth2UserInfoFactory {

    public static OauthUserInfo getOAuth2UserInfo(OAuth2UserRequest userRequest, Map<String, Object> attributes) {
        System.out.println("is google " + userRequest.getClientRegistration().getClientName());

        if (userRequest.getClientRegistration().getClientName().toUpperCase().equals("GOOGLE")) {
            return new GoogleUserInfo(attributes);
        } else if (userRequest.getClientRegistration().getClientName().equals("Naver")) {
            return new NaverUserInfo(attributes);
        } else if (userRequest.getClientRegistration().getClientName().equals("Kakao")) {
            return new KakaoUserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationProcessingException("Unsupported Login Type : " + userRequest.getClientRegistration().getRegistrationId());
        }
    }
}
