package com.agora.server.room.controller.dto;

import io.swagger.models.auth.In;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class RequestRoomEnterDto {

    private UUID userId;

    private Long roomId;

    private Integer userSide;

    private String type;

    private Boolean roomState;

}
