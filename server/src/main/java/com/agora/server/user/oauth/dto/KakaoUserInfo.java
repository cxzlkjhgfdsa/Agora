package com.agora.server.user.oauth.dto;


import com.agora.server.user.controller.dto.SocialType;

import java.util.Map;

public class KakaoUserInfo implements OauthUserInfo{

    private Map<String, Object> attributes;

    private Map<String, Object> profile_item;

    private String id;

    public KakaoUserInfo(Map<String, Object> attributes, Map<String, Object> profile_item, String id) {
        this.attributes = attributes;
        this.profile_item = profile_item;
        this.id = id;
    }

    @Override
    public String getProviderId() {
        return id;
    }

    @Override
    public SocialType getProvider() {
        return (SocialType)SocialType.KAKAO;
    }

    @Override
    public String getEmail() {
        return (String) profile_item.get("email");
    }

    @Override
    public String getName() {
        return (String) attributes.get("nickname");
    }

    @Override
    public String getProfile() {
        return (String)attributes.get("profile_image");
    }

}
