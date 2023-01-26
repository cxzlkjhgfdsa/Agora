// Recoil로 관리될 Atom을 정의하고 생성합니다.
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// 페이지를 새로고침하면 recoil state가 증발하는데, 
// recoil-persist (npm install recoil-persist)를 사용하면 sessionStorage or localStorage(default)에 보관 가능합니다.
// 서버에서 refresh-token을 관리하고 프론트에서는 access-token만 받아서 sessionStorage에 저장하는 방식으로 구현합니다. - 인덕
// export const persistAtom = recoilPersist({
//   key: "persistAtom",
//   storage: sessionStorage,
// })

/* 
일단은 recoil-persist를 이용해 session storage에 access-token을 저장했지만 
client-side storage에 저장하는 것은 악의적인 js코드에 의해 접근이 가능합니다.
그보다는 HttpOnly 쿠키, 또 이것보다는 Secure 쿠키가 더 안전합니다. 
2020년의 크롬 80버전 부터는 SameSite 속성을 None을 설정할 경우 쿠키에 반드시 secure = true 속성을 넣어주셔야 합니다. -인덕
https://nsinc.tistory.com/121
https://coding-factory.tistory.com/843
*/
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
  // effects_UNSTABLE: [persistAtom],
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
