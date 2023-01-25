package com.agora.server.user.domain;

import lombok.AccessLevel;
import lombok.Cleanup;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.lang.reflect.InvocationTargetException;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Room {

    @Id @GeneratedValue
    private Long room_id;

    @Column(length = 100)
    private String room_name;

    @Column(length = 100)
    private String room_creater_name;

    @Column
    @Enumerated(EnumType.STRING)
    private DebateType room_debate_type;

    @Column(length = 50)
    private String room_opinion_left;

    @Column(length = 50)
    private String room_opinion_right;

    @Column(length = 200)
    private String room_hashtags;

    @Column
    private Long room_watch_cnt;

    @Column
    private Integer room_phase;

    @Column
    private LocalDateTime room_start_time;

    @Column
    private String room_thumbnail_url;

    @Column
    private String room_category;

    public static Room createRoom(Long room_id, String room_name, String room_creater_name, DebateType room_debate_type, String room_opinion_left, String room_opinion_right, String room_hashtags, String room_thumbnail_url, String room_category) {
        Room room = new Room();
        room.room_id = room_id;
        room.room_name = room_name;
        room.room_creater_name = room_creater_name;
        room.room_debate_type = room_debate_type;
        room.room_opinion_left = room_opinion_left;
        room.room_opinion_right = room_opinion_right;
        room.room_hashtags = room_hashtags;
        room.room_thumbnail_url = room_thumbnail_url;
        room.room_category = room_category;
        return room;
    }
}
