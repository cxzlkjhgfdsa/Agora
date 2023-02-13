package com.agora.server.user.controller.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class EditRequestDto {

    String user_photo;
    String user_photo_name;
    List<Long> categories;

}
