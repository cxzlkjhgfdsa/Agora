package com.agora.server.openvidu.config;

import io.openvidu.java.client.OpenVidu;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenViduConfig {

    @Bean
    public OpenVidu openVidu() {
        OpenVidu openVidu = new OpenVidu("https://openvidutest.duckdns.org", "ssafy705");
        return openVidu;
    }
}
