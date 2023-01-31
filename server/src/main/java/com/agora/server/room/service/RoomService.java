package com.agora.server.room.service;

import com.agora.server.room.controller.dto.ModalRoomSearchCondition;
import com.agora.server.room.controller.dto.ResponseRoomInfoDto;
import com.agora.server.room.controller.dto.RoomSearchCondition;
import com.agora.server.room.domain.Room;
import com.agora.server.room.repository.RoomQueryRepository;
import com.agora.server.room.repository.RoomRepository;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import io.swagger.models.auth.In;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    private final RoomQueryRepository roomQueryRepository;

    private final UserRepository userRepository;

    private final RedisTemplate<String, Object> redisTemplate;


//    public void createString(String key, String value) {
//        redisTemplate.opsForValue().set(key, value);
//    }
//
//    public void createList(String key, List<String> list) {
//        redisTemplate.opsForList().rightPushAll(key, list);
//    }

    public Long createRoom(Room createdRoom){
        // DB에 방 생성
        Long roomId = roomRepository.save(createdRoom).getRoom_id();

        // Redis에 "rooms:토론방id:column명" 을 key로 필요한 정보들 저장
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();

        // 토론 방 페이즈 방 생성시는 0
        String phase = "rooms:"+roomId+":phase";
        // 토론 방 페이즈의 시작 시간 방 생성시는 0
        String phasestarttime = "rooms:"+roomId+":phasetime";
        // 토론 방 페이즈의 시청자 수 방 생성시는 0
        String watchcnt = "rooms:"+roomId+":watchcnt";
        
        // 저장
        valueOperations.set(phase, 0);
        valueOperations.set(phasestarttime, 0);
        valueOperations.set(watchcnt, 0);

        // 리스트는
//        String leftuserlist = "rooms:"+roomId+":leftuserlist";
//        String rightuserlist = "rooms:"+roomId+":rightuserlist";
//        List<String> leftlist = new LinkedList<>();
//        List<String> rightlist = new LinkedList<>();
//        leftlist.add("leftuser1");
//        leftlist.add("leftuser2yes");
//        stringObjectListOperations.rightPushAll(leftuserlist, "leftuser1", "leftuser2");
//        if(redisTemplate.opsForValue().get("rooms:"+roomId+":leftuserList")==null){
//            stringObjectListOperations.rightPushAll(rightuserlist, "rightuser1");
//        }



//        Integer value = (Integer) redisTemplate.opsForValue().get("rooms:"+roomId+":phasetime");
//        System.out.println("value : "+value);
//        List<Object> range = redisTemplate.opsForList().range("rooms:"+roomId+":leftuserlist", 0, -1);
//        for (Object o : range) {
//            String user = (String) o;
//        System.out.println("user : "+user);
//        }

        return roomId;
    }

    public boolean enterRoom(UUID userId, Long roomId, Integer side){
        User user = userRepository.findById(userId).get();

        String userNickname = user.getUser_nickname();
        ListOperations<String, Object> stringObjectListOperations = redisTemplate.opsForList();

        try{

        // side 0 == LEFT SIDE로 가정
        if(side == 0){
            String leftuserlist = "rooms:"+roomId+":leftuserlist";
//            if(redisTemplate.type("rooms:"+roomId+":leftuserlist")==null){
                stringObjectListOperations.rightPushAll(leftuserlist, userNickname);
//            } else{
//                stringObjectListOperations.rightPush(leftuserlist, userNickname);
//            }
//        List<Object> range = redisTemplate.opsForList().range("rooms:"+roomId+":leftuserlist", 0, -1);
//         for (Object o : range) {
//                String usera = (String) o;
//         System.out.println("user : "+usera);
//        }
            return true;
        } else if(side == 1){
            String rightuserlist = "rooms:"+roomId+":rightuserlist";
//            if(redisTemplate.opsForValue().get("rooms:"+roomId+":rightuserlist")==null){
                stringObjectListOperations.rightPush(rightuserlist, userNickname);
//            }
            return true;
        }
        } catch (Exception e){
            return false;
        }
        return false;
    }


    public Long roomPhaseStart(Long roomId, Integer phase){

        // Redis에 "rooms:토론방id:column명" 을 key로 필요한 정보들 저장
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();

        // 토론 방 페이즈
        String phasekey = "rooms:"+ roomId +":phase";

        // 토론 방 페이즈 시작시간
        String phasestarttimekey = "rooms:"+roomId+":phasetime";

        Long serverTime = System.currentTimeMillis()/1000L;

        // 저장
        valueOperations.set(phasekey, phase);
        valueOperations.set(phasestarttimekey,serverTime);

        return roomId;
    }

    public List<ResponseRoomInfoDto> searchHot5() {

        List<ResponseRoomInfoDto> byWatchCntTop5 = roomQueryRepository.findByWatchCntTop5();

        for (ResponseRoomInfoDto responseRoomInfoDto : byWatchCntTop5) {
            Long roomId = responseRoomInfoDto.getRoom_id();
            setUserLists(responseRoomInfoDto, roomId);
            setPhaseAndTime(responseRoomInfoDto, roomId);
//            setWatchCnt(responseRoomInfoDto, roomId);
        }
        return byWatchCntTop5;
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

    public Page<ResponseRoomInfoDto> modalRoomSearch(ModalRoomSearchCondition modalRoomSearchCondition, Pageable pageable) {
        return roomQueryRepository.findAllByModalConditionPages(modalRoomSearchCondition, pageable);
    }

    private void setUserLists(ResponseRoomInfoDto responseRoomInfoDto, Long roomId) {
        String leftuserlist = "rooms:"+ roomId +":leftuserlist";
        ArrayList<String> leftuserls = new ArrayList<>();
        if(redisTemplate.type("rooms:"+ roomId +":leftuserlist")!=null){
            List<Object> range = redisTemplate.opsForList().range("rooms:"+ roomId +":leftuserlist", 0, -1);
            for (Object o : range) {
                leftuserls.add((String) o);
            }
            responseRoomInfoDto.setLeft_user_list(leftuserls);
        } else{
            responseRoomInfoDto.setLeft_user_list(leftuserls);
        }

        String rightuserlist = "rooms:"+ roomId +":rightuserlist";
        ArrayList<String> rightuserls = new ArrayList<>();
        if(redisTemplate.type("rooms:"+ roomId +":rightuserlist")!=null){
            List<Object> range = redisTemplate.opsForList().range("rooms:"+ roomId +":rightuserlist", 0, -1);
            for (Object o : range) {
                rightuserls.add((String) o);
            }
            responseRoomInfoDto.setRight_user_list(rightuserls);
        } else{
            responseRoomInfoDto.setRight_user_list(rightuserls);
        }
    }

    private void setPhaseAndTime(ResponseRoomInfoDto responseRoomInfoDto, Long roomId) {
        // 토론 방 페이즈
        String phasekey = "rooms:"+ roomId +":phase";
        // 토론 방 페이즈의 시작 시간
        String phasestarttimekey = "rooms:"+ roomId +":phasetime";
        Integer resphase = (Integer) redisTemplate.opsForValue().get(phasekey);
        Long phaseStarttime = ((Integer) redisTemplate.opsForValue().get(phasestarttimekey)).longValue();
        System.out.println(redisTemplate.opsForValue().get(phasestarttimekey));
        System.out.println("phaseStarttime"+phaseStarttime);
        Long currentTime = System.currentTimeMillis() / 1000L;
        Long timeDifference = currentTime - phaseStarttime;
        Integer minutes = (int) ((timeDifference / 60) % 60);
        Integer seconds = (int) (timeDifference % 60);

        String currentPhaseTime = minutes+":"+seconds;

        responseRoomInfoDto.setRoom_phase(resphase);
        responseRoomInfoDto.setRoom_phase_current_time_minute(minutes);
        responseRoomInfoDto.setRoom_phase_current_time_second(seconds);
    }

//    private void setWatchCnt(ResponseRoomInfoDto responseRoomInfoDto, Long roomId) {
//        // 토론 방 페이즈의 시청자 수 방 생성시는 0
//        String watchcnt = "rooms:"+ roomId +":watchcnt";
//        Integer reswatchcnt = (Integer) redisTemplate.opsForValue().get(watchcnt);
//
//        responseRoomInfoDto.setRoom_watch_cnt(reswatchcnt);
//    }


}
