package com.agora.server.room.controller.dto.pubsub;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Setter;

import java.util.List;

@Setter
@JsonSerialize
public class CardOpenMessage {
    private String event;
    // 카드 오픈시 카드 리스트
    private List<String> leftOpenedCardList;
    private List<String> rightOpenedCardList;
    @JsonProperty
    public String getEvent() {
        return event;
    }
    @JsonProperty
    public List<String> getLeftOpenedCardList() {
        return leftOpenedCardList;
    }
    @JsonProperty
    public List<String> getRightOpenedCardList() {
        return rightOpenedCardList;
    }
}