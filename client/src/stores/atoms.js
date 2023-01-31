// Recoil로 관리될 Atom을 정의하고 생성합니다.
import { atom } from "recoil";

export const debateInfoState = atom({
  key: "debateInfoState",
  default: {position: "Speaker"},
});