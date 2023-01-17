package com.agora.server.user.controller.dto.google;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GetGoogleOAuthRes {

    private String jwtToken;
    private int user_num;
    private String accessToken;
    private String tokenType;
    private String state;

}