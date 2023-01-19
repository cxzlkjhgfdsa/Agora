package com.agora.server.user.domain;

import com.agora.server.user.controller.dto.SocialType;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.UUID;


@SpringBootTest
@RunWith(SpringRunner.class)
public class UserTest {

    @Autowired
    EntityManager entityManager;

    @Test
    @Transactional
    @Rollback(value = false)
    public void saveUser(){
        User user = User.createUser(SocialType.GOOGLE, "1", "1", "1", "1", "1", "1");
        entityManager.persist(user);
        UUID uuid = user.getUser_id();
        User findUser = entityManager.find(User.class, uuid);
        System.out.println(findUser.getUser_id());
        Assert.assertEquals(user, findUser);
    }

}