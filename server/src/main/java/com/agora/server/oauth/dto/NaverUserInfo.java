package com.agora.server.oauth.dto;

import com.agora.server.user.controller.dto.SocialType;

import java.util.Map;

public class NaverUserInfo extends OauthUserInfo{

    private Map<String, Object> attributes;

    public NaverUserInfo(Map<String, Object> attributes) {
       super(attributes);
    }
    @Override
    public String getProviderId() {
        return (String)attributes.get("id");
    }

    @Override
    public SocialType getProvider() {
        return SocialType.NAVER;
    }

    @Override
    public String getEmail() {
        return (String)attributes.get("email");
    }

    @Override
    public String getName() {
        return (String)attributes.get("nickname");
    }

    @Override
    public String getProfile() {
        return (String)attributes.get("profile_image");
    }

}
