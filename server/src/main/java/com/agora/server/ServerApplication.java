package com.agora.server;

import com.agora.server.config.EnvConfig;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.PropertySource;

import javax.persistence.EntityManager;


@SpringBootApplication
@PropertySource(value = {
        "classpath:env/env.yml",
        "classpath:env/env-key.yml",
        "classpath:application.yml",
        "classpath:application-dev.yml",
        "classpath:application-prod.yml"
}, factory = EnvConfig.class)
@EnableAspectJAutoProxy
public class ServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    @Bean
    JPAQueryFactory jpaQueryFactory(EntityManager em){
        return new JPAQueryFactory(em);
    }

}
