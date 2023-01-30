import { atomFamily } from "recoil";

export const debateRoomState = atomFamily({
  key: "debateRoomState",
  default: (params) => ({
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
  }),
});
