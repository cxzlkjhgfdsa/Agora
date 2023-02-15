package com.agora.server.room.controller;

import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.openvidu.service.OpenViduService;
import com.agora.server.room.controller.dto.*;
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
@RequestMapping("api/v2")
public class RoomController {

    private final RoomService roomService;
    private final OpenViduService openViduService;
    private final DebateService debateService;

    /**
     * 방을 생성
     *
     * @param rcDto
     * @return roomId와 방이 정상적으로 생성되었다는 메세지 리턴
     */
    @PostMapping("room/create")
    public ResponseEntity<ResponseDTO> roomCreate(@RequestBody RequestRoomCreateDto rcDto) throws OpenViduJavaClientException, OpenViduHttpException {
        Room createdRoom = Room.createRoom(rcDto.getRoomName(), rcDto.getRoomCreaterName(), rcDto.getRoomDebateType(),
                rcDto.getRoomOpinionLeft(), rcDto.getRoomOpinionRight(),
                rcDto.getRoomHashtags(), rcDto.getRoomThumbnailUrl(), rcDto.getRoomCategory());


        Long roomId = roomService.createRoom(createdRoom);
        openViduService.createSession(roomId);

        ResponseRoomCreateDto responseRoomCreateDto = new ResponseRoomCreateDto();
        responseRoomCreateDto.setRoomId(roomId);

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setBody(responseRoomCreateDto);
        responseDTO.setMessage("방이 정상적으로 생성되었습니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

    @PostMapping("room/enter")
    public ResponseEntity<ResponseDTO> checkBeforeEnterIntoOpenviduPage(@RequestBody RequestRoomEnterAsDebaterDto requestRoomEnterDto) throws OpenViduJavaClientException, OpenViduHttpException {

        ResponseRoomEnterAbleDto responseRoomEnterAbleDto = new ResponseRoomEnterAbleDto();
        ResponseDTO responseDTO = new ResponseDTO();

        boolean isRoomEnterAble = roomService.enterRoomAsDebater(requestRoomEnterDto.getUserNickname(), requestRoomEnterDto.getRoomId(), requestRoomEnterDto.getUserTeam());
        if(isRoomEnterAble){
            debateService.debaterEnter(requestRoomEnterDto);
            responseRoomEnterAbleDto.setIsEnterAble(isRoomEnterAble);
            responseRoomEnterAbleDto.setRoomId(requestRoomEnterDto.getRoomId());
            responseDTO.setBody(responseRoomEnterAbleDto);
            responseDTO.setMessage("오픈비두 페이지로 이동합니다");
            responseDTO.setStatusCode(202);
            responseDTO.setState(true);
            return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
        } else{
            responseRoomEnterAbleDto.setIsEnterAble(isRoomEnterAble);
            responseDTO.setBody(responseRoomEnterAbleDto);
            responseDTO.setMessage("방에 입장할 수 없습니다");
            responseDTO.setStatusCode(400);
            responseDTO.setState(false);
            return new ResponseEntity<>(responseDTO, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 관전자로 방 입장
     * GetMapping으로 roomId만 주면 방 정보 반환
     */
    @GetMapping("room/enter/{roomId}")
    public ResponseEntity<ResponseDTO> roomEnterAndGetRoomEnterDto(@PathVariable Long roomId) throws OpenViduJavaClientException, OpenViduHttpException {

        String openviduToken = openViduService.enterSession(roomId);

        ResponseRoomEnterDto responseRoomEnterDto = new ResponseRoomEnterDto();

        // 기본적으로 방에 들어갈 때 필요한 정보들 넣어주기(토론자, 관전자 상관없이 필요한 정보)
        // 여기서 responseRoomEnterDto에 넣을 것 다 넣어주기
        roomService.enterRoom(responseRoomEnterDto, roomId);

        responseRoomEnterDto.setOpenviduToken(openviduToken);
//        responseRoomEnterDto.setOpenviduToken("");


        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setBody(responseRoomEnterDto);
        responseDTO.setMessage("정상적으로 입장하였습니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

    /**
     * 일반적인 퇴장
     * 토론자와 관전자를 구분?
     * 어차피 토론 시작하고 나서는 토론자 안 내보낼 꺼니까
     * 그냥 전부 일반 퇴장으로
     * <p>
     * 대기방에서만 토론자 퇴장 처리
     */
    @PostMapping("room/leave")
    public ResponseEntity<ResponseDTO> roomLeave(@RequestBody RequestRoomLeaveDto requestRoomLeaveDto) throws OpenViduJavaClientException, OpenViduHttpException {

        if (requestRoomLeaveDto.getUserNickname().equals("")) {
            roomService.leaveRoomAsWatcher(requestRoomLeaveDto.getRoomId());
        } else {
            boolean isCreaterLeaved = roomService.leaveRoomAsDebater(requestRoomLeaveDto.getUserNickname(), requestRoomLeaveDto.getRoomId());
            if (isCreaterLeaved) {
                debateService.debaterLeave(requestRoomLeaveDto);
                debateService.debateEndCreaterLeave(requestRoomLeaveDto.getRoomId());
            } else {
                debateService.debaterLeave(requestRoomLeaveDto);
            }
        }


        ResponseDTO responseDTO = new ResponseDTO();
//        responseDTO.setBody(responseRoomEnterDto);
        responseDTO.setMessage("정상적으로 퇴장하였습니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }


}
