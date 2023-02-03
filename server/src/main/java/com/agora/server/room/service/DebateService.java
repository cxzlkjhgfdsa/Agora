package com.agora.server.room.service;

import com.agora.server.room.controller.dto.RequestDebateStartDto;
import com.agora.server.room.controller.dto.RequestRoomEnterDto;
import com.agora.server.room.controller.dto.debate.RequestPhaseStartDto;
import com.agora.server.room.controller.dto.debate.RequestSkipDto;
import com.agora.server.room.controller.dto.debate.RequestVoteStartDto;
import com.agora.server.room.exception.NotReadyException;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.*;

@Service
@RequiredArgsConstructor
public class DebateService {


    private final RedisPublisher redisPublisher;

    private final UserRepository userRepository;

    private final RedisTemplate<String, Object> redisTemplate;

    private final Map<String, ScheduledFuture<?>> scheduledFutures;


    private final String START_TAG = "[START]";
    private final String ENTER_TAG = "[ENTER]";
    private final String LEAVE_TAG = "[LEAVE]";
    private final String READY_TAG = "[READY]";
    private final String UNREADY_TAG = "[UNREADY]";
    private final String LEFT_SIDE_TAG = "[LEFT]";
    private final String RIGHT_SIDE_TAG = "[RIGHT]";
    private final String NO_SIDE_TAG = "[NOUSERSIDE]";


    /**
     * 각 토론방에서는 총 5개의 채널을 사용합니다
     * 채널 1
     * room:roomId
     * 토론자, 시청자 모두가 SUBSCRIBE하는 채널입니다
     * 전체적인 상태변화(토론자의 레디 여부, 토론자 입퇴실 여부, 이모지 등)에 관련된 메시지를 송수신합니다
     *
     * 채널 2
     * room:roomId:debater
     * 토론자로 입장 했을 때만 SUBSCRIBE하는 채널입니다
     * 토론자들에게만 보내는 메시지(토론 진행 여부 등)를 송수신합니다
     *
     * 채널 3,4
     * room:roomId:left, room:roomId:right
     * 왼쪽팀 토론자는 left를 SUBSCRIBE 오른쪽팀 토론자는 right를 SUBSCRIBE하는 채널입니다
     * 각 팀에게만 보내는 메시지(팀별 사진카드 등록, 등록 취소 여부 등)을 송수신합니다
     *
     * 채널 5
     * room:roomId:watcher
     * 시청자들만 SUBSCRIBE하는 채널입니다
     * 시청자들에게만 보내는 메시지(투표 진행 등)을 송수신합니다
     */


    /**
     * 토론자 입장 Redis Pub/Sub
     *
     * 클라이언트단에서 Redis에 보낼 명령어
     * 왼쪽팀으로 입장시 SUBSCRIBE room:roomId room:roomId:debater room:roomId:left
     * 오른쪽팀으로 입장시 SUBSCRIBE room:roomId room:roomId:debater room:roomId:right
     * (왼쪽팀 기준 room:roomId, room:roomId:debate, room:roomId:left 세 개의 채널을 구독하는 명령어입니다)
     *
     * 서버에서 Redis에 보낼 명령어
     * room:roomId 채널에 토론자 입장 여부 알리는 메시지 송신
     * PUBLISH room:roomId [ENTER][LEFT] 토론자닉네임
     * -> 왼쪽 팀에 토론자 입장
     * PUBLISH room:roomId [ENTER][RIGHT] 토론자닉네임
     * -> 오른쪽 팀에 토론자 입장
     * 클라이언트에서는 현재 토론자 왼쪽, 오른쪽 팀 리스트(닉네임)으로 가지고 있으므로
     * 이 메시지를 받으면 파싱해서 토론자 닉네임을 토론자 리스트에 추가 시키면 됩니다.
     */
    public void debaterEnter(RequestRoomEnterDto requestRoomEnterDto){
        User user = userRepository.findById(requestRoomEnterDto.getUserId()).get();
        Long roomId = requestRoomEnterDto.getRoomId();
        String userNickname = user.getUser_nickname();
        Integer userSide = requestRoomEnterDto.getUserSide();

        String channelName = "room:" + roomId;
        String sideTag = getSideTag(userSide);

        redisPublisher.publishMessage(channelName, ENTER_TAG + sideTag + " " + userNickname);
    }

    /**
     * 토론자 퇴장 Redis Pub/Sub
     *
     * 클라이언트단에서 Redis에 보낼 명령어
     * 퇴장시 UNSUBSCRIBE
     * (UNSUBSCRIBE는 현재 입장 채널에서 전부 나가는 Redis 명령어입니다)
     *
     * 서버에서 Redis에 보낼 명령어
     * room:roomId 채널에 토론자 퇴장 여부 알리는 메시지 송신
     * PUBLISH room:roomId [LEAVE][LEFT] 토론자닉네임
     * -> 왼쪽 팀에서 토론자 퇴장
     * PUBLISH room:roomId [LEAVE][RIGHT] 토론자닉네임
     * -> 오른쪽 팀에서 토론자 퇴장
     * 클라이언트에서는 현재 토론자 왼쪽, 오른쪽 팀 리스트(닉네임)으로 가지고 있으므로
     * 이 메시지를 받으면 파싱해서 토론자 닉네임을 토론자 리스트에서 제거 시키면 됩니다.
     */
    public void debaterLeave(RequestRoomEnterDto requestRoomEnterDto){
        User user = userRepository.findById(requestRoomEnterDto.getUserId()).get();
        Long roomId = requestRoomEnterDto.getRoomId();
        String userNickname = user.getUser_nickname();
        Integer userSide = requestRoomEnterDto.getUserSide();

        String channelName = "room:" + roomId;
        String sideTag = getSideTag(userSide);

        redisPublisher.publishMessage(channelName, LEAVE_TAG + sideTag + " " + userNickname);
    }

