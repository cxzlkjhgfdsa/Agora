package com.agora.server.debatehistory.controller;

import com.agora.server.auth.dto.UserAuthenticateInfo;
import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.debatehistory.domain.DebateHistory;
import com.agora.server.debatehistory.dto.RequestSaveHistoryDto;
import com.agora.server.debatehistory.dto.ResponseHistoryInfoDto;
import com.agora.server.debatehistory.service.DebateHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
@RequestMapping("api/v2/debate/history")
public class DebateHistoryController {

    private final DebateHistoryService debateHistoryService;


    /**
     *  추후 회원 정보 조회 페이지가 생긴다면 자신의 토론 내역을 조회하기 위한 메소드 userId를 기준으로 검색한다
     * @param userInfo -> Accesstoken에서 유저 정보 추출후 스프링 시큐리티 세션에 올라가있는 정보를 가져=
     * @return
     */
    @GetMapping("list")
    public ResponseEntity<ResponseDTO> getDebateHistoryPages(@AuthenticationPrincipal UserAuthenticateInfo userInfo, Pageable pageable){

        Page<ResponseHistoryInfoDto> debateHistoryPage = debateHistoryService.findByUserId(userInfo.getUserId(), pageable);

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setBody(debateHistoryPage);
        responseDTO.setMessage("토론 기록 전체 결과입니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }
}
