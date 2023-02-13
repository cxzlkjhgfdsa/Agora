package com.agora.server.room.util;

import org.springframework.stereotype.Component;

@Component
public class RedisKeyUtil {


    public String phaseKey(Long roomId) {
        return "room:" + roomId + ":phase";
    }

    // 페이즈 디테일
    public String phaseDetailKey(Long roomId) {
        return "room:" + roomId + ":phasedetail";
    }

    public String phaseStartTimeKey(Long roomId) {
        return "room:" + roomId + ":phaseTime";
    }

    public String watchCntKey(Long roomId) {
        return "room:" + roomId + ":watchCnt";
    }

    public String isReadyKey(Long roomId, String userNickname) {
        return "room:" + roomId + ":" + userNickname + ":isReady";
    }

    public String leftUserListKey(Long roomId) {
        return "room:" + roomId + ":leftUserList";
    }

    public String rightUserListKey(Long roomId) {
        return "room:" + roomId + ":rightUserList";
    }

    public String currentSpeakingUserKey(Long roomId) {
        return "room:" + roomId + ":currentSpeakingUser";
    }

    public String currentSpeakingTeamKey(Long roomId) {
        return "room:" + roomId + ":currentSpeakingTeam";
    }




    public String voteLeftKey(Long roomId, Integer votePhase) {
        return "room:" + roomId + ":votephase:" + votePhase + ":left";
    }

    public String voteRightKey(Long roomId, Integer votePhase) {
        return "room:" + roomId + ":votephase:" + votePhase + ":right";
    }

    public String voteLeftResulPercentKey(Long roomId, Integer votePhase) {
        return "room:" + roomId + ":votephase:" + votePhase + ":left:resultPercent";
    }

    public String voteRightResultPercentKey(Long roomId, Integer votePhase) {
        return "room:" + roomId + ":votephase:" + votePhase + ":right:resultPercent";
    }

    public String isDebateEndedKey(Long roomId) {
        return "room:"+roomId+":isDebateEnded";
    }

    public String imgCardNameKey(Long roomId, int index, String team){
        return "room:"+roomId+":"+team+":"+":imgCardName:"+index;
    }

    public String imgCardUrlKey(Long roomId, int index, String team){
        return "room:"+roomId+":"+team+":imgCardUrl:"+index;
    }

    public String imgCardOpenedListKey(Long roomId, String team){
        return "room:"+roomId+":"+team+":imgCardOpenedList";
    }

    public String debateStartTimeKey(Long roomId) {
        return "room:" + roomId + ":debateStartTime";
    }
}
