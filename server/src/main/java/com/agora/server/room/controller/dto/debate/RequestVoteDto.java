package com.agora.server.room.controller.dto.debate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestVoteDto {

    private Long roomId;

    private String voteTeam;

}
