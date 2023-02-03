package com.agora.server.room.controller.dto;


import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class RequestDebateStartDto {

    private Long roomId;

    private List<String> leftUserList;
    private List<String> rightUserList;
    private List<Boolean> leftUserIsReady;
    private List<Boolean> rightUserIsReady;

}
