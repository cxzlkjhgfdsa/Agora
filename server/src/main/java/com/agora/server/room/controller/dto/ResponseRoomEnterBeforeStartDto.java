package com.agora.server.room.controller.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ResponseRoomEnterBeforeStartDto {
    private Boolean isEnter;
    private String token;

    // 방장 닉네임
    private String createrNickname;
    // 지금 유저가 방장인지
    private Boolean isUserCreater;

    // 토론 대기 중인 방에 들어 갈 때 필요한 추가 정보 + 갱신 할 정보
    private List<String> leftUserList;
    private List<String> rightUserList;
    private List<Boolean> leftUserIsReady;
    private List<Boolean> rightUserIsReady;

    // 사진 카드 정보 추후 추가

}
