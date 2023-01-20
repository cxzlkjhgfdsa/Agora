package com.agora.server.aop;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

@Aspect
@Component
public class GlobalExceptionAspect {

    @Pointcut("execution(* org.springframework.security.web.FilterChainProxy.doFilterInternal(..))")
    public void filterChainPointcut() {
    }

    @Around("filterChainPointcut()")
    public Object handleException(ProceedingJoinPoint joinPoint) throws Throwable {
        HttpServletResponse response = (HttpServletResponse) joinPoint.getArgs()[1];
        try {
            return joinPoint.proceed();
        } catch (ExpiredJwtException expire) {
            response.sendError(403, "EXPIRES");
        }catch (SignatureException signature){
            response.sendError(403, "SIGNATURE");
        }
        return null;
    }
}
