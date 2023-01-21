package com.agora.server.config;

import com.agora.server.auth.handler.JwtAuthenticationFailureHandler;
import com.agora.server.auth.provider.JwtAuthenticationProvider;
import com.agora.server.auth.util.AccessTokenUtil;
import com.agora.server.config.filter.CorsFilterConfig;
import com.agora.server.config.filter.JwtAuthenticateFilter;
import com.agora.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CorsFilterConfig corsFilter;
    private final AccessTokenUtil userToken;
    private final UserRepository userRepository;
    private final JwtAuthenticationProvider provider;
    private final JwtAuthenticationFailureHandler failureHandler;

   public JwtAuthenticateFilter jwtAuthenticationFilter(){

       JwtAuthenticateFilter jwtAuthenticateFilter = new JwtAuthenticateFilter("/room/**");
       jwtAuthenticateFilter.setAuthenticationManager(super.authenticationManager());

   }


    @Bean
    protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http
                .addFilter(corsFilter.corsFilter())
                .csrf().disable()
                .httpBasic().disable()

                .antMatcher("/room/**");

        return http.build();
    }
}
