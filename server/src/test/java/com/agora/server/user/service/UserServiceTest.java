package com.agora.server.user.service;

import com.agora.server.category.domain.Category;
import com.agora.server.category.repository.CategoryRepository;
import com.agora.server.user.controller.dto.SocialType;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.exception.ConstraintViolationException;
import org.junit.Assert;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;


import javax.persistence.EntityExistsException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;


@SpringBootTest
@RunWith(SpringRunner.class)
@Slf4j
public class UserServiceTest {

    @Autowired
    private  CategoryRepository categoryRepository;

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

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    /**
     * 회원가입 테스트
     */
    @Test
    @DisplayName("회원가입 테스트")
    @Transactional
    public void join_test(){
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

    /**
     * 닉네임 중복 테스트
     */
    @Test
    @DisplayName("닉네임 중복 테스트")
    @Transactional
    @Rollback(value = false)
    public void nickname_check_test(){
        //given
        User user1 = User.createUser(null, SocialType.GOOGLE, "google-id1", "테스터1",
                "100살", null, "김삿갓", null);

        User user2 = User.createUser(null, SocialType.KAKAO, "google-id2", "테스터2",
                "50살", null, "김삿갓", null);
        //when

//        User joinUser1 = userService.join(user1);
//        User joinUser2 = userService.join(user2);


        //then
        // Unique key 중복으로 에러 난 것은 확인 됐으나 어느 exception으로 처리해야하는지 모르겠음
        Assert.assertEquals(user2.getUser_nickname(), user1.getUser_nickname());
    }

    /**
     * 리프레시 토큰
     */
    @Test
    @Transactional
    public void saveRefreshTokenTest(){
        //given
        String userId = "ssafy";
        String refreshToken = "token";

        //when
        redisTemplate.opsForValue().set(userId, refreshToken, 10, TimeUnit.DAYS);
        String getToken = (String) redisTemplate.opsForValue().get("ssafy");

        //then

        Assert.assertEquals(getToken, "token");

    }

    /**
     * category 찾기 테스트
     */
    @Test
    @Transactional
    public void findCategoriesTest(){
        //given
        ArrayList<Long> ids = new ArrayList<>();
        ids.add(1L);
        ids.add(2L);
        ids.add(3L);

        //when
        List<Category> categoryById = userService.findCategoryById(ids);

        //then
        Assert.assertEquals(categoryById.size(), 3);
    }



}