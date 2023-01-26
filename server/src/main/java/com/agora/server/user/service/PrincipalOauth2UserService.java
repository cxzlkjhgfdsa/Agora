package com.agora.server.user.service;

import com.agora.server.user.domain.User;
import com.agora.server.user.oauth.PrincipalDetails;
import com.agora.server.user.oauth.dto.GoogleUserInfo;
import com.agora.server.user.oauth.dto.KakaoUserInfo;
import com.agora.server.user.oauth.dto.NaverUserInfo;
import com.agora.server.user.oauth.dto.OauthUserInfo;
import com.agora.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;

import java.util.*;

@Service
@RequiredArgsConstructor
public class PrincipalOauth2UserService extends DefaultOAuth2UserService{

    private final UserRepository userRepository;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User user = super.loadUser(userRequest);
        System.out.println(user.getAttributes());
        return processOAuth2User(userRequest, user);
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User user) {
        OauthUserInfo oauthUserInfo = null;
        if(userRequest.getClientRegistration().getClientName().equals("Google")){
            oauthUserInfo = new GoogleUserInfo(user.getAttributes());
        }else if(userRequest.getClientRegistration().getClientName().equals("Naver")){
            oauthUserInfo = new NaverUserInfo((Map<String, Object>) user.getAttributes().get("response"));
        }else if(userRequest.getClientRegistration().getClientName().equals("Kakao")){
            oauthUserInfo = new KakaoUserInfo((Map<String, Object>) user.getAttributes().get("properties")
            ,(Map<String, Object>)user.getAttributes().get("kakao_account"), String.valueOf(user.getAttributes().get("id")));
        }
//        System.out.println("oauthUserInfo =============== ");
//        System.out.println(oauthUserInfo.getProviderId());
//        System.out.println(oauthUserInfo.getProvider());
//        System.out.println(oauthUserInfo.getName());
//        System.out.println(oauthUserInfo.getEmail());
//        System.out.println(oauthUserInfo.getProfile());
        User findUser = userRepository.checkDuplicateUser(oauthUserInfo.getProviderId(), oauthUserInfo.getProvider());

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("id", oauthUserInfo.getProviderId());
        responseData.put("type", oauthUserInfo.getProvider());
        responseData.put("email", oauthUserInfo.getEmail());
        responseData.put("nickname", oauthUserInfo.getName());
        responseData.put("profile", oauthUserInfo.getProfile());


        if(findUser==null) {
            User responseUser = User.createOAuthUser(oauthUserInfo.getProvider(), oauthUserInfo.getProviderId(),
                    oauthUserInfo.getName(), oauthUserInfo.getProfile());
            PrincipalDetails pd = new PrincipalDetails(responseUser, responseData);
            return pd;
        }else{
            return new PrincipalDetails(findUser, responseData);
        }

    }
}
