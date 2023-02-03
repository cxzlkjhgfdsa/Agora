package com.agora.server.room.controller.dto.debate;

import lombok.Data;

@Data
public class RequestVoteStartDto {

    Long roomId;

    Integer votePhase;

}
