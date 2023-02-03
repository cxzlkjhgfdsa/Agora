package com.agora.server.room.controller.dto;

import com.agora.server.room.domain.DebateType;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class ResponseRoomInfoDto {

    private Long roomId;

    private String roomName;

    private String roomCreaterName;

    private DebateType roomDebateType;

    private String roomOpinionLeft;

    private String roomOpinionRight;

    private String roomHashtags;

    private Integer roomWatchCnt;

    private Integer roomPhase;

    private Integer roomPhaseCurrentTimeMinute;
    private Integer roomPhaseCurrentTimeSecond;

    private LocalDateTime roomStartTime;

    private String roomThumbnailUrl;

    private String roomCategory;

    private Boolean roomState;

    private List<String> leftUserList;
    private List<String> rightUserList;


    @QueryProjection
    public ResponseRoomInfoDto(Long roomId, String roomName, String roomCreaterName, DebateType roomDebateType, String roomOpinionLeft, String roomOpinionRight, String roomHashtags, Integer roomWatchCnt, LocalDateTime roomStartTime, String roomThumbnailUrl, String roomCategory, Boolean roomState) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.roomCreaterName = roomCreaterName;
        this.roomDebateType = roomDebateType;
        this.roomOpinionLeft = roomOpinionLeft;
        this.roomOpinionRight = roomOpinionRight;
        this.roomHashtags = roomHashtags;
        this.roomWatchCnt = roomWatchCnt;
        this.roomStartTime = roomStartTime;
        this.roomThumbnailUrl = roomThumbnailUrl;
        this.roomCategory = roomCategory;
        this.roomState = roomState;
    }
}
