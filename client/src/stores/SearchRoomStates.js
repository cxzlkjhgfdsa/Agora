import { atom } from "recoil";

// 검색창 키워드
export const searchKeywordState = atom({
  key: "SearchKeyword",
  default: "",
});

// 검색창 해시태그 (쉼표로 join된 문자열)
export const searchStringHashTagsState = atom({
  key: "SearchHashTags",
  default: "",
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