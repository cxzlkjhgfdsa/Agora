package com.agora.server.room.util;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class RedisKeyUtil {


    public String phaseKey(Long roomId) {
        return "room:" + roomId + ":phase";
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


    // 선,후턴
    public String currentTurnKey(Long roomId) {
        return "room:" + roomId + ":turn";
    }

    public String voteLeftKey(Long roomId, Integer votePhase) {
        return "room:" + roomId + ":votephase:" + votePhase + ":left";
    }

    public String voteRightKey(Long roomId, Integer votePhase) {
        return "room:" + roomId + ":votephase:" + votePhase + ":right";
    }
    public String isDebateEndedKey(Long roomId) {
        return "room:"+roomId+":isDebateEnded";
    }
}
