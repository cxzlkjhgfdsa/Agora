// Recoil로 관리될 Atom을 정의하고 생성합니다.
import { atom } from "recoil";

export const userInfoState = atom({
  key: "userInfoState",
  default: { isLoggedIn: false },
});

export const debateInfoState = atom({
  key: "debateInfoState",
  default: {position: "Speaker"},
});

// 검색창 검색 결과
// 해시태그 검색 결과
export const hashTagsSearchResultState = atom({
  key: "HashTagsSearchResult",
  default: [],
});

// 사용자 이름 검색 결과
export const creatorSearchResultState = atom({
  key: "CreatorSearchResult",
  default: [],
});

// 방제 검색 결과
export const titleSearchResultState = atom({
  key: "TitleSearchResult",
  default: [],
});
