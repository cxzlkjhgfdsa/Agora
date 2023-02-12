import { atom } from "recoil";

export const joinModalState = atom({
  key: "joinModalState",
  default: {
    roomId: "",
    isModalOpen: false,
  }
});

export const createModalState = atom({
  key: "createModalState",
  default: {
    isModalOpen: false,
  }
})