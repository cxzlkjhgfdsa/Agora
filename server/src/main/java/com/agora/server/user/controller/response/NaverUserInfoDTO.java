package com.agora.server.user.controller.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NaverUserInfoDTO {
    private String id;
    private String age;
    private String email;
    private String mobile;
    private String mobile_e164;
    private String name;
}
