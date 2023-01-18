package com.agora.server.user.service;

import com.agora.server.user.domain.User;
import com.agora.server.user.repository.GoogleUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class GoogleUserService {

    private final GoogleUserRepository googleUserRepository;

    public UUID join(User user){
        googleUserRepository.save(user);
        return user.getUser_id();
    }



}
