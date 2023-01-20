package com.agora.server.auth.provider;

import com.agora.server.auth.dto.UserAccessTokenInfo;
import com.agora.server.auth.util.AccessTokenUtil;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class JwtAuthenticationProvider implements AuthenticationProvider {
    private final AccessTokenUtil accessTokenUtil;
    private final UserRepository userRepository;
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        // 사전 처리 토큰 받기
        String token = (String) authentication.getPrincipal();
        try {
            UserAccessTokenInfo userInfo = accessTokenUtil.getUserInfo(token);
            User user = userRepository.findByUserAccessTokenInfo(userInfo.getId(), userInfo.getSocialType());
            return new
        }
        return null;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return false;
    }
}
