package com.agora.server.user.domain;

import com.agora.server.category.domain.UserCategory;
import com.agora.server.encrypt.domain.Encrypt;
import com.agora.server.user.controller.dto.SocialType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@ApiModel(value = "USERS")
@Entity
@Getter
@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
public class User {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-char")
    @Column(length = 50)
    @ApiModelProperty(value = "user_id", example = "사용자 고유 id입니다")
    private UUID user_id;
    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    @ApiModelProperty(value = "user social type", example = "OAuth 제공자")
    private SocialType user_social_type;
    @Column(length = 50)
    @ApiModelProperty(value = "user social id", example = "OAuth 제공자가 준 id")
    private String user_social_id;

    @Column(length = 100)
    @ApiModelProperty(value = "user name", example = "사용자 이름")
    private String user_name;

    @Column(length = 30)
    @ApiModelProperty(value = "user age", example = "사용자 나이", required = true)
    private String user_age;
    @Column(length = 100)
    @ApiModelProperty(value = "user phone", example = "사용자 핸드폰 번호", required = true)
    private String user_phone;
    @Column(unique = true, length = 30)
    @ApiModelProperty(value = "user nickname", example = "사용자 닉네임", required = true)
    private String user_nickname;

    @Column(length = 200)
    @ApiModelProperty(value = "user photo name", example = "프로필 이미지 이름")
    private String user_photo_name;

    @ApiModelProperty(value = "report_count", example = "신고 당한 횟수")
    private int report_count;

    @Column(length = 500)
    @ApiModelProperty(value = "user photo", example = "프로필 이미지 경로")
    private String user_photo;

    @OneToMany(mappedBy = "user")
    private List<UserCategory> categories = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Encrypt encrypt;





    public static User createUser(Encrypt encrypt, SocialType user_social_type, String user_social_id, String user_name, String user_age, String user_phone, String user_nickname, String user_photo_name, String user_photo) {
        User user = new User();
        user.encrypt = encrypt;
        user.user_social_type = user_social_type;
        user.user_social_id = user_social_id;
        user.user_name = user_name;
        user.user_age = user_age;
        user.user_phone = user_phone;
        user.user_nickname = user_nickname;
        user.user_photo_name = user_photo_name;
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

    public void addReportCnt(){
        this.report_count++;
    }

    public void addCategories(UserCategory userCategory) {
        // 카테고리 추가 하기 위한 add
        this.categories.add(userCategory);
    }

    public void changeUserPhoto(String user_photo_name, String user_photo){
        this.user_photo_name = user_photo_name;
        this.user_photo = user_photo;
    }

    public void setUserCategories(List<UserCategory> userCategories){
        this.categories = userCategories;
    }

}
