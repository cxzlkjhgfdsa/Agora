package com.agora.server.room.util;

import org.springframework.stereotype.Component;

@Component
public class RedisChannelUtil {

    /**
     * 각 토론방에서는 총 5개의 채널을 사용합니다
     * 채널 1
     * room:roomId
     * 토론자, 시청자 모두가 SUBSCRIBE하는 채널입니다
     * 전체적인 상태변화(토론자의 레디 여부, 토론자 입퇴실 여부, 이모지 등)에 관련된 메시지를 송수신합니다
     *
     * 채널 2
     * room:roomId:debater
     * 토론자로 입장 했을 때만 SUBSCRIBE하는 채널입니다
     * 토론자들에게만 보내는 메시지(토론 진행 여부 등)를 송수신합니다
     *
     * 채널 3,4
     * room:roomId:left, room:roomId:right
     * 왼쪽팀 토론자는 left를 SUBSCRIBE 오른쪽팀 토론자는 right를 SUBSCRIBE하는 채널입니다
     * 각 팀에게만 보내는 메시지(팀별 사진카드 등록, 등록 취소 여부 등)을 송수신합니다
     *
     * 채널 5
     * room:roomId:watcher
     * 시청자들만 SUBSCRIBE하는 채널입니다
     * 시청자들에게만 보내는 메시지(투표 진행 등)을 송수신합니다
     */


    public String roomChannelKey(Long roomId){
        return "room:"+roomId;
    }

    public String roomDebatersChannelKey(Long roomId){
        return "room:"+roomId+"debater";
    }

    public String roomLeftTeamChannelKey(Long roomId){
        return "room:"+roomId+"left";
    }

    public String roomRightTeamChannelKey(Long roomId){
        return "room:"+roomId+"right";
    }

    public String roomWatcherChannelKey(Long roomId){
        return "room:"+roomId+"watcher";
    }


}
