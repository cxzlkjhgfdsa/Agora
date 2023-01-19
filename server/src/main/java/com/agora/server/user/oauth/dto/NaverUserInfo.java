package com.agora.server.user.oauth.dto;

import com.agora.server.user.controller.dto.SocialType;

import java.util.Map;

public class NaverUserInfo implements OauthUserInfo{

    private Map<String, Object> attributes;

    public NaverUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }
    @Override
    public String getProviderId() {
        return null;
    }

    @Override
    public SocialType getProvider() {
        return null;
    }

    @Override
    public String getEmail() {
        return null;
    }

    @Override
    public String getName() {
        return null;
    }
}
