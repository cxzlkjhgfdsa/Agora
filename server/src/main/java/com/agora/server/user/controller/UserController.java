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

    /**
     * 로그아웃 메소드 구현
     */
    @GetMapping("user/logout")
    public void logout(){
        //토큰 만료, 
        // 카카오,네이버는 자체 토큰 만료 가능
        // 구글은 생각해봐야함
    }

}
