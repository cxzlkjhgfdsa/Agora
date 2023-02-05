package com.agora.server.user.dto;

import com.agora.server.user.controller.dto.SocialType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OAuthUserPrincipalDto {
    private String userId;
    private String userSocialType;
    private String userNickName;
    private String userPhotoUrl;

    public OAuthUserPrincipalDto(String userId, SocialType userSocialType, String userNickName, String userPhotoUrl) {
        this.userId = userId;
        this.userSocialType = userSocialType.toString();
        this.userNickName = userNickName;
        this.userPhotoUrl = userPhotoUrl;
    }
}
