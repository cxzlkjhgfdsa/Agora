package com.agora.server.room.controller.dto.pubsub;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Setter;

import java.util.List;

@Setter
@JsonSerialize
public class EnterLeaveMessage {
    private String event;

    // 입, 퇴장시 변경되는 것
    private List<String> leftUserList;
    private List<String> rightUserList;

    @JsonProperty
    public String getEvent() {
        return event;
    }
    @JsonProperty
    public List<String> getLeftUserList() {
        return leftUserList;
    }
    @JsonProperty
    public List<String> getRightUserList() {
        return rightUserList;
    }

}