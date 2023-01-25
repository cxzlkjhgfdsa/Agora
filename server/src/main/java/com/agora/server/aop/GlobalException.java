package com.agora.server.aop;

import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.user.exception.AlreadyExistUserException;
import com.agora.server.user.exception.DuplicateNickNameException;
import com.agora.server.user.exception.NoUserException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalException {
    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<ResponseDTO> NullPointerException(NullPointerException nullPointerException) {
        ResponseDTO res = new ResponseDTO();
        res.setMessage(nullPointerException.getMessage());
        res.setStatusCode(HttpStatus.NOT_FOUND.value());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ResponseDTO> RuntimeException(RuntimeException r) {
        ResponseDTO res = new ResponseDTO();
        res.setMessage(r.getMessage());
        return new ResponseEntity<>(res, HttpStatus.REQUEST_TIMEOUT);
    }

    @ExceptionHandler(AlreadyExistUserException.class)
    public ResponseEntity<ResponseDTO> AlreadyExistUserException(AlreadyExistUserException a){
        ResponseDTO res = new ResponseDTO();
        res.setMessage(a.getMessage());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @ExceptionHandler(DuplicateNickNameException.class)
    public ResponseEntity<ResponseDTO> DuplicateNickNameException(DuplicateNickNameException d){
        ResponseDTO res = new ResponseDTO();
        res.setMessage(d.getMessage());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @ExceptionHandler(NoUserException.class)
    public ResponseEntity<ResponseDTO> NoUserException(NoUserException nu){
        ResponseDTO res = new ResponseDTO();
        res.setMessage(nu.getMessage());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
