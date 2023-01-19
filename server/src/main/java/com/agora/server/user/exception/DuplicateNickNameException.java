package com.agora.server.user.exception;

public class DuplicateNickNameException extends RuntimeException{
    public DuplicateNickNameException(String message) {
        super(message);
    }
}
