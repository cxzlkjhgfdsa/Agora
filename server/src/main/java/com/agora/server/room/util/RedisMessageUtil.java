package com.agora.server.room.util;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class RedisMessageUtil {

    /**
     * 태그 규칙
     * <p>
     * [이벤트태그] [파라미터태그1] [파라미터태그2] ... parameter1 parameter2 ...
     * ex) [ENTER] [TEAM] [USERNICKNAME] LEFT 김영한
     * 왼쪽팀의 김영한님이 방에 입장함을 알리는 태그
     *
     * 공백 기준으로 스플릿 하실 수 있게 해놨습니다
     */

    @Setter
    @JsonSerialize
    class MyMessage{

        private String userTeam;
        private String userNickname;
        private List<String> userTestList;
        private Map<String, Object> userTestMap;

        @JsonProperty
        public String getUserTeam() {
            return userTeam;
        }

        @JsonProperty
        public String getUserNickname() {
            return userNickname;
        }

        @JsonProperty
        public List<String> getUserTestList() {
            return userTestList;
        }

        @JsonProperty
        public Map<String, Object> getUserTestMap() {
            return userTestMap;
        }



    }

    private final ObjectMapper objectMapper;


    // 이벤트 태그
    private final String DEBATE_START_TAG = "[DEBATESTART] ";
    private final String DEBATE_END_TAG = "[DEBATEEND] ";
    private final String ENTER_TAG = "[ENTER] ";
    private final String LEAVE_TAG = "[LEAVE] ";
    private final String READY_TAG = "[READY] ";
    private final String UNREADY_TAG = "[UNREADY] ";
    private final String PHASE_START_TAG = "[PHASESTART] ";
    private final String PHASE_END_TAG = "[PHASEEND] ";
    private final String PHASE_SKIP_TAG = "[PHASESKIP] ";
    private final String VOTE_START_TAG = "[VOTESTART] ";
    private final String VOTE_END_TAG = "[VOTEEND] ";

    // 파라미터 태그
    private final String NICKNAME_TAG = "[NICKNAME] ";
    private final String DEBATE_PHASE_TAG = "[DEBATEPHASE] ";
    private final String VOTE_PHASE_TAG = "[VOTEPHASE] ";
    private final String VOTE_RESULT_TAG = "[VOTERESULT] ";
    private final String TURN_TAG = "[TURN] ";
    private final String TEAM_TAG = "[TEAM] ";

    public String enterMessage(Integer userSide, String userNickname) {
        String team = getTeam(userSide);
        return ENTER_TAG + TEAM_TAG + NICKNAME_TAG + team + " " + userNickname;
    }

    public String leaveMessage(Integer userSide, String userNickname) {
        String team = getTeam(userSide);
        return LEAVE_TAG + TEAM_TAG + NICKNAME_TAG + team + " " + userNickname;
    }

//    public String readyMessage(Integer userSide, String userNickname) {
//        String team = getTeam(userSide);
//        return READY_TAG + TEAM_TAG + NICKNAME_TAG + team + " " + userNickname;
//    }

    public String readyMessage(Integer userSide, String userNickname) {
        MyMessage myMessage = new MyMessage();
        String team = getTeam(userSide);
        myMessage.setUserTeam(team);
        myMessage.setUserNickname(userNickname);
        List<String> testlist = new ArrayList<>();
        testlist.add("김영한");
        testlist.add("로버트다우니주니어");
        testlist.add("안침착맨");

        Map<String, Object> testMap = new HashMap<>();
        testMap.put("테스트키String","테스트벨류");
        testMap.put("테스트키int", 3);
        myMessage.setUserTestList(testlist);
        myMessage.setUserTestMap(testMap);
        try {
            String json = objectMapper.writeValueAsString(myMessage);
            return json;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public String unreadyMessage(Integer userSide, String userNickname) {
        String team = getTeam(userSide);
        return UNREADY_TAG + TEAM_TAG + NICKNAME_TAG + team + " " + userNickname;
    }

    public String debateStartMessage() {
        return DEBATE_START_TAG + "start debate";
    }

    public String phaseStartAllInOneMessage(Integer phase, Integer turn, String team, String userNickname) {
        return PHASE_START_TAG + DEBATE_PHASE_TAG + TURN_TAG + TEAM_TAG + NICKNAME_TAG + phase + " " + turn + " " + team + " " + userNickname;
    }

    public String phaseEndAllInOneMessage(Integer phase, Integer turn, String team, String userNickname) {
        return PHASE_END_TAG + DEBATE_PHASE_TAG + TURN_TAG + TEAM_TAG + NICKNAME_TAG + phase + " " + turn + " " + team + " " + userNickname;
    }

    public String phaseSkipAllInOneMessage(Integer phase, Integer turn, String team, String userNickname) {
        return PHASE_SKIP_TAG + DEBATE_PHASE_TAG + TURN_TAG + TEAM_TAG + NICKNAME_TAG  + phase + " " + turn + " " + team + " " + userNickname;
    }

    public String voteStartMessage(Integer votePhase) {
        return VOTE_START_TAG + VOTE_PHASE_TAG + votePhase;
    }

    public String voteEndMessage(Integer votePhase, Integer voteLeftResult, Integer voteRightResult) {
        return VOTE_END_TAG + VOTE_PHASE_TAG +VOTE_RESULT_TAG + votePhase + " " + voteLeftResult + " " + voteRightResult;
    }
    public String debateEndMessage() {
        return DEBATE_END_TAG + "debate ended please leave room";
    }

    /**
     * 편의용 메서드
     * 팀 태그
     *
     * @param userSide
     * @return
     */
    private String getTeam(Integer userSide) {
        if (userSide == 0) {
            return "LEFT";
        } else if (userSide == 1) {
            return "RIGHT";
        } else {
            return "NOSIDE";
        }
    }

}
