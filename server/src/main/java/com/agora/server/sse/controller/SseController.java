package com.agora.server.sse.controller;

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
        SseEmitter sseEmitter = publishService.subscribe(roomId);
        System.out.println("요청옴");
        return ResponseEntity.ok(sseEmitter);
    }

//    @PostMapping(value = "sse/test")
//    public ResponseEntity<Void> count() {
//        publishService.publishmessage();
//        return ResponseEntity.ok().build();
//    }

}