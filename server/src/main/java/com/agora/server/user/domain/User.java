package com.agora.server.user.domain;

import com.agora.server.user.controller.dto.SocialType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Getter
@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User{

    @Id @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-char")
    @Column(length = 50)
    private UUID user_id;
    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private SocialType user_social_type;
    @Column(length = 50)
    private String user_social_id;

    @Column(length = 100)
    private String user_name;

    @Column(length = 30)
    private String user_age;
    @Column(length = 100)
    private String user_phone;
    @Column(unique = true, length = 30)
    private String user_nickname;

    @Column(length = 200)
    private String user_photo;
    @Column(length = 200)
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
