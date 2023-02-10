package com.agora.server.user.dto;

import com.agora.server.user.controller.dto.SocialType;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class LoginDTO {
    private UUID userId;
    private SocialType socialType;
}
