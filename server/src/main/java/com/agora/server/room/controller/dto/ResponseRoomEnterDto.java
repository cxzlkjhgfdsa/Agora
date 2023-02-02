package com.agora.server.room.controller.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseRoomEnterDto {
    private boolean isEnter;
    private String token;
}
