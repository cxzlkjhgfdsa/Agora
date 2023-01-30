package com.agora.server.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RefreshAccessToken {
    private String accessToken;

    public RefreshAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
