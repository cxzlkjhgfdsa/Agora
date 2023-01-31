import { Suspense, useEffect } from "react";
import { useRecoilState } from "recoil";
import { debateRoomsAtomFamily } from "stores/debateRoomStates";
import Spinner from "../../common/Spinner"

/* 
props: 
      roomId: params.room_id,
      roomName: params.room_name,
      roomCreaterName: params.room_creater_name,
      roomDebateType: params.room_debate_type,
      roomOpinionLeft: params.room_opinion_left,
      roomOpinionRight: params.room_opinion_right,
      roomHashtags: params.room_hashtags,
      roomWatchCnt: params.room_watch_cnt,
      roomPhase: params.room_phase,
      roomStartTime: params.room_start_time,
      roomThumbnailUrl: params.room_thumbnail_url,
      roomCategory: params.room_category,
*/

function Debate(props) {
    
    const [debateRoom, setDebateRoom] = useRecoilState(debateRoomsAtomFamily(props.room_id));

    return (
        <>
            <h1>{props.room_id}</h1>
        </>
    )
}

export default Debate;