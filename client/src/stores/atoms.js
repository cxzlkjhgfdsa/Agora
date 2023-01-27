// Recoil로 관리될 Atom을 정의하고 생성합니다.
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export const persistAtom = recoilPersist({
  key: "user-info",
  storage: sessionStorage,
})

export const userInfoState = atom({
  key: "userInfoState",
  default: { 
    isLoggedIn: false,
    accessToken: "",
    userId: "",
    userNickname: "",
    socialType: "",
    userPhoto: "",
  },
  //effects_UNSTABLE: [persistAtom],
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

// 토글 메뉴 출력 여부
export const showToggleMenuState = atom({
  key: "ShowToggleMenu",
  default: false,
});
// 토글 메뉴 아이템
export const toggleMenuItemsState = atom({
  key: "ToggleMenuItems",
  default: [],
});