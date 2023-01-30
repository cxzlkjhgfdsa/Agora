package com.agora.server.auth.exception;

public class TokenValidFailedException extends RuntimeException {
    public TokenValidFailedException(String message) {
        super(message);
    }
}
