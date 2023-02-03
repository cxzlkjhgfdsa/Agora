package com.agora.server.room.repository;

import com.agora.server.room.controller.dto.ModalRoomSearchCondition;
import com.agora.server.room.controller.dto.QResponseRoomInfoDto;
import com.agora.server.room.controller.dto.ResponseRoomInfoDto;
import com.agora.server.room.controller.dto.RoomSearchCondition;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
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

import static com.agora.server.room.domain.QRoom.room;

@Repository
public class RoomQueryRepository {

    private final JPAQueryFactory queryFactory;

    public RoomQueryRepository(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<ResponseRoomInfoDto> findByWatchCntTop5() {
        List<ResponseRoomInfoDto> roomlist = queryFactory.select(
                        new QResponseRoomInfoDto(
                                room.room_id,
                                room.room_name,
                                room.room_creater_name,
                                room.room_debate_type,
                                room.room_opinion_left,
                                room.room_opinion_right,
                                room.room_hashtags,
                                room.room_watch_cnt,
                                room.room_start_time,
                                room.room_thumbnail_url,
                                room.room_category,
                                room.room_state
                        )
                )
                .from(room)
                .orderBy(room.room_watch_cnt.desc())
                .limit(5)
                .fetch();

        return roomlist;
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
                                room.room_start_time,
                                room.room_thumbnail_url,
                                room.room_category,
                                room.room_state))
                .from(room)
                .where(
                        roomCategoryListeq(categories)
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
                        roomNameHas(condition.getSearchWord()),
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
                        createrNameHas(condition.getSearchWord()),
                        roomHashtagsHas(condition.getHashTags())
                );

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    public Page<ResponseRoomInfoDto> findAllByModalConditionPages(ModalRoomSearchCondition modalRoomSearchCondition, Pageable pageable) {
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
                                room.room_start_time,
                                room.room_thumbnail_url,
                                room.room_category,
                                room.room_state))
                .from(room)
                .where(
                        room.room_state.eq(modalRoomSearchCondition.getRoomState()),
                        roomCategoryeq(modalRoomSearchCondition.getCategory())
                )
                .orderBy(
                        roomSort(modalRoomSearchCondition.getOrder())
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(room.count())
                .from(room)
                .where(
                        room.room_state.eq(modalRoomSearchCondition.getRoomState()),
                        roomCategoryeq(modalRoomSearchCondition.getCategory())
                );

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);

    }

    private OrderSpecifier<?> roomSort(String order) {
        switch (order){
            case "createnew" :
                return new OrderSpecifier<>(Order.ASC, room.room_start_time);
            case "createold" :
                return new OrderSpecifier<>(Order.DESC, room.room_start_time);
            case "watchcnt"  :
                return new OrderSpecifier<>(Order.DESC, room.room_watch_cnt);
        }
        return null;
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

    private BooleanBuilder roomCategoryListeq(List<String> categories) {
        BooleanBuilder builder = new BooleanBuilder();
        for (String category : categories) {
            builder.or(room.room_category.eq(category));
        }
        return categories.size()>0 ? builder : null;
    }

    private BooleanExpression roomCategoryeq(String category) {
        return category.equals("all") ? null : room.room_category.eq(category);
    }

}
