package com.agora.server.room.controller.dto.debate;

import lombok.Data;

@Data
public class RequestPhaseStartDto {

    Long roomId;
    String userNickname;

    Integer phase;

    // 왼쪽진영 LEFT, 오른쪽 진영 RIGHT
    String team;

}
