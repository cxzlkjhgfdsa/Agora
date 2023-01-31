package com.agora.server.user.controller.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter@Setter
public class LoginRequestDto {
    private UUID user_id;
}
