package com.agora.server.debatehistory.service;

import com.agora.server.debatehistory.domain.DebateHistory;
import com.agora.server.debatehistory.dto.ResponseHistoryInfoDto;
import com.agora.server.debatehistory.repository.DebateHistoryQueryRepository;
import com.agora.server.debatehistory.repository.DebateHistoryRepository;
import com.agora.server.room.domain.Room;
import com.agora.server.room.repository.RoomRepository;
import com.agora.server.room.util.RedisKeyUtil;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    private final DebateHistoryQueryRepository debateHistoryQueryRepository;

    @Transactional
    public void saveHistory(DebateHistory debateHistory) {
        debateHistoryRepository.save(debateHistory);
    }

    public Page<ResponseHistoryInfoDto> findByUserId(String userId, Pageable pageable) {
       Page<ResponseHistoryInfoDto> pageByRoomnamePages = debateHistoryQueryRepository.findAllByUserIdPages(userId, pageable);
      return pageByRoomnamePages;
    }

    public DebateHistory createDebateHistory(Long roomId,String userNickname,String userTeam){
        Room room = roomRepository.findById(roomId).get();
        String leftUserListKey = redisKeyUtil.leftUserListKey(roomId);
        String rightUserListKey = redisKeyUtil.rightUserListKey(roomId);
        List<Integer> voteLeftList = new ArrayList<>();
        for(int i = 1; i <= 3; i++){
            String voteLeftResulPercentKey = redisKeyUtil.voteLeftResulPercentKey(roomId, i);
            Integer voteLeftNum = (Integer) redisTemplate.opsForValue().get(voteLeftResulPercentKey);
            voteLeftList.add(voteLeftNum);
        }
        List<Integer> voteRightList = new ArrayList<>();
        for(int i = 1; i <= 3; i++){
            String voteRightResultPercentKey = redisKeyUtil.voteRightResultPercentKey(roomId, i);
            Integer voteRightNum = (Integer) redisTemplate.opsForValue().get(voteRightResultPercentKey);
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
