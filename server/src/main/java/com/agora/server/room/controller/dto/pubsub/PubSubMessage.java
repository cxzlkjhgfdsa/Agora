package com.agora.server.room.controller.dto.pubsub;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Setter;

import java.util.List;

@Setter
@JsonSerialize
public class PubSubMessage{

    // 이번이 어떤 이벤트인지
    private String event;

    // 입, 퇴장시 변경
    private List<String> leftUserList;
    private List<String> rightUserList;

    // 관전자 수
    private Integer roomWatchCnt;

    // 페이즈 변경 시 현재 페이즈
    private Integer roomPhase;
    private Integer roomPhaseDetail;

    // 카드 오픈시 카드 리스트
    private List<String> leftOpenedCardList;
    private List<String> rightOpenedCardList;

    // ready, unready시 레디 유저 리스트
    private List<String> readyUserList;

    // ready, unready시 전부 레디인지 확인
    private Boolean isAllReady;

    // 투표 결과 발표 후 투표 결과 추가된 리스트 주기
    private List<Integer> voteLeftResultsList;
    private List<Integer> voteRightResultsList;

    // 현재 발언자, 현재 발언팀
    private String currentSpeakingUser;
    private String currentSpeakingTeam;

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
    @JsonProperty
    public Integer getRoomWatchCnt() {
        return roomWatchCnt;
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
    public List<String> getLeftOpenedCardList() {
        return leftOpenedCardList;
    }
    @JsonProperty
    public List<String> getRightOpenedCardList() {
        return rightOpenedCardList;
    }
    @JsonProperty
    public List<String> getReadyUserList() {
        return readyUserList;
    }
    @JsonProperty
    public Boolean getAllReady() {
        return isAllReady;
    }
    @JsonProperty
    public List<Integer> getVoteLeftResultsList() {
        return voteLeftResultsList;
    }
    @JsonProperty
    public List<Integer> getVoteRightResultsList() {
        return voteRightResultsList;
    }
    @JsonProperty
    public String getCurrentSpeakingUser() {
        return currentSpeakingUser;
    }
    @JsonProperty
    public String getCurrentSpeakingTeam() {
        return currentSpeakingTeam;
    }
}