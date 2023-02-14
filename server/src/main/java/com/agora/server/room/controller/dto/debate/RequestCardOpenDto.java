package com.agora.server.room.controller.dto.debate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestCardOpenDto {

    private Long roomId;
    private String userNickname;
    private Integer cardIdx;
//    private String userTeam;

}
