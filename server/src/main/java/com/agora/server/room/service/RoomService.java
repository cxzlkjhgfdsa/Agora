package com.agora.server.room.service;

import com.agora.server.room.controller.dto.*;
import com.agora.server.room.domain.Room;
import com.agora.server.room.exception.DebateEndedException;
import com.agora.server.room.repository.RoomQueryRepository;
import com.agora.server.room.repository.RoomRepository;
import com.agora.server.room.util.RedisKeyUtil;
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

    private final RedisKeyUtil redisKeyUtil;

    /**
     * 방 생성
     * 방 생성과 동시에 불변 값들은 DB에
     * 실시간 변화 값들은 Redis에 저장
     *
     * @param createdRoom
     * @return
     */
    public Long createRoom(Room createdRoom) {
        // DB에 방 생성
        Long roomId = roomRepository.save(createdRoom).getRoom_id();

        // Redis에 "room:토론방id:column명" 을 key로 필요한 정보들 저장
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();

        // 토론 방 페이즈 방 생성시는 0
        String phaseKey = redisKeyUtil.phaseKey(roomId);
        // 토론 방 페이즈 디테일 방 생성시는 0
        String phaseDetailKey = redisKeyUtil.phaseDetailKey(roomId);
        // 토론 방 페이즈의 시작 시간 방 생성시는 0
        String phaseStartTimeKey = redisKeyUtil.phaseStartTimeKey(roomId);
        // 토론 방의 시청자 수 방 생성시는 0
        String watchCntKey = redisKeyUtil.watchCntKey(roomId);
        // 토론이 끝났는지 확인하는 키 시작은 false
        String debateEndedKey = redisKeyUtil.isDebateEndedKey(roomId);


        // 저장
        valueOperations.set(phaseKey, 0);
        valueOperations.set(phaseDetailKey, 0);
        valueOperations.set(phaseStartTimeKey, 0);
        valueOperations.set(watchCntKey, 0);
        valueOperations.set(debateEndedKey, "FALSE");

        return roomId;
    }

    /**
     * 토론자 토론방 입장
     * 토론자가 토론방에 입장하면서
     * Redis의 room:roomId:leftuserlist key에 list형식으로
     * 토론자의 닉네임이 저장 됩니다
     * <p>
     * Redis의 room:roomId:userNickname:isReady key에 String 형식으로
     * 토론자의 ready여부가 저장 됩니다.
     * 입장시 이므로 ready여부는 FALSE로 들어갑니다
     *
     * @param userNickname
     * @param roomId
     * @param userTeam
     * @return
     */
    public boolean enterRoomAsDebater(String userNickname, Long roomId, String userTeam) {
//        User user = userRepository.findById(userId).get();

        ListOperations<String, Object> stringObjectListOperations = redisTemplate.opsForList();
        ValueOperations<String, Object> stringObjectValueOperations = redisTemplate.opsForValue();

        String debateEndedKey = redisKeyUtil.isDebateEndedKey(roomId);
        String isEnded = (String) redisTemplate.opsForValue().get(debateEndedKey);
        if (isEnded.equals("TRUE")) {
            throw new DebateEndedException("토론이 끝났습니다");
        }

        try {

            String userisReadyKey = redisKeyUtil.isReadyKey(roomId, userNickname);
            String watchCntKey = redisKeyUtil.watchCntKey(roomId);

            // side 0 == LEFT SIDE로 가정
            if (userTeam.equals("LEFT")) {
                String leftUserListKey = redisKeyUtil.leftUserListKey(roomId);
                stringObjectListOperations.rightPush(leftUserListKey, userNickname);
                stringObjectValueOperations.set(userisReadyKey, "FALSE");

                stringObjectValueOperations.increment(watchCntKey);
                return true;
                // side 1 == RIGHT SIDE로 가정
            } else if (userTeam.equals("RIGHT")) {
                String rightUserListKey = redisKeyUtil.rightUserListKey(roomId);
                stringObjectListOperations.rightPush(rightUserListKey, userNickname);
                stringObjectValueOperations.set(userisReadyKey, "FALSE");

                stringObjectValueOperations.increment(watchCntKey);
                return true;
            }
        } catch (Exception e) {
            return false;
        }

        return false;
    }

    public boolean enterRoomAsWatcher(Long roomId) {

        String debateEndedKey = redisKeyUtil.isDebateEndedKey(roomId);
        String isEnded = (String) redisTemplate.opsForValue().get(debateEndedKey);
        if (isEnded.equals("TRUE")) {
            throw new DebateEndedException("토론이 끝났습니다");
        }

        ValueOperations<String, Object> stringObjectValueOperations = redisTemplate.opsForValue();

        String watchCntKey = redisKeyUtil.watchCntKey(roomId);

        stringObjectValueOperations.increment(watchCntKey);

        return false;
    }


    /**
     * 토론자 토론방 퇴장
     * 토론자가 토론방에 퇴장하면서
     * Redis의 room:roomId:leftuserlist key의 list에서
     * 토론자의 닉네임이 삭제 됩니다
     * <p>
     * Redis의 room:roomId:userNickname:isReady key도 삭제합니다
     *
     * @param userNickname
     * @param roomId
     * @param side
     * @return
     */
    public boolean leaveRoomAsDebater(String userNickname, Long roomId, String userTeam) {

        ListOperations<String, Object> stringObjectListOperations = redisTemplate.opsForList();
        ValueOperations<String, Object> stringObjectValueOperations = redisTemplate.opsForValue();

        try {
            String userisReadyKey = redisKeyUtil.isReadyKey(roomId, userNickname);

            // side 0 == LEFT SIDE로 가정
            if (userTeam.equals("LEFT")) {
                String leftUserList = redisKeyUtil.leftUserListKey(roomId);
                stringObjectListOperations.remove(leftUserList, 0, userNickname);
                redisTemplate.delete(userisReadyKey);

                String watchCntKey = redisKeyUtil.watchCntKey(roomId);
                stringObjectValueOperations.decrement(watchCntKey);
                return true;
                // side 1 == RIGHT SIDE로 가정
            } else if (userTeam.equals("RIGHT")) {
                String rightUserList = redisKeyUtil.rightUserListKey(roomId);
                stringObjectListOperations.remove(rightUserList, 0, userNickname);
                redisTemplate.delete(userisReadyKey);

                String watchCntKey = redisKeyUtil.watchCntKey(roomId);
                stringObjectValueOperations.decrement(watchCntKey);
                return true;
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }

    public boolean leaveRoomAsWatcher(Long roomId) {

        ValueOperations<String, Object> stringObjectValueOperations = redisTemplate.opsForValue();

        String watchCntKey = redisKeyUtil.watchCntKey(roomId);

        stringObjectValueOperations.decrement(watchCntKey);

        return false;
    }


    /**
     * 더미데이터 인풋용
     * DebateService에서 토론 페이즈 시작 다시 만듬
     * <p>
     * 토론방에서 토론 페이즈 시작
     * 토론 페이즈가 시작하면
     * Redis에 토론 페이즈와 토론 페이즈 시작시간이 저장됩니다.
     *
     * @param roomId
     * @param phase
     * @return
     */
    public Long roomPhaseStart(Long roomId, Integer phase) {

        // Redis에 "room:토론방id:column명" 을 key로 필요한 정보들 저장
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();

        // 토론 방 페이즈
        String phaseKey = redisKeyUtil.phaseKey(roomId);

        // 토론 방 페이즈 시작시간
        String phaseStartTimeKey = redisKeyUtil.phaseStartTimeKey(roomId);

        Long serverTime = System.currentTimeMillis() / 1000L;

        // 저장
        valueOperations.set(phaseKey, phase);
        valueOperations.set(phaseStartTimeKey, serverTime);

        return roomId;
    }

    /**
     * 화제의토론 Top5 검색
     * 시청자순으로 상위 5개의 토론 방 정보를 반환합니다
     *
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
     *
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
     *
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
     *
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
     *
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
     *
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
     *
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
     *
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
     *
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
     *
     * @param responseRoomInfoDto
     * @param roomId
     */
    private void setUserLists(ResponseRoomInfoDto responseRoomInfoDto, Long roomId) {
        String leftUserListKey = redisKeyUtil.leftUserListKey(roomId);
        ArrayList<String> leftUserList = new ArrayList<>();
        if (redisTemplate.type(leftUserListKey) != null) {
            List<Object> range = redisTemplate.opsForList().range(leftUserListKey, 0, -1);
            for (Object o : range) {
                leftUserList.add((String) o);
            }
            responseRoomInfoDto.setLeftUserList(leftUserList);
        } else {
            responseRoomInfoDto.setLeftUserList(leftUserList);
        }

        String rightUserListKey = redisKeyUtil.rightUserListKey(roomId);
        ArrayList<String> rightuserls = new ArrayList<>();
        if (redisTemplate.type(rightUserListKey) != null) {
            List<Object> range = redisTemplate.opsForList().range(rightUserListKey, 0, -1);
            for (Object o : range) {
                rightuserls.add((String) o);
            }
            responseRoomInfoDto.setRightUserList(rightuserls);
        } else {
            responseRoomInfoDto.setRightUserList(rightuserls);
        }
    }

    /**
     * Redis에서 현재 Phase와 Phase의 시작시간을 가져와서
     * Phase와 Phase의 진행시간을 responseRoomInfoDto에 담는 메서드
     * Phase의 진행시간은 서버에서 계산합니다
     *
     * @param responseRoomInfoDto
     * @param roomId
     */
    private void setPhaseAndTime(ResponseRoomInfoDto responseRoomInfoDto, Long roomId) {
        // 토론 방 페이즈
        String phaseKey = redisKeyUtil.phaseKey(roomId);
        // 토론 방 페이즈의 시작 시간
        String phaseStartTimeKey = redisKeyUtil.phaseStartTimeKey(roomId);
        Integer resphase = (Integer) redisTemplate.opsForValue().get(phaseKey);
        Long phaseStarttime = ((Integer) redisTemplate.opsForValue().get(phaseStartTimeKey)).longValue();

        Long currentTime = System.currentTimeMillis() / 1000L;
        Long timeDifference = currentTime - phaseStarttime;
        Integer minutes = (int) ((timeDifference / 60) % 60);
        Integer seconds = (int) (timeDifference % 60);

        responseRoomInfoDto.setRoomPhase(resphase);
        responseRoomInfoDto.setRoomPhaseCurrentTimeMinute(minutes);
        responseRoomInfoDto.setRoomPhaseCurrentTimeSecond(seconds);
    }


    /**
     * 10초마다 Redis의 실시간 시청자 수 정보를 가져와서
     * DB의 실시간 시청자 수 정보를 갱신합니다
     */
//    @Scheduled(cron = "0/10 * * * * *")
//    @Transactional
//    public void updateViewCount() {
//        List<Room> all = roomRepository.findAll();
//        for (Room room : all) {
//            Long roomId = room.getRoom_id();
//            String watchCntKey = redisKeyUtil.watchCntKey(roomId);
//            Integer watchCnt = (Integer) redisTemplate.opsForValue().get(watchCntKey);
//            room.roomWatchCntUpdate(watchCnt);
//        }
//    }

    /**
     * DB정보와 Redis정보를 합치는 편의 메서드
     *
     * @param dtoList
     */
    private void setRedisDataList(List<ResponseRoomInfoDto> dtoList) {
        for (ResponseRoomInfoDto responseRoomInfoDto : dtoList) {
            Long roomId = responseRoomInfoDto.getRoomId();
            setUserLists(responseRoomInfoDto, roomId);
            setPhaseAndTime(responseRoomInfoDto, roomId);
        }
    }

    /**
     * DB정보와 Redis정보를 합치는 편의 메서드
     *
     * @param allByHashTagsPages
     */
    private void setRedisDataPage(Page<ResponseRoomInfoDto> allByHashTagsPages) {
        for (ResponseRoomInfoDto allByHashTagsPage : allByHashTagsPages) {
            Long roomId = allByHashTagsPage.getRoomId();
            setUserLists(allByHashTagsPage, roomId);
            setPhaseAndTime(allByHashTagsPage, roomId);
        }
    }

    @Transactional
    public void roomStart(Long roomId) {
        Room room = roomRepository.findById(roomId).get();
        room.roomStartDebate();
    }


    /**
     * 시작 하기 전과 후에 null 값 나올 수 있는 것들 생각해서 나눠놓기
     *
     * @param responseRoomEnterDto
     * @param roomId
     */
    public void enterRoom(ResponseRoomEnterDto responseRoomEnterDto, Long roomId) {

        Room room = roomRepository.findById(roomId).get();

        responseRoomEnterDto.setRoomCreaterName(room.getRoom_creater_name());
        responseRoomEnterDto.setRoomName(room.getRoom_name());
        responseRoomEnterDto.setRoomOpinionLeft(room.getRoom_opinion_left());
        responseRoomEnterDto.setRoomOpinionRight(room.getRoom_opinion_right());
        boolean roomState = room.isRoom_state();
        responseRoomEnterDto.setRoomState(roomState);

        String leftUserListKey = redisKeyUtil.leftUserListKey(roomId);
        ArrayList<String> leftUserList = new ArrayList<>();
        ArrayList<String> readyUserList = new ArrayList<>();

        if (redisTemplate.type(leftUserListKey) != null) {
            List<Object> range = redisTemplate.opsForList().range(leftUserListKey, 0, -1);
            for (Object o : range) {
                String userNickname = (String) o;
                leftUserList.add(userNickname);

                if (roomState == false) {
                    Object o1 = redisTemplate.opsForValue().get(redisKeyUtil.isReadyKey(roomId, userNickname));
                    String isReady = (String) o1;
                    if (isReady.equals("TRUE")) {
                        readyUserList.add(userNickname);
                    }
                }
            }
            responseRoomEnterDto.setLeftUserList(leftUserList);
        } else {
            responseRoomEnterDto.setLeftUserList(leftUserList);
        }

        String rightUserListKey = redisKeyUtil.rightUserListKey(roomId);
        ArrayList<String> rightuserls = new ArrayList<>();
        if (redisTemplate.type(rightUserListKey) != null) {
            List<Object> range = redisTemplate.opsForList().range(rightUserListKey, 0, -1);
            for (Object o : range) {
                String userNickname = (String) o;
                rightuserls.add(userNickname);
                if (roomState == false) {
                    Object o1 = redisTemplate.opsForValue().get(redisKeyUtil.isReadyKey(roomId, userNickname));
                    String isReady = (String) o1;
                    if (isReady.equals("TRUE")) {
                        readyUserList.add(userNickname);
                    }
                }
            }
            responseRoomEnterDto.setRightUserList(rightuserls);
        } else {
            responseRoomEnterDto.setRightUserList(rightuserls);
        }
        responseRoomEnterDto.setReadyUserList(readyUserList);

        if (readyUserList.size() == 6) {
            responseRoomEnterDto.setIsAllReady(true);
        } else {
            responseRoomEnterDto.setIsAllReady(false);
        }


        String watchCntKey = redisKeyUtil.watchCntKey(roomId);
        Integer roomWatchCnt = (Integer) redisTemplate.opsForValue().get(watchCntKey);
        responseRoomEnterDto.setRoomWatchCnt(roomWatchCnt);


        /**
         * 토론 중간에 들어오는 경우
         * ex) 2페이즈 중에 들어오면
         * 투표 결과는 1페이즈까지 있을 것입니다
         * 따라서 1페이즈까지의 투표 결과만 저장해서 보내줍니다
         */

        if (roomState == true) {

            String phaseKey = redisKeyUtil.phaseKey(roomId);
            Integer phase = (Integer) redisTemplate.opsForValue().get(phaseKey);

            List<Integer> voteLeftResultList = new ArrayList<>();
            List<Integer> voteRightResultList = new ArrayList<>();
            if (phase != 0) {
                for (int votePhase = 1; votePhase < phase; votePhase++) {
                    String voteLeftKey = redisKeyUtil.voteLeftKey(roomId, votePhase);
                    String voteRightKey = redisKeyUtil.voteRightKey(roomId, votePhase);

                    Integer voteLeftResult = (Integer) redisTemplate.opsForValue().get(voteLeftKey);
                    Integer voteRightResult = (Integer) redisTemplate.opsForValue().get(voteRightKey);

                    voteLeftResultList.add(voteLeftResult);
                    voteRightResultList.add(voteRightResult);
                }
            }

            responseRoomEnterDto.setVoteLeftResultsList(voteLeftResultList);
            responseRoomEnterDto.setVoteRightResultsList(voteRightResultList);


            String currentSpeakingUserKey = redisKeyUtil.currentSpeakingUserKey(roomId);
            String currentSpeakingTeamKey = redisKeyUtil.currentSpeakingTeamKey(roomId);
            String phaseDetailKey = redisKeyUtil.phaseDetailKey(roomId);

            String currentUserNickName = (String) redisTemplate.opsForValue().get(currentSpeakingUserKey);
            String currentUserTeam = (String) redisTemplate.opsForValue().get(currentSpeakingTeamKey);
            Integer phaseDetail = (Integer) redisTemplate.opsForValue().get(phaseDetailKey);

            responseRoomEnterDto.setCurrentSpeakingUser(currentUserNickName);
            responseRoomEnterDto.setCurrentSpeakingTeam(currentUserTeam);

            String phaseStartTimeKey = redisKeyUtil.phaseStartTimeKey(roomId);

            Long phaseStarttime = ((Integer) redisTemplate.opsForValue().get(phaseStartTimeKey)).longValue();

            Long currentTime = System.currentTimeMillis() / 1000L;
            Long timeDifference = currentTime - phaseStarttime;
            Integer minutes = (int) ((timeDifference / 60) % 60);
            Integer seconds = (int) (timeDifference % 60);


            responseRoomEnterDto.setRoomPhaseCurrentTimeMinute(minutes);
            responseRoomEnterDto.setRoomPhaseCurrentTimeSecond(seconds);
            responseRoomEnterDto.setRoomPhase(phase);
            responseRoomEnterDto.setRoomPhaseDeatil(phaseDetail);

            String leftImgCardOpenedListKey = redisKeyUtil.imgCardOpenedListKey(roomId, "LEFT");
            List<Object> oleftCardOpenedList = redisTemplate.opsForList().range(leftImgCardOpenedListKey, 0, -1);
            List<String> leftCardOpenedList = new ArrayList<>();
            if (oleftCardOpenedList != null) {
                for (Object o : oleftCardOpenedList) {
                    leftCardOpenedList.add((String) o);
                }
            }
            responseRoomEnterDto.setLeftOpenedCardList(leftCardOpenedList);
            String rightImgCardOpenedListKey = redisKeyUtil.imgCardOpenedListKey(roomId, "RIGHT");
            List<Object> orightCardOpenedList = redisTemplate.opsForList().range(rightImgCardOpenedListKey, 0, -1);
            List<String> rightCardOpenedList = new ArrayList<>();
            if (orightCardOpenedList != null) {
                for (Object o : orightCardOpenedList) {
                    rightCardOpenedList.add((String) o);
                }
            }
            responseRoomEnterDto.setRightOpenedCardList(rightCardOpenedList);


        } else {
            responseRoomEnterDto.setVoteLeftResultsList(new ArrayList<>());
            responseRoomEnterDto.setVoteRightResultsList(new ArrayList<>());
            responseRoomEnterDto.setCurrentSpeakingUser("");
            responseRoomEnterDto.setCurrentSpeakingTeam("");
            responseRoomEnterDto.setRoomPhaseCurrentTimeMinute(0);
            responseRoomEnterDto.setRoomPhaseCurrentTimeSecond(0);
            responseRoomEnterDto.setRoomPhase(0);
            responseRoomEnterDto.setRoomPhaseDeatil(0);
            responseRoomEnterDto.setLeftOpenedCardList(new ArrayList<>());
            responseRoomEnterDto.setRightOpenedCardList(new ArrayList<>());
        }

    }
}

