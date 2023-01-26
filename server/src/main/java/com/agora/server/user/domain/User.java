package com.agora.server.user.domain;

import com.agora.server.auth.domain.RefreshToken;
import com.agora.server.category.domain.Category;
import com.agora.server.category.domain.UserCategory;
import com.agora.server.encrypt.domain.Encrypt;
import com.agora.server.user.controller.dto.SocialType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    @Id
    @GeneratedValue(generator = "uuid2")
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
    @Column(unique = true, length = 100)
    private String user_phone;
    @Column(unique = true, length = 30)
    private String user_nickname;

    @Column(length = 200)
    private String user_photo;

    @OneToMany(mappedBy = "user")
    private List<UserCategory> categories = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Encrypt encrypt;


    public static User createUser(Encrypt encrypt, SocialType user_social_type, String user_social_id, String user_name, String user_age, String user_phone, String user_nickname, String user_photo) {
        User user = new User();
        user.encrypt = encrypt;
        user.user_social_type = user_social_type;
        user.user_social_id = user_social_id;
        user.user_name = user_name;
        user.user_age = user_age;
        user.user_phone = user_phone;
        user.user_nickname = user_nickname;
        user.user_photo = user_photo;
        return user;
    }

    public static User createOAuthUser(SocialType socialType, String social_id, String nickname, String profile) {
        User user = new User();
        user.user_social_type = socialType;
        user.user_social_id = social_id;
        user.user_nickname = nickname;
        user.user_photo = profile;
        return user;
    }

    public void addCategories(UserCategory userCategory){
        // 카테고리 추가 하기 위한 add
        this.categories.add(userCategory);
    }

}
