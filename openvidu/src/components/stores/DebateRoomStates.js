import { atom } from "recoil";

export const roleState = atom({
  key: 'roleState',
  default: undefined,
})

export const isReadyState = atom({
  key: 'isReadyState',
  default: false,
})

export const isAllReadyState = atom({
  key: 'isAllReadyState',
  default: false,
})

export const isStartState = atom({
  key: 'isStartState',
  default: false,
})

export const CardNumState = atom({
  key: 'cardNumState',
  default: 0,
})

export const readyMemberState = atom({
  key: 'readyMemberState',
  default: [],
})

export const phaseNumState = atom({
  key: 'phaseNumState',
  default: 0,
})

export const sessionNumState = atom({
  key: 'sessionNum',
  default: 0,
})