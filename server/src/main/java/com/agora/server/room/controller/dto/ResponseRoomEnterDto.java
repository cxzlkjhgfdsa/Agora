package com.agora.server.room.controller.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ResponseRoomEnterDto {

    // 0. OpenviduToken
    private String openviduToken; // check

    // 1. 방정보 (제목, 왼쪽 오른쪽 주장)
    private String roomName; // check
    private String roomOpinionLeft; // check
    private String roomOpinionRight; // check

    // 2. 토론자 리스트 (왼쪽, 오른쪽 팀)
    private List<String> leftUserList; // check
    private List<String> rightUserList; // check
    
    // 3. 방장 닉네임
    private String roomCreaterName; // check

    // 4. 관전자 수
    private Integer roomWatchCnt; // check

    // 5. 페이즈 진행 시간 분,초 -> 초로 수정
//    private Integer roomPhaseCurrentTimeMinute; // check
//    private Integer roomPhaseCurrentTimeSecond; // check
    // 페이즈별 남은 시간
    private Integer roomPhaseRemainSecond;

    // 총 진행 시간
    private Integer roomTimeInProgressSecond; // check

    // 6. 토론 시작했는지 (roomState == false 시작 전, true 시작 후)
    private Boolean roomState; // check

    // 7. 현재 페이즈(ex. 1-1)
    // String으로 하려 했는데 이미 조회,검색부분에서 Integer로 만들어놔서
    // Integer로 하고 roomPhaseDetail을 하나 더 만들어서
    // 1-1에서 앞의 1은 roomPhase, 뒤의 1은 roomPhaseDetail로 일단 설정
    private Integer roomPhase; // check
    private Integer roomPhaseDetail; // check

    // 8. 오픈된 카드 URL 리스트(왼쪽, 오른쪽)
    private List<String> leftOpenedCardList; // check
    private List<String> rightOpenedCardList; // check

    // 9. 준비 완료 닉네임 리스트
    private List<String> readyUserList; // check

    // 10. 시작가능상태
    private Boolean isAllReady; // check

    // 11. 현재까지 저장된 투표 결과
    private List<Integer> voteLeftResultsList; // check
    private List<Integer> voteRightResultsList; // check

    // 12. 현재 발언자, 현재 발언팀
    private String currentSpeakingUser; // check
    private String currentSpeakingTeam; // check

//    private Boolean isEnter;
//    private Boolean isUserCreater;


}
