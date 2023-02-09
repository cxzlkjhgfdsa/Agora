package com.agora.server.openvidu.config;

import io.openvidu.java.client.OpenVidu;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenViduConfig {

    @Bean
    public OpenVidu openVidu() {
        OpenVidu openVidu = new OpenVidu("http://i8a705.p.ssafy.io:4443/", "MY_SECRET");
        return openVidu;
    }
}
