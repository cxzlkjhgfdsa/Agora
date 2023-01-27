package com.agora.server.room.repository;

import com.agora.server.room.controller.dto.QResponseRoomInfoDto;
import com.agora.server.room.controller.dto.ResponseRoomInfoDto;
import com.agora.server.room.controller.dto.RoomSearchCondition;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
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
                                room.room_id,
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
                                room.room_category,
                                room.room_state))
                .from(room)
                .orderBy(room.room_watch_cnt.desc())
                .limit(5)
                .fetch();
    }

    public List<ResponseRoomInfoDto> findByWatchCntInprogress() {
        return queryFactory.select(
                        new QResponseRoomInfoDto(
                                room.room_id,
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
                                room.room_category,
                                room.room_state
                        ))
                .from(room)
                .where(room.room_state.eq(true))
                .orderBy(room.room_watch_cnt.desc())
                .limit(10)
                .fetch();
    }

    public List<ResponseRoomInfoDto> findByWatchCntReadystate() {
        return queryFactory.select(
                        new QResponseRoomInfoDto(
                                room.room_id,
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
                                room.room_category,
                                room.room_state
                        ))
                .from(room)
                .where(room.room_state.eq(false))
                .orderBy(room.room_watch_cnt.desc())
                .limit(10)
                .fetch();
    }

    public List<ResponseRoomInfoDto> findByCategories(List<String> categories) {
        return queryFactory.select(
                        new QResponseRoomInfoDto(
                                room.room_id,
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
                                room.room_category,
                                room.room_state))
                .from(room)
                .where(
                        roomCategoryeq(categories)
                        )
                .orderBy(room.room_watch_cnt.desc())
                .limit(5)
                .fetch();
    }



    public List<ResponseRoomInfoDto> findByHashTags(RoomSearchCondition condition){
        return queryFactory.select(
                new QResponseRoomInfoDto(
                        room.room_id,
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
                        room.room_category,
                        room.room_state))
                .from(room)
                .where(
                        roomHashtagsHas(condition.getHashTags()))
                .orderBy(room.room_watch_cnt.desc())
                .limit(2)
                .fetch();
    }


    public List<ResponseRoomInfoDto> findBySearchWordRoomName(RoomSearchCondition condition){
        return queryFactory.select(
                        new QResponseRoomInfoDto(
                                room.room_id,
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
                                room.room_category,
                                room.room_state))
                .from(room)
                .where(
                        roomNameHas(condition.getSearchWord()),
                        roomHashtagsHas(condition.getHashTags())
                )
                .orderBy(room.room_watch_cnt.desc())
                .limit(2)
                .fetch();
    }

    public List<ResponseRoomInfoDto> findBySearchWordCreaterName(RoomSearchCondition condition){
        return queryFactory.select(
                        new QResponseRoomInfoDto(
                                room.room_id,
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
                                room.room_category,
                                room.room_state))
                .from(room)
                .where(
                        createrNameHas(condition.getSearchWord()),
                        roomHashtagsHas(condition.getHashTags())
                )
                .orderBy(room.room_watch_cnt.desc())
                .limit(2)
                .fetch();
    }

    public Page<ResponseRoomInfoDto> findAllByHashTagsPages(RoomSearchCondition condition, Pageable pageable) {
        List<ResponseRoomInfoDto> content = queryFactory.select(
                        new QResponseRoomInfoDto(
                                room.room_id,
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
                                room.room_category,
                                room.room_state))
                .from(room)
                .where(
                        roomHashtagsHas(condition.getHashTags())
                )
                .orderBy(room.room_watch_cnt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(room.count())
                .from(room)
                .where(
                        roomHashtagsHas(condition.getHashTags())
                );

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    public Page<ResponseRoomInfoDto> findAllByRoomnamePages(RoomSearchCondition condition, Pageable pageable) {
        List<ResponseRoomInfoDto> content = queryFactory.select(
                        new QResponseRoomInfoDto(
                                room.room_id,
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
                                room.room_category,
                                room.room_state))
                .from(room)
                .where(
                        roomNameHas(condition.getSearchWord()),
                        roomHashtagsHas(condition.getHashTags())
                )
                .orderBy(room.room_watch_cnt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(room.count())
                .from(room)
                .where(
                        roomHashtagsHas(condition.getHashTags())
                );

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    public Page<ResponseRoomInfoDto> findAllByCreaternamePages(RoomSearchCondition condition, Pageable pageable) {
        List<ResponseRoomInfoDto> content = queryFactory.select(
                        new QResponseRoomInfoDto(
                                room.room_id,
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
                                room.room_category,
                                room.room_state))
                .from(room)
                .where(
                        createrNameHas(condition.getSearchWord()),
                        roomHashtagsHas(condition.getHashTags())
                )
                .orderBy(room.room_watch_cnt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(room.count())
                .from(room)
                .where(
                        roomHashtagsHas(condition.getHashTags())
                );

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
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

    private BooleanBuilder roomCategoryeq(List<String> categories) {
        BooleanBuilder builder = new BooleanBuilder();
        for (String category : categories) {
            builder.or(room.room_category.eq(category));
        }
        return categories.size()>0 ? builder : null;
    }



}
