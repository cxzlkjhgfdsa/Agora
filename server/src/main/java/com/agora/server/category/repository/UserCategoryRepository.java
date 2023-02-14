package com.agora.server.category.repository;

import com.agora.server.category.domain.Category;
import com.agora.server.category.domain.UserCategory;
import com.agora.server.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface UserCategoryRepository extends JpaRepository<UserCategory, Long> {

    @Query("select uc from UserCategory uc join fetch uc.category c where uc.user.user_id=:userId")
    List<UserCategory> findByUser_userId(@Param("userId") UUID userId);
}
