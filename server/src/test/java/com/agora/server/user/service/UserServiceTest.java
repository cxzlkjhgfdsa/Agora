package com.agora.server.user.service;

import com.agora.server.user.controller.dto.SocialType;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import org.hibernate.exception.ConstraintViolationException;
import org.junit.Assert;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLIntegrityConstraintViolationException;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class UserServiceTest {

    @Autowired
    UserRepository userRepository;

    @Test
    @Rollback(value = false)
    public void userCheck(){
        User user1 = User.createUser(SocialType.KAKAO, "12345", "이승헌",
                "2000-08-21","010-1111-1111", "감자", "123");

        userRepository.save(user1);
        User findUser = userRepository.checkDuplicateUser("12345", SocialType.KAKAO);
        // 회원가입 정상 작동 확인
        assertEquals(user1, findUser);
        
        User user2 = User.createUser(SocialType.KAKAO, "14444", "김승헌",
                "2000-08-21","010-2222-2222", "감자", "123");
        // 닉네임 중복 막히는지 확인

        //userRepository.save(user2); //중복되면 에러 나긴 하는데 무슨 에러나는지 모르겠음 진짜로
        //userRepository.save(user2);

    }

}