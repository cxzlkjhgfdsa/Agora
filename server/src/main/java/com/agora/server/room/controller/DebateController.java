package com.agora.server.room.controller;

import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.room.controller.dto.RequestDebateStartDto;
import com.agora.server.room.controller.dto.RequestRoomEnterAsDebaterDto;
import com.agora.server.room.controller.dto.debate.*;
import com.agora.server.room.service.DebateService;
import com.agora.server.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v2/")
public class DebateController {

    private final RoomService roomService;
    private final DebateService debateService;

    /**
     * 대기방에서 Ready 누르는 API
     * @param requestReadyStateChangeDto
     */
    @PutMapping("debate/ready")
    public ResponseEntity<ResponseDTO> changeReadyState(@RequestBody RequestReadyStateChangeDto requestReadyStateChangeDto){
        debateService.ready(requestReadyStateChangeDto);
        ResponseDTO responseDTO = new ResponseDTO();
//        responseDTO.setBody(responseRoomEnterDto);
        responseDTO.setMessage("레디 성공");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

    /**
     * 대기방에서 Ready 취소 누르는 API
     * @param requestReadyStateChangeDto
     */
    @PutMapping("debate/unready")
    public ResponseEntity<ResponseDTO> changeUnreadyState(@RequestBody RequestReadyStateChangeDto requestReadyStateChangeDto){
        debateService.unready(requestReadyStateChangeDto);

        ResponseDTO responseDTO = new ResponseDTO();
//        responseDTO.setBody(responseRoomEnterDto);
        responseDTO.setMessage("언레디 성공");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

    /**
     * 대기방에서 Start 버튼 누르는 API
     */
    @PutMapping("debate/start")
    public ResponseEntity<ResponseDTO>startDebate(@RequestBody RequestDebateStartDto requestDebateStartDto){
        roomService.roomStart(requestDebateStartDto.getRoomId());
        debateService.startDebate(requestDebateStartDto);

        ResponseDTO responseDTO = new ResponseDTO();
//        responseDTO.setBody(responseRoomEnterDto);
        responseDTO.setMessage("토론이 정상적으로 시작했습니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }


    @PutMapping("debate/phaseskip")
    public ResponseEntity<ResponseDTO> phaseSkip(@RequestBody RequestSkipDto requestSkipDto){
        debateService.skipPhase(requestSkipDto);
        ResponseDTO responseDTO = new ResponseDTO();
//        responseDTO.setBody(responseRoomEnterDto);
        responseDTO.setMessage("정상적으로 페이즈 스킵하였습니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }


    @PostMapping("debate/cardopen")
    public ResponseEntity<ResponseDTO> cardOpen(@RequestBody RequestCardOpenDto requestCardOpenDto){
<<<<<<< HEAD
        debateService.cardOpen(requestCardOpenDto.getUserNickname(), requestCardOpenDto.getCardIdx(), requestCardOpenDto.getRoomId());
=======
        debateService.cardOpen(requestCardOpenDto.getUserIdx(), requestCardOpenDto.getCardIdx(), requestCardOpenDto.getUserTeam(), requestCardOpenDto.getRoomId());
>>>>>>> b1ee99de512bcc471e947ee321bcc09251784fa0
        ResponseDTO responseDTO = new ResponseDTO();
//        responseDTO.setBody(responseRoomEnterDto);
        responseDTO.setMessage("카드 오픈되었습니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

    /**
     * 투표 기능
     */
    @PostMapping("debate/vote")
    public ResponseEntity<ResponseDTO> vote (@RequestBody RequestVoteDto requestVoteDto) {

        debateService.vote(requestVoteDto);

        ResponseDTO responseDTO = new ResponseDTO();
//        responseDTO.setBody(responseRoomEnterDto);
        responseDTO.setMessage("정상적으로 투표하였습니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }


}
