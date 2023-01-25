package com.agora.server.encrypt.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Encrypt {
    @Id
    @GeneratedValue
    @Column(length = 50, name = "user_security_id")
    private Long id;

    @Column(length = 100)
    private String user_social_id;

    @Type(type = "uuid-char")
    @Column(length = 100)
    private UUID secret_key;

    @Column(length = 100)
    private String salt;

    public static Encrypt createEncrypt(String user_social_id, UUID secret_key, String salt) {
        Encrypt encrypt = new Encrypt();
        encrypt.user_social_id = user_social_id;
        encrypt.secret_key = secret_key;
        encrypt.salt = salt;
        return encrypt;
    }
}
