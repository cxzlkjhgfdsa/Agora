package com.agora.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;

@Configuration
public class DebateScheduleConfig {

    @Bean
    public Map<Long, ScheduledFuture<?>> scheduledFutures(){
        return new ConcurrentHashMap<>();
    }

}
