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


    public User findUser(String socialId, SocialType socialType) {
        return userRepository.findSocialUser(socialId, socialType);
    }

}
