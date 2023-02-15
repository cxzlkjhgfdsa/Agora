import { atom } from "recoil";

export const showAllModalState = atom({
  key: "showAllModalState",
  default: {
    isModalOpen: false,
    type: "",
  }
})

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