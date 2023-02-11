package com.agora.server.room.controller;

import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.openvidu.service.OpenViduService;
import com.agora.server.room.controller.dto.*;
import com.agora.server.room.controller.dto.debate.RequestVoteDto;
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
     * @param rcDto
     * @return roomId와 방이 정상적으로 생성되었다는 메세지 리턴
     */
    @PostMapping("room/create")
    public ResponseEntity<ResponseDTO> roomCreate(@RequestBody RequestRoomCreateDto rcDto) throws OpenViduJavaClientException, OpenViduHttpException {
        Room createdRoom = Room.createRoom(rcDto.getRoomName(),rcDto.getRoomCreaterName(),rcDto.getRoomDebateType(),
                rcDto.getRoomOpinionLeft(),rcDto.getRoomOpinionRight(),
                rcDto.getRoomHashtags(),rcDto.getRoomThumbnailUrl(),rcDto.getRoomCategory());


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

    /**
     * 추후 추가
     * roomstate == false 방에 입장하기로 room/enter 요청을 보냈는데
     * 그 사이에 roomstate == true로 바뀌면 에러 던지기
     *
     * 입장하려는 진영 토론자 수가 3명 꽉차있으면 에러 던지기
     * 
     * 토론자로 입장하기 눌러서 들어가기
     */
    @PostMapping("room/enter")
    public ResponseEntity<ResponseDTO> roomEnterAsDebater(@RequestBody RequestRoomEnterAsDebaterDto requestRoomEnterDto) throws OpenViduJavaClientException, OpenViduHttpException {

        String openviduToken = openViduService.enterSession(requestRoomEnterDto.getRoomId());

        ResponseRoomEnterDto responseRoomEnterDto = new ResponseRoomEnterDto();

        // 기본적으로 방에 들어갈 때 필요한 정보들 넣어주기(토론자, 관전자 상관없이 필요한 정보)
        // 여기서 responseRoomEnterDto에 넣을 것 다 넣어주기
        // 방에 일단 입장했을때의 정보 그대로 가져오고
        roomService.enterRoom(responseRoomEnterDto, requestRoomEnterDto.getRoomId());
        // 그 다음에 redis에 있는 리스트에 넣어주고
        roomService.enterRoomAsDebater(requestRoomEnterDto.getUserNickname(), requestRoomEnterDto.getRoomId(), requestRoomEnterDto.getUserTeam());
        // 토론자 입장을 알려줌 그래야지 자신이 없는 리스트로 그리고 시그널을 받은 상태로 추가하기
        // 일단은 이렇게 가고 얘기해봐서 아닌거 같으면 순서 바꾸면 됨
        debateService.debaterEnter(requestRoomEnterDto);

        responseRoomEnterDto.setOpenviduToken(openviduToken);

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setBody(responseRoomEnterDto);
        responseDTO.setMessage("정상적으로 입장하였습니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

    /**
     * 관전자로 방 입장
     * GetMapping으로 roomId만 주면 방 정보 반환
     */
    @GetMapping("room/enter/{roomId}")
    public ResponseEntity<ResponseDTO> roomEnterAsWatcher(@PathVariable Long roomId) throws OpenViduJavaClientException, OpenViduHttpException {

        String openviduToken = openViduService.enterSession(roomId);

        ResponseRoomEnterDto responseRoomEnterDto = new ResponseRoomEnterDto();

        // 기본적으로 방에 들어갈 때 필요한 정보들 넣어주기(토론자, 관전자 상관없이 필요한 정보)
        // 여기서 responseRoomEnterDto에 넣을 것 다 넣어주기
        roomService.enterRoom(responseRoomEnterDto, roomId);

        responseRoomEnterDto.setOpenviduToken(openviduToken);


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
    public ResponseEntity<ResponseDTO> roomLeave (@RequestBody RequestRoomLeaveDto requestRoomLeaveDto) throws OpenViduJavaClientException, OpenViduHttpException {

        if(requestRoomLeaveDto.getType().equals("debater")){
            roomService.leaveRoomAsDebater(requestRoomLeaveDto.getUserNickname(), requestRoomLeaveDto.getRoomId(), requestRoomLeaveDto.getUserTeam());
        } else if(requestRoomLeaveDto.getType().equals("watcher")){
            roomService.leaveRoomAsWatcher(requestRoomLeaveDto.getRoomId());
        }

        // Redis Pub/Sub에서 퇴장 메시지 송신하는 부분
        // type의 토론자 -> debater와 관전자 -> watcher로 구분
        switch (requestRoomLeaveDto.getType()){
            case "debater" :
                debateService.debaterLeave(requestRoomLeaveDto);
                break;
            case "watcher" :
                break;
        }

        if(requestRoomLeaveDto.getIsUserCreater()){
            debateService.debateEndCreaterLeave(requestRoomLeaveDto.getRoomId());
        }

        ResponseDTO responseDTO = new ResponseDTO();
//        responseDTO.setBody(responseRoomEnterDto);
        responseDTO.setMessage("정상적으로 퇴장하였습니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }


//    /**
//     * 나가는 시점에 어떤 정보를 받을 수 있는지 확인해서 변경
//     * @param requestRoomLeaveDto
//     * @return
//     * @throws OpenViduJavaClientException
//     * @throws OpenViduHttpException
//     */
//    @PostMapping("room/leave")
//    public ResponseEntity<ResponseDTO> roomLeaveAsDebater (@RequestBody RequestRoomLeaveDto requestRoomLeaveDto) throws OpenViduJavaClientException, OpenViduHttpException {
//
//        if(requestRoomLeaveDto.getType().equals("debater")){
//            roomService.leaveRoomAsDebater(requestRoomLeaveDto.getUserNickname(), requestRoomLeaveDto.getRoomId(), requestRoomLeaveDto.getUserTeam());
//        } else if(requestRoomLeaveDto.getType().equals("watcher")){
//            roomService.leaveRoomAsWatcher(requestRoomLeaveDto.getRoomId());
//        }
//
//        // Redis Pub/Sub에서 퇴장 메시지 송신하는 부분
//        // type의 토론자 -> debater와 관전자 -> watcher로 구분
//        switch (requestRoomLeaveDto.getType()){
//            case "debater" :
//                debateService.debaterLeave(requestRoomLeaveDto);
//                break;
//            case "watcher" :
//                break;
//        }
//
//        if(requestRoomLeaveDto.getIsUserCreater()){
//            debateService.debateEndCreaterLeave(requestRoomLeaveDto.getRoomId());
//        }
//
//        ResponseDTO responseDTO = new ResponseDTO();
////        responseDTO.setBody(responseRoomEnterDto);
//        responseDTO.setMessage("정상적으로 퇴장하였습니다");
//        responseDTO.setStatusCode(200);
//        responseDTO.setState(true);
//        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
//    }



}
