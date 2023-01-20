package com.agora.server.common.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ResponseDTO {
    private String message;
    private Object body;
    private int statusCode;
    private boolean state;

}
