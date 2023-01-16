package com.agora.server;

import com.agora.server.config.EnvConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.PropertySource;


@SpringBootApplication(exclude={SecurityAutoConfiguration.class})
@PropertySource(value = {
        "classpath:env/env.yml",
        "classpath:env/env-key.yml",
        "classpath:application-local.yml",
        "classpath:application-dev.yml",
        "classpath:application-prod.yml"
}, factory = EnvConfig.class)
public class ServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

}
