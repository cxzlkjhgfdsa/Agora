package com.agora.server.room.service;

import com.agora.server.room.controller.dto.RequestRoomCreateDto;
import com.agora.server.room.domain.Room;
import com.agora.server.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    public Long createRoom(Room createdRoom){
        return roomRepository.save(createdRoom).getRoom_id();
    }

}
