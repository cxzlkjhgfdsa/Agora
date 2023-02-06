package com.agora.server.room.controller.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ResponseRoomEnterAfterStartDto {

    private Boolean isEnter;
    private String token;

    // 방장 닉네임
    private String createrNickname;
    // 지금 유저가 방장인지
    private Boolean isUserCreater;

    // 토론 진행 중인 방에 들어 갈 때 필요한 추가 정보 + 갱신 할 정보
    private List<String> leftUserList;
    private List<String> rightUserList;

    // 현재 말하고 있는 사람 닉네임, 팀
    private String currentSpeakingUserNickname;
    private String currentSpeakingUserTeam;
    private Integer currentTurn;

    // Phase로 투표까지 구분?
    private Integer roomPhase;
    private Integer roomPhaseCurrentTimeMinute;
    private Integer roomPhaseCurrentTimeSecond;

    // 현재까지 저장된 투표 결과
    private List<Integer> voteLeftResultsList;
    private List<Integer> voteRightResultsList;


    // 사진 카드 정보 추후 추가

}
