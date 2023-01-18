package com.agora.server.config.controller;

import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.user.controller.dto.SocialType;
import com.agora.server.user.domain.User;
import com.agora.server.util.JwtAuthorizationUtil;
import com.agora.server.util.dto.UserAccessTokenInfo;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
public class JwtTestController {
    private final JwtAuthorizationUtil jwtAuthorizationUtil;

    @GetMapping("jwt")
    public ResponseEntity<ResponseDTO> jwtGetmapping() {
        String accessToken = jwtAuthorizationUtil.createAccessToken(1L, SocialType.GOOGLE.toString());
        ResponseDTO res = new ResponseDTO();
        res.setMessage(accessToken);
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

    @GetMapping("room")
    public ResponseEntity<ResponseDTO> room(HttpServletRequest req) {
        User user = (User) req.getAttribute("user");
        ResponseDTO res = new ResponseDTO();
        res.setBody(user);
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }
}
