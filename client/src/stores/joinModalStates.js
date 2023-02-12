import { atom } from "recoil";

export const joinModalState = atom({
  key: "joinModalState",
  default: {
    roomId: "",
    isModalOpen: false,
  }
});