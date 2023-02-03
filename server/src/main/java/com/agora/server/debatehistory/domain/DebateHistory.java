package com.agora.server.debatehistory.domain;

import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "debate_history")
public class DebateHistory {

    @Id
    @GeneratedValue
    @Column(name = "debate_history_id")
    private Long id;
    @Column(length = 50)
    private String user_id;

    @Column(length = 100)
    private String debate_name;
    @Column(length = 50)
    private String debate_team;

    @Column(length = 10)
    private String debate_result;

    @Column(length = 30)
    private String category_name;

    public static DebateHistory createDebateHistory(String user_id, String debate_name, String debate_team
                                                                        ,String debate_result, String category_name){
        DebateHistory debateHistory = new DebateHistory();
        debateHistory.user_id = user_id;
        debateHistory.debate_name = debate_name;
        debateHistory.debate_team = debate_team;
        debateHistory.debate_result = debate_result;
        debateHistory.category_name = category_name;
        return debateHistory;
    }


}
