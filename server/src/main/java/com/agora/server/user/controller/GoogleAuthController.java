package com.agora.server.user.controller;

import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.user.controller.dto.CommonDto;
import com.agora.server.user.controller.dto.LoginResponseDto;
import com.agora.server.user.controller.dto.SocialType;
import com.agora.server.user.controller.dto.google.GoogleOAuthToken;
import com.agora.server.user.domain.User;
import com.agora.server.user.exception.AlreadyExistUserException;
import com.agora.server.user.exception.NoUserException;
import com.agora.server.user.repository.GoogleUserRepository;
import com.agora.server.user.service.GoogleAuthService;
import com.agora.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class GoogleAuthController {

    private final GoogleAuthService googleOAuthService;
    private final UserService userService;
    private final GoogleUserRepository googleUserRepository;

    // 프론트단에서 처리 할 예정
    @GetMapping("request/auth/login/google")
    public void googleLoginRedirect() throws IOException {
        googleOAuthService.loginRequest();
    }

    @GetMapping("request/auth/join/google")
    public void googleJoinRedirect() throws IOException {
        googleOAuthService.joinRequest();
    }

    @ResponseBody
    @GetMapping(value = "request/auth/login/google/callback")
    public ResponseEntity<ResponseDTO> googleLoginCallback(
            @RequestParam(name = "code") String code)throws IOException{
        // 토큰 받기
        GoogleOAuthToken googleOAuthToken = googleOAuthService.getGoogleLoginOAuthToken(code);
        // 유저정보 받기
        CommonDto googleUser = googleOAuthService.getGoogleUserInfo(googleOAuthToken);

        User joinedUser = userService.checkDuplicateUser(googleUser.getSocial_id(), SocialType.GOOGLE);


        // 가입이 안되어있는 유저 -> RuntimeException 발생 -> Exception 후에 커스텀으로 만들면 교체
        if(joinedUser == null) {
            throw new NoUserException("가입되지 않은 회원입니다 회원가입 페이지로 이동합니다");
        }

        ResponseDTO res = new ResponseDTO();

        // LoginResponseDto 정보 받기
        // userService에 넣어 두는 것도 생각해보기
        LoginResponseDto loginRes = new LoginResponseDto();
        loginRes.setAccessToken("null");
        loginRes.setUserId(joinedUser.getUser_id());
        loginRes.setUserPhoto(joinedUser.getUser_photo());
        loginRes.setUserNickname(joinedUser.getUser_nickname());
        loginRes.setSocialType(joinedUser.getUser_social_type());

        // 가입이 되어있는 유저 -> 정상코드와 ResponseLoginDto 반환
        res.setState(true);
        res.setBody(loginRes);
        res.setMessage("ok");
        res.setStatusCode(200);

        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

    @ResponseBody
    @GetMapping(value = "request/auth/join/google/callback")
    public ResponseEntity<ResponseDTO> googleJoinCallback(
            @RequestParam(name = "code") String code)throws IOException{


        // 토큰 받기
        GoogleOAuthToken googleOAuthToken = googleOAuthService.getGoogleJoinOAuthToken(code);
        // 유저정보 받기
        CommonDto googleUser = googleOAuthService.getGoogleUserInfo(googleOAuthToken);

        User dupUser = userService.checkDuplicateUser(googleUser.getSocial_id(), SocialType.GOOGLE);

        // 가입되어 있는 유저 -> RuntimeException 발생 -> Exception 후에 커스텀으로 만들면 교체
        if(dupUser != null) {
            throw new AlreadyExistUserException("이미 가입되어 있습니다 로그인 페이지로 이동합니다");
        }

        ResponseDTO res = new ResponseDTO();

        // 가입되어 있지 않은 유저 -> 정상 코드와 CommonDto 반환
        res.setState(true);
        res.setBody(googleUser);
        res.setMessage("ok");
        res.setStatusCode(200);
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }
}
