package com.agora.server.auth.exception;

public class TokenValidFailedException extends RuntimeException {
    public TokenValidFailedException() {
        super("Token Valid fail");
    }
}
