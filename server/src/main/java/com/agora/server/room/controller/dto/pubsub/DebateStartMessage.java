package com.agora.server.room.controller.dto.pubsub;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Setter;

@Setter
@JsonSerialize
public class DebateStartMessage {

    // 페이즈 변경 알려줌
    private String event;

    // 페이즈 변경 시 현재 페이즈
    private Integer roomPhase;
    private Integer roomPhaseDetail;

    @JsonProperty
    public String getEvent() {
        return event;
    }
    @JsonProperty
    public Integer getRoomPhase() {
        return roomPhase;
    }
    @JsonProperty
    public Integer getRoomPhaseDetail() {
        return roomPhaseDetail;
    }
}
