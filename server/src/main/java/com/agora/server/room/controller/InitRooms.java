package com.agora.server.room.controller;

import com.agora.server.category.domain.Category;
import com.agora.server.category.domain.UserCategory;
import com.agora.server.encrypt.domain.Encrypt;
import com.agora.server.openvidu.service.OpenViduService;
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
import java.util.Random;

@Profile("local")
@Component
@RequiredArgsConstructor
public class InitRooms {

    private final InitRoomService initRoomService;


    private final RoomService roomService;


    private final RedisTemplate<String, Object> redisTemplate;

    private final OpenViduService openViduService;

    @PostConstruct
    public void init(){
        initRoomService.init(redisTemplate, roomService, openViduService);

    }

    @Component
    static class InitRoomService {
        @PersistenceContext
        private EntityManager em;


        @Transactional
        public void init(RedisTemplate<String, Object> redisTemplate, RoomService roomService, OpenViduService openViduService){
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


//            for(int i = 0; i < 100; i++){
//                DebateType debateType = i % 2 == 0 ? DebateType.FORMAL : DebateType.SHORT;
//                String category = (i%10)+"번";
//                Room dummyRoom = Room.createDummyRoom(i + "번", i + "작성자", debateType, "leftopinon", "rightopinion", "#" + (i%10) + ",#" + ((i + 200)%200+20), "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg", category, i);
//                if(i%3==0){
//                    dummyRoom.roomStart();
//                }
//                em.persist(dummyRoom);
//                Long roomId = dummyRoom.getRoom_id();
////                openViduService.createSession(roomId);
//
//                // Redis에 "rooms:토론방id:column명" 을 key로 필요한 정보들 저장
//                ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
//                // 토론 방 페이즈 방 생성시는 0
//                String phaset = "room:"+roomId+":phase";
//                // 토론 방 페이즈의 시작 시간 방 생성시는 0
//                String phasestarttime = "room:"+roomId+":phasetime";
//                // 토론 방 페이즈의 시청자 수 방 생성시는 0
//                String watchcntt = "room:"+roomId+":watchcnt";
//
//                Integer watchcnt = i;
//                Integer phase = i%4;
//                // 저장
//                valueOperations.set(phaset, phase);
//                valueOperations.set(phasestarttime, 0);
//                valueOperations.set(watchcntt, watchcnt);
//
//                roomService.enterRoom(joinUser.getUser_id(),roomId,i%2);
//
//                roomService.roomPhaseStart(roomId,(i%3)+1);
//            }


            List<Room> customDummies = new ArrayList<>();


            User dummyUser1 = User.createUser(Encrypt.createEncrypt("123"), SocialType.GOOGLE, "123"
                    , "영좋사", "20", "01023232324",
                    "영화좋아하는사람", "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg");
            User dummyUser2 = User.createUser(Encrypt.createEncrypt("1234"), SocialType.KAKAO, "1234"
                    , "이동진", "20", "01023232325",
                    "이동진", "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg");
            User dummyUser3 = User.createUser(Encrypt.createEncrypt("1235"), SocialType.NAVER, "1235"
                    , "김영한", "20", "01023232326",
                    "김영한", "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg");
            User dummyUser4 = User.createUser(Encrypt.createEncrypt("1236"), SocialType.GOOGLE, "1236"
                    , "로다주", "20", "01023232327",
                    "로버트다우니주니어", "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg");
            User dummyUser5 = User.createUser(Encrypt.createEncrypt("1237"), SocialType.KAKAO, "1237"
                    , "삼병건", "20", "01023232328",
                    "안침착맨", "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg");
            User dummyUser6 = User.createUser(Encrypt.createEncrypt("1238"), SocialType.NAVER, "1238"
                    , "진라면", "20", "01023232329",
                    "라면조아", "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg");

            em.persist(dummyUser1);
            em.persist(dummyUser2);
            em.persist(dummyUser3);
            em.persist(dummyUser4);
            em.persist(dummyUser5);
            em.persist(dummyUser6);


            Room dummyRoom = Room.createDummyRoom("배트맨 최고 감독은?", "영화좋아하는사람", DebateType.FORMAL, "크리스토퍼 놀란", "맷 리브스", "#영화,#크리스토퍼놀란,#맷리브스", "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FRkqyn%2FbtrXIohMRVP%2FrXCZVNDLEEKPwNfjBCmjvK%2Fimg.png", "영화/드라마", 203);
            Room dummyRoom2 = Room.createDummyRoom("2022년의 영화는?", "이동진", DebateType.FORMAL, "탑건:매버릭", "에브리띵 에브리웨어 올앳원스", "#영화,#2022,#탑건:매버릭,#에에올", "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2r49z%2FbtrXInJW4Nx%2FMkuXqUZJNtfusYyWE6uUN0%2Fimg.png", "영화/드라마", 192);
            Room dummyRoom3 = Room.createDummyRoom("프로그래머 진로 상담", "김영한", DebateType.FORMAL, "백엔드", "프론트엔드", "#프로그래머,#백엔드,#프론트엔드,#뭐가좋아요", "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbuahof%2FbtrXGT4aryB%2FMp7YUmbKQd9gh7WKz4Tmd0%2Fimg.png", "공부", 176);
            Room dummyRoom4 = Room.createDummyRoom("시빌워 최애는?", "로버트다우니주니어", DebateType.FORMAL, "아이언맨", "캡틴아메리카", "#영화,#아이언맨,#마블,#캡아", "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F53miU%2FbtrXHNPZeR8%2FwgceDIMlSnydGK83o2LAk0%2Fimg.png", "영화/드라마", 155);
            Room dummyRoom5 = Room.createDummyRoom("침펄 토론 따라하기", "안침착맨", DebateType.FORMAL, "딱딱한 복숭아", "말랑 복숭아", "#침펄토론,#복숭아,#딱복,#말복", "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FccvJcN%2FbtrXHXrhjy7%2F8wtFTqBPT7Xr9hbl5PRCEk%2Fimg.png", "음식", 132);
            Room dummyRoom6 = Room.createDummyRoom("라면에 하나만 넣는다면?", "라면조아", DebateType.FORMAL, "김치", "계란", "#라면,#김치,#계란,#뭐든좋아", "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FOd05v%2FbtrXHT3JqkJ%2Fl0Qhf5QygUqOIskZwYEqWK%2Fimg.png", "음식", 344);

            em.persist(dummyRoom);
            em.persist(dummyRoom2);
            em.persist(dummyRoom3);
            em.persist(dummyRoom4);
            em.persist(dummyRoom5);
            em.persist(dummyRoom6);

            customDummies.add(dummyRoom);
            customDummies.add(dummyRoom2);
            customDummies.add(dummyRoom3);
            customDummies.add(dummyRoom4);
            customDummies.add(dummyRoom5);
            customDummies.add(dummyRoom6);

            int idx = 1;

            for (Room customDummy : customDummies) {
                idx++;
                Long roomId = customDummy.getRoom_id();
//                openViduService.createSession(roomId);

                ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
                String phaset = "rooms:"+roomId+":phase";
                String phasestarttime = "rooms:"+roomId+":phasetime";
                String watchcntt = "rooms:"+roomId+":watchcnt";

                Integer phase = idx%3+1;
                // 저장
                valueOperations.set(phaset, 0);
                valueOperations.set(phasestarttime, 0);
                valueOperations.set(watchcntt, customDummy.getRoom_watch_cnt());

                roomService.enterRoom(dummyUser1.getUser_id(),roomId,idx%2);
                roomService.enterRoom(dummyUser2.getUser_id(),roomId,(idx+1)%2);
                roomService.enterRoom(dummyUser3.getUser_id(),roomId,(idx+2)%2);
                roomService.enterRoom(dummyUser4.getUser_id(),roomId,(idx+3)%2);
                roomService.enterRoom(dummyUser5.getUser_id(),roomId,(idx+4)%2);
                roomService.enterRoom(dummyUser6.getUser_id(),roomId,(idx+5)%2);

                roomService.roomPhaseStart(roomId,phase);
            }

            } catch (Exception e){
                e.printStackTrace();
            }


        }


    }

}
