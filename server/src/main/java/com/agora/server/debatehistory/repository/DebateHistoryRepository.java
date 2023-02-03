package com.agora.server.debatehistory.repository;

import com.agora.server.debatehistory.domain.DebateHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DebateHistoryRepository extends JpaRepository<DebateHistory, Long> {

    List<DebateHistory> findByUserId(String userId);
}
