package com.agora.server.room.service;

import com.agora.server.room.controller.dto.ResponseRoomInfoDto;
import com.agora.server.room.controller.dto.RoomSearchCondition;
import com.agora.server.room.domain.Room;
import com.agora.server.room.repository.RoomQueryRepository;
import com.agora.server.room.repository.RoomRepository;
import com.agora.server.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    private final RoomQueryRepository roomQueryRepository;


    public Long createRoom(Room createdRoom){
        return roomRepository.save(createdRoom).getRoom_id();
    }

    public List<ResponseRoomInfoDto> searchHot5() {
        return roomQueryRepository.findByWatchCntTop5();
    }

    public Map<String, List<ResponseRoomInfoDto>> searchDropdown(RoomSearchCondition roomSearchCondition){
        Map<String, List<ResponseRoomInfoDto>> searchMap = new HashMap<>();
        if(roomSearchCondition.getSearchWord().length()==0 && roomSearchCondition.getHashTags().size()>0){
            searchMap.put("findByHashTags",roomQueryRepository.findByHashTags(roomSearchCondition));
        } else{
            searchMap.put("findByHashTags",new ArrayList<>());
        }
        if(roomSearchCondition.getSearchWord().length()>0){
            searchMap.put("searchByRoomName",roomQueryRepository.findBySearchWordRoomName(roomSearchCondition));
            searchMap.put("searchByCreaterName",roomQueryRepository.findBySearchWordCreaterName(roomSearchCondition));
        } else {
            searchMap.put("searchByRoomName",new ArrayList<>());
            searchMap.put("searchByCreaterName",new ArrayList<>());
        }
        return searchMap;
    }

    public List<ResponseRoomInfoDto> topInprogress() {
        return roomQueryRepository.findByWatchCntInprogress();
    }

    public List<ResponseRoomInfoDto> topReadystate() {
        return roomQueryRepository.findByWatchCntReadystate();
    }

    public List<ResponseRoomInfoDto> searchTopCategory(List<String> categories) {
        return roomQueryRepository.findByCategories(categories);
    }

    public Page<ResponseRoomInfoDto> searchShowallHashTags(RoomSearchCondition condition, Pageable pageable) {
        return roomQueryRepository.findAllByHashTagsPages(condition, pageable);
    }

    public Page<ResponseRoomInfoDto> searchShowallRoomname(RoomSearchCondition condition, Pageable pageable) {
        return roomQueryRepository.findAllByRoomnamePages(condition, pageable);
    }

    public Page<ResponseRoomInfoDto> searchShowallCreatername(RoomSearchCondition condition, Pageable pageable) {
        return roomQueryRepository.findAllByCreaternamePages(condition, pageable);
    }
}
