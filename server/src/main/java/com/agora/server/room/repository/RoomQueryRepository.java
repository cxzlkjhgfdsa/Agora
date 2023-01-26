package com.agora.server.room.repository;

import com.agora.server.room.controller.dto.QResponseRoomInfoDto;
import com.agora.server.room.controller.dto.ResponseRoomInfoDto;
import com.agora.server.room.controller.dto.RoomSearchCondition;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.StringTokenizer;

import static com.agora.server.room.domain.QRoom.room;

@Repository
public class RoomQueryRepository {

    private final JPAQueryFactory queryFactory;

    public RoomQueryRepository(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<ResponseRoomInfoDto> findByWatchCntTop5() {
        return queryFactory.select(
                        new QResponseRoomInfoDto(
                                room.room_name,
                                room.room_creater_name,
                                room.room_debate_type,
                                room.room_opinion_left,
                                room.room_opinion_right,
                                room.room_hashtags,
                                room.room_watch_cnt,
                                room.room_phase,
                                room.room_start_time,
                                room.room_thumbnail_url,
                                room.room_category))
                .from(room)
                .orderBy(room.room_watch_cnt.desc())
                .limit(5)
                .fetch();
    }

    public List<ResponseRoomInfoDto> findByHashTags(RoomSearchCondition condition){
        return queryFactory.select(
                new QResponseRoomInfoDto( room.room_name,
                        room.room_creater_name,
                        room.room_debate_type,
                        room.room_opinion_left,
                        room.room_opinion_right,
                        room.room_hashtags,
                        room.room_watch_cnt,
                        room.room_phase,
                        room.room_start_time,
                        room.room_thumbnail_url,
                        room.room_category))
                .from(room)
                .where(roomHashtagsHas(condition.getHashTags()))
                .orderBy(room.room_watch_cnt.desc())
                .limit(2)
                .fetch();
    }


    public List<ResponseRoomInfoDto> findBySearchWordRoomName(RoomSearchCondition condition){
        return queryFactory.select(
                        new QResponseRoomInfoDto(
                                room.room_name,
                                room.room_creater_name,
                                room.room_debate_type,
                                room.room_opinion_left,
                                room.room_opinion_right,
                                room.room_hashtags,
                                room.room_watch_cnt,
                                room.room_phase,
                                room.room_start_time,
                                room.room_thumbnail_url,
                                room.room_category))
                .from(room)
                .where(
                        roomNameHas(condition.getSearchWord())
                )
                .orderBy(room.room_watch_cnt.desc())
                .limit(2)
                .fetch();
    }

    public List<ResponseRoomInfoDto> findBySearchWordCreaterName(RoomSearchCondition condition){
        return queryFactory.select(
                        new QResponseRoomInfoDto(
                                room.room_name,
                                room.room_creater_name,
                                room.room_debate_type,
                                room.room_opinion_left,
                                room.room_opinion_right,
                                room.room_hashtags,
                                room.room_watch_cnt,
                                room.room_phase,
                                room.room_start_time,
                                room.room_thumbnail_url,
                                room.room_category))
                .from(room)
                .where(
                        createrNameHas(condition.getSearchWord())
                )
                .orderBy(room.room_watch_cnt.desc())
                .limit(2)
                .fetch();
    }

    private BooleanBuilder roomHashtagsHas(List<String> hashTags) {
        BooleanBuilder builder = new BooleanBuilder();
        for (String hashTag : hashTags) {
            builder.or(room.room_hashtags.startsWith(hashTag+","));
            builder.or(room.room_hashtags.contains(","+hashTag+","));
            builder.or(room.room_hashtags.endsWith(","+hashTag));
        }
        return hashTags.size()>0 ? builder : null;
    }
    private BooleanExpression createrNameHas(String searchWord) {
        return StringUtils.hasText(searchWord) ? room.room_creater_name.contains(searchWord) : null;
    }

    private BooleanExpression roomNameHas(String searchWord) {
        return StringUtils.hasText(searchWord) ? room.room_name.contains(searchWord) : null;
    }


}
