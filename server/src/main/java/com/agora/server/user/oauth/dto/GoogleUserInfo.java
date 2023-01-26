package com.agora.server.user.oauth.dto;


import com.agora.server.user.controller.dto.SocialType;

import java.util.Map;

public class GoogleUserInfo implements OauthUserInfo{

    private Map<String, Object> attributes;

    public GoogleUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }
    @Override
    public String getProviderId() {
        return (String) attributes.get("sub");
    }

    @Override
    public SocialType getProvider() {
        return (SocialType)SocialType.GOOGLE;
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getProfile() {
        return (String)attributes.get("picture");
    }
}
