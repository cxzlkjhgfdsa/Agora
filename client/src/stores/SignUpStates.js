import { atom } from "recoil";

export const nicknameCheckState = atom({
  key: 'nickNameCheckState',
  default: 'notChecked'
})

export const phoneCheckState = atom({
  key: 'phoneCheckState',
  default: 'notChecked'
})

export const nameValidState = atom({
  key: 'nameValidState',
  default: 'notChecked'
})

export const nicknameValidState = atom({
  key: 'nicknameValidState',
  default: 'notChecked'
})

export const birthValidState = atom({
  key: 'birthValidState',
  default: 'notChecked'
})

export const phoneValidState = atom({
  key: 'phoneValidState',
  default: 'notChecked'
})