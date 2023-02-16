package com.agora.server.debatehistory.repository;

import com.agora.server.debatehistory.domain.DebateHistory;
import com.agora.server.debatehistory.domain.QDebateHistory;
import com.agora.server.debatehistory.dto.QResponseHistoryInfoDto;
import com.agora.server.debatehistory.dto.ResponseHistoryInfoDto;
import com.agora.server.room.controller.dto.QResponseRoomInfoDto;
import com.agora.server.room.controller.dto.ResponseRoomInfoDto;
import com.agora.server.room.controller.dto.RoomSearchCondition;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static com.agora.server.debatehistory.domain.QDebateHistory.*;
import static com.agora.server.room.domain.QRoom.room;

@Repository
public class DebateHistoryQueryRepository {

    private final JPAQueryFactory queryFactory;

    public DebateHistoryQueryRepository(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public Page<ResponseHistoryInfoDto> findAllByUserIdPages(String userId, Pageable pageable) {
        List<ResponseHistoryInfoDto> content = queryFactory.select(
                        new QResponseHistoryInfoDto(
                                debateHistory.room_name,
                                debateHistory.room_id,
                                debateHistory.left_opinion,
                                debateHistory.right_opinion,
                                debateHistory.user_team,
                                debateHistory.phase1_left_vote,
                                debateHistory.phase2_left_vote,
                                debateHistory.phase3_left_vote,
                                debateHistory.phase1_right_vote,
                                debateHistory.phase2_right_vote,
                                debateHistory.phase3_right_vote,
                                debateHistory.phase1_player_result,
                                debateHistory.phase2_player_result,
                                debateHistory.phase3_player_result,
                                debateHistory.total_player_result,
                                debateHistory.left_player1_nickname,
                                debateHistory.left_player2_nickname,
                                debateHistory.left_player3_nickname,
                                debateHistory.right_player1_nickname,
                                debateHistory.right_player2_nickname,
                                debateHistory.right_player3_nickname,
                                debateHistory.category
                        ))
                .from(debateHistory)
                .where(
                        debateHistory.user_id.eq(userId)
                )
                .orderBy(debateHistory.room_id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(debateHistory.count())
                .from(debateHistory)
                .where(
                        debateHistory.user_id.eq(userId)
                );

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }




}
