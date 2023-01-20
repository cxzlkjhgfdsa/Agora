package com.agora.server.auth.exception;

public class JwtInvalidException extends RuntimeException {

    public JwtInvalidException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public JwtInvalidException(String msg) {
        super(msg);
    }
}
