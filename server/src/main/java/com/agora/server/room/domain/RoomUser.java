package com.agora.server.room.domain;

import com.agora.server.user.domain.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomUser {

    @Id @GeneratedValue
    private Long room_user_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="room_id")
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    private String room_user_side;

    public static RoomUser createRoomUser(User user){
        RoomUser roomUser = new RoomUser();
        roomUser.setUser(user);
        return roomUser;
    }

}
