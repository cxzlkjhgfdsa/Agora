package com.agora.server.user.controller.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserInfoResponseDto {
    String userName;
    String userNickname;
    String userAge;
    String user_photo;
    String user_photo_name;
    List<String> categories;
}
