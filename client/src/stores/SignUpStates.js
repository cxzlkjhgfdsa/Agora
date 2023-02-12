import { atom } from "recoil";


// 인증용 state
export const nicknameCheckState = atom({
  key: 'nickNameCheckState',
  default: 'notChecked'
})

export const phoneCheckState = atom({
  key: 'phoneCheckState',
  default: 'notChecked'
})

// 데이터 유효 검사용 state
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

// 데이터 저장용 state
export const nameDataState = atom({
  key: 'nameDataState',
  default: ''
})

export const nicknameDataState = atom({
  key: 'nicknameDataState',
  default: ''
})

export const birthDataState = atom({
  key: 'birthDataState',
  default: ''
})

export const phoneDataState = atom({
  key: 'phoneDataState',
  default: ''
})

export const socialDataState = atom({
  key: 'socialDataState',
  default: null,
})

export const profileDataState = atom({
  key: 'profileDataState',
  default: null,
})