package com.agora.server.room.service;

import com.agora.server.debatehistory.domain.DebateHistory;
import com.agora.server.debatehistory.service.DebateHistoryService;
import com.agora.server.file.dto.FileDto;
import com.agora.server.file.service.FileService;
import com.agora.server.room.controller.dto.RequestDebateStartDto;
import com.agora.server.room.controller.dto.RequestRoomEnterAsDebaterDto;
import com.agora.server.room.controller.dto.RequestRoomLeaveDto;
import com.agora.server.room.controller.dto.debate.RequestReadyStateChangeDto;
import com.agora.server.room.controller.dto.debate.RequestSkipDto;
import com.agora.server.room.controller.dto.debate.RequestVoteDto;
import com.agora.server.room.exception.NotReadyException;
import com.agora.server.room.repository.RoomRepository;
import com.agora.server.room.util.RedisChannelUtil;
import com.agora.server.room.util.RedisKeyUtil;
import com.agora.server.room.util.RedisMessageUtil;
import com.agora.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class DebateService {


    private final RedisPublisher redisPublisher;

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final FileService fileService;

    private final RedisTemplate<String, Object> redisTemplate;

    private final Map<String, ScheduledFuture<?>> scheduledFutures;

    private final RedisKeyUtil redisKeyUtil;

    private final RedisChannelUtil redisChannelUtil;

    private final RedisMessageUtil redisMessageUtil;

    private final DebateHistoryService debateHistoryService;

    private final Map<String, List<SseEmitter>> roomEmitterMap;

    /**
     * 토론자 입장 Redis Pub/Sub
     * <p>
     * 클라이언트단에서 Redis에 보낼 명령어
     * 왼쪽팀으로 입장시 SUBSCRIBE room:roomId room:roomId:debater room:roomId:left
     * 오른쪽팀으로 입장시 SUBSCRIBE room:roomId room:roomId:debater room:roomId:right
     * (왼쪽팀 기준 room:roomId, room:roomId:debate, room:roomId:left 세 개의 채널을 구독하는 명령어입니다)
     * <p>
     * 서버에서 Redis에 보낼 명령어
     * room:roomId 채널에 토론자 입장 여부 알리는 메시지 송신
     * PUBLISH room:roomId [ENTER][LEFT] 토론자닉네임
     * -> 왼쪽 팀에 토론자 입장
     * PUBLISH room:roomId [ENTER][RIGHT] 토론자닉네임
     * -> 오른쪽 팀에 토론자 입장
     * 클라이언트에서는 현재 토론자 왼쪽, 오른쪽 팀 리스트(닉네임)으로 가지고 있으므로
     * 이 메시지를 받으면 파싱해서 토론자 닉네임을 토론자 리스트에 추가 시키면 됩니다.
     */
    public void debaterEnter(RequestRoomEnterAsDebaterDto requestRoomEnterDto) {
        Long roomId = requestRoomEnterDto.getRoomId();
//        String userNickname = requestRoomEnterDto.getUserNickname();
//        String userTeam = requestRoomEnterDto.getUserTeam();

        String leftUserListKey = redisKeyUtil.leftUserListKey(roomId);
        String rightUserListKey = redisKeyUtil.rightUserListKey(roomId);
        List<Object> oleftUserList = redisTemplate.opsForList().range(leftUserListKey, 0, -1);
        List<Object> orightUserList = redisTemplate.opsForList().range(rightUserListKey, 0, -1);
        List<String> leftUserList = new ArrayList<>();
        List<String> rightUserList = new ArrayList<>();
        for (Object o : oleftUserList) {
            leftUserList.add((String) o);
        }
        for (Object o : orightUserList) {
            rightUserList.add((String) o);
        }
        String roomChannel = redisChannelUtil.roomChannelKey(roomId);
        String enterMessage = redisMessageUtil.enterMessage(leftUserList, rightUserList);

        redisPublisher.publishMessage(roomChannel, enterMessage);
    }

    /**
     * 토론자 퇴장 Redis Pub/Sub
     * <p>
     * 클라이언트단에서 Redis에 보낼 명령어
     * 퇴장시 UNSUBSCRIBE
     * (UNSUBSCRIBE는 현재 입장 채널에서 전부 나가는 Redis 명령어입니다)
     * <p>
     * 서버에서 Redis에 보낼 명령어
     * room:roomId 채널에 토론자 퇴장 여부 알리는 메시지 송신
     * PUBLISH room:roomId [LEAVE][LEFT] 토론자닉네임
     * -> 왼쪽 팀에서 토론자 퇴장
     * PUBLISH room:roomId [LEAVE][RIGHT] 토론자닉네임
     * -> 오른쪽 팀에서 토론자 퇴장
     * 클라이언트에서는 현재 토론자 왼쪽, 오른쪽 팀 리스트(닉네임)으로 가지고 있으므로
     * 이 메시지를 받으면 파싱해서 토론자 닉네임을 토론자 리스트에서 제거 시키면 됩니다.
     */
    public void debaterLeave(RequestRoomLeaveDto requestRoomLeaveDto) {

        Long roomId = requestRoomLeaveDto.getRoomId();
        String userNickname = requestRoomLeaveDto.getUserNickname();
        String userTeam = requestRoomLeaveDto.getUserTeam();

        String leftUserListKey = redisKeyUtil.leftUserListKey(roomId);
        String rightUserListKey = redisKeyUtil.leftUserListKey(roomId);
        List<Object> oleftUserList = redisTemplate.opsForList().range(leftUserListKey, 0, -1);
        List<Object> orightUserList = redisTemplate.opsForList().range(rightUserListKey, 0, -1);
        List<String> leftUserList = new ArrayList<>();
        List<String> rightUserList = new ArrayList<>();
        for (Object o : oleftUserList) {
            leftUserList.add((String) o);
        }
        for (Object o : orightUserList) {
            rightUserList.add((String) o);
        }

        String roomChannel = redisChannelUtil.roomChannelKey(roomId);
        String leaveMessage = redisMessageUtil.leaveMessage(leftUserList, rightUserList);

        redisPublisher.publishMessage(roomChannel, leaveMessage);
    }


    public void ready(RequestReadyStateChangeDto requestReadyStateChangeDto) {

        Long roomId = requestReadyStateChangeDto.getRoomId();
        String readyUserNickname = requestReadyStateChangeDto.getUserNickname();

        /**
         * Redis에서 레디상태 TRUE로 변경
         */
        String isReadyKey = redisKeyUtil.isReadyKey(roomId, readyUserNickname);
        redisTemplate.opsForValue().set(isReadyKey, "TRUE");

        /**
         * PubSub으로 보내줄 것들 가져오기
         */
        ArrayList<String> readyUserList = new ArrayList<>();

        String leftUserListKey = redisKeyUtil.leftUserListKey(roomId);
        ArrayList<String> leftUserList = new ArrayList<>();

        if (redisTemplate.type(leftUserListKey) != null) {
            List<Object> range = redisTemplate.opsForList().range(leftUserListKey, 0, -1);
            for (Object o : range) {
                String userNickname = (String) o;
                leftUserList.add(userNickname);
                Object o1 = redisTemplate.opsForValue().get(redisKeyUtil.isReadyKey(roomId, userNickname));
                String isReady = (String) o1;
                if (isReady.equals("TRUE")) {
                    readyUserList.add(userNickname);
                }
            }
        }

        String rightUserListKey = redisKeyUtil.rightUserListKey(roomId);
        ArrayList<String> rightuserls = new ArrayList<>();
        if (redisTemplate.type(rightUserListKey) != null) {
            List<Object> range = redisTemplate.opsForList().range(rightUserListKey, 0, -1);
            for (Object o : range) {
                String userNickname = (String) o;
                rightuserls.add(userNickname);
                Object o1 = redisTemplate.opsForValue().get(redisKeyUtil.isReadyKey(roomId, userNickname));
                String isReady = (String) o1;
                if (isReady.equals("TRUE")) {
                    readyUserList.add(userNickname);
                }
            }
        }

        Boolean isAllReady = false;
        if (readyUserList.size() == 6) {
            isAllReady = true;
        }

        String roomChannel = redisChannelUtil.roomChannelKey(roomId);
        String readyMessage = redisMessageUtil.readyMessage(isAllReady, readyUserList);
        redisPublisher.publishMessage(roomChannel, readyMessage);

    }


    public void unready(RequestReadyStateChangeDto requestReadyStateChangeDto) {

        Long roomId = requestReadyStateChangeDto.getRoomId();
        String unreadyUserNickname = requestReadyStateChangeDto.getUserNickname();

        /**
         * Redis에서 레디상태 FALSE로 변경
         */
        String isReadyKey = redisKeyUtil.isReadyKey(roomId, unreadyUserNickname);
        redisTemplate.opsForValue().set(isReadyKey, "FALSE");

        /**
         * PubSub으로 보내줄 것들 가져오기
         */
        ArrayList<String> readyUserList = new ArrayList<>();

        String leftUserListKey = redisKeyUtil.leftUserListKey(roomId);
        ArrayList<String> leftUserList = new ArrayList<>();

        if (redisTemplate.type(leftUserListKey) != null) {
            List<Object> range = redisTemplate.opsForList().range(leftUserListKey, 0, -1);
            for (Object o : range) {
                String userNickname = (String) o;
                leftUserList.add(userNickname);
                Object o1 = redisTemplate.opsForValue().get(redisKeyUtil.isReadyKey(roomId, userNickname));
                String isReady = (String) o1;
                if (isReady.equals("TRUE")) {
                    readyUserList.add(userNickname);
                }
            }
        }

        String rightUserListKey = redisKeyUtil.rightUserListKey(roomId);
        ArrayList<String> rightuserls = new ArrayList<>();
        if (redisTemplate.type(rightUserListKey) != null) {
            List<Object> range = redisTemplate.opsForList().range(rightUserListKey, 0, -1);
            for (Object o : range) {
                String userNickname = (String) o;
                rightuserls.add(userNickname);
                Object o1 = redisTemplate.opsForValue().get(redisKeyUtil.isReadyKey(roomId, userNickname));
                String isReady = (String) o1;
                if (isReady.equals("TRUE")) {
                    readyUserList.add(userNickname);
                }
            }
        }

        Boolean isAllReady = false;
        if (readyUserList.size() == 6) {
            isAllReady = true;
        }

        String roomChannel = redisChannelUtil.roomChannelKey(roomId);
        String unreadyMessage = redisMessageUtil.unreadyMessage(isAllReady, readyUserList);
        redisPublisher.publishMessage(roomChannel, unreadyMessage);

    }

    /**
     * 토론자 사진 카드 추가 Redis Pub/Sub
     * 룰 확정 후 추후 구현
     *
     * 클라이언트단에서 Redis에 보낼 명령어
     *
     * 서버에서 Redis에 보낼 명령어
     */

    /**
     * 관전자 입,퇴장 Redis Pub/Sub
     *
     * 클라이언트단에서 Redis에 보낼 명령어
     * 입장시 SUBSCRIBE room:roomId room:roomId:watcher
     * 퇴장시 UNSUBSCRIBE
     * 각 명령어를 redis 서버에 전송
     *
     * 서버에서 Redis에 보낼 명령어
     * 없습니다
     * 방 내에서 실시간 시청자 수 보여주는 기능을 만들게 되면 그 때는 관전자 입장 메시지를 보냅니다
     */


    /**
     * 토론 시작 Redis Pub/Sub
     * <p>
     * 클라이언트단에서 Redis에 보낼 명령어
     * 없습니다
     * <p>
     * 서버에서 Redis에 보낼 명령어
     * PUBLISH room:roomId [START] start debate
     * 토론 시작했으므로 isReady 정보는 전부 삭제
     */
    public void startDebate(RequestDebateStartDto requestDebateStartDto) throws NotReadyException {

        Long roomId = requestDebateStartDto.getRoomId();

        String leftUserListKey = redisKeyUtil.leftUserListKey(roomId);
        String rightUserListKey = redisKeyUtil.rightUserListKey(roomId);
        List<Object> oleftUserList = redisTemplate.opsForList().range(leftUserListKey, 0, -1);
        List<Object> orightUserList = redisTemplate.opsForList().range(rightUserListKey, 0, -1);

        for (Object o : oleftUserList) {
            String userNickname = (String) o;
            String userisReady = redisKeyUtil.isReadyKey(roomId, userNickname);
            redisTemplate.delete(userisReady);
        }

        for (Object o : orightUserList) {
            String userNickname = (String) o;
            String userisReady = redisKeyUtil.isReadyKey(roomId, userNickname);
            redisTemplate.delete(userisReady);
        }


        // 토론 시작 -> 메시지 날리고(JSON으로 변환) -> 다음 페이즈 시작
        String roomChannel = redisChannelUtil.roomChannelKey(roomId);
        String debateStartMessage = redisMessageUtil.debateStartMessage();
        redisPublisher.publishMessage(roomChannel, debateStartMessage);
        nextPhase(requestDebateStartDto.getRoomId());

    }

    // 여기까지가 토론 준비방에서 일어나는 상태변화입니다

    /**
     * 토론 페이즈 시작
     * 클라이언트단에서 발언 시작 버튼을 눌러
     */
    public void nextPhase(Long roomId) {

        // 페이즈 관리
        String phaseKey = redisKeyUtil.phaseKey(roomId);
        String phaseDetailKey = redisKeyUtil.phaseDetailKey(roomId);

        Integer previousPhase = (Integer) redisTemplate.opsForValue().get(phaseKey);
        Integer previousPhaseDetail = (Integer) redisTemplate.opsForValue().get(phaseDetailKey);
        Integer currentPhase = previousPhase;
        Integer currentPhaseDetail = previousPhaseDetail + 1;

        if (previousPhase == 0) {
            currentPhase = 1;
        }
        if (currentPhaseDetail == 5) {
            currentPhaseDetail = 1;
            currentPhase++;
        }
        redisTemplate.opsForValue().set(phaseKey, currentPhase);
        redisTemplate.opsForValue().set(phaseDetailKey, currentPhaseDetail);
        // 페이즈 완료

        String phaseStartTimeKey = redisKeyUtil.phaseStartTimeKey(roomId);
        Long serverTime = System.currentTimeMillis() / 1000L;
        redisTemplate.opsForValue().set(phaseStartTimeKey, serverTime);

        switch (currentPhaseDetail) {
            case 1:
            case 2:
                speakPhase(roomId, currentPhase, currentPhaseDetail);
                break;
            case 3:
                votePhase(roomId, currentPhase, currentPhaseDetail);
                break;
            case 4:
                voteResultPhase(roomId, currentPhase, currentPhaseDetail);
                break;
        }


    }

    public void speakPhase(Long roomId, Integer currentPhase, Integer currentPhaseDetail) {
        String leftUserListKey = redisKeyUtil.leftUserListKey(roomId);
        String rightUserListKey = redisKeyUtil.rightUserListKey(roomId);
        List<Object> oleftUserList = redisTemplate.opsForList().range(leftUserListKey, 0, -1);
        List<Object> orightUserList = redisTemplate.opsForList().range(rightUserListKey, 0, -1);
        List<String> leftUserList = new ArrayList<>();
        List<String> rightUserList = new ArrayList<>();
        for (Object o : oleftUserList) {
            leftUserList.add((String) o);
        }
        for (Object o : orightUserList) {
            rightUserList.add((String) o);
        }

        String currentSpeakingUserNickname = "";
        String currentSpeakingTeam = "";
        if (currentPhaseDetail == 1) {
            currentSpeakingTeam = "LEFT";
            currentSpeakingUserNickname = leftUserList.get(currentPhase - 1);
        } else if (currentPhaseDetail == 2) {
            currentSpeakingTeam = "RIGHT";
            currentSpeakingUserNickname = rightUserList.get(currentPhase - 1);
        }


        String currentSpeakingUserKey = redisKeyUtil.currentSpeakingUserKey(roomId);
        String currentSpeakingTeamKey = redisKeyUtil.currentSpeakingTeamKey(roomId);

        redisTemplate.opsForValue().set(currentSpeakingUserKey, currentSpeakingUserNickname);
        redisTemplate.opsForValue().set(currentSpeakingTeamKey, currentSpeakingTeam);

        String roomChannelKey = redisChannelUtil.roomChannelKey(roomId);

        String phaseStartAllInOneMessage = redisMessageUtil.speakPhaseStartMessage(currentPhase, currentPhaseDetail, currentSpeakingTeam, currentSpeakingUserNickname);
        redisPublisher.publishMessage(roomChannelKey, phaseStartAllInOneMessage);

        ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);

        ScheduledFuture<?> future = executorService.schedule(new Runnable() {
            @Override
            public void run() {

                redisTemplate.opsForValue().set(currentSpeakingTeamKey, "");
                redisTemplate.opsForValue().set(currentSpeakingUserKey, "");

                nextPhase(roomId);
            }
        }, 180, TimeUnit.SECONDS);
        // 테스트용 10초 실제 서비스 180초
        scheduledFutures.put(roomId + "_speakingPhase", future);

    }

    public void skipPhase(RequestSkipDto requestSkipDto) {
        Long roomId = requestSkipDto.getRoomId();

        String currentSpeakingUserKey = redisKeyUtil.currentSpeakingUserKey(roomId);
        String currentSpeakingTeamKey = redisKeyUtil.currentSpeakingTeamKey(roomId);

        ScheduledFuture<?> future = scheduledFutures.get(roomId + "_speakingPhase");
        if (future != null) {
            future.cancel(false);
            redisTemplate.opsForValue().set(currentSpeakingTeamKey, "");
            redisTemplate.opsForValue().set(currentSpeakingUserKey, "");
            nextPhase(roomId);
        }

    }

    // 투표 진행
    public void votePhase(Long roomId, Integer currentPhase, Integer currentPhaseDetail) {

        ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);

        String voteLeftKey = redisKeyUtil.voteLeftKey(roomId, currentPhase);
        String voteRightKey = redisKeyUtil.voteRightKey(roomId, currentPhase);

        redisTemplate.opsForValue().set(voteLeftKey, 0);
        redisTemplate.opsForValue().set(voteRightKey, 0);

        String roomChannelKey = redisChannelUtil.roomChannelKey(roomId);
        String voteStartMessage = redisMessageUtil.votePhaseStartMessage(currentPhase,currentPhaseDetail);

        redisPublisher.publishMessage(roomChannelKey, voteStartMessage);
        ScheduledFuture<?> future = executorService.schedule(new Runnable() {
            @Override
            public void run() {
                nextPhase(roomId);
                // 여기서 토론 결과 페이즈로 넘기기

            }
        }, 60, TimeUnit.SECONDS);
        // 테스트용 10초 실제 60초
        scheduledFutures.put(roomId + "_vote", future);

    }

    public void voteResultPhase(Long roomId, Integer currentPhase, Integer currentPhaseDetail) {


        String voteLeftKey = redisKeyUtil.voteLeftKey(roomId, currentPhase);
        String voteRightKey = redisKeyUtil.voteRightKey(roomId, currentPhase);
        Integer voteResultLeft = (Integer) redisTemplate.opsForValue().get(voteLeftKey);
        Integer voteResultRight = (Integer) redisTemplate.opsForValue().get(voteRightKey);

        Integer voteResultLeftPercent = ((Long) Math.round((double) ((voteResultLeft * 10000) / (voteResultLeft + voteResultRight)) / 100)).intValue();
        Integer voteResultRightPercent = 100 - voteResultLeftPercent;

        String voteLeftResulPercentKey = redisKeyUtil.voteLeftResulPercentKey(roomId, currentPhase);
        String voteRightResultPercentKey = redisKeyUtil.voteRightResultPercentKey(roomId, currentPhase);
        redisTemplate.opsForValue().set(voteLeftResulPercentKey, voteResultLeftPercent);
        redisTemplate.opsForValue().set(voteRightResultPercentKey, voteResultRightPercent);

        String roomChannelKey = redisChannelUtil.roomChannelKey(roomId);

        List<Integer> voteLeftResultList = new ArrayList<>();
        List<Integer> voteRightResultList = new ArrayList<>();
        if (currentPhase != 0 && currentPhaseDetail<4) {
            for (int votePhase = 1; votePhase < currentPhase ; votePhase++) {
                String curVoteLeftResulPercentKey = redisKeyUtil.voteLeftResulPercentKey(roomId, votePhase);
                String curVoteRightResultPercentKey = redisKeyUtil.voteRightResultPercentKey(roomId, votePhase);

                Integer voteLeftResult = (Integer) redisTemplate.opsForValue().get(curVoteLeftResulPercentKey);
                Integer voteRightResult = (Integer) redisTemplate.opsForValue().get(curVoteRightResultPercentKey);

                voteLeftResultList.add(voteLeftResult);
                voteRightResultList.add(voteRightResult);
            }
        } else if(currentPhase != 0 && currentPhaseDetail==4){
            for (int votePhase = 1; votePhase <= currentPhase ; votePhase++) {
                String curVoteLeftResulPercentKey = redisKeyUtil.voteLeftResulPercentKey(roomId, votePhase);
                String curVoteRightResultPercentKey = redisKeyUtil.voteRightResultPercentKey(roomId, votePhase);

                Integer voteLeftResult = (Integer) redisTemplate.opsForValue().get(curVoteLeftResulPercentKey);
                Integer voteRightResult = (Integer) redisTemplate.opsForValue().get(curVoteRightResultPercentKey);

                voteLeftResultList.add(voteLeftResult);
                voteRightResultList.add(voteRightResult);
            }
        }

        String voteEndMessage = redisMessageUtil.voteEndMessage(currentPhase, currentPhaseDetail, voteLeftResultList, voteRightResultList);
        redisPublisher.publishMessage(roomChannelKey, voteEndMessage);

        if (currentPhase == 3) {
            ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);
            // 토론 끝내기
            // 3번째 투표까지 정상적으로 진행 된 경우 사실상 정상적으로 Debate가 끝난 경우임
            // 이때 DebateHistory를 생성해서 저장해 줌
            String leftUserListKey = redisKeyUtil.leftUserListKey(roomId);
            String rightUserListKey = redisKeyUtil.rightUserListKey(roomId);
            List<Object> leftuserlist = redisTemplate.opsForList().range(leftUserListKey, 0, -1);
            List<Object> rightuserlist = redisTemplate.opsForList().range(rightUserListKey, 0, -1);
            for (Object o : leftuserlist) {
                String userNickname = (String) o;
                DebateHistory debateHistory = debateHistoryService.createDebateHistory(roomId, userNickname, "LEFT");
                debateHistoryService.saveHistory(debateHistory);
            }
            for (Object o : rightuserlist) {
                String userNickname = (String) o;
                DebateHistory debateHistory = debateHistoryService.createDebateHistory(roomId, userNickname, "RIGHT");
                debateHistoryService.saveHistory(debateHistory);
            }
            // 끝난 경우에는 더 이상 관전자가 들어오지 못하게 redis에 isDebateEnded key의 값을 TRUE로 바꿔 줌
            // 방에 입장할 때 isDebateEnded를 확인하고 true인 경우 DebateEndedException을 터뜨려 줌
            String debateEndedKey = redisKeyUtil.isDebateEndedKey(roomId);
            redisTemplate.opsForValue().set(debateEndedKey, "TRUE");

            /**
             * 여기부터는 토론 끝내는 메시지
             */
            ScheduledFuture<?> futureDebateEnd = executorService.schedule(new Runnable() {
                @Override
                public void run() {
                    // 마지막 투표가 끝난 후 일정 시간 후에 Redis Pub/Sub에 전체적으로 토론 종료 됐다는 메시지 보냄
                    // 클라이언트에서는 이 메시지를 받은 클라이언트를 메인으로 쫒아내버리기
                    String debateEndMessage = redisMessageUtil.debateEndMessage();
                    redisPublisher.publishMessage(roomChannelKey, debateEndMessage);
                }
            }, 10, TimeUnit.SECONDS);
            // 테스트 10초 실제 서비스 60초
            scheduledFutures.put(roomId + "_debateEnd", futureDebateEnd);

            ScheduledFuture<?> futureRemoveRoomInfos = executorService.schedule(new Runnable() {
                @Override
                public void run() {
                    /**
                     * 방 썸네일 사진 삭제도 추가해놓기
                     */
                    List<String> leftFileArr = getDeletingFileList(roomId, "LEFT");
                    List<String> rightFileArr = getDeletingFileList(roomId, "RIGHT");
                    try {
                        fileService.deleteFile(leftFileArr);
                        fileService.deleteFile(rightFileArr);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }

                    // 모든 클라이언트를 메인으로 내보낸 후 저장되어 있던 모든 방 정보 삭제
                    List<String> keyList = new ArrayList<>();
                    keyList.add(redisKeyUtil.phaseKey(roomId));
                    keyList.add(redisKeyUtil.phaseDetailKey(roomId));
                    keyList.add(redisKeyUtil.phaseStartTimeKey(roomId));
                    keyList.add(redisKeyUtil.watchCntKey(roomId));
                    keyList.add(redisKeyUtil.leftUserListKey(roomId));
                    keyList.add(redisKeyUtil.rightUserListKey(roomId));
                    keyList.add(redisKeyUtil.currentSpeakingUserKey(roomId));
                    keyList.add(redisKeyUtil.currentSpeakingTeamKey(roomId));
                    keyList.add(redisKeyUtil.voteLeftKey(roomId, 1));
                    keyList.add(redisKeyUtil.voteLeftKey(roomId, 2));
                    keyList.add(redisKeyUtil.voteLeftKey(roomId, 3));
                    keyList.add(redisKeyUtil.voteRightKey(roomId, 1));
                    keyList.add(redisKeyUtil.voteRightKey(roomId, 2));
                    keyList.add(redisKeyUtil.voteRightKey(roomId, 3));
                    keyList.add(redisKeyUtil.voteLeftResulPercentKey(roomId, 1));
                    keyList.add(redisKeyUtil.voteLeftResulPercentKey(roomId, 2));
                    keyList.add(redisKeyUtil.voteLeftResulPercentKey(roomId, 3));
                    keyList.add(redisKeyUtil.voteRightResultPercentKey(roomId, 1));
                    keyList.add(redisKeyUtil.voteRightResultPercentKey(roomId, 2));
                    keyList.add(redisKeyUtil.voteRightResultPercentKey(roomId, 3));
                    keyList.add(redisKeyUtil.isDebateEndedKey(roomId));
                    keyList.add(redisKeyUtil.imgCardOpenedListKey(roomId, "LEFT"));
                    keyList.add(redisKeyUtil.imgCardOpenedListKey(roomId, "RIGHT"));
                    keyList.add(redisKeyUtil.debateStartTimeKey(roomId));
                    for (String key : keyList) {
                        redisTemplate.delete(key);
                    }
                    roomRepository.delete(roomRepository.findById(roomId).get());
                }
            }, futureDebateEnd.getDelay(TimeUnit.SECONDS) + 10, TimeUnit.SECONDS);
            // 테스트 10초 실제 서비스 60초
            scheduledFutures.put(roomId + "_removeRoomInfo", futureRemoveRoomInfos);

        } else {
            ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);
            ScheduledFuture<?> futureDebateEnd = executorService.schedule(new Runnable() {
                @Override
                public void run() {
                    nextPhase(roomId);
                }
            }, 10, TimeUnit.SECONDS);
            // 테스트 10초 실제 서비스 10초
            scheduledFutures.put(roomId + "_voteResultEnd", futureDebateEnd);
        }

    }

    ;

    // 방장이 나가서 토론이 끝나는경우
    public void debateEndCreaterLeave(Long roomId) {

        ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);


        // 끝난 경우에는 더 이상 관전자가 들어오지 못하게 redis에 isDebateEnded key의 값을 TRUE로 바꿔 줌
        // 방에 입장할 때 isDebateEnded를 확인하고 true인 경우 DebateEndedException을 터뜨려 줌
        String debateEndedKey = redisKeyUtil.isDebateEndedKey(roomId);
        redisTemplate.opsForValue().set(debateEndedKey, "TRUE");

        String roomChannelKey = redisChannelUtil.roomChannelKey(roomId);


        ScheduledFuture<?> futureDebateEnd = executorService.schedule(new Runnable() {
            @Override
            public void run() {
                // 방장이 퇴장 한 후 일정 시간 후에 Redis Pub/Sub에 전체적으로 토론 종료 됐다는 메시지 보냄
                // 클라이언트에서는 이 메시지를 받은 클라이언트를 메인으로 쫒아내버리기
                String debateEndMessage = redisMessageUtil.debateEndMessage();
                redisPublisher.publishMessage(roomChannelKey, debateEndMessage);
            }
        }, 20, TimeUnit.SECONDS);
        scheduledFutures.put(roomId + "_debateEnd", futureDebateEnd);

        ScheduledFuture<?> futureRemoveRoomInfos = executorService.schedule(new Runnable() {
            @Override
            public void run() {
                // 모든 클라이언트를 메인으로 내보낸 후 저장되어 있던 모든 방 정보 삭제
                List<String> keyList = new ArrayList<>();
                keyList.add(redisKeyUtil.phaseKey(roomId));
                keyList.add(redisKeyUtil.phaseStartTimeKey(roomId));
                keyList.add(redisKeyUtil.watchCntKey(roomId));
                keyList.add(redisKeyUtil.leftUserListKey(roomId));
                keyList.add(redisKeyUtil.rightUserListKey(roomId));
                List<Object> leftUserList = redisTemplate.opsForList().range(redisKeyUtil.leftUserListKey(roomId), 0, -1);
                List<Object> rightUserList = redisTemplate.opsForList().range(redisKeyUtil.rightUserListKey(roomId), 0, -1);
                for (Object o : leftUserList) {
                    String userNickname = (String) o;
                    keyList.add(redisKeyUtil.isReadyKey(roomId, userNickname));
                }
                for (Object o : rightUserList) {
                    String userNickname = (String) o;
                    keyList.add(redisKeyUtil.isReadyKey(roomId, userNickname));
                }

                keyList.add(redisKeyUtil.isDebateEndedKey(roomId));
                for (String key : keyList) {
                    redisTemplate.delete(key);
                }
                roomRepository.delete(roomRepository.findById(roomId).get());
            }
        }, futureDebateEnd.getDelay(TimeUnit.SECONDS) + 10, TimeUnit.SECONDS);
        // 테스트 10초 실제 서비스 60초
        scheduledFutures.put(roomId + "_removeRoomInfo", futureRemoveRoomInfos);

    }

    /**
     * 파일을 업로드 하면 redis에 파일 name과 url을 저장하고 앞으로 들어올 사람들에게 보내줍니다
     * <p>
     * room:roomId 채널에 전체적으로 name과 url을 현재 방에 들어와 있는 사람들에게 뿌려줍니다
     * <p>
     * cardOpenState도 만들어서 현재 카드 오픈상태를 ready처럼 관리합니다
     *
     * @param fileDtos
     */
    public void cardsUpload(Long roomId, String userNickname, List<FileDto> fileDtos) {

        String leftUserListKey = redisKeyUtil.leftUserListKey(roomId);
        String rightUserListKey = redisKeyUtil.rightUserListKey(roomId);

        List<Object> leftUserList = redisTemplate.opsForList().range(leftUserListKey, 0, -1);
        List<Object> rightUserList = redisTemplate.opsForList().range(rightUserListKey, 0, -1);

        for (int useridx = 0; useridx < leftUserList.size(); useridx++) {
            String curUserNick = (String) leftUserList.get(useridx);
            if (curUserNick.equals(userNickname)) {
                setFileInRedis(useridx, "LEFT", roomId, fileDtos);
            }
        }


        for (int useridx = 0; useridx < rightUserList.size(); useridx++) {
            String curUserNick = (String) rightUserList.get(useridx);
            if (curUserNick.equals(userNickname)) {
                setFileInRedis(useridx, "RIGHT", roomId, fileDtos);
            }
        }


    }

    private void setFileInRedis(int useridx, String team, Long roomId, List<FileDto> fileDtos) {

        String roomChannelKey = redisChannelUtil.roomChannelKey(roomId);

        for (int fileidx = 0; fileidx < fileDtos.size(); fileidx++) {
            FileDto fileDto = fileDtos.get(fileidx);
            String fileName = fileDto.getFileName();
            String fileUrl = fileDto.getFileUrl();
            System.out.println("fileidx" + fileidx);

            int curfileidx = (useridx * 2) + fileidx;
            System.out.println("curfileidx" + curfileidx);

            String imgCardNameKey = redisKeyUtil.imgCardNameKey(roomId, curfileidx, team);
            String imgCardUrlKey = redisKeyUtil.imgCardUrlKey(roomId, curfileidx, team);


            redisTemplate.opsForValue().set(imgCardNameKey, fileName);
            redisTemplate.opsForValue().set(imgCardUrlKey, fileUrl);

//            String imgCardSetMessage = redisMessageUtil.imgCardSetMessage(team, curfileidx, fileUrl);
//            redisPublisher.publishMessage(roomChannelKey, imgCardSetMessage);

        }

    }

    public List<String> getDeletingFileList(Long roomId, String team) {
        List<String> fileList = new ArrayList<>();
        for (int i = 0; i < 6; i++) {
            String imgCardNameKey = redisKeyUtil.imgCardNameKey(roomId, i, team);
            String imgCardUrlKey = redisKeyUtil.imgCardUrlKey(roomId, i, team);
            Object o = redisTemplate.opsForValue().get(imgCardNameKey);
            if (o != null) {
                String o1 = (String) o;
                fileList.add(o1);
                System.out.println(o1);
                redisTemplate.delete(imgCardNameKey);
                redisTemplate.delete(imgCardUrlKey);
            }
        }

        return fileList;
    }

    public void cardOpen(int useridx, int cardidx, String team, Long roomId) {
        int index = useridx * 2 + cardidx;
        String imgCardUrlKey = redisKeyUtil.imgCardUrlKey(roomId, index, team);
        String openedCardUrl = (String) redisTemplate.opsForValue().get(imgCardUrlKey);
        String openedCardListKey = redisKeyUtil.imgCardOpenedListKey(roomId, team);
        redisTemplate.opsForList().rightPush(openedCardListKey, openedCardUrl);
        List<Object> oOpenedCardList = redisTemplate.opsForList().range(openedCardListKey, 0, -1);

        String leftOpenedCardListKey = redisKeyUtil.imgCardOpenedListKey(roomId, "LEFT");
        String rightOpenedCardListKey = redisKeyUtil.imgCardOpenedListKey(roomId, "RIGHT");
        List<Object> oleftOpenedCardList = redisTemplate.opsForList().range(leftOpenedCardListKey, 0, -1);
        List<Object> orightOpenedCardList = redisTemplate.opsForList().range(rightOpenedCardListKey, 0, -1);
        List<String> leftOpenedCardList = new ArrayList<>();
        List<String> rightOpenedCardList = new ArrayList<>();
        for (Object o : oleftOpenedCardList) {
            leftOpenedCardList.add((String)o);
        }
        for (Object o : orightOpenedCardList) {
            rightOpenedCardList.add((String)o);
        }
        String imgCardOpenMessage = redisMessageUtil.imgCardOpenMessage(leftOpenedCardList, rightOpenedCardList);
        redisPublisher.publishMessage(redisChannelUtil.roomChannelKey(roomId), imgCardOpenMessage);
    }

    public void vote(RequestVoteDto requestVoteDto) {
        String phaseKey = redisKeyUtil.phaseKey(requestVoteDto.getRoomId());
        Integer phase = (Integer) redisTemplate.opsForValue().get(phaseKey);

        if (requestVoteDto.getVoteTeam().equals("LEFT")) {
            String voteLeftKey = redisKeyUtil.voteLeftKey(requestVoteDto.getRoomId(), phase);
            redisTemplate.opsForValue().increment(voteLeftKey);
        } else if (requestVoteDto.getVoteTeam().equals("RIGHT")) {
            String voteRightKey = redisKeyUtil.voteRightKey(requestVoteDto.getRoomId(), phase);
            redisTemplate.opsForValue().increment(voteRightKey);
        }
    }
}
