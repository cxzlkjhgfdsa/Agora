package com.agora.server.user.oauth.dto;

import com.agora.server.user.controller.dto.SocialType;

public interface OauthUserInfo {
    String getProviderId();
    SocialType getProvider();
    String getEmail();
    String getName();

    String getProfile();
}
