package com.agora.server.oauth.principal;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

public class PrincipalDetails implements UserDetails, OAuth2User {


    private String userId;
    private String socialType;
    private String nickname;
    private String profile;
    private Map<String, Object> attributes;

    public PrincipalDetails() {
    }

    public PrincipalDetails(String userId, String socialType, String nickname, String profile) {
        this.userId = userId;
        this.socialType = socialType;
        this.nickname = nickname;
        this.profile = profile;

    }


    public static PrincipalDetails create(OAuthUserPrincipalDto user) {
        return new PrincipalDetails(
                user.getUserId(),
                user.getUserSocialType(),
                user.getUserNickName(),
                user.getUserPhotoUrl()
        );
    }

    public static PrincipalDetails create(OAuthUserPrincipalDto user, Map<String, Object> attributes) {
        PrincipalDetails principalDetails = PrincipalDetails.create(user);
        principalDetails.setAttributes(attributes);
        return principalDetails;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getSocialType() {
        return socialType;
    }

    public void setSocialType(String socialType) {
        this.socialType = socialType;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getName() {
        return this.nickname;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return this.nickname;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return this.attributes;
    }
}
