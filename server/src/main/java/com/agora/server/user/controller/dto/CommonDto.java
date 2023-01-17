package com.agora.server.user.controller.dto;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CommonDto {
    private String social_id;
    private String email;
    private String phone;
    private SocialType socialType;
    private String profile;

    public CommonDto() {
    }

    public CommonDto(String social_id, String email, String phone, SocialType socialType, String profile) {
        this.social_id = social_id;
        this.email = email;
        this.phone = phone;
        this.socialType = socialType;
        this.profile = profile;
    }
}