    /**
     * 토론자 레디 Redis Pub/Sub
     *
     * 클라이언트단에서 Redis에 보낼 명령어
     * 없습니다
     *
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
        User user = userRepository.findById(requestRoomEnterDto.getUserId()).get();
        Long roomId = requestRoomEnterDto.getRoomId();
        String userNickname = user.getUser_nickname();
        Integer userSide = requestRoomEnterDto.getUserSide();

        String channelName = "room:" + roomId;
        String sideTag = getSideTag(userSide);

        redisPublisher.publishMessage(channelName, READY_TAG + sideTag + " " + userNickname);

        // Redis에서 레디상태 TRUE로 변경
        String userisReady = "room:" + roomId + ":"+ userNickname +":isReady";
        redisTemplate.opsForValue().set(userisReady,"TRUE");
    }

    /**
     * 토론자 레디 취소 Redis Pub/Sub
     *
     * 클라이언트단에서 Redis에 보낼 명령어
     * 없습니다
     *
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
        User user = userRepository.findById(requestRoomEnterDto.getUserId()).get();
        Long roomId = requestRoomEnterDto.getRoomId();
        String userNickname = user.getUser_nickname();
        Integer userSide = requestRoomEnterDto.getUserSide();

        String channelName = "room:" + roomId;
        String sideTag = getSideTag(userSide);

        redisPublisher.publishMessage(channelName, UNREADY_TAG + sideTag + " " + userNickname);

        // Redis에서 레디상태 FALSE로 변경
        String userisReady = "room:" + roomId + ":"+ userNickname +":isReady";
        redisTemplate.opsForValue().set(userisReady,"FALSE");
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
     *
     * 클라이언트단에서 Redis에 보낼 명령어
     * 없습니다
     *
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
            if(aBoolean==false){
                throw new NotReadyException("아직 준비가 안 된 유저가 있습니다.");
            }
        }
        for (Boolean aBoolean : rightUserIsReady) {
            if(aBoolean==false){
                throw new NotReadyException("아직 준비가 안 된 유저가 있습니다.");
            }
        }


        String channelName = "room:" + roomId;
        redisPublisher.publishMessage(channelName, START_TAG + " start debate");

        for (String userNickname : leftUserList) {
            String userisReady = "room:" + roomId + ":"+ userNickname +":isReady";
            redisTemplate.delete(userisReady);
        }

        for (String userNickname : rightUserList) {
            String userisReady = "room:" + roomId + ":"+ userNickname +":isReady";
            redisTemplate.delete(userisReady);
        }


        String turnKey = "room:" + roomId + ":turn";
        redisTemplate.opsForValue().set(turnKey,0);

    }

    // 여기까지가 토론 준비방에서 일어나는 상태변화입니다

    /**
     * 토론 페이즈 시작
     * 클라이언트단에서 발언 시작 버튼을 눌러
     * roomId와 phase, 발언자, 발언진영을 api request로 보내시면
     *
     * redis에 저장된 현재 phase, 현재 선,후턴 정보를 합쳐서
     *
     * room:roomId 채널(방에 입장한 모두가 들어와 있는 채널)로
     * 현재 phase, 선.후턴, 어느 플레이어가 말하고 있는지 정보를
     * [PHASESTART] 몇페이즈인지
     * [TURN] 선,후턴
     * [TEAM] 팀
     * [CURRENT DEBATER] 누가말하는지(닉네임)
     * 태그가 붙은 메시지로 나눠서 PUBLISH합니다.(합쳐서 보낼 수도 있고 프론트에서 파싱하기 편한대로 수정가능)
     *
     * 발언이 시작한 후 턴 스킵이 일어나지 않고
     * 발언시간(현재는 60초로 설정)이 끝나면
     * [PHASEEND] 몇페이즈인지
     * [TURN] 선,후턴
     * [TEAM] 팀
     * 태그를 붙여 몇페이즈의 선,후턴이 종료되었는지 PUBLISH합니다
     */
    public void startPhase(RequestPhaseStartDto requestPhaseStartDto){

        Long roomId = requestPhaseStartDto.getRoomId();
        String userNickname = requestPhaseStartDto.getUserNickname();
        String team = requestPhaseStartDto.getTeam();
        Integer phase = requestPhaseStartDto.getPhase();

        String phaseKey = "room:" + roomId + ":phase";
        String turnKey = "room:" + roomId + ":turn";
        String phasestarttimeKey = "room:" + roomId + ":phasetime";
        String currentSpeakingUserKey = "room:" + roomId + ":currentSpeakingUser";
        String currentSpeakingTeamKey = "room:" + roomId + ":currentSpeakingTeam";

        Integer turn = (Integer) redisTemplate.opsForValue().get(turnKey);

        turn = turnChange(turn);

        redisTemplate.opsForValue().set(turnKey,turn);
        redisTemplate.opsForValue().set(phaseKey,phase);
        Long serverTime = System.currentTimeMillis() / 1000L;
        redisTemplate.opsForValue().set(phasestarttimeKey,serverTime);
        redisTemplate.opsForValue().set(currentSpeakingUserKey,userNickname);
        redisTemplate.opsForValue().set(currentSpeakingTeamKey,team);


        redisPublisher.publishMessage("room:"+roomId,"[PHASESTART] "+ phase);
        redisPublisher.publishMessage("room:"+roomId,"[TURN] "+ turn);
        redisPublisher.publishMessage("room:"+roomId,"[TEAM] "+ team);
        redisPublisher.publishMessage("room:"+roomId,"[CURRENT DEBATER] "+ userNickname);

        ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);

