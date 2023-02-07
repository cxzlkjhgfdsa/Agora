package com.agora.server.room.service;

import com.agora.server.debatehistory.domain.DebateHistory;
import com.agora.server.debatehistory.service.DebateHistoryService;
import com.agora.server.file.dto.FileDto;
import com.agora.server.file.service.FileService;
import com.agora.server.room.controller.dto.RequestDebateStartDto;
import com.agora.server.room.controller.dto.RequestRoomEnterDto;
import com.agora.server.room.controller.dto.RequestRoomLeaveDto;
import com.agora.server.room.controller.dto.debate.RequestPhaseStartDto;
import com.agora.server.room.controller.dto.debate.RequestSkipDto;
import com.agora.server.room.controller.dto.debate.RequestVoteStartDto;
import com.agora.server.room.exception.NotReadyException;
import com.agora.server.room.repository.RoomRepository;
import com.agora.server.room.util.RedisChannelUtil;
import com.agora.server.room.util.RedisKeyUtil;
import com.agora.server.room.util.RedisMessageUtil;
import com.agora.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.*;

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
    public void debaterEnter(RequestRoomEnterDto requestRoomEnterDto) {
        Long roomId = requestRoomEnterDto.getRoomId();
        String userNickname = requestRoomEnterDto.getUserNickname();
        Integer userSide = requestRoomEnterDto.getUserSide();


        String roomChannel = redisChannelUtil.roomChannelKey(roomId);
        String enterMessage = redisMessageUtil.enterMessage(userSide, userNickname);

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
        Integer userSide = requestRoomLeaveDto.getUserSide();

        String roomChannel = redisChannelUtil.roomChannelKey(roomId);
        String leaveMessage = redisMessageUtil.leaveMessage(userSide, userNickname);

        redisPublisher.publishMessage(roomChannel, leaveMessage);
    }

    /**
     * 토론자 레디 Redis Pub/Sub
     * <p>
     * 클라이언트단에서 Redis에 보낼 명령어
     * 없습니다
     * <p>
     * 서버에서 Redis에 보낼 명령어
     * room:roomId 채널에 토론자 레디 했다는 메시지 송신
     * PUBLISH room:roomId [READY][LEFT] 토론자닉네임
     * -> 왼쪽 팀의 토론자닉네임이 레디
     * PUBLISH room:roomId [READY][RIGHT] 토론자닉네임
     * -> 오른쪽 팀의 토론자닉네임이 레디
     * 모든 클라이언트는 해당 메시지를 수신받으면
     * 해당 토론자의 토론 준비 상태를 READY로 바꿉니다
     */
    public void ready(RequestRoomEnterDto requestRoomEnterDto) {

        Long roomId = requestRoomEnterDto.getRoomId();
        String userNickname = requestRoomEnterDto.getUserNickname();
        Integer userSide = requestRoomEnterDto.getUserSide();

        String roomChannel = redisChannelUtil.roomChannelKey(roomId);

        String readyMessage = redisMessageUtil.readyMessage(userSide, userNickname);

        redisPublisher.publishMessage(roomChannel, readyMessage);

        // Redis에서 레디상태 TRUE로 변경
        String isReadyKey = redisKeyUtil.isReadyKey(roomId, userNickname);
        redisTemplate.opsForValue().set(isReadyKey, "TRUE");
    }

    /**
     * 토론자 레디 취소 Redis Pub/Sub
     * <p>
     * 클라이언트단에서 Redis에 보낼 명령어
     * 없습니다
     * <p>
     * 서버에서 Redis에 보낼 명령어
     * room:roomId 채널에 토론자 레디 했다는 메시지 송신
     * PUBLISH room:roomId [UNREADY][LEFT] 토론자닉네임
     * -> 왼쪽 팀의 토론자닉네임이 레디 취소
     * PUBLISH room:roomId [UNREADY][RIGHT] 토론자닉네임
     * -> 오른쪽 팀의 토론자닉네임이 레디 취소
     * 모든 클라이언트는 해당 메시지를 수신받으면
     * 해당 토론자의 토론 준비 상태를 UNREADY로 바꿉니다
     */
    public void unready(RequestRoomEnterDto requestRoomEnterDto) {

        Long roomId = requestRoomEnterDto.getRoomId();
        String userNickname = requestRoomEnterDto.getUserNickname();
        Integer userSide = requestRoomEnterDto.getUserSide();

        String roomChannel = redisChannelUtil.roomChannelKey(roomId);

        String unreadyMessage = redisMessageUtil.unreadyMessage(userSide, userNickname);

        redisPublisher.publishMessage(roomChannel, unreadyMessage);

        // Redis에서 레디상태 FALSE로 변경
        String isReadyKey = redisKeyUtil.isReadyKey(roomId, userNickname);
        redisTemplate.opsForValue().set(isReadyKey, "FALSE");
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
        List<String> leftUserList = requestDebateStartDto.getLeftUserList();
        List<String> rightUserList = requestDebateStartDto.getRightUserList();
        List<Boolean> leftUserIsReady = requestDebateStartDto.getLeftUserIsReady();
        List<Boolean> rightUserIsReady = requestDebateStartDto.getRightUserIsReady();

        for (Boolean aBoolean : leftUserIsReady) {
            if (aBoolean == false) {
                throw new NotReadyException("아직 준비가 안 된 유저가 있습니다.");
            }
        }
        for (Boolean aBoolean : rightUserIsReady) {
            if (aBoolean == false) {
                throw new NotReadyException("아직 준비가 안 된 유저가 있습니다.");
            }
        }


        String roomChannel = redisChannelUtil.roomChannelKey(roomId);
        String debateStartMessage = redisMessageUtil.debateStartMessage();
        redisPublisher.publishMessage(roomChannel, debateStartMessage);

        for (String userNickname : leftUserList) {
            String isReadyKey = redisKeyUtil.isReadyKey(roomId, userNickname);
            redisTemplate.delete(isReadyKey);
        }

        for (String userNickname : rightUserList) {
            String userisReady = redisKeyUtil.isReadyKey(roomId, userNickname);
            redisTemplate.delete(userisReady);
        }


        String currentTurnKey = redisKeyUtil.currentTurnKey(roomId);
        redisTemplate.opsForValue().set(currentTurnKey, 0);

    }

    // 여기까지가 토론 준비방에서 일어나는 상태변화입니다

    /**
     * 토론 페이즈 시작
     * 클라이언트단에서 발언 시작 버튼을 눌러
     * roomId와 phase, 발언자, 발언진영을 api request로 보내시면
     * <p>
     * redis에 저장된 현재 phase, 현재 선,후턴 정보를 합쳐서
     * <p>
     * room:roomId 채널(방에 입장한 모두가 들어와 있는 채널)로
     * 현재 phase, 선.후턴, 어느 플레이어가 말하고 있는지 정보를
     * [PHASESTART] 몇페이즈인지
     * [TURN] 선,후턴
     * [TEAM] 팀
     * [CURRENT DEBATER] 누가말하는지(닉네임)
     * 태그가 붙은 메시지로 나눠서 PUBLISH합니다.(합쳐서 보낼 수도 있고 프론트에서 파싱하기 편한대로 수정가능)
     * <p>
     * 발언이 시작한 후 턴 스킵이 일어나지 않고
     * 발언시간(현재는 60초로 설정)이 끝나면
     * [PHASEEND] 몇페이즈인지
     * [TURN] 선,후턴
     * [TEAM] 팀
     * 태그를 붙여 몇페이즈의 선,후턴이 종료되었는지 PUBLISH합니다
     */
    public void startPhase(RequestPhaseStartDto requestPhaseStartDto) {

        Long roomId = requestPhaseStartDto.getRoomId();
        String userNickname = requestPhaseStartDto.getUserNickname();
        String team = requestPhaseStartDto.getTeam();
        Integer phase = requestPhaseStartDto.getPhase();

        String phaseKey = redisKeyUtil.phaseKey(roomId);
        String currentTurnKey = redisKeyUtil.currentTurnKey(roomId);
        String phaseStartTimeKey = redisKeyUtil.phaseStartTimeKey(roomId);
        String currentSpeakingUserKey = redisKeyUtil.currentSpeakingUserKey(roomId);
        String currentSpeakingTeamKey = redisKeyUtil.currentSpeakingTeamKey(roomId);

        Integer turn = (Integer) redisTemplate.opsForValue().get(currentTurnKey);

        turn = turnChange(turn);

        redisTemplate.opsForValue().set(currentTurnKey, turn);
        redisTemplate.opsForValue().set(phaseKey, phase);
        Long serverTime = System.currentTimeMillis() / 1000L;
        redisTemplate.opsForValue().set(phaseStartTimeKey, serverTime);
        redisTemplate.opsForValue().set(currentSpeakingUserKey, userNickname);
        redisTemplate.opsForValue().set(currentSpeakingTeamKey, team);

        String roomChannelKey = redisChannelUtil.roomChannelKey(roomId);

        String phaseStartAllInOneMessage = redisMessageUtil.phaseStartAllInOneMessage(phase, turn, team, userNickname);

        redisPublisher.publishMessage(roomChannelKey, phaseStartAllInOneMessage);

        ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);

        Integer finalTurn = turn;
        ScheduledFuture<?> future = executorService.schedule(new Runnable() {
            @Override
            public void run() {
                String phaseEndAllInOneMessage = redisMessageUtil.phaseEndAllInOneMessage(phase, finalTurn, team, userNickname);
                redisPublisher.publishMessage(roomChannelKey, phaseEndAllInOneMessage);

                redisTemplate.delete(currentSpeakingTeamKey);
                redisTemplate.delete(currentSpeakingUserKey);
            }
        }, 10, TimeUnit.SECONDS);
        scheduledFutures.put(roomId + "_phase", future);
    }

    public void skipPhase(RequestSkipDto requestSkipDto) {
        Long roomId = requestSkipDto.getRoomId();
        String userNickname = requestSkipDto.getUserNickname();
        String team = requestSkipDto.getTeam();
        Integer phase = requestSkipDto.getPhase();

        String currentSpeakingUserKey = redisKeyUtil.currentSpeakingUserKey(roomId);
        String currentSpeakingTeamKey = redisKeyUtil.currentSpeakingTeamKey(roomId);
        String currentTurnKey = redisKeyUtil.currentTurnKey(roomId);
        Integer turn = (Integer) redisTemplate.opsForValue().get(currentTurnKey);

        String roomChannelKey = redisChannelUtil.roomChannelKey(roomId);

        ScheduledFuture<?> future = scheduledFutures.get(roomId + "_phase");
        if (future != null) {
            future.cancel(false);
            String phaseSkipAllInOneMessage = redisMessageUtil.phaseSkipAllInOneMessage(phase, turn, team, userNickname);
            redisPublisher.publishMessage(roomChannelKey, phaseSkipAllInOneMessage);

            redisTemplate.delete(currentSpeakingTeamKey);
            redisTemplate.delete(currentSpeakingUserKey);
        }

    }

    // 투표 진행
    public void startVote(RequestVoteStartDto requestVoteStartDto) {

        Long roomId = requestVoteStartDto.getRoomId();

        ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);

        Integer votePhase = requestVoteStartDto.getVotePhase();

        String voteLeftKey = redisKeyUtil.voteLeftKey(roomId, votePhase);
        String voteRightKey = redisKeyUtil.voteRightKey(roomId, votePhase);

        redisTemplate.opsForValue().set(voteLeftKey, 0);
        redisTemplate.opsForValue().set(voteRightKey, 0);

        String roomChannelKey = redisChannelUtil.roomChannelKey(roomId);
        String voteStartMessage = redisMessageUtil.voteStartMessage(votePhase);

        redisPublisher.publishMessage(roomChannelKey, voteStartMessage);
        ScheduledFuture<?> future = executorService.schedule(new Runnable() {
            @Override
            public void run() {
                Integer voteResultLeft = (Integer) redisTemplate.opsForValue().get(voteLeftKey);
                Integer voteResultRight = (Integer) redisTemplate.opsForValue().get(voteRightKey);
                String voteEndMessage = redisMessageUtil.voteEndMessage(votePhase, voteResultLeft, voteResultRight);
                redisPublisher.publishMessage(roomChannelKey, voteEndMessage);
                if (votePhase == 3) {
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
                }
            }
        }, 30, TimeUnit.SECONDS);

        scheduledFutures.put(roomId + "_vote", future);

        if (votePhase == 3) {
            ScheduledFuture<?> futureDebateEnd = executorService.schedule(new Runnable() {
                @Override
                public void run() {
                    // 마지막 투표가 끝난 후 일정 시간 후에 Redis Pub/Sub에 전체적으로 토론 종료 됐다는 메시지 보냄
                    // 클라이언트에서는 이 메시지를 받은 클라이언트를 메인으로 쫒아내버리기
                    String debateEndMessage = redisMessageUtil.debateEndMessage();
                    redisPublisher.publishMessage(roomChannelKey, debateEndMessage);
                }
            }, future.getDelay(TimeUnit.SECONDS) + 10, TimeUnit.SECONDS);
            scheduledFutures.put(roomId + "_debateEnd", futureDebateEnd);

            ScheduledFuture<?> futureRemoveRoomInfos = executorService.schedule(new Runnable() {
                @Override
                public void run() {

                    List<String> leftFileArr = getDeletingFileList(roomId, "LEFT");
                    List<String> rightFileArr = getDeletingFileList(roomId, "RIGHT");
                    try {
                        fileService.deleteFile(leftFileArr);
                        fileService.deleteFile(rightFileArr);
                    } catch (IOException e){
                        e.printStackTrace();
                    }

                    // 모든 클라이언트를 메인으로 내보낸 후 저장되어 있던 모든 방 정보 삭제
                    List<String> keyList = new ArrayList<>();
                    keyList.add(redisKeyUtil.phaseKey(roomId));
                    keyList.add(redisKeyUtil.phaseStartTimeKey(roomId));
                    keyList.add(redisKeyUtil.watchCntKey(roomId));
                    keyList.add(redisKeyUtil.leftUserListKey(roomId));
                    keyList.add(redisKeyUtil.rightUserListKey(roomId));
                    keyList.add(redisKeyUtil.currentSpeakingUserKey(roomId));
                    keyList.add(redisKeyUtil.currentSpeakingTeamKey(roomId));
                    keyList.add(redisKeyUtil.currentTurnKey(roomId));
                    keyList.add(redisKeyUtil.voteLeftKey(roomId, 1));
                    keyList.add(redisKeyUtil.voteLeftKey(roomId, 2));
                    keyList.add(redisKeyUtil.voteLeftKey(roomId, 3));
                    keyList.add(redisKeyUtil.voteRightKey(roomId, 1));
                    keyList.add(redisKeyUtil.voteRightKey(roomId, 2));
                    keyList.add(redisKeyUtil.voteRightKey(roomId, 3));
                    keyList.add(redisKeyUtil.isDebateEndedKey(roomId));
                    for (String key : keyList) {
                        redisTemplate.delete(key);
                    }
                    roomRepository.delete(roomRepository.findById(roomId).get());
                }
            }, futureDebateEnd.getDelay(TimeUnit.SECONDS) + 10, TimeUnit.SECONDS);
            scheduledFutures.put(roomId + "_removeRoomInfo", futureRemoveRoomInfos);

        }
    }

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
        }, 10, TimeUnit.SECONDS);
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
        scheduledFutures.put(roomId + "_removeRoomInfo", futureRemoveRoomInfos);

    }

    // 여기부터 편의용 메서드

    private static Integer turnChange(Integer turn) {
        if (turn == 0) {
            turn = 1;
        } else if (turn == 1) {
            turn = 2;
        } else if (turn == 2) {
            turn = 1;
        }
        return turn;
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

            int curfileidx = (useridx * 2) + fileidx;

            String imgCardNameKey = redisKeyUtil.imgCardNameKey(roomId, curfileidx, team);
            String imgCardUrlKey = redisKeyUtil.imgCardUrlKey(roomId, curfileidx, team);
//            String imgCardIsOpenedKey = redisKeyUtil.imgCardIsOpenedKey(roomId, curfileidx, team);


            redisTemplate.opsForValue().set(imgCardNameKey, fileName);
            redisTemplate.opsForValue().set(imgCardUrlKey, fileUrl);
//            redisTemplate.opsForValue().set(imgCardIsOpenedKey, "FALSE");

            String imgCardSetMessage = redisMessageUtil.imgCardSetMessage(team, curfileidx, fileUrl);
            redisPublisher.publishMessage(roomChannelKey, imgCardSetMessage);

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
}
