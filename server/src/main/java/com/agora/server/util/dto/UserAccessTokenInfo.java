package com.agora.server.util.dto;

import com.agora.server.user.controller.dto.SocialType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Setter
public class UserAccessTokenInfo {
    private Long id;

    private SocialType socialType;
}
