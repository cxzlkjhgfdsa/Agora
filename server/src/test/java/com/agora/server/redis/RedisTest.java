package com.agora.server.redis;


import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.test.annotation.Commit;
import org.springframework.test.context.junit4.SpringRunner;


@SpringBootTest
@RunWith(SpringRunner.class)
public class RedisTest {

    @Autowired
    RedisTemplate<String, Object> redisTemplate;

    @Test
    public void saveUser(){
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        String key = "stringKey";

        // when
        valueOperations.set(key, "hello");

        // then
        String value = (String)valueOperations.get(key);
        Assert.assertEquals(value, "hello");
    }
}
