package com.agora.server.room.controller;

import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.openvidu.service.OpenViduService;
import com.agora.server.room.controller.dto.RequestRoomCreateDto;
import com.agora.server.room.controller.dto.RequestRoomEnterDto;
import com.agora.server.room.controller.dto.ResponseRoomCreateDto;
import com.agora.server.room.controller.dto.ResponseRoomEnterDto;
import com.agora.server.room.domain.Room;
import com.agora.server.room.service.DebateService;
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
    private final DebateService debateService;

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
    public ResponseEntity<ResponseDTO> roomEnter(@RequestBody RequestRoomEnterDto requestRoomEnterDto) throws OpenViduJavaClientException, OpenViduHttpException {
        String token = openViduService.enterSession(requestRoomEnterDto.getRoomId(), requestRoomEnterDto.getType());

        ResponseRoomEnterDto responseRoomEnterDto = new ResponseRoomEnterDto();

        boolean isEntered = false;
        if(requestRoomEnterDto.getType().equals("pub")){
            roomService.enterRoomAsDebater(requestRoomEnterDto.getUserId(), requestRoomEnterDto.getRoomId(), requestRoomEnterDto.getUserSide());
        } else if(requestRoomEnterDto.getType().equals("sub")){
            roomService.enterRoomAsWatcher(requestRoomEnterDto.getRoomId());
        }

        roomService.setRoomCurrentStatus(requestRoomEnterDto, responseRoomEnterDto);

        responseRoomEnterDto.setEnter(isEntered);
        responseRoomEnterDto.setToken(token);

        // Redis Pub/Sub에서 입장 메시지 송신하는 부분
        // type의 토론자 -> pub와 관전자 -> sub로 구분
        // pub의 경우에만 메시지 송신
        if(requestRoomEnterDto.getType().equals("pub")){
            debateService.debaterEnter(requestRoomEnterDto);
        }

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setBody(responseRoomEnterDto);
        responseDTO.setMessage("정상적으로 입장하였습니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

    /**
     * 방 나가기 api
     * Redis Pub/Sub 테스트용으로 틀만 만들어놨습니다.
     * 자유롭게 수정하세요
     */
    @PostMapping("room/leave")
    public ResponseEntity<ResponseDTO> roomLeave (@RequestBody RequestRoomEnterDto requestRoomEnterDto) throws OpenViduJavaClientException, OpenViduHttpException {

        if(requestRoomEnterDto.getType().equals("pub")){
            roomService.leaveRoomAsDebater(requestRoomEnterDto.getUserId(), requestRoomEnterDto.getRoomId(), requestRoomEnterDto.getUserSide());
        } else if(requestRoomEnterDto.getType().equals("sub")){
            roomService.leaveRoomAsWatcher(requestRoomEnterDto.getRoomId());
        }

        // Redis Pub/Sub에서 퇴장 메시지 송신하는 부분
        // type의 토론자 -> pub와 관전자 -> sub로 구분
        switch (requestRoomEnterDto.getType()){
            case "pub" :
                debateService.debaterLeave(requestRoomEnterDto);
                break;
            case "sub" :
                break;
        }

        ResponseDTO responseDTO = new ResponseDTO();
//        responseDTO.setBody(responseRoomEnterDto);
        responseDTO.setMessage("정상적으로 퇴장하였습니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

}
