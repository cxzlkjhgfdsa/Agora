package com.agora.server.room.controller.dto;

import com.agora.server.user.controller.dto.SocialType;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class RequestRoomCategoryDto {
    private UUID userId;
    private SocialType socialType;
}
