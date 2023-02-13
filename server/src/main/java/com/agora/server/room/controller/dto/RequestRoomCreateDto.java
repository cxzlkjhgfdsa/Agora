package com.agora.server.room.controller.dto;

import com.agora.server.room.domain.DebateType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RequestRoomCreateDto {

    private String roomName;

    private String roomCreaterName;

    private DebateType roomDebateType;

    private String roomOpinionLeft;

    private String roomOpinionRight;

    private String roomHashtags;

    private String roomThumbnailUrl;

    private String roomCategory;


}
