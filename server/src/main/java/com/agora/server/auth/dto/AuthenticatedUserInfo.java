package com.agora.server.auth.dto;

import com.agora.server.user.controller.dto.SocialType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AuthenticatedUserInfo {
    private String accessToken;
    private SocialType socialType;
    private UUID userId;
    private String userNickName;
    private String userPhoto;

    public static AuthenticatedUserInfo createAuthenticatedUserInfo(String accessToken, SocialType socialType, UUID userId, String userNickName, String userPhoto) {
        AuthenticatedUserInfo userInfo = new AuthenticatedUserInfo();
        userInfo.accessToken = accessToken;
        userInfo.socialType = socialType;
        userInfo.userId = userId;
        userInfo.userNickName = userNickName;
        userInfo.userPhoto = userPhoto;
        return userInfo;
    }
}
