package com.agora.server.user.controller.response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NaverTokenDTO {
    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private String expiresIn;

    public static NaverTokenDTO createNaverTokenDto(String accessToken, String refreshToken, String tokenType, String expiresIn) {
        NaverTokenDTO naverTokenDTO = new NaverTokenDTO();
        naverTokenDTO.accessToken = accessToken;
        naverTokenDTO.refreshToken = refreshToken;
        naverTokenDTO.tokenType = tokenType;
        naverTokenDTO.expiresIn = tokenType;
        return naverTokenDTO;
    }
}
