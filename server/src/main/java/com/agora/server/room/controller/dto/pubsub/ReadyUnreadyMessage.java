package com.agora.server.room.controller.dto.pubsub;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Setter;

import java.util.List;

@Setter
@JsonSerialize
public class ReadyUnreadyMessage {
    private String event;

    // ready, unready시 레디 유저 리스트
    private List<String> readyUserList;

    // ready, unready시 전부 레디인지 확인
    private Boolean isAllReady;

    @JsonProperty
    public String getEvent() {
        return event;
    }
    @JsonProperty
    public List<String> getReadyUserList() {
        return readyUserList;
    }
    @JsonProperty
    public Boolean getAllReady() {
        return isAllReady;
    }
}