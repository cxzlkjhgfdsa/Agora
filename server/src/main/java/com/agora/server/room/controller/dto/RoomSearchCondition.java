package com.agora.server.room.controller.dto;

import lombok.Data;

import java.util.List;

@Data
public class RoomSearchCondition {
    // 검색어(해시태그X), 해시태그, 갯수
    private String searchWord;

    private List<String> hashTags;


}
