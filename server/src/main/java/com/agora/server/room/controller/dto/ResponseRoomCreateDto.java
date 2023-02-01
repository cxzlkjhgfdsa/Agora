package com.agora.server.room.controller.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Getter
@Setter
public class ResponseRoomCreateDto {
    private Long roomId;
    private String token;
}
