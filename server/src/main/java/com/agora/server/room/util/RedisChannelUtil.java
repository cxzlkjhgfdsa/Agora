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
     */


    public String roomChannelKey(Long roomId){
        return "room:"+roomId;
    }


}
