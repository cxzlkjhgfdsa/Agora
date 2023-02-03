package com.agora.server.room.controller.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ResponseRoomEnterBeforeStartDto {
    private boolean isEnter;
    private String token;

    // 토론 대기 중인 방에 들어 갈 때 필요한 추가 정보 + 갱신 할 정보
    private List<String> leftUserList;
    private List<String> rightUserList;
    private List<Boolean> leftUserIsReady;
    private List<Boolean> rightUserIsReady;

    // 사진 카드 정보 추후 추가

}
