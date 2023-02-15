package com.agora.server.sse.controller;

<<<<<<< HEAD
import com.agora.server.room.service.RoomService;
=======
>>>>>>> b1ee99de512bcc471e947ee321bcc09251784fa0
import com.agora.server.sse.service.PublishService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v2/")
public class SseController {

    private final PublishService publishService;

    @GetMapping(value = "room/subscribe/{roomId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connectRoom(@PathVariable String roomId) {
<<<<<<< HEAD
            SseEmitter sseEmitter = publishService.subscribe(roomId);
            return ResponseEntity.ok(sseEmitter);
=======
        SseEmitter sseEmitter = publishService.subscribe(roomId);
        return ResponseEntity.ok(sseEmitter);
>>>>>>> b1ee99de512bcc471e947ee321bcc09251784fa0
    }


}
