import { atom, atomFamily, selectorFamily, DefaultValue } from "recoil";

export const debateRoomsAtomFamily = atomFamily({
  key: "debateRoomsAtomFamily",
  default: (params) => {
    return {
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
    }
  },
});

export const debateRoomIdsAtom = atom({
  key: "debateRoomIdsAtom",
  default: [],
})

export const debateRoomsSelectorFamily = selectorFamily({
  key: "debateRoomsSelectorFamily",

  get: (roomId) => ({ get }) => {
    get(debateRoomsAtomFamily(roomId))
  },

  set: (roomId) => ({ get, set, reset }, roomInfo) => {
    if (roomInfo instanceof DefaultValue) {
      reset(debateRoomsAtomFamily(roomInfo))
      set(debateRoomIdsAtom, (prev) => prev.filter((item) => item !== roomInfo))
      
      return
    }

    set(debateRoomsAtomFamily(roomId), roomInfo)
    set(debateRoomIdsAtom, (prev) => Array.from(new Set([...prev, roomId])))
  },
})