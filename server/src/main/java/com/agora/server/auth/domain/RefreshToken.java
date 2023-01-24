package com.agora.server.auth.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RefreshToken {
    @Id
    @Column(length = 60)
    private String user_id;

    private String refresh_token;

    public static RefreshToken createRefreshToken(String user_id, String refresh_token) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.user_id = user_id;
        refreshToken.refresh_token = refresh_token;
        return refreshToken;
    }
}
