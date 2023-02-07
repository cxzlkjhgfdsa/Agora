package com.agora.server.debatehistory.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestSaveHistoryDto {
    private Long roomId;
    private boolean roomState;

    public boolean checkRoomState(){
        if(this.roomState){
            return true;
        }else{
            return false;
        }
    }
}
