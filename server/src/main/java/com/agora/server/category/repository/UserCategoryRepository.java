package com.agora.server.category.repository;

import com.agora.server.category.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCategoryRepository extends JpaRepository<Category, Long> {

}
