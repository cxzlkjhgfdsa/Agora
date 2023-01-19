package com.agora.server.user.exception;

public class AlreadyExistUserException extends RuntimeException{

    public AlreadyExistUserException(String message) {
        super(message);
    }
}
