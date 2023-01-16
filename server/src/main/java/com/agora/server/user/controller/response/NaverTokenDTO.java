package com.agora.server.user.controller.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NaverTokenDTO {
    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private String expiresIn;

}
