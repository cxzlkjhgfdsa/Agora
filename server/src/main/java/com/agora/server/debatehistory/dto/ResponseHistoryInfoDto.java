package com.agora.server.debatehistory.dto;

import com.agora.server.debatehistory.domain.DebateHistory;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@Getter
@Setter
public class ResponseHistoryInfoDto {
    private String debate_name;

    private String debate_team;

    private String debate_result;

    private String category_name;

    public ResponseHistoryInfoDto(DebateHistory o) {
        this.debate_name = o.getDebate_name();
        this.debate_team = o.getDebate_team();
        this.debate_result = o.getDebate_result();
        this.category_name = o.getCategory_name();
    }
}
