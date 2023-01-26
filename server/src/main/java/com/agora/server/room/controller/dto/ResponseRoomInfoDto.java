package com.agora.server.room.controller.dto;

import com.agora.server.room.domain.DebateType;
import com.querydsl.core.annotations.QueryProjection;
import io.swagger.models.auth.In;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ResponseRoomInfoDto {

    private Long room_id;

    private String room_name;

    private String room_creater_name;

    private DebateType room_debate_type;

    private String room_opinion_left;

    private String room_opinion_right;

    private String room_hashtags;

    private Long room_watch_cnt;

    private Integer room_phase;

    private LocalDateTime room_start_time;

    private String room_thumbnail_url;

    private String room_category;

    private boolean room_state;

    @QueryProjection
    public ResponseRoomInfoDto(Long room_id, String room_name, String room_creater_name, DebateType room_debate_type, String room_opinion_left, String room_opinion_right, String room_hashtags, Long room_watch_cnt, Integer room_phase, LocalDateTime room_start_time, String room_thumbnail_url, String room_category, Boolean room_state) {
        this.room_id = room_id;
        this.room_name = room_name;
        this.room_creater_name = room_creater_name;
        this.room_debate_type = room_debate_type;
        this.room_opinion_left = room_opinion_left;
        this.room_opinion_right = room_opinion_right;
        this.room_hashtags = room_hashtags;
        this.room_watch_cnt = room_watch_cnt;
        this.room_phase = room_phase;
        this.room_start_time = room_start_time;
        this.room_thumbnail_url = room_thumbnail_url;
        this.room_category = room_category;
        this.room_state = room_state;
    }
}
