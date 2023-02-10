package com.agora.server.encrypt.domain;

import com.agora.server.encrypt.util.EncryptionUtil;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Encrypt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(length = 50, name = "user_security_id")
    private Long id;

    @Column(length = 100)
    private String user_social_id;


    @Column(length = 100)
    private String salt;

    public static Encrypt createEncrypt(String user_social_id) throws NoSuchAlgorithmException {
        Encrypt encrypt = new Encrypt();
        encrypt.user_social_id = user_social_id;
        encrypt.salt = generateSalt();
        return encrypt;
    }

    private static String generateSalt() throws NoSuchAlgorithmException {
        byte[] key = EncryptionUtil.generateKey("AES", 128);
        return EncryptionUtil.byteArrayToHex(key);
    }
}
