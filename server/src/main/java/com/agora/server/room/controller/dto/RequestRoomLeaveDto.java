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



    // 관전자는 위의 2개만 보내주면됩니다
    private Boolean isUserCreater; // -> 이거는 닉네임 내가 확인해서 처리하기 없어도 됨
    private String userTeam;

    private String type;

}
