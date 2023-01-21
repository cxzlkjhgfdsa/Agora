package com.agora.server.auth.dto;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;

public class JwtPostAuthenticationToken extends AbstractAuthenticationToken {
    private final UserAccessTokenInfo userAccessTokenInfo;

    public JwtPostAuthenticationToken(UserAccessTokenInfo userAccessTokenInfo) {
        super(Collections.singleton(new SimpleGrantedAuthority(userAccessTokenInfo.getId().toString())));
        this.userAccessTokenInfo = userAccessTokenInfo;
        this.setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return userAccessTokenInfo;
    }
}
