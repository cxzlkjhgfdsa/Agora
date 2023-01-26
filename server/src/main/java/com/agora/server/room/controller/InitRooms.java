package com.agora.server.room.controller;

import com.agora.server.room.domain.DebateType;
import com.agora.server.room.domain.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Profile("local")
@Component
@RequiredArgsConstructor
public class InitRooms {

    private final InitRoomService initRoomService;

    @PostConstruct
    public void init(){
        initRoomService.init();
    }

    @Component
    static class InitRoomService {
        @PersistenceContext
        private EntityManager em;

        @Transactional
        public void init(){
            for(int i = 0; i < 100; i++){
                DebateType debateType = i % 2 == 0 ? DebateType.FORMAL : DebateType.SHORT;
                String category = i % 2 == 0 ? "음악" : "일상";
                Long watchcnt = Long.valueOf(i);
                em.persist(Room.createDummyRoom(i+"번",i+"작성자",debateType,"leftopinon","rightopinion","#"+i+",#"+(i+200),"https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",category,watchcnt,(i%3)+1));
            }
        }
    }

}
