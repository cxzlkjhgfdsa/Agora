package com.agora.server.room.exception;

public class NotReadyException extends RuntimeException{

    public NotReadyException(String message) {
        super(message);
    }
}
