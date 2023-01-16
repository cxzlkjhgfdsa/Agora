package com.agora.server.common;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseDTO {
    private String message;
    private Object body;
    private int statusCode;
}
