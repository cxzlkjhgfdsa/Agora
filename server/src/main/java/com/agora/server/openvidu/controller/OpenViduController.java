package com.agora.server.openvidu.controller;

import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.openvidu.service.OpenViduService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v2/openvidu")
public class OpenViduController {
    private final OpenViduService openViduService;

    /**
     * 추후 요구 스펙에 맞게 개발 예정
     */

    @GetMapping("create/session")
    public void createSession(@RequestParam Long roomId) throws OpenViduJavaClientException, OpenViduHttpException {
        openViduService.createSession(roomId);
    }

    @GetMapping("enter/session")
    public ResponseEntity<ResponseDTO> enterSession(@RequestParam Long roomId) throws OpenViduJavaClientException, OpenViduHttpException {
        ResponseDTO responseDTO = new ResponseDTO();
        String token = openViduService.enterSession(roomId);
        responseDTO.setBody(token);

        return ResponseEntity.ok(responseDTO);
    }

<<<<<<< HEAD

=======
>>>>>>> b1ee99de512bcc471e947ee321bcc09251784fa0
}
