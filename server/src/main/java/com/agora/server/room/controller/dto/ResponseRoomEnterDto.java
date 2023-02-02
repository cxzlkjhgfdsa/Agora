package com.agora.server.room.controller.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ResponseRoomEnterDto {
    private boolean isEnter;
    private String token;

    // 토론 대기 중인 방에 들어 갈 때 필요한 추가 정보 + 갱신 할 정보
    private List<String> left_user_list;
    private List<String> right_user_list;
    private List<Boolean> left_user_isReady;
    private List<Boolean> right_user_isReady;

    // 사진 카드 정보 추후 추가

}
