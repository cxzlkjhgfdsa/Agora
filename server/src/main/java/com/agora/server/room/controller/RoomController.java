package com.agora.server.room.controller;

import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.openvidu.service.OpenViduService;
import com.agora.server.room.controller.dto.RequestRoomCreateDto;
import com.agora.server.room.controller.dto.RequestRoomEnterDto;
import com.agora.server.room.controller.dto.ResponseRoomCreateDto;
import com.agora.server.room.controller.dto.ResponseRoomEnterDto;
import com.agora.server.room.domain.Room;
import com.agora.server.room.service.RoomService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1")
public class RoomController {

    private final RoomService roomService;
    private final OpenViduService openViduService;

    /**
     * 방을 생성
     * @param rcDto
     * @return roomId와 방이 정상적으로 생성되었다는 메세지 리턴
     */
    @PostMapping("room/create")
    public ResponseEntity<ResponseDTO> roomCreate(@RequestBody RequestRoomCreateDto rcDto) throws OpenViduJavaClientException, OpenViduHttpException {
        Room createdRoom = Room.createRoom(rcDto.getRoom_name(),rcDto.getRoom_creater_name(),rcDto.getRoom_debate_type(),
                rcDto.getRoom_opinion_left(),rcDto.getRoom_opinion_right(),
                rcDto.getRoom_hashtags(),rcDto.getRoom_thumbnail_url(),rcDto.getRoom_category());

        Long roomId;
        roomId = roomService.createRoom(createdRoom);

        String token = openViduService.createSession(roomId);

        ResponseRoomCreateDto responseRoomCreateDto = new ResponseRoomCreateDto();
        responseRoomCreateDto.setRoomId(roomId);
        responseRoomCreateDto.setToken(token);

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setBody(responseRoomCreateDto);
        responseDTO.setMessage("방이 정상적으로 생성되었습니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

    @PostMapping("room/enter")
    public ResponseEntity<ResponseDTO> roomEnterAsDebater(@RequestBody RequestRoomEnterDto requestRoomEnterDto) throws OpenViduJavaClientException, OpenViduHttpException {
        String token = openViduService.enterSession(requestRoomEnterDto.getRoomId(), requestRoomEnterDto.getType());

        boolean isEntered = roomService.enterRoom(requestRoomEnterDto.getUserId(), requestRoomEnterDto.getRoomId(), requestRoomEnterDto.getUserSide());

        ResponseRoomEnterDto responseRoomEnterDto = new ResponseRoomEnterDto();
        responseRoomEnterDto.setEnter(isEntered);
        responseRoomEnterDto.setToken(token);

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setBody(responseRoomEnterDto);
        responseDTO.setMessage("정상적으로 입장하였습니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

}
