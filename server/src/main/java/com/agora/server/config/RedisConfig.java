package com.agora.server.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisPassword;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Configuration
public class RedisConfig {

    @Value("${spring.redis.host}")
    private String host;

    @Value("${spring.redis.port}")
    private int port;

    @Value("${spring.redis.password}")
    private String pass;

    @Bean
    public RedisConnectionFactory redisConnectionFactory(){
        RedisStandaloneConfiguration redisConfig = new RedisStandaloneConfiguration(host, 6379);
        redisConfig.setPassword(RedisPassword.of(pass));
        LettuceClientConfiguration lettuceClientConfiguration = LettuceClientConfiguration.builder().build();
        return new LettuceConnectionFactory(redisConfig, lettuceClientConfiguration);
    }


    @Bean
    public RedisTemplate<?, ?> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);

        Jackson2JsonRedisSerializer<Object> serializer = new Jackson2JsonRedisSerializer<>(Object.class);
        ObjectMapper mapper = new ObjectMapper();
        mapper.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        serializer.setObjectMapper(mapper);

        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(serializer);
        return template;
    }


    @Bean
    RedisMessageListenerContainer redisMessageListenerContainer(LettuceConnectionFactory lettuceConnectionFactory) {
        RedisMessageListenerContainer redisMessageListenerContainer = new RedisMessageListenerContainer();
        redisMessageListenerContainer.setConnectionFactory(lettuceConnectionFactory);
        return redisMessageListenerContainer;
    }

    @Bean
    ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

    @Bean
    Map<String, List<SseEmitter>> roomEmitterMap() {
        return new ConcurrentHashMap<>();
    }
}
