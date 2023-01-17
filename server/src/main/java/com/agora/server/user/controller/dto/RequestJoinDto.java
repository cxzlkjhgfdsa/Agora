package com.agora.server.user.controller.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestJoinDto {
    private String user_name;
    private String user_age;
    private String user_nickname;
    private String user_phone;
    private String user_photo;
    private SocialType user_social_type;
    private String user_social_id;
}
