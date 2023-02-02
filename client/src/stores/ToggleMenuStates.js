import { atom } from "recoil";

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