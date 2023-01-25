package com.agora.server.encrypt.controller;

import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.encrypt.repository.EncryptionRepository;
import com.agora.server.encrypt.service.EncryptService;
import com.agora.server.user.controller.dto.RequestJoinDto;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TestEncryptController {
    private final EncryptService encryptService;
    private final UserRepository userRepository;
    private final EncryptionRepository encryptionRepository;

    @PostMapping("encrytp/insert")
    public ResponseDTO userJoin(@RequestBody RequestJoinDto requestJoinDto) throws Exception {
        String encryptedUserName = encryptService.getEncryptedUserName(requestJoinDto);

        User joinUser = User.createUser(requestJoinDto.getUser_social_type(), requestJoinDto.getUser_social_id()
                , encryptedUserName, requestJoinDto.getUser_age(), requestJoinDto.getUser_phone(),
                requestJoinDto.getUser_nickname(), requestJoinDto.getUser_photo());

        userRepository.save(joinUser);

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setMessage("회원가입에 성공하셨습니다");
        return responseDTO;
    }

    @PostMapping("encrypt/find")
    public ResponseDTO getEncryptUserName(@RequestParam String userSocialId) throws Exception {

        User user = encryptionRepository.findByUser_security_id(userSocialId);
        String userName = encryptService.getUserName(user);
        ResponseDTO res = new ResponseDTO();
        res.setMessage(userName);
        return res;
    }

}
