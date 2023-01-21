package com.agora.server.auth.dto;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class JwtAuthenticationDto extends AbstractAuthenticationToken {
    private String accessToken;

    public JwtAuthenticationDto(String accessToken) {
        super(null);
        this.setAuthenticated(false);
        this.accessToken = accessToken;
    }

    @Override
    public Object getCredentials() {
        return "";
    }

    /**
     * 인증 전이므로 token을 그대로 반환
     *
     * @return
     */
    @Override
    public Object getPrincipal() {
        return accessToken;
    }
}
