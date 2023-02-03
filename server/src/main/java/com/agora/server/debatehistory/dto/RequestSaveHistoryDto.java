package com.agora.server.debatehistory.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestSaveHistoryDto {
    private Long room_id;
    private boolean room_state;

    public boolean checkRoomState(){
        if(this.room_state){
            return true;
        }else{
            return false;
        }
    }
}
