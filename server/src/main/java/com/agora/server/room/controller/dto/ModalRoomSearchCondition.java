package com.agora.server.room.controller.dto;

import lombok.Data;

@Data
public class ModalRoomSearchCondition {

    // 토론진행여부, 카테고리, 정렬순서

    private Boolean roomState;

    private String category;

    private String order;

}
