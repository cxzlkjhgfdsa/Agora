package com.agora.server.encrypt.repository;

import com.agora.server.encrypt.domain.Encrypt;
import com.agora.server.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

public interface EncryptionRepository extends JpaRepository<Encrypt, Long> {
    @Query("select e from Encrypt e where e.user_social_id=:userSocialId")
    Encrypt findByUser_id(@Param("userSocialId") String userSocialId);

    @Query("select u from User u where u.user_social_id=:userSocialId")
    User findByUser_security_id(@Param("userSocialId") String userSocialId);

}
