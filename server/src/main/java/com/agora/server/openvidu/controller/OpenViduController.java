package com.agora.server.openvidu.controller;

import com.agora.server.openvidu.service.OpenViduService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v2/openvidu")
public class OpenViduController {
    private final OpenViduService openViduService;

    /**
     * 추후 요구 스펙에 맞게 개발 예정
     */

}
