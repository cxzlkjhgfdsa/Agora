package com.agora.server.auth.filter;

import com.agora.server.auth.exception.TokenValidFailedException;
import com.agora.server.auth.provider.JwtTokenProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.codec.DecodingException;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends GenericFilter {
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        try {
            Claims claims = jwtTokenProvider.accessTokenValidation((HttpServletRequest) request);
            if (claims != null) {
                log.info("claims is exist");
                SecurityContextHolder.getContext().setAuthentication(jwtTokenProvider.getAuthentication(claims));
            } else {
                log.warn("you need to login");
                ((HttpServletResponse) response).sendRedirect("/swagger-ui/");
            }
            chain.doFilter(request, response);
        } catch (MalformedJwtException e) {
            log.error("손상된 토큰입니다.");
            throw new TokenValidFailedException();
        } catch (DecodingException e) {
            log.error("잘못된 인증입니다.");
            throw new TokenValidFailedException();
        } catch (ExpiredJwtException e) {
            log.error("만료된 토큰입니다.");
            throw new TokenValidFailedException();
        }
    }
}
