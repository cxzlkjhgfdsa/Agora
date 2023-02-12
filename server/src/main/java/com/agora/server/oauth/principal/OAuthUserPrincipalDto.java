package com.agora.server.oauth.principal;

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
    private Boolean state;

    public OAuthUserPrincipalDto(String userId, SocialType userSocialType, String userNickName, String userPhotoUrl, Boolean state) {
        this.userId = userId;
        this.userSocialType = userSocialType.toString();
        this.userNickName = userNickName;
        this.userPhotoUrl = userPhotoUrl;
        this.state = state;
    }
}
