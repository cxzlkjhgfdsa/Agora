package com.agora.server.debatehistory.dto;

import com.agora.server.debatehistory.domain.DebateHistory;
import com.querydsl.core.annotations.QueryProjection;
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

    private String userTeam;

    private List<Integer> leftVoteList;
    private List<Integer> rightVoteList;
    private List<String> playerResultList;
    private String total_player_result;

    private List<String> leftPlayerList;
    private List<String> rightPlayerList;

    private String category;


    @QueryProjection
    public ResponseHistoryInfoDto(String roomName, String leftOpinion, String rightOpinion, String userTeam,
                                  Integer phase1LeftVote, Integer phase2LeftVote, Integer phase3LeftVote,
                                  Integer phase1RightVote, Integer phase2RightVote, Integer phase3RightVote,
                                  String phase1PlayerResult, String phase2PlayerResult, String phase3PlayerResult,
                                  String totalPlayerResult,
                                  String leftPlayer1Nickname, String leftPlayer2Nickname, String leftPlayer3Nickname,
                                  String rightPlayer1Nickname, String rightPlayer2Nickname, String rightPlayer3Nickname,
                                  String category
    ) {
        this.roomName = roomName;
        this.leftOpinion = leftOpinion;
        this.rightOpinion = rightOpinion;
        this.userTeam = userTeam;
        this.leftVoteList = new ArrayList<>();
        this.leftVoteList.add(phase1LeftVote);
        this.leftVoteList.add(phase2LeftVote);
        this.leftVoteList.add(phase3LeftVote);
        this.rightVoteList = new ArrayList<>();
        this.rightVoteList.add(phase1RightVote);
        this.rightVoteList.add(phase2RightVote);
        this.rightVoteList.add(phase3RightVote);
        this.playerResultList = new ArrayList<>();
        this.playerResultList.add(phase1PlayerResult);
        this.playerResultList.add(phase2PlayerResult);
        this.playerResultList.add(phase3PlayerResult);
        this.total_player_result = totalPlayerResult;
        this.leftPlayerList = new ArrayList<>();
        this.leftPlayerList.add(leftPlayer1Nickname);
        this.leftPlayerList.add(leftPlayer2Nickname);
        this.leftPlayerList.add(leftPlayer3Nickname);
        this.rightPlayerList = new ArrayList<>();
        this.rightPlayerList.add(rightPlayer1Nickname);
        this.rightPlayerList.add(rightPlayer2Nickname);
        this.rightPlayerList.add(rightPlayer3Nickname);
        this.category = category;
    }

}
