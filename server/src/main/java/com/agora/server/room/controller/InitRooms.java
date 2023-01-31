package com.agora.server.room.controller;

import com.agora.server.category.domain.Category;
import com.agora.server.category.domain.UserCategory;
import com.agora.server.encrypt.domain.Encrypt;
import com.agora.server.room.domain.DebateType;
import com.agora.server.room.domain.Room;
import com.agora.server.room.service.RoomService;
import com.agora.server.user.controller.dto.SocialType;
import com.agora.server.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@Profile("local")
@Component
@RequiredArgsConstructor
public class InitRooms {

    private final InitRoomService initRoomService;


    private final RoomService roomService;


    private final RedisTemplate<String, Object> redisTemplate;

    @PostConstruct
    public void init(){
        initRoomService.init(redisTemplate, roomService);

    }

    @Component
    static class InitRoomService {
        @PersistenceContext
        private EntityManager em;


        @Transactional
        public void init(RedisTemplate<String, Object> redisTemplate, RoomService roomService){
            try{

            User joinUser = User.createUser(Encrypt.createEncrypt("123"), SocialType.GOOGLE, "123"
                    , "테스트이름", "20", "01023232324",
                    "테스트닉", "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg");
            em.persist(joinUser);

                List<Category> categoryList = new ArrayList<>();
                categoryList.add(em.find(Category.class,1L));
                categoryList.add(em.find(Category.class,3L));
                categoryList.add(em.find(Category.class,5L));

                for(Category category : categoryList) {
                    em.persist(UserCategory.createUserCategory(joinUser, category));
                }


            for(int i = 0; i < 100; i++){
                DebateType debateType = i % 2 == 0 ? DebateType.FORMAL : DebateType.SHORT;
                String category = (i%10)+"번";
                Room dummyRoom = Room.createDummyRoom(i + "번", i + "작성자", debateType, "leftopinon", "rightopinion", "#" + (i%10) + ",#" + ((i + 200)%200+20), "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg", category, i);
                if(i%3==0){
                    dummyRoom.roomStart();
                }
                em.persist(dummyRoom);
                Long roomId = dummyRoom.getRoom_id();


                // Redis에 "rooms:토론방id:column명" 을 key로 필요한 정보들 저장
                ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
                // 토론 방 페이즈 방 생성시는 0
                String phaset = "rooms:"+roomId+":phase";
                // 토론 방 페이즈의 시작 시간 방 생성시는 0
                String phasestarttime = "rooms:"+roomId+":phasetime";
                // 토론 방 페이즈의 시청자 수 방 생성시는 0
                String watchcntt = "rooms:"+roomId+":watchcnt";

                Integer watchcnt = i;
                Integer phase = i%4;
                // 저장
                valueOperations.set(phaset, phase);
                valueOperations.set(phasestarttime, 0);
                valueOperations.set(watchcntt, watchcnt);

                roomService.enterRoom(joinUser.getUser_id(),roomId,i%2);

                roomService.roomPhaseStart(roomId,(i%3)+1);
            }

            } catch (Exception e){
                e.printStackTrace();
            }
        }


    }

}
