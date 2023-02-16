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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "debate_history_id")
    private Long id;

    @Column(length = 50)
    private String user_id;

    @Column(length = 100)
    private String room_name;
    @Column(length = 50)
    private String left_opinion;
    @Column(length = 50)
    private String right_opinion;

    // 왼쪽팀 0 오른쪽팀 1
    @Column(length = 10)
    private String user_team;

    // 일단 저장은 투표 수로 하고 요청할 때 가공해서 승패로 보여주기
    // 아니면 처음부터 투표수와 승패 둘다 저장
    private Integer phase1_left_vote;
    private Integer phase1_right_vote;
    private Integer phase2_left_vote;
    private Integer phase2_right_vote;
    private Integer phase3_left_vote;
    private Integer phase3_right_vote;
    @Column(length = 50)
    private String phase1_player_result;
    @Column(length = 50)
    private String phase2_player_result;
    @Column(length = 50)
    private String phase3_player_result;
    @Column(length = 50)
    private String total_player_result;
    @Column(length = 30)
    private String left_player1_nickname;
    @Column(length = 30)
    private String left_player2_nickname;
    @Column(length = 30)
    private String left_player3_nickname;
    @Column(length = 30)
    private String right_player1_nickname;
    @Column(length = 30)
    private String right_player2_nickname;
    @Column(length = 30)
    private String right_player3_nickname;

    @Column(length = 30)
    private String category;

    public static DebateHistory createDebateHistory(String user_id, String room_name, String left_opinion, String right_opinion, String user_team, Integer phase1_left_vote, Integer phase1_right_vote, Integer phase2_left_vote, Integer phase2_right_vote, Integer phase3_left_vote, Integer phase3_right_vote, String phase1_player_result, String phase2_player_result, String phase3_player_result, String total_player_result, String left_player1_nickname, String left_player2_nickname, String left_player3_nickname, String right_player1_nickname, String right_player2_nickname, String right_player3_nickname, String category) {
        DebateHistory debateHistory = new DebateHistory();
        debateHistory.user_id = user_id;
        debateHistory.room_name = room_name;
        debateHistory.left_opinion = left_opinion;
        debateHistory.right_opinion = right_opinion;
        debateHistory.user_team = user_team;
        debateHistory.phase1_left_vote = phase1_left_vote;
        debateHistory.phase1_right_vote = phase1_right_vote;
        debateHistory.phase2_left_vote = phase2_left_vote;
        debateHistory.phase2_right_vote = phase2_right_vote;
        debateHistory.phase3_left_vote = phase3_left_vote;
        debateHistory.phase3_right_vote = phase3_right_vote;
        debateHistory.phase1_player_result = phase1_player_result;
        debateHistory.phase2_player_result = phase2_player_result;
        debateHistory.phase3_player_result = phase3_player_result;
        debateHistory.total_player_result = total_player_result;
        debateHistory.left_player1_nickname = left_player1_nickname;
        debateHistory.left_player2_nickname = left_player2_nickname;
        debateHistory.left_player3_nickname = left_player3_nickname;
        debateHistory.right_player1_nickname = right_player1_nickname;
        debateHistory.right_player2_nickname = right_player2_nickname;
        debateHistory.right_player3_nickname = right_player3_nickname;
        debateHistory.category = category;
        return debateHistory;
    }
}
