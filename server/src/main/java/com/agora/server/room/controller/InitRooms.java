package com.agora.server.room.controller;

import com.agora.server.category.domain.Category;
import com.agora.server.category.domain.UserCategory;
import com.agora.server.encrypt.domain.Encrypt;
import com.agora.server.room.domain.DebateType;
import com.agora.server.room.domain.Room;
import com.agora.server.room.domain.RoomUser;
import com.agora.server.user.controller.dto.SocialType;
import com.agora.server.user.domain.User;
import com.agora.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
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
                Long watchcnt = Long.valueOf(i);
                Room dummyRoom = Room.createDummyRoom(i + "번", i + "작성자", debateType, "leftopinon", "rightopinion", "#" + (i%10) + ",#" + ((i + 200)%200+20), "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg", category, watchcnt, (i % 3) + 1);
                if(i%5==0){
                    dummyRoom.roomStart();
                }
                em.persist(dummyRoom);
                RoomUser roomUser = RoomUser.createRoomUser(joinUser);
                String userside = i % 2 == 0 ? "LEFT" : "RIGHT";
                roomUser.setRoom_user_side(userside);
                em.persist(roomUser);
                dummyRoom.addRoomUser(roomUser);
            }

            } catch (Exception e){
                e.printStackTrace();
            }
        }
    }

}
