package com.agora.server.room.controller.dto;


import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Data
@NoArgsConstructor
public class RequestDebateStartDto {

    private Long roomId;

    private List<String> left_user_list;
    private List<String> right_user_list;
    private List<Boolean> left_user_isReady;
    private List<Boolean> right_user_isReady;

}
