package com.agora.server.user.service;

import com.agora.server.user.controller.dto.SocialType;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {

    @Autowired
    UserRepository userRepository;

    @Test
    @Transactional
    public void userCheck(){
        User user1 = new User();
        user1.createUser(SocialType.KAKAO, "12345","이승헌", null, null, null, null, null);
        userRepository.save(user1);
        User findUser = userRepository.findSocialUser("12345", SocialType.KAKAO);
        //유저 정보 저장이 잘 되었는지 확인
        Assert.assertEquals(user1, findUser);
        User user2 = new User();
        user2.createUser(SocialType.KAKAO, "12345","김승헌", null, null, null, null, null);
        User findUser2 = userRepository.findSocialUser(user2.getUser_social_id(), user2.getUser_social_type());
        // 중복 유저 감지 확인
        Assert.assertNotNull(findUser2);
    }

}