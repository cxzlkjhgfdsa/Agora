package com.agora.server.room.controller.dto;

import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.Data;

import javax.persistence.OrderBy;
import java.util.List;

@Data
public class ModalRoomSearchCondition {

    // 토론진행여부, 카테고리, 정렬순서

    private Boolean roomstate;

    private String category;

    private String order;

}
