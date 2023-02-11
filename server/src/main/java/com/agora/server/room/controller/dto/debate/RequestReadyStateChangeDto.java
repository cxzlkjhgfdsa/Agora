package com.agora.server.room.controller.dto.debate;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class RequestReadyStateChangeDto {


        private Long roomId;
        private String userNickname;

        // 팀 LEFT, RIGHT
        private String userTeam;


}
