package com.agora.server.room.controller;

import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.debatehistory.service.DebateHistoryService;
import com.agora.server.file.service.FileService;
import com.agora.server.room.controller.dto.RequestDebateStartDto;
import com.agora.server.room.controller.dto.RequestRoomEnterAsDebaterDto;
import com.agora.server.room.controller.dto.debate.RequestCardOpenDto;
import com.agora.server.room.controller.dto.debate.RequestPhaseStartDto;
import com.agora.server.room.controller.dto.debate.RequestSkipDto;
import com.agora.server.room.controller.dto.debate.RequestVoteStartDto;
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
     * @param requestRoomEnterDto
     */
    @PutMapping("debate/ready")
    public ResponseEntity<ResponseDTO> changeReadyState(@RequestBody RequestRoomEnterAsDebaterDto requestRoomEnterDto){
        debateService.ready(requestRoomEnterDto);
        ResponseDTO responseDTO = new ResponseDTO();
//        responseDTO.setBody(responseRoomEnterDto);
        responseDTO.setMessage("레디 성공");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

    /**
     * 대기방에서 Ready 취소 누르는 API
     * @param requestRoomEnterDto
     */
    @PutMapping("debate/unready")
    public void changeUnreadyState(@RequestBody RequestRoomEnterAsDebaterDto requestRoomEnterDto){
        debateService.unready(requestRoomEnterDto);
    }

    /**
     * 대기방에서 Start 버튼 누르는 API
     */
    @PutMapping("debate/start")
    public void startDebate(@RequestBody RequestDebateStartDto requestDebateStartDto){
        debateService.startDebate(requestDebateStartDto);
        roomService.roomStart(requestDebateStartDto.getRoomId());
    }

    @PutMapping("debate/phasestart")
    public ResponseEntity<ResponseDTO> phaseStart(@RequestBody RequestPhaseStartDto requestPhaseStartDto){
        debateService.startPhase(requestPhaseStartDto);
        ResponseDTO responseDTO = new ResponseDTO();
//        responseDTO.setBody(responseRoomEnterDto);
        responseDTO.setMessage(requestPhaseStartDto.getUserNickname()+"님 페이즈 시작하였습니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

    @PutMapping("debate/phaseskip")
    public ResponseEntity<ResponseDTO> phaseSkip(@RequestBody RequestSkipDto requestSkipDto){
        debateService.skipPhase(requestSkipDto);
        ResponseDTO responseDTO = new ResponseDTO();
//        responseDTO.setBody(responseRoomEnterDto);
        responseDTO.setMessage(requestSkipDto.getUserNickname()+"님 페이즈 스킵하였습니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

    @PutMapping("debate/votestart")
    public ResponseEntity<ResponseDTO> voteStart(@RequestBody RequestVoteStartDto requestVoteStartDto){
        debateService.startVote(requestVoteStartDto);
        if(requestVoteStartDto.getVotePhase()==3){

//            debateHistoryService
        }
        ResponseDTO responseDTO = new ResponseDTO();
//        responseDTO.setBody(responseRoomEnterDto);
        responseDTO.setMessage(requestVoteStartDto.getVotePhase()+"페이즈 투표 시작합니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

    @PostMapping("debate/cardopen")
    public ResponseEntity<ResponseDTO> cardOpen(@RequestBody RequestCardOpenDto requestCardOpenDto){
        debateService.cardOpen(requestCardOpenDto.getUserIdx(), requestCardOpenDto.getCardIdx(), requestCardOpenDto.getUserTeam(), requestCardOpenDto.getRoomId());
        ResponseDTO responseDTO = new ResponseDTO();
//        responseDTO.setBody(responseRoomEnterDto);
        responseDTO.setMessage("카드 오픈되었습니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

}
