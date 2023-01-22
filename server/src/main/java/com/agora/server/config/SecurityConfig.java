package com.agora.server.config;

import com.agora.server.auth.filter.JwtAuthenticationFilter;
import com.agora.server.auth.provider.JwtTokenProvider;
import com.agora.server.config.filter.CorsFilterConfig;
import com.agora.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CorsFilterConfig corsFilter;
    @Value("${jwt.secret}")
    private String jwtSecret;


    @Bean
    protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http
                .addFilter(corsFilter.corsFilter())
                .csrf().disable()
                .httpBasic().disable()
                .addFilterBefore(new JwtAuthenticationFilter(new JwtTokenProvider(jwtSecret)), UsernamePasswordAuthenticationFilter.class)
                .antMatcher("/valide/**");
        return http.build();
    }
}
