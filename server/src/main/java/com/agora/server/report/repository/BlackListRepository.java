package com.agora.server.report.repository;

import com.agora.server.report.domain.BlackList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BlackListRepository extends JpaRepository<BlackList, Long> {

    @Query("select b from BlackList b where b.user_phone=:user_phone")
    BlackList findBlackListBydUser_phone(@Param("user_phone")String user_phone);
}
