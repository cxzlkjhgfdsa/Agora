package com.agora.server.openvidu.config;

import io.openvidu.java.client.OpenVidu;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenViduConfig {

    @Value("${openvidu.hostname}")
    private String hostName;

    @Value("${openvidu.secret}")
    private String secret;

    @Bean
    public OpenVidu openVidu() {
        OpenVidu openVidu = new OpenVidu(hostName, secret);
        return openVidu;
    }
}
