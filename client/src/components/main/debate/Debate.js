import { Suspense, useEffect, memo } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { debateRoomsAtomFamily, debateRoomsSelectorFamily } from "stores/debateRoomStates";

import styled from "styled-components" 

function Debate({ roomInfo }) {
    const [debateRoom, setDebateRoom] = useRecoilState(debateRoomsAtomFamily(roomInfo.room_id));
    const resetDebateRoom = useResetRecoilState(debateRoomsSelectorFamily(roomInfo.user_id));

    useEffect(() => {
        const newRoomInfo = {
            leftUserList: roomInfo.left_user_list,
            rightUserList: roomInfo.right_user_list,
            roomCategory: roomInfo.room_category,
            roomCreaterName: roomInfo.room_creater_name,
            roomDebateType: roomInfo.room_debate_type,
            roomHashtags: roomInfo.room_hashtags,
            roomId: roomInfo.room_id,
            roomName: roomInfo.room_name,
            roomOpinionLeft: roomInfo.room_opinion_left,
            roomOpinionRight: roomInfo.room_opinion_right,
            roomPhase: roomInfo.room_phase,
            roomPhaseCurrentTimeMinute: roomInfo.room_phase_current_time_minute,
            roomPhaseCurrentTimeSecond: roomInfo.room_phase_current_time_second,
            roomStartTime: roomInfo.room_start_time,
            roomState: roomInfo.room_state,
            roomThumbnailUrl: roomInfo.room_thumbnail_url,
            roomWatchCnt: roomInfo.room_watch_cnt,
        }
        setDebateRoom(newRoomInfo)

        return (() => {
            resetDebateRoom();
        })
    }, [setDebateRoom, resetDebateRoom])

    return (
        <StyledDebate>
            <span>debateId: {roomInfo.room_id}</span><br></br>
            <span>debateId: {debateRoom.roomId}</span>
        </StyledDebate>
    )
}

export default memo(Debate);

const StyledDebate = styled.div`
  flex: 0 0 25%;
  max-width: 25%;
  aspect-ratio: 16 / 9;
  border: .1px solid black;
  padding: .25rem;
`