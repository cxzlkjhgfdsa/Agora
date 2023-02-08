package com.agora.server.user.exception;

import lombok.Getter;
import lombok.Setter;

// todo: 이거 보고 다시 해보기
// https://velog.io/@jonghyun3668/스프링-부트-필터에서-에러-코드-변경하기
@Getter
@Setter
public class ExceptionCode {
    private int message;
    private int code;
}
