package com.agora.server.user.repository;

import com.agora.server.user.controller.dto.SocialType;
import com.agora.server.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("select u from User u where u.user_social_id= :socialId and u.user_social_type = :socialType")
    User checkDuplicateUser(@Param("socialId") String socialId, @Param("socialType") SocialType socialType);

    @Query("select u from User u where u.user_id=:userId and u.user_social_type=:socialType")
    User findByUserAccessTokenInfo(@Param("userId") UUID userId, @Param("socialType") SocialType socialType);
}
