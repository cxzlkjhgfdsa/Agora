package com.agora.server.oauth.dto;

import com.agora.server.user.controller.dto.SocialType;

import java.util.Map;

public abstract class OauthUserInfo {
    protected Map<String, Object> attributes;

    public OauthUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public abstract String getProviderId();

    public abstract SocialType getProvider();

    public abstract String getEmail();

    public abstract String getName();

    public abstract String getProfile();
}
