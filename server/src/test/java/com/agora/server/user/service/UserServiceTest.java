package com.agora.server.user.service;

import com.agora.server.category.domain.Category;
import com.agora.server.category.repository.CategoryRepository;
import com.agora.server.user.controller.dto.SocialType;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import org.checkerframework.checker.units.qual.C;
import org.junit.Assert;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Component;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;

import java.util.Optional;

import static org.junit.Assert.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class UserServiceTest {

    @Autowired
    private CategoryRepository categoryRepository;

    @BeforeEach
    public void Init(){
        for(int i=0; i<10; i++){
            Category category = new Category();
            category.setCategory_name(i+" 아이템");
            category.setCategory_image(i+" img");
            categoryRepository.save(category);
        }

    }

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Test
    @DisplayName("회원가입 테스트")
    @Transactional
    public void joinTest(){
        //given
        User user = User.createUser(null, SocialType.GOOGLE, "google-id", "테스터1",
                "100살", null, "김삿갓", null);
        //when
        User joinUser = userService.join(user);
        Optional<User> findUser = userRepository.findById(joinUser.getUser_id());

        //then
        Assert.assertEquals("join 유저와, 생성유저 같은지 확인",joinUser, user);
        Assert.assertEquals("유저와, 영속성컨텍스트에서 찾은 유저 같은지 확인",user, findUser.get());
        Assert.assertEquals("join 유저와, 영속성컨텍스에서 찾은 유저 같은지 확인",findUser.get(), joinUser);
    }


}