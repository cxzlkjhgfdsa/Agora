package com.agora.server.auth.dto;

import com.agora.server.user.controller.dto.SocialType;
import io.jsonwebtoken.Claims;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UserAccessTokenInfo {
    private UUID id;

    private SocialType socialType;

    public UserAccessTokenInfo(Claims claims) {
        this.id = UUID.fromString(claims.get("id").toString());
        this.socialType = SocialType.valueOf(claims.get("socialType").toString());
    }
}
