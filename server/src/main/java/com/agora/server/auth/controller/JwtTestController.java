package com.agora.server.auth.controller;

import com.agora.server.auth.dto.AuthenticatedUserInfo;
import com.agora.server.auth.dto.UserAuthenticateInfo;
import com.agora.server.auth.provider.JwtTokenProvider;
import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.user.controller.dto.SocialType;
import com.agora.server.user.dto.LoginDTO;
import com.agora.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Slf4j
public class JwtTestController {
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    @GetMapping("create")
    public String createToken() throws NoSuchFieldException {
        return jwtTokenProvider.createAccessToken(UUID.randomUUID(), SocialType.GOOGLE);
    }

    @PostMapping("valide")
    public void validation(@AuthenticationPrincipal UserAuthenticateInfo userAccessTokenInfo, HttpServletRequest request) {
        log.info("validate exec");
        log.info(userAccessTokenInfo.getSocialType().toString());
    }

    @PostMapping("login")
    public ResponseEntity<ResponseDTO> login(@RequestBody LoginDTO loginDTO) throws NoSuchFieldException {
        ResponseDTO res = new ResponseDTO();
        AuthenticatedUserInfo login = userService.login(loginDTO);
        res.setBody(login);
        res.setState(true);
        res.setMessage("login success");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
