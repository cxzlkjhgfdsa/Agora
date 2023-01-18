package com.agora.server.user.controller;

import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.user.controller.dto.CommonDto;
import com.agora.server.user.controller.dto.LoginResponseDto;
import com.agora.server.user.domain.User;
import com.agora.server.user.exception.AlreadyExistUserException;
import com.agora.server.user.exception.NoUserException;
import com.agora.server.user.service.KakaoAuthService;
import com.agora.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class KakaoAuthController {

    private final KakaoAuthService kakaoAuthService;
    private final UserService userService;

    /**
     * 추후 클라이언트 코드로 변경 후 삭제 예정
     * @throws IOException
     */
    @GetMapping("request/join/auth/kakao")
    public void kakaoLoginRedirect() throws IOException {
        kakaoAuthService.joinRequest();
    }

    /**
     * 회원가입 요청을 리다이렉트 받은 메소드
     * @param code : 유저 토큰을 받기 위한 code
     */
    @GetMapping("join/auth/kakao")
    public ResponseDTO kakaoJoin(@RequestParam String code) throws IOException {
        String token = kakaoAuthService.getKakaoToken(code);
        System.out.println(code);
        // 유저 확인
        CommonDto kakaoUserInfo = kakaoAuthService.getKakaoUserInfo(token);
        // 이미 회원가입 되어있는지 확인
        User user = userService.checkDuplicateUser(kakaoUserInfo.getSocial_id(), kakaoUserInfo.getSocialType());
        ResponseDTO responseDTO = new ResponseDTO();
        if(user!=null){
            throw new AlreadyExistUserException("이미 회원가입된 사용자입니다");
        }else{
            //회원가입 하기위한 정보 리턴
            responseDTO.setState(true);
            responseDTO.setBody(kakaoUserInfo);
            responseDTO.setMessage("회원가입 하기 위한 추가정보 입력 바랍니다");
            return responseDTO;
        }

    }

    /**
     * 로그인 처리 메소드
     * @param code
     * @return
     * @throws IOException
     */
    @GetMapping("kakao/login")
    public ResponseDTO kakaoLogin(@RequestParam String code) throws IOException {
        String token = kakaoAuthService.getKakaoToken(code);
        CommonDto userInfo = kakaoAuthService.getKakaoUserInfo(token);
        ResponseDTO responseDTO = new ResponseDTO();

        User user = userService.checkDuplicateUser(userInfo.getSocial_id(), userInfo.getSocialType());

        if(user == null){
            //예외 발생
            throw new NoUserException("회원가입 되어있지 않은 사용자입니다");
        }
        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setUserId(user.getUser_id());
        loginResponseDto.setUserNickname(user.getUser_nickname());
        loginResponseDto.setSocialType(user.getUser_social_type());
        loginResponseDto.setUserPhoto(user.getUser_photo());
        // access Token 발급 후 set

        responseDTO.setBody(loginResponseDto);
        responseDTO.setStatusCode(200);
        responseDTO.setMessage("로그인 성공");
        responseDTO.setState(true);

        return responseDTO;
    }

    /**
     * 추후 삭제 예정
     * @return
     */
    @GetMapping("kakao/logout")
    public String logoutPage(){
        return "로그아웃 성공";
    }

    


}
