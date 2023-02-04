package com.agora.server.user.service;

import com.agora.server.user.domain.User;
import com.agora.server.user.oauth.PrincipalDetails;
import com.agora.server.user.oauth.dto.*;
import com.agora.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;

import java.util.*;

@Service
@RequiredArgsConstructor
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println("----" + oAuth2User.getAttributes());
        try {
            return processOAuth2User(userRequest, oAuth2User);
        } catch (AuthenticationException e) {
            throw e;
        } catch (Exception e) {
            throw new InternalAuthenticationServiceException(e.getMessage(), e.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User user) {
        OauthUserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(
                userRequest,
                user.getAttributes()
        );
        System.out.println(oAuth2UserInfo);

        User findUser = userRepository.checkDuplicateUser(oAuth2UserInfo.getProviderId(), oAuth2UserInfo.getProvider());

        Map<String, Object> responseData = new HashMap<>();

        if (findUser == null) {
            User responseUser = User.createOAuthUser(oAuth2UserInfo.getProvider(), oAuth2UserInfo.getProviderId(),
                    oAuth2UserInfo.getName(), oAuth2UserInfo.getProfile());
            PrincipalDetails pd = new PrincipalDetails(responseUser, responseData);
            return pd;
        } else {
            responseData.put("id", oAuth2UserInfo.getProviderId());
            responseData.put("type", oAuth2UserInfo.getProvider());
            responseData.put("email", oAuth2UserInfo.getEmail());
            responseData.put("nickname", oAuth2UserInfo.getName());
            responseData.put("profile", oAuth2UserInfo.getProfile());
            return new PrincipalDetails(findUser, responseData);
        }

    }
}
