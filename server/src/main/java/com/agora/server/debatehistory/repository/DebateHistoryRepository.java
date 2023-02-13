package com.agora.server.debatehistory.repository;

import com.agora.server.debatehistory.domain.DebateHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface DebateHistoryRepository extends JpaRepository<DebateHistory, Long> {

    @Query("select d from DebateHistory d where d.user_id=:userId")
    List<DebateHistory> findByUser_id(@Param("userId") String userId);

}
