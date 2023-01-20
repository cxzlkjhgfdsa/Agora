package com.agora.server.config.controller;

import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.auth.util.AccessTokenUtil;
import com.agora.server.auth.exception.JwtInvalidException;
import com.agora.server.user.controller.dto.SocialType;
import com.agora.server.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class JwtTestController {

    @Value("${jwt-config.secret}")
    private String jwtSecret;

    @Value("${oauth.naver.redirect.header}")
    private String getRedirectHeader;

    @Value("${oauth.naver.redirect.header-value}")
    private String getRedirectHeaderValue;

    @Value("${jwt-config.header-prefix}")
    private String headerPrefix;

    private final AccessTokenUtil accessTokenUtil;


    @GetMapping("jwttest")
    public void jwttest() {
        System.out.println(headerPrefix + ": ");
        System.out.println(getRedirectHeader);
        System.out.println(getRedirectHeaderValue);
        throw new JwtInvalidException("jwt test error");
    }

    @GetMapping("jwtdto")
    public ResponseEntity<ResponseDTO> jwtDto() {
        String accessToken = accessTokenUtil.createAccessToken(UUID.fromString(UUID.randomUUID().toString()), SocialType.GOOGLE.toString());
        ResponseDTO res = new ResponseDTO();
        res.setBody(accessToken);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("jwt")
    public ResponseEntity<ResponseDTO> jwtGetmapping(@RequestParam UUID id) {
        String accessToken = accessTokenUtil.createAccessToken(UUID.fromString(UUID.randomUUID().toString()), SocialType.GOOGLE.toString());
        ResponseDTO res = new ResponseDTO();
        res.setMessage(accessToken);
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

    @GetMapping("room")
    public ResponseEntity<ResponseDTO> room(HttpServletRequest req) {
        if (req.getAttribute("error") != null) {
            ResponseDTO res = (ResponseDTO) req.getAttribute("error");
            throw new JwtInvalidException(res.getMessage());
        }
        User user = (User) req.getAttribute("user");
        ResponseDTO res = new ResponseDTO();
        res.setBody(user);
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }
}
