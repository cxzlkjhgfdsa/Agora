package com.agora.server.room.controller.dto;

import com.agora.server.room.domain.DebateType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RequestRoomCreateDto {

    private String room_name;

    private String room_creater_name;

    private DebateType room_debate_type;

    private String room_opinion_left;

    private String room_opinion_right;

    private String room_hashtags;

    private String room_thumbnail_url;

    private String room_category;


}
