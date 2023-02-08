package com.agora.server.debatehistory.dto;

import com.agora.server.debatehistory.domain.DebateHistory;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ResponseHistoryInfoDto {

    private String roomName;
    private String leftOpinion;
    private String rightOpinion;

    // 왼쪽팀 0 오른쪽팀 1
    private String userTeam;

    private List<Integer> leftVoteList;
    private List<Integer> rightVoteList;
    private List<String> playerResultList;
    private String total_player_result;

    private List<String> leftPlayerList;
    private List<String> rightPlayerList;

    private String category;


    public ResponseHistoryInfoDto(DebateHistory debateHistory) {
        this.roomName = debateHistory.getRoom_name();
        this.leftOpinion = debateHistory.getLeft_opinion();
        this.rightOpinion = debateHistory.getRight_opinion();
        this.userTeam = debateHistory.getUser_team();
        this.leftVoteList = new ArrayList<>();
        this.leftVoteList.add(debateHistory.getPhase1_left_vote());
        this.leftVoteList.add(debateHistory.getPhase2_left_vote());
        this.leftVoteList.add(debateHistory.getPhase3_left_vote());
        this.rightVoteList = new ArrayList<>();
        this.rightVoteList.add(debateHistory.getPhase1_right_vote());
        this.rightVoteList.add(debateHistory.getPhase2_right_vote());
        this.rightVoteList.add(debateHistory.getPhase3_right_vote());
        this.playerResultList = new ArrayList<>();
        this.playerResultList.add(debateHistory.getPhase1_player_result());
        this.playerResultList.add(debateHistory.getPhase2_player_result());
        this.playerResultList.add(debateHistory.getPhase3_player_result());
        this.total_player_result = debateHistory.getTotal_player_result();
        this.leftPlayerList = new ArrayList<>();
        this.leftPlayerList.add(debateHistory.getLeft_player1_nickname());
        this.leftPlayerList.add(debateHistory.getLeft_player2_nickname());
        this.leftPlayerList.add(debateHistory.getLeft_player3_nickname());
        this.rightPlayerList = new ArrayList<>();
        this.rightPlayerList.add(debateHistory.getRight_player1_nickname());
        this.rightPlayerList.add(debateHistory.getRight_player2_nickname());
        this.rightPlayerList.add(debateHistory.getRight_player3_nickname());
        this.category = debateHistory.getCategory();
    }

}
