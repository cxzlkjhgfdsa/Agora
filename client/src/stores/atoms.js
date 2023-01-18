// Recoil로 관리될 Atom을 정의하고 생성합니다.
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// 페이지를 새로고침하면 recoil state가 증발하는데, 
// recoil-persist (npm install recoil-persist)를 사용하면 sessionStorage or localStorage(default)에 보관 가능합니다.
// 서버에서 refresh-token을 관리하고 프론트에서는 access-token만 받아서 sessionStorage에 저장하는 방식으로 구현합니다. - 인덕
export const persistSessionState = recoilPersist({
  key: "persistSessionState",
  storage: sessionStorage,
})

export const userInfoState = atom({
  key: "userInfoState",
  default: { isLoggedIn: false },
  effects_UNSTABLE: [persistSessionState],
});

export const debateInfoState = atom({
  key: "debateInfoState",
  default: {position: "Speaker"},
});