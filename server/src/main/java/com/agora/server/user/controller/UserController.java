package com.agora.server.user.controller;

import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.user.controller.dto.RequestJoinDto;
import com.agora.server.user.domain.User;
import com.agora.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
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
        User joinUser = User.createUser(requestJoinDto.getUser_social_type(), requestJoinDto.getUser_social_id()
        ,requestJoinDto.getUser_name(),requestJoinDto.getUser_age(), requestJoinDto.getUser_phone(),
                requestJoinDto.getUser_nickname(), requestJoinDto.getUser_photo());

        userService.join(joinUser);

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setMessage("회원가입에 성공하셨습니다");
        return responseDTO;
    }

}
