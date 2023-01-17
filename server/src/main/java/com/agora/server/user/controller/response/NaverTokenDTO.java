package com.agora.server.user.controller.response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class NaverTokenDTO {
    private String access_token;
    private String refresh_token;
    private String token_type;
    private String expires_in;

}
