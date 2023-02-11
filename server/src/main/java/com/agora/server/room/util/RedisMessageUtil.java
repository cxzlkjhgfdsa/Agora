package com.agora.server.room.util;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class RedisMessageUtil {


    @Setter
    @JsonSerialize
    class PubSubMessage{

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

    @Setter
    @JsonSerialize
    class EnterLeaveMessage {
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

    @Setter
    @JsonSerialize
    class ReadyUnreadyMessage {
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

    @Setter
    @JsonSerialize
    class EventOnlyMessage {
        private String event;

        @JsonProperty
        public String getEvent() {
            return event;
        }
    }

    @Setter
    @JsonSerialize
    class SpeakPhaseMessage {

        // 페이즈 변경 알려줌
        private String event;

        // 페이즈 변경 시 현재 페이즈
        private Integer roomPhase;
        private Integer roomPhaseDetail;

        // 현재 발언자, 현재 발언팀
        private String currentSpeakingUser;
        private String currentSpeakingTeam;
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
        public String getCurrentSpeakingUser() {
            return currentSpeakingUser;
        }
        @JsonProperty
        public String getCurrentSpeakingTeam() {
            return currentSpeakingTeam;
        }
    }

    @Setter
    @JsonSerialize
    class VotePhaseMessage {
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

    @Setter
    @JsonSerialize
    class VoteResultPhaseMessage {
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

    @Setter
    @JsonSerialize
    class CardOpenMessage {
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

    private final ObjectMapper objectMapper;

    // 이벤트
    private final String ENTER_EVENT = "enter";
    private final String LEAVE_EVENT = "leave";
    private final String READY_EVENT = "ready";
    private final String UNREADY_EVENT = "unready";
    private final String START_DEBATE_EVENT = "startDebate";
    private final String END_DEBATE_EVENT = "endDebate";
    private final String START_SPEAK_EVENT = "startSpeakPhase";
    private final String START_VOTE_EVENT = "startVotePhase";
    private final String START_VOTE_RESULT_EVENT = "startVoteResultPhase";
    private final String CARD_OPEN_EVENT = "cardOpen";


    public String enterMessage(List<String> leftUserList, List<String> rightUserList) {
        EnterLeaveMessage enterLeaveMessage = new EnterLeaveMessage();
        enterLeaveMessage.setEvent(ENTER_EVENT);
        enterLeaveMessage.setLeftUserList(leftUserList);
        enterLeaveMessage.setRightUserList(rightUserList);
        try {
            String json = objectMapper.writeValueAsString(enterLeaveMessage);
            return json;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public String leaveMessage(List<String> leftUserList, List<String> rightUserList) {
        EnterLeaveMessage enterLeaveMessage = new EnterLeaveMessage();
        enterLeaveMessage.setEvent(LEAVE_EVENT);
        enterLeaveMessage.setLeftUserList(leftUserList);
        enterLeaveMessage.setRightUserList(rightUserList);
        try {
            String json = objectMapper.writeValueAsString(enterLeaveMessage);
            return json;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public String readyMessage(Boolean isAllReady, List<String> readyUserList) {
        ReadyUnreadyMessage readyUnreadyMessage = new ReadyUnreadyMessage();
        readyUnreadyMessage.setEvent(READY_EVENT);
        readyUnreadyMessage.setIsAllReady(isAllReady);
        readyUnreadyMessage.setReadyUserList(readyUserList);
        try {
            String json = objectMapper.writeValueAsString(readyUnreadyMessage);
            return json;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public String unreadyMessage(Boolean isAllReady, List<String> readyUserList) {
        ReadyUnreadyMessage readyUnreadyMessage = new ReadyUnreadyMessage();
        readyUnreadyMessage.setEvent(UNREADY_EVENT);
        readyUnreadyMessage.setIsAllReady(isAllReady);
        readyUnreadyMessage.setReadyUserList(readyUserList);
        try {
            String json = objectMapper.writeValueAsString(readyUnreadyMessage);
            return json;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public String debateStartMessage() {
        EventOnlyMessage eventOnlyMessage = new EventOnlyMessage();
        eventOnlyMessage.setEvent(START_DEBATE_EVENT);
        try {
            String json = objectMapper.writeValueAsString(eventOnlyMessage);
            return json;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public String speakPhaseStartMessage(Integer phase, Integer phaseDetail, String team, String userNickname) {
        SpeakPhaseMessage speakPhaseMessage = new SpeakPhaseMessage();
        speakPhaseMessage.setEvent(START_SPEAK_EVENT);
        speakPhaseMessage.setRoomPhase(phase);
        speakPhaseMessage.setRoomPhaseDetail(phaseDetail);
        speakPhaseMessage.setCurrentSpeakingTeam(team);
        speakPhaseMessage.setCurrentSpeakingUser(userNickname);
        try {
            String json = objectMapper.writeValueAsString(speakPhaseMessage);
            return json;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public String votePhaseStartMessage(Integer phase, Integer phaseDetail) {
        VotePhaseMessage votePhaseMessage = new VotePhaseMessage();
        votePhaseMessage.setEvent(START_VOTE_EVENT);
        votePhaseMessage.setRoomPhase(phase);
        votePhaseMessage.setRoomPhaseDetail(phaseDetail);
        try {
            String json = objectMapper.writeValueAsString(votePhaseMessage);
            return json;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public String voteEndMessage(Integer phase, Integer phaseDetail ,List<Integer> voteLeftResultList, List<Integer> voteRightResultList) {
        VoteResultPhaseMessage voteResultPhaseMessage = new VoteResultPhaseMessage();
        voteResultPhaseMessage.setEvent(START_VOTE_RESULT_EVENT);
        voteResultPhaseMessage.setRoomPhase(phase);
        voteResultPhaseMessage.setRoomPhaseDetail(phaseDetail);
        voteResultPhaseMessage.setVoteLeftResultsList(voteLeftResultList);
        voteResultPhaseMessage.setVoteRightResultsList(voteRightResultList);
        try {
            String json = objectMapper.writeValueAsString(voteResultPhaseMessage);
            return json;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public String debateEndMessage() {
        EventOnlyMessage eventOnlyMessage = new EventOnlyMessage();
        eventOnlyMessage.setEvent(END_DEBATE_EVENT);
        try {
            String json = objectMapper.writeValueAsString(eventOnlyMessage);
            return json;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public String imgCardOpenMessage(List<String> leftOpenedCardList,List<String> rightOpenedCardList){
        CardOpenMessage cardOpenMessage = new CardOpenMessage();
        cardOpenMessage.setEvent(CARD_OPEN_EVENT);
        cardOpenMessage.setLeftOpenedCardList(leftOpenedCardList);
        cardOpenMessage.setRightOpenedCardList(rightOpenedCardList);
        try {
            String json = objectMapper.writeValueAsString(cardOpenMessage);
            return json;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

}
