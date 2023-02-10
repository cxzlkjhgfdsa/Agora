package com.agora.server.user.controller.dto.request;


import com.agora.server.user.controller.dto.SocialType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

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
    private List<Long> categories;

}
