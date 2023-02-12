package com.agora.server.room.util;

import com.agora.server.room.controller.dto.pubsub.*;
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
    private final String WATCHCNT_UPDATE_EVENT = "updateWatchCnt";


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

    public String debateStartMessage(Integer phase, Integer phaseDetail) {
        DebateStartMessage debateStartMessage = new DebateStartMessage();
        debateStartMessage.setEvent(START_DEBATE_EVENT);
        debateStartMessage.setRoomPhase(phase);
        debateStartMessage.setRoomPhaseDetail(phaseDetail);
        try {
            String json = objectMapper.writeValueAsString(debateStartMessage);
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

    public String roomWatchCntUpdate(Integer roomWatchCnt){
        WatchCntUpdateMessage watchCntUpdateMessage = new WatchCntUpdateMessage();
        watchCntUpdateMessage.setEvent(WATCHCNT_UPDATE_EVENT);
        watchCntUpdateMessage.setRoomWatchCnt(roomWatchCnt);
        try {
            String json = objectMapper.writeValueAsString(watchCntUpdateMessage);
            return json;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }


}
