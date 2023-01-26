package com.agora.server.room.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<RoomUser> room_users = new ArrayList<>();

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

    @Column
    private boolean room_state;

    public static Room createRoom(String room_name, String room_creater_name, DebateType room_debate_type, String room_opinion_left, String room_opinion_right, String room_hashtags, String room_thumbnail_url, String room_category) {
        Room room = new Room();
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

    // 더미 생성용 메서드 후에 삭제
    public static Room createDummyRoom(String room_name, String room_creater_name, DebateType room_debate_type, String room_opinion_left, String room_opinion_right, String room_hashtags, String room_thumbnail_url, String room_category,Long room_watch_cnt,Integer room_phase) {
        Room room = new Room();
        room.room_name = room_name;
        room.room_creater_name = room_creater_name;
        room.room_debate_type = room_debate_type;
        room.room_opinion_left = room_opinion_left;
        room.room_opinion_right = room_opinion_right;
        room.room_hashtags = room_hashtags;
        room.room_thumbnail_url = room_thumbnail_url;
        room.room_category = room_category;
        room.room_watch_cnt = room_watch_cnt;
        room.room_phase = room_phase;
        room.room_start_time = LocalDateTime.now();
        return room;
    }

    public void addRoomUser(RoomUser roomUser){
        room_users.add(roomUser);
        roomUser.setRoom(this);
    }

    public void roomStart(){
        room_state = true;
    }

}

