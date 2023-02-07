package com.agora.server.user.controller.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter@Setter
public class LoginRequestDto {
    private String user_id;
}
