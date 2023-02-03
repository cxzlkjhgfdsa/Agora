package com.agora.server.debatehistory.service;

import com.agora.server.debatehistory.domain.DebateHistory;
import com.agora.server.debatehistory.repository.DebateHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DebateHistoryService {

    private final DebateHistoryRepository debateHistoryRepository;

    public void saveHistory(DebateHistory debateHistory) {
        debateHistoryRepository.save(debateHistory);
    }

    public List<DebateHistory> findByUserId(String userId) {
       return debateHistoryRepository.findByUserId(userId);
    }
}
