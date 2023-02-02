package com.agora.server.room.service;

import com.agora.server.room.controller.dto.ModalRoomSearchCondition;
import com.agora.server.room.controller.dto.ResponseRoomInfoDto;
import com.agora.server.room.controller.dto.RoomSearchCondition;
import com.agora.server.room.domain.Room;
import com.agora.server.room.repository.RoomQueryRepository;
import com.agora.server.room.repository.RoomRepository;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@EnableScheduling
public class RoomService {

    private final RoomRepository roomRepository;

    private final RoomQueryRepository roomQueryRepository;

    private final UserRepository userRepository;

    private final RedisTemplate<String, Object> redisTemplate;


    /**
     * 방 생성
     * 방 생성과 동시에 불변 값들은 DB에
     * 실시간 변화 값들은 Redis에 저장
     * @param createdRoom
     * @return
     */
    public Long createRoom(Room createdRoom) {
        // DB에 방 생성
        Long roomId = roomRepository.save(createdRoom).getRoom_id();

        // Redis에 "rooms:토론방id:column명" 을 key로 필요한 정보들 저장
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();

        // 토론 방 페이즈 방 생성시는 0
        String phase = "rooms:" + roomId + ":phase";
        // 토론 방 페이즈의 시작 시간 방 생성시는 0
        String phasestarttime = "rooms:" + roomId + ":phasetime";
        // 토론 방 페이즈의 시청자 수 방 생성시는 0
        String watchcnt = "rooms:" + roomId + ":watchcnt";

        // 저장
        valueOperations.set(phase, 0);
        valueOperations.set(phasestarttime, 0);
        valueOperations.set(watchcnt, 0);

        return roomId;
    }

