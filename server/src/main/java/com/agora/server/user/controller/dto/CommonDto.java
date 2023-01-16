package com.agora.server.user.controller.dto;
import lombok.Getter;


@Getter
public class CommonDto {
    private String social_id;
    private String email;
    private String phone;

    private SocialType socialType;

    public void createCommonDto(String social_id, String email,  String phone, SocialType socialType){
        this.social_id = social_id;
        this.email = email;
        this.phone = phone;
        this.socialType=socialType;
    }
}
