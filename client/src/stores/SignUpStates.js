import { atom } from "recoil";

export const nicknameCheckState = atom({
    key: 'nickNameCheckState',
    default: 'notChecked'
})

export const phoneCheckState = atom({
    key: 'phoneCheckState',
    default: 'notChecked'
})