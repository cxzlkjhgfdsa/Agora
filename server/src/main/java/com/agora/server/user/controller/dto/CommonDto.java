package com.agora.server.user.controller.dto;
import lombok.Getter;


@Getter
public class CommonDto {
    private String social_id;
    private String email;
    private String phone;

    public void createCommonDto(String social_id, String email,  String phone){
        this.social_id = social_id;
        this.email = email;
        this.phone = phone;
    }
}
