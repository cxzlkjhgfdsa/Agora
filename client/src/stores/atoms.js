// Recoil로 관리될 Atom을 정의하고 생성합니다.
import { atom } from "recoil";

export const UserInfoAtom = atom({
  key: "UserInfo",
  default: {},
});

export const DebateInfoAtom = atom({
  key: "DebateInfo",
  default: {position: "Speaker"},
});