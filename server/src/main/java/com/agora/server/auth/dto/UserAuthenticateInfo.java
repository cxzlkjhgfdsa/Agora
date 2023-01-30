package com.agora.server.auth.dto;

import com.agora.server.user.controller.dto.SocialType;
import io.jsonwebtoken.Claims;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UserAuthenticateInfo {
    private UUID id;


    public UserAuthenticateInfo(Claims claims) {
        this.id = UUID.fromString(claims.get("id").toString());
    }
}
