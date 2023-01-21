package com.agora.server.auth.handler;

import com.agora.server.common.dto.ResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@RequiredArgsConstructor
@Component
public class JwtAuthenticationFailureHandler implements AuthenticationFailureHandler {
    private final ResponseDTO res;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        SecurityContextHolder.clearContext();

        res.setState(false);
        res.setMessage("jwt authentication error");
        res.setStatusCode(403);
        PrintWriter writer = response.getWriter();
        writer.write(res.getMessage());
    }
}
