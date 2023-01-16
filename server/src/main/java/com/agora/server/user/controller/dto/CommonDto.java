package com.agora.server.user.controller.dto;
import lombok.Getter;


@Getter
public class CommonDto {
    private String email;
    private String nickname;
    private String phone;

    public void createCommonDto(String email, String nickname, String phone){
        this.email = email;
        this.nickname = nickname;
        this.phone = phone;
    }
}