    /**
     * 토론자 토론방 입장
     * 토론자가 토론방에 입장하면서
     * Redis의 rooms:roomId:leftuserlist key에 list형식으로
     * 토론자의 닉네임이 저장 됩니다
     * @param userId
     * @param roomId
     * @param side
     * @return
     */
    public boolean enterRoom(UUID userId, Long roomId, Integer side) {
        User user = userRepository.findById(userId).get();

        String userNickname = user.getUser_nickname();
        ListOperations<String, Object> stringObjectListOperations = redisTemplate.opsForList();

        try {
            // side 0 == LEFT SIDE로 가정
            if (side == 0) {
                String leftuserlist = "rooms:" + roomId + ":leftuserlist";
                stringObjectListOperations.rightPushAll(leftuserlist, userNickname);
                return true;
            // side 1 == RIGHT SIDE로 가정
            } else if (side == 1) {
                String rightuserlist = "rooms:" + roomId + ":rightuserlist";
                stringObjectListOperations.rightPush(rightuserlist, userNickname);
                return true;
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }


    /**
     * 토론방에서 토론 페이즈 시작
     * 토론 페이즈가 시작하면
     * Redis에 토론 페이즈와 토론 페이즈 시작시간이 저장됩니다.
     * @param roomId
     * @param phase
     * @return
     */
    public Long roomPhaseStart(Long roomId, Integer phase) {

        // Redis에 "rooms:토론방id:column명" 을 key로 필요한 정보들 저장
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();

        // 토론 방 페이즈
        String phasekey = "rooms:" + roomId + ":phase";

        // 토론 방 페이즈 시작시간
        String phasestarttimekey = "rooms:" + roomId + ":phasetime";

        Long serverTime = System.currentTimeMillis() / 1000L;

        // 저장
        valueOperations.set(phasekey, phase);
        valueOperations.set(phasestarttimekey, serverTime);

        return roomId;
    }

    /**
     * 화제의토론 Top5 검색
     * 시청자순으로 상위 5개의 토론 방 정보를 반환합니다
     * @return
     */
    public List<ResponseRoomInfoDto> searchHot5() {
        List<ResponseRoomInfoDto> byWatchCntTop5 = roomQueryRepository.findByWatchCntTop5();
        setRedisDataList(byWatchCntTop5);
        return byWatchCntTop5;
    }


    /**
     * 검색창 드랍다운
     * 각 항목별 최대 2개의 방 정보가 리턴됩니다
     * 해시태그만 있을 시 -> 해시태그 검색 정보
     * 일반검색어만 있을 시 -> 일반 검색어로 방 제목, 방장 이름 검색
     * 해시태그+일반검색어가 있을시 -> 해시태그 검색 정보 X, 해시태그+일반검색 둘다 적용되는 방 제목, 방장 이름 검색 제공
     * @param roomSearchCondition
     * @return
     */
    public Map<String, List<ResponseRoomInfoDto>> searchDropdown(RoomSearchCondition roomSearchCondition) {
        Map<String, List<ResponseRoomInfoDto>> searchMap = new HashMap<>();
        if (roomSearchCondition.getSearchWord().length() == 0 && roomSearchCondition.getHashTags().size() > 0) {
            List<ResponseRoomInfoDto> byHashTags = roomQueryRepository.findByHashTags(roomSearchCondition);
            setRedisDataList(byHashTags);
            searchMap.put("findByHashTags", byHashTags);
        } else {
            searchMap.put("findByHashTags", new ArrayList<>());
        }
        if (roomSearchCondition.getSearchWord().length() > 0) {
            List<ResponseRoomInfoDto> bySearchWordRoomName = roomQueryRepository.findBySearchWordRoomName(roomSearchCondition);
            setRedisDataList(bySearchWordRoomName);
            searchMap.put("searchByRoomName", bySearchWordRoomName);
            List<ResponseRoomInfoDto> bySearchWordCreaterName = roomQueryRepository.findBySearchWordCreaterName(roomSearchCondition);
            setRedisDataList(bySearchWordCreaterName);
            searchMap.put("searchByCreaterName", bySearchWordCreaterName);
        } else {
            searchMap.put("searchByRoomName", new ArrayList<>());
            searchMap.put("searchByCreaterName", new ArrayList<>());
        }
        return searchMap;
    }

    /**
     * 열띤 토론중
     * 토론 중인 토론방의 정보를 10개 반환합니다
     * 메인화면 중단 표시용
     * @return
     */
    public List<ResponseRoomInfoDto> topInprogress() {
        List<ResponseRoomInfoDto> byWatchCntInprogress = roomQueryRepository.findByWatchCntInprogress();
        setRedisDataList(byWatchCntInprogress);
        return byWatchCntInprogress;
    }

    /**
     * 토론 대기중
     * 토론 중인 토론방의 정보를 10개 반환합니다
     * 메인화면 하단 표시용
     * @return
     */
    public List<ResponseRoomInfoDto> topReadystate() {
        List<ResponseRoomInfoDto> byWatchCntReadystate = roomQueryRepository.findByWatchCntReadystate();
        setRedisDataList(byWatchCntReadystate);
        return byWatchCntReadystate;
    }

    /**
     * 나의 취향 Top 5
     * 유저의 카테고리 리스트를 받아
     * 그 카테고리에 해당되는 토론방을 시청자 순으로 5명까지 반환합니다
     * @param categories
     * @return
     */
    public List<ResponseRoomInfoDto> searchTopCategory(List<String> categories) {
        List<ResponseRoomInfoDto> byCategories = roomQueryRepository.findByCategories(categories);
        setRedisDataList(byCategories);
        return byCategories;
    }

    /**
     * 드랍다운의 해시태그 검색 모두보기
     * 검색에 잡히는 모든 리스트를 페이징해서 리턴합니다
     * @param condition
     * @param pageable
     * @return
     */
    public Page<ResponseRoomInfoDto> searchShowallHashTags(RoomSearchCondition condition, Pageable pageable) {
        Page<ResponseRoomInfoDto> allByHashTagsPages = roomQueryRepository.findAllByHashTagsPages(condition, pageable);
        setRedisDataPage(allByHashTagsPages);
        return allByHashTagsPages;
    }

    /**
     * 드랍다운의 방 제목 검색 모두보기
     * 검색에 잡히는 모든 리스트를 페이징해서 리턴합니다
     * @param condition
     * @param pageable
     * @return
     */
    public Page<ResponseRoomInfoDto> searchShowallRoomname(RoomSearchCondition condition, Pageable pageable) {
        Page<ResponseRoomInfoDto> allByRoomnamePages = roomQueryRepository.findAllByRoomnamePages(condition, pageable);
        setRedisDataPage(allByRoomnamePages);
        return allByRoomnamePages;
    }

    /**
     * 드랍다운의 방장 이름 검색 모두보기
     * 검색에 잡히는 모든 리스트를 페이징해서 리턴합니다
     * @param condition
     * @param pageable
     * @return
     */
    public Page<ResponseRoomInfoDto> searchShowallCreatername(RoomSearchCondition condition, Pageable pageable) {
        Page<ResponseRoomInfoDto> allByCreaternamePages = roomQueryRepository.findAllByCreaternamePages(condition, pageable);
        setRedisDataPage(allByCreaternamePages);
        return allByCreaternamePages;
    }

    /**
     * 모달창의 방 조회 기능
     * 클라이언트에서 보내는 토론 중 여부, 카테고리, 정렬기준으로 토론방을 조회하여
     * 모두보기를 눌렀을때 뜨는 모달창에 띄울 페이징한 정보를 반환합니다.
     * @param modalRoomSearchCondition
     * @param pageable
     * @return
     */
    public Page<ResponseRoomInfoDto> modalRoomSearch(ModalRoomSearchCondition modalRoomSearchCondition, Pageable pageable) {
        Page<ResponseRoomInfoDto> allByModalConditionPages = roomQueryRepository.findAllByModalConditionPages(modalRoomSearchCondition, pageable);
        setRedisDataPage(allByModalConditionPages);
        return allByModalConditionPages;
    }

    /**
     * Redis에서 토론방 참가자 유저리스트 가져와 responseRoomInfoDto에 담는 메서드
     * @param responseRoomInfoDto
     * @param roomId
     */
    private void setUserLists(ResponseRoomInfoDto responseRoomInfoDto, Long roomId) {
        String leftuserlist = "rooms:" + roomId + ":leftuserlist";
        ArrayList<String> leftuserls = new ArrayList<>();
        if (redisTemplate.type("rooms:" + roomId + ":leftuserlist") != null) {
            List<Object> range = redisTemplate.opsForList().range("rooms:" + roomId + ":leftuserlist", 0, -1);
            for (Object o : range) {
                leftuserls.add((String) o);
            }
            responseRoomInfoDto.setLeft_user_list(leftuserls);
        } else {
            responseRoomInfoDto.setLeft_user_list(leftuserls);
        }

        String rightuserlist = "rooms:" + roomId + ":rightuserlist";
        ArrayList<String> rightuserls = new ArrayList<>();
        if (redisTemplate.type("rooms:" + roomId + ":rightuserlist") != null) {
            List<Object> range = redisTemplate.opsForList().range("rooms:" + roomId + ":rightuserlist", 0, -1);
            for (Object o : range) {
                rightuserls.add((String) o);
            }
            responseRoomInfoDto.setRight_user_list(rightuserls);
        } else {
            responseRoomInfoDto.setRight_user_list(rightuserls);
        }
    }

    /**
     * Redis에서 현재 Phase와 Phase의 시작시간을 가져와서
     * Phase와 Phase의 진행시간을 responseRoomInfoDto에 담는 메서드
     * Phase의 진행시간은 서버에서 계산합니다
     * @param responseRoomInfoDto
     * @param roomId
     */
    private void setPhaseAndTime(ResponseRoomInfoDto responseRoomInfoDto, Long roomId) {
        // 토론 방 페이즈
        String phasekey = "rooms:" + roomId + ":phase";
        // 토론 방 페이즈의 시작 시간
        String phasestarttimekey = "rooms:" + roomId + ":phasetime";
        Integer resphase = (Integer) redisTemplate.opsForValue().get(phasekey);
        Long phaseStarttime = ((Integer) redisTemplate.opsForValue().get(phasestarttimekey)).longValue();

        Long currentTime = System.currentTimeMillis() / 1000L;
        Long timeDifference = currentTime - phaseStarttime;
        Integer minutes = (int) ((timeDifference / 60) % 60);
        Integer seconds = (int) (timeDifference % 60);

        responseRoomInfoDto.setRoom_phase(resphase);
        responseRoomInfoDto.setRoom_phase_current_time_minute(minutes);
        responseRoomInfoDto.setRoom_phase_current_time_second(seconds);
    }


    /**
     * 10초마다 Redis의 실시간 시청자 수 정보를 가져와서
     * DB의 실시간 시청자 수 정보를 갱신합니다
     */
    @Scheduled(cron = "0/10 * * * * *")
    @Transactional
    public void updateViewCount() {
        List<Room> all = roomRepository.findAll();
        for (Room room : all) {
            Long roomId = room.getRoom_id();
            String watchcntKey = "rooms:" + roomId + ":watchcnt";
            Integer watchcnt = (Integer) redisTemplate.opsForValue().get(watchcntKey);
            room.roomWatchCntUpdate(watchcnt);
        }
    }

    /**
     * DB정보와 Redis정보를 합치는 편의 메서드
     * @param dtoList
     */
    private void setRedisDataList(List<ResponseRoomInfoDto> dtoList) {
        for (ResponseRoomInfoDto responseRoomInfoDto : dtoList) {
            Long roomId = responseRoomInfoDto.getRoom_id();
            setUserLists(responseRoomInfoDto, roomId);
            setPhaseAndTime(responseRoomInfoDto, roomId);
        }
    }

    /**
     * DB정보와 Redis정보를 합치는 편의 메서드
     * @param allByHashTagsPages
     */
    private void setRedisDataPage(Page<ResponseRoomInfoDto> allByHashTagsPages) {
        for (ResponseRoomInfoDto allByHashTagsPage : allByHashTagsPages) {
            Long roomId = allByHashTagsPage.getRoom_id();
            setUserLists(allByHashTagsPage, roomId);
            setPhaseAndTime(allByHashTagsPage, roomId);
        }
    }

}
