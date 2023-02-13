package com.agora.server.debatehistory.service;

import com.agora.server.debatehistory.domain.DebateHistory;
import com.agora.server.debatehistory.repository.DebateHistoryRepository;
import com.agora.server.room.domain.Room;
import com.agora.server.room.repository.RoomRepository;
import com.agora.server.room.util.RedisKeyUtil;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DebateHistoryService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final RedisKeyUtil redisKeyUtil;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final DebateHistoryRepository debateHistoryRepository;

    @Transactional
    public void saveHistory(DebateHistory debateHistory) {
        debateHistoryRepository.save(debateHistory);
    }

    public List<DebateHistory> findByUserId(String userId) {
       return debateHistoryRepository.findByUser_id(userId);
    }

    public DebateHistory createDebateHistory(Long roomId,String userNickname,String userTeam){
        Room room = roomRepository.findById(roomId).get();
        String leftUserListKey = redisKeyUtil.leftUserListKey(roomId);
        String rightUserListKey = redisKeyUtil.rightUserListKey(roomId);
        List<Integer> voteLeftList = new ArrayList<>();
        for(int i = 1; i <= 3; i++){
            String voteLeftKey = redisKeyUtil.voteLeftKey(roomId, i);
            Integer voteLeftNum = (Integer) redisTemplate.opsForValue().get(voteLeftKey);
            voteLeftList.add(voteLeftNum);
        }
        List<Integer> voteRightList = new ArrayList<>();
        for(int i = 1; i <= 3; i++){
            String voteRightKey = redisKeyUtil.voteRightKey(roomId, i);
            Integer voteRightNum = (Integer) redisTemplate.opsForValue().get(voteRightKey);
            voteRightList.add(voteRightNum);
        }
        List<String> playerWinList = new ArrayList<>();
        int playerWinCnt = 0;
        for(int i = 0; i < 3; i++){
            if(voteLeftList.get(i) < voteRightList.get(i)){
                if(userTeam.equals("LEFT")){
                    playerWinList.add("LOSE");
                    playerWinCnt--;
                } else if(userTeam.equals("RIGHT")){
                    playerWinList.add("WIN");
                    playerWinCnt++;
                }
            } else if(voteLeftList.get(i) == voteRightList.get(i)) {
                playerWinList.add("DRAW");
            } else if(voteLeftList.get(i) > voteRightList.get(i)){
                if(userTeam.equals("LEFT")){
                    playerWinList.add("WIN");
                    playerWinCnt++;
                } else if(userTeam.equals("RIGHT")){
                    playerWinList.add("LOSE");
                    playerWinCnt--;
                }
            }
        }
        String totalPlayerWin = null;
        if(playerWinCnt>0){
            totalPlayerWin = "WIN";
        } else if(playerWinCnt==0){
            totalPlayerWin = "DRAW";
        } else if(playerWinCnt<0){
            totalPlayerWin = "LOSE";
        }

        List<Object> leftuserlist = redisTemplate.opsForList().range(leftUserListKey, 0, -1);
        List<Object> rightuserlist = redisTemplate.opsForList().range(rightUserListKey, 0, -1);

        User user = userRepository.findByUser_nickname(userNickname);

        DebateHistory debateHistory = DebateHistory.createDebateHistory(user.getUser_id().toString(), room.getRoom_name(), room.getRoom_opinion_left(), room.getRoom_opinion_right(), userTeam, voteLeftList.get(0), voteRightList.get(0), voteLeftList.get(1), voteRightList.get(1), voteLeftList.get(2), voteRightList.get(2), playerWinList.get(0), playerWinList.get(1), playerWinList.get(2), totalPlayerWin, (String) leftuserlist.get(0), (String) leftuserlist.get(1), (String) leftuserlist.get(2), (String) rightuserlist.get(0), (String) rightuserlist.get(1), (String) rightuserlist.get(2), room.getRoom_category());

        return debateHistory;
    }
}
