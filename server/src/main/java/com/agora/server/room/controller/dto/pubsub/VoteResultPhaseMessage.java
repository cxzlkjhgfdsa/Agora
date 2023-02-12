package com.agora.server.room.controller.dto.pubsub;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Setter;

import java.util.List;

@Setter
@JsonSerialize
public class VoteResultPhaseMessage {
    private String event;

    // 페이즈 변경 시 현재 페이즈
    private Integer roomPhase;
    private Integer roomPhaseDetail;
    // 투표 결과 발표 후 투표 결과 추가된 리스트 주기
    private List<Integer> voteLeftResultsList;
    private List<Integer> voteRightResultsList;
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
    @JsonProperty
    public List<Integer> getVoteLeftResultsList() {
        return voteLeftResultsList;
    }
    @JsonProperty
    public List<Integer> getVoteRightResultsList() {
        return voteRightResultsList;
    }
}