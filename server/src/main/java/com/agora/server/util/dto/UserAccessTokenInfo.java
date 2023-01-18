package com.agora.server.util.dto;

import com.agora.server.user.controller.dto.SocialType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAccessTokenInfo {
    private String id;
    private SocialType socialType;
}
