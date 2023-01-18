package com.agora.server.user.exception;

public class NoUserException extends RuntimeException{
    public NoUserException(String message) {
        super(message);
    }
}
