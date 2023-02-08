import { atom, atomFamily, selectorFamily, DefaultValue } from "recoil";

export const debateRoomsAtomFamily = atomFamily({
  key: "debateRoomsAtomFamily",
  default: {
      roomId: "",
      roomName: "",
      roomCreaterName: "",
      roomDebateType: "",
      roomOpinionLeft: "",
      roomOpinionRight: "",
      roomHashtags: "",
      roomWatchCnt: "",
      roomPhase: "",
      roomPhaseCurrentTimeMinute: "",
      roomPhaseCurrentTimeSecond: "",
      roomStartTime: "",
      roomThumbnailUrl: "",
      roomCategory: "",
      roomState: "",
      leftUserList: [],
      rightUserList: [],
    }
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