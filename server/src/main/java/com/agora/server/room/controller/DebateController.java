package com.agora.server.room.controller;

import com.agora.server.room.controller.dto.RequestDebateStartDto;
import com.agora.server.room.controller.dto.RequestRoomEnterDto;
import com.agora.server.room.service.DebateService;
import com.agora.server.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/")
public class DebateController {

    private final RoomService roomService;
    private final DebateService debateService;

    /**
     * 대기방에서 Ready 누르는 API
     * @param requestRoomEnterDto
     */
    @PutMapping("debate/ready")
    public void changeReadyState(@RequestBody RequestRoomEnterDto requestRoomEnterDto){
        debateService.ready(requestRoomEnterDto);
    }

    /**
     * 대기방에서 Ready 취소 누르는 API
     * @param requestRoomEnterDto
     */
    @PutMapping("debate/unready")
    public void changeUnreadyState(@RequestBody RequestRoomEnterDto requestRoomEnterDto){
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

}
