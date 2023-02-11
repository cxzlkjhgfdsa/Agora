package com.agora.server.debatehistory.controller;

import com.agora.server.auth.dto.UserAuthenticateInfo;
import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.debatehistory.domain.DebateHistory;
import com.agora.server.debatehistory.dto.RequestSaveHistoryDto;
import com.agora.server.debatehistory.dto.ResponseHistoryInfoDto;
import com.agora.server.debatehistory.service.DebateHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
@RequestMapping("api/v1/debate/history")
public class DebateHistoryController {

    private final DebateHistoryService debateHistoryService;

//    /**
//     * 토론 결과를 저장하는 메소드 (필요한 정보를 Redis, RoomRepository 등에서 불러옴)
//     * @param requestSaveHistoryDto
//     * @return
//     */
//    @PostMapping("save")
//    public ResponseEntity<ResponseDTO> saveDebateHistory(@RequestBody RequestSaveHistoryDto requestSaveHistoryDto){
//        ResponseDTO responseDTO = new ResponseDTO();
//        if(requestSaveHistoryDto.checkRoomState()){
//            // 토론을 진행한 방인지 아닌지 확인
//        }
//        // roomId 로 roomRepository 와 Redis에서 정보 받아옴
//
//        //받은 정보들 바탕으로 토론 결과 생성
//
//
//        //DB에 저장
//
//        responseDTO.setState(true);
//        responseDTO.setMessage("정상 저장 완료");
//
//        return ResponseEntity.ok(responseDTO);
//    }

    /**
     *  추후 회원 정보 조회 페이지가 생긴다면 자신의 토론 내역을 조회하기 위한 메소드 userId를 기준으로 검색한다
//     * @param userInfo -> Accesstoken에서 유저 정보 추출후 스프링 시큐리티 세션에 올라가있는 정보를 가져=
     * @return
     */
    @GetMapping("list")
    public ResponseEntity<ResponseDTO> getDebateHistory(@AuthenticationPrincipal UserAuthenticateInfo userInfo){
//    public ResponseEntity<ResponseDTO> getDebateHistory(String userId){

        ResponseDTO responseDTO = new ResponseDTO();

        List<DebateHistory> histories = debateHistoryService.findByUserId(userInfo.getUserId());
        
        // 테스트용
        // List<DebateHistory> histories = debateHistoryService.findByUserId(userId);

        List<ResponseHistoryInfoDto> result = histories.stream()
                                .map(o -> new ResponseHistoryInfoDto(o))
                                .collect(Collectors.toList());

        responseDTO.setBody(result);

        return ResponseEntity.ok(responseDTO);
    }
}
