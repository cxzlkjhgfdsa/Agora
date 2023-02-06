package com.agora.server.auth.dto;

import com.agora.server.user.controller.dto.SocialType;
import io.jsonwebtoken.Claims;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UserAuthenticateInfo {
    private String userId;

    public UserAuthenticateInfo(String userId) {
        this.userId = userId;
    }
}
