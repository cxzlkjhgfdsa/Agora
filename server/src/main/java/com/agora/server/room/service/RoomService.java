package com.agora.server.room.service;

import com.agora.server.room.controller.dto.QResponseRoomInfoDto;
import com.agora.server.room.controller.dto.ResponseRoomInfoDto;
import com.agora.server.room.domain.QRoom;
import com.agora.server.room.domain.Room;
import com.agora.server.room.repository.RoomRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.List;

import static com.agora.server.room.domain.QRoom.room;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    
    private final JPAQueryFactory queryFactory;


    public Long createRoom(Room createdRoom){
        return roomRepository.save(createdRoom).getRoom_id();
    }

    public List<ResponseRoomInfoDto> searchHot5() {
        List<ResponseRoomInfoDto> hot5list = queryFactory.select(
                new QResponseRoomInfoDto(
                        room.room_name,
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

        return hot5list;
    }

}
