package com.agora.server.user.controller;

import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.user.controller.dto.RequestJoinDto;
import com.agora.server.user.domain.User;
import com.agora.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    /**
     *  RequestBody로 회원가입자의 정보를 받아옴
     *  회원가입을 위한 메소드
     * @param requestJoinDto
     * @return 회원가입이 정상적으로 실행되었다는 메세지를 보냄
     */
    @PostMapping("user/join")
    public ResponseDTO userJoin(@RequestBody RequestJoinDto requestJoinDto){
        ResponseDTO responseDTO = new ResponseDTO();

        User DuplicationUser = userService.findUserByPhone(requestJoinDto.getUser_phone());
        if(DuplicationUser != null){
            responseDTO.setMessage("이미 등록된 회원번호 입니다");
            return responseDTO;
        }

        User joinUser = User.createUser(requestJoinDto.getUser_social_type(), requestJoinDto.getUser_social_id()
        ,requestJoinDto.getUser_name(),requestJoinDto.getUser_age(), requestJoinDto.getUser_phone(),
                requestJoinDto.getUser_nickname(), requestJoinDto.getUser_photo());
        userService.join(joinUser);


        responseDTO.setMessage("회원가입에 성공하셨습니다");
        return responseDTO;
    }

    @PostMapping("check/nickname")
    public ResponseDTO checkNickname(@RequestBody String nickname) {
        ResponseDTO responseDTO = new ResponseDTO();

        User findUser = userService.findUserByNickname(nickname);
        if(findUser==null){
            responseDTO.setMessage("사용 가능한 닉네임입니다");
            responseDTO.setState(true);
        }else{
            responseDTO.setMessage("이미 사용중인 닉네임입니다");
            responseDTO.setState(false);
        }
        return null;
    }

    /**
     * 로그인 메소드 구현
     * @param user_id
     * @return
     */
    @PostMapping("user/login")
    public ResponseDTO login(@RequestBody UUID user_id){
        return null;
    }

    /**
     * 로그아웃 메소드 구현
     */
    @PostMapping("user/logout")
    public void logout(){
        //토큰 만료, 
        // 카카오,네이버는 자체 토큰 만료 가능
        // 구글은 생각해봐야함
    }


    /**
     * 인증 테스트
     * @return
     */
    @GetMapping("moon")
    public String moon(){
        return "moon";
    }

    /**
     * 인증 테스트
     * @return
     */
    @GetMapping("/room")
    public String room(){
        return "room";
    }

}
