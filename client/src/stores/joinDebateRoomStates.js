import { atom } from "recoil";

// 방장: host
// 발언자: speaker
// 시청자: viewer
export const debateUserRoleState = atom({
  key: "DebateUserRole",
  default: "viewer"
});