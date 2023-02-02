package com.agora.server.room.service;

import com.agora.server.room.controller.dto.RequestDebateStartDto;
import com.agora.server.room.controller.dto.RequestRoomEnterDto;
import com.agora.server.room.exception.NotReadyException;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DebateService {


    private final RedisPublisher redisPublisher;

    private final UserRepository userRepository;

    private final RedisTemplate<String, Object> redisTemplate;

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
     */
    public void startDebate(RequestDebateStartDto requestDebateStartDto) throws NotReadyException {

        Long roomId = requestDebateStartDto.getRoomId();
        List<String> leftUserList = requestDebateStartDto.getLeft_user_list();
        List<String> rightUserList = requestDebateStartDto.getRight_user_list();
        List<Boolean> leftUserIsReady = requestDebateStartDto.getLeft_user_isReady();
        List<Boolean> rightUserIsReady = requestDebateStartDto.getRight_user_isReady();

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

    }

    // 여기까지가 토론 준비방에서 일어나는 상태변화입니다


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

}
