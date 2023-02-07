package com.agora.server.room.controller.dto;

import io.swagger.models.auth.In;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class RequestRoomLeaveDto {

    private String userNickname;


    private Long roomId;


    // 관전자는 위의 2개만 보내주면됩니다
    private Boolean isUserCreater;
    private Integer userSide;

    private String type;

}
