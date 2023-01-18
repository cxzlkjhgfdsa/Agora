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

// 검색창 검색 결과
// 해시태그 검색 결과
export const HashTagsSearchResultAtom = atom({
  key: "HashTagsSearchResult",
  default: [],
});

// 사용자 이름 검색 결과
export const UserSearchResultAtom = atom({
  key: "UserSearchResult",
  default: [],
});

// 방제 검색 결과
export const TitleSearchResultAtom = atom({
  key: "TitleSearchResult",
  default: [],
});