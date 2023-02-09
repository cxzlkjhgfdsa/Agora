package com.agora.server.room.controller.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RequestRoomEnterAsDebaterDto {

    private Long roomId;
    private String userNickname;

    // 팀 LEFT, RIGHT
    private String userTeam;

    // 방장인지 일반 토론자인지 이걸로 구분해도 될듯?
    private String userRole;

}
