package com.agora.server.user.service;

import com.agora.server.user.controller.dto.SocialType;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    /**
     * SocialType 과 Social측에서 제공하는 고유 ID를 통해 회원가입 되어있는 유저인지 확인
     * @param socialId
     * @param socialType
     * @return
     */
    public User checkDuplicateUser(String socialId, SocialType socialType){
        return userRepository.checkDuplicateUser(socialId, socialType);
    }

    public void join(User joinUser) {
        userRepository.save(joinUser);
    }
}
