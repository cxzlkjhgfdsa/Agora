package com.agora.server.user.domain;

import com.agora.server.user.controller.dto.SocialType;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Table(name = "users")
public class User{
    @Id @GeneratedValue
    private Long user_id;
    private SocialType user_social_type;
    private String user_social_id;
    private String user_name;
    private String user_age;
    private String user_phone;
    private String user_nickname;
    private String user_photo;
    private String user_refresh_token;

    public void createUser(Long user_id, SocialType user_social_type, String user_social_id, String user_name, String user_age, String user_phone, String user_nickname, String user_photo, String user_refresh_token) {
        this.user_id = user_id;
        this.user_social_type = user_social_type;
        this.user_social_id = user_social_id;
        this.user_name = user_name;
        this.user_age = user_age;
        this.user_phone = user_phone;
        this.user_nickname = user_nickname;
        this.user_photo = user_photo;
        this.user_refresh_token = user_refresh_token;
    }

}
