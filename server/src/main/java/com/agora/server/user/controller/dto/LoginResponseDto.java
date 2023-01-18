package com.agora.server.user.controller.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class LoginResponseDto {
    private UUID userId;
    private SocialType socialType;
    private String userNickname;
    private String userPhoto;
    private String accessToken;
}
