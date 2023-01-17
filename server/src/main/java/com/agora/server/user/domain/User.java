package com.agora.server.user.domain;

import com.agora.server.user.controller.dto.SocialType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User{
    @Id @GeneratedValue
    private Long user_id;
    private SocialType user_social_type;
    private String user_social_id;
    private String user_name;
    private String user_age;
    private String user_phone;

    @Column(unique = true)
    private String user_nickname;
    private String user_photo;
    private String user_refresh_token;


    public static User createUser(SocialType user_social_type, String user_social_id, String user_name, String user_age, String user_phone, String user_nickname, String user_photo) {
        User user = new User();
        user.user_social_type = user_social_type;
        user.user_social_id = user_social_id;
        user.user_name = user_name;
        user.user_age = user_age;
        user.user_phone = user_phone;
        user.user_nickname = user_nickname;
        user.user_photo = user_photo;
        return user;
    }

}
