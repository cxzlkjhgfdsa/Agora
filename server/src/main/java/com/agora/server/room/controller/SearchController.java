package com.agora.server.room.controller;

import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.room.controller.dto.ResponseRoomInfoDto;
import com.agora.server.room.controller.dto.RoomSearchCondition;
import com.agora.server.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class SearchController {

    private final RoomService roomService;

    @GetMapping("search/main/hot5")
    public ResponseEntity<ResponseDTO> searchHot5(){
        List<ResponseRoomInfoDto> hot5 = roomService.searchHot5();

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setBody(hot5);
        responseDTO.setMessage("화제의 토론 Top5 리스트입니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

    @GetMapping("search/dropdown")
    public ResponseEntity<ResponseDTO> searchDropdown(
            RoomSearchCondition condition) {

        Map<String,List<ResponseRoomInfoDto>> searchMap = roomService.searchDropdown(condition);

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setBody(searchMap);
        responseDTO.setMessage("드랍다운 맵입니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

}