        Integer finalTurn = turn;
        ScheduledFuture<?> future = executorService.schedule(new Runnable() {
            @Override
            public void run() {
                redisPublisher.publishMessage("room:"+roomId,"[PHASEEND] "+ phase);
                redisPublisher.publishMessage("room:"+roomId,"[TURN] "+ finalTurn);
                redisPublisher.publishMessage("room:"+roomId,"[TEAM] "+ team);

                redisTemplate.delete(currentSpeakingTeamKey);
                redisTemplate.delete(currentSpeakingUserKey);
            }
        }, 10, TimeUnit.SECONDS);
        scheduledFutures.put(roomId+"_phase", future);
    }

    public void skipPhase(RequestSkipDto requestSkipDto) {
        Long roomId = requestSkipDto.getRoomId();
        String userNickname = requestSkipDto.getUserNickname();
        String team = requestSkipDto.getTeam();
        Integer phase = requestSkipDto.getPhase();

        String currentSpeakingTeamKey = "room:" + roomId + ":currentSpeakingTeam";
        String currentSpeakingUserKey = "room:" + roomId + ":currentSpeakingUser";
        String turnKey = "room:" + roomId + ":turn";
        Integer turn = (Integer) redisTemplate.opsForValue().get(turnKey);


        ScheduledFuture<?> future = scheduledFutures.get(roomId+"_phase");
        if (future != null) {
            future.cancel(false);
            redisPublisher.publishMessage("room:"+roomId,"[PHASESKIP] "+ phase);
            redisPublisher.publishMessage("room:"+roomId,"[TURN] "+ turn);
            redisPublisher.publishMessage("room:"+roomId,"[TEAM] "+ team);
            redisPublisher.publishMessage("room:"+roomId,"[CURRENT DEBATER] "+ userNickname);

            redisTemplate.delete(currentSpeakingTeamKey);
            redisTemplate.delete(currentSpeakingUserKey);
        }

    }

    // 투표 진행
    public void startVote(RequestVoteStartDto requestVoteStartDto){

        Long roomId = requestVoteStartDto.getRoomId();

        ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);

        Integer votePhase = requestVoteStartDto.getVotePhase();

        String voteLeftKey = "room:" + roomId +":votephase"+votePhase+":left";
        String voteRightKey = "room:" + roomId +":votephase"+votePhase+":right";

        redisTemplate.opsForValue().set(voteLeftKey,0);
        redisTemplate.opsForValue().set(voteRightKey,0);

        redisPublisher.publishMessage("room:"+roomId,"[VOTESTART] "+ votePhase);
        ScheduledFuture<?> future = executorService.schedule(new Runnable() {
            @Override
            public void run() {
                redisPublisher.publishMessage("room:"+roomId,"[VOTEEND] "+ votePhase);
                Integer voteResultLeft = (Integer) redisTemplate.opsForValue().get(voteLeftKey);
                Integer voteResultRight = (Integer) redisTemplate.opsForValue().get(voteRightKey);
                redisPublisher.publishMessage("room:"+roomId,"[VOTERESULT] "+ voteResultLeft+":"+voteResultRight);
            }
        }, 30, TimeUnit.SECONDS);
        scheduledFutures.put(roomId+"_vote", future);
    }


    // 여기부터 편의용 메서드
    
    /**
     * 편의용 메서드
     * 팀 태그
     * @param userSide
     * @return
     */
    private String getSideTag(Integer userSide) {
        if (userSide == 0) {
            return LEFT_SIDE_TAG;
        } else if (userSide == 1) {
            return RIGHT_SIDE_TAG;
        } else {
            return NO_SIDE_TAG;
        }
    }

    private static Integer turnChange(Integer turn) {
        if(turn == 0){
            turn = 1;
        } else if(turn ==1){
            turn = 2;
        } else if(turn ==2){
            turn = 1;
        }
        return turn;
    }

}
