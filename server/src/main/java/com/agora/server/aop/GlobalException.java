package com.agora.server.aop;

import com.agora.server.auth.exception.TokenValidFailedException;
import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.user.exception.AlreadyExistUserException;
import com.agora.server.user.exception.DuplicateNickNameException;
import com.agora.server.user.exception.NoUserException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class GlobalException extends ResponseEntityExceptionHandler {
    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<ResponseDTO> NullPointerException(NullPointerException nullPointerException) {
        ResponseDTO res = new ResponseDTO();
        res.setMessage(nullPointerException.getMessage());
        res.setStatusCode(HttpStatus.NOT_FOUND.value());
        return ResponseEntity.ok(res);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ResponseDTO> RuntimeException(RuntimeException r) {
        ResponseDTO res = new ResponseDTO();
        res.setMessage(r.getMessage());
        return new ResponseEntity<>(res, HttpStatus.REQUEST_TIMEOUT);
    }

    @ExceptionHandler(AlreadyExistUserException.class)
    public ResponseEntity<ResponseDTO> AlreadyExistUserException(AlreadyExistUserException a) {
        ResponseDTO res = new ResponseDTO();
        res.setMessage(a.getMessage());
        return ResponseEntity.ok(res);
    }

    @ExceptionHandler(DuplicateNickNameException.class)
    public ResponseEntity<ResponseDTO> DuplicateNickNameException(DuplicateNickNameException d) {
        ResponseDTO res = new ResponseDTO();
        res.setMessage(d.getMessage());
        return ResponseEntity.ok(res);
    }

    @ExceptionHandler(NoUserException.class)
    public ResponseEntity<ResponseDTO> NoUserException(NoUserException nu) {
        ResponseDTO res = new ResponseDTO();
        res.setMessage(nu.getMessage());
        return ResponseEntity.ok(res);
    }

    @ExceptionHandler(TokenValidFailedException.class)
    public ResponseEntity<ResponseDTO> TokenValidFailedException(TokenValidFailedException jwt) {
        ResponseDTO res = new ResponseDTO();
        res.setMessage(jwt.getMessage());
        res.setState(false);
        return ResponseEntity.ok(res);
    }

    @ExceptionHandler(NoSuchFieldException.class)
    public ResponseEntity<ResponseDTO> NoSuchFieldException(NoSuchFieldException jwt) {
        ResponseDTO res = new ResponseDTO();
        res.setMessage(jwt.getMessage());
        res.setState(false);
        return ResponseEntity.ok(res);
    }
}
