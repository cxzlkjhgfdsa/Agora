package com.agora.server.room.controller.dto;

import io.swagger.models.auth.In;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class RequestRoomLeaveDto {

    private Long roomId;
    private String userNickname;


}
