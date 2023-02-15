package com.agora.server.room.controller.dto.debate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestCardOpenDto {

    private Long roomId;
<<<<<<< HEAD
    private String userNickname;
    private Integer cardIdx;
//    private String userTeam;
=======
    private Integer userIdx;
    private Integer cardIdx;
    private String userTeam;
>>>>>>> b1ee99de512bcc471e947ee321bcc09251784fa0

}
