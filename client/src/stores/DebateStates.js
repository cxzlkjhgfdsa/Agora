import { atom } from "recoil";

// atom to declare the start state
export const isStartState = atom({
  key: 'isStartState',
  default: false,
})

// atom to declare the session number(the order of the debates/ 0, 1, 2) state
export const sessionNumState = atom({
  key: 'sessionNumState',
  default: [],
})

// atom to declare the phase number(the turn of debates)
// 0 : the very first phase of the whole debates
// 1 : the turn of A speaker
// 2 : the turn of B speaker
// 3 : the turn to vote
// 4 : the turn to check the vote result
export const phaseNumState = atom({
  key: 'phaseNumState',
  default: 0,
})

// atom to declare the num of submitted cards
export const cardNumState = atom({
  key: 'cardNumState',
  default: 0,
})

// 왼쪽 카드 요소 
export const leftCardListState = atom({
  key: 'LeftCardListState',
  default: []
})

// 오른쪽 카드 요소
export const rightCardListState = atom({
  key: 'RightCardListState',
  default: []
})

// 왼쪽 참여자
export const leftUserListState = atom({
  key: 'leftUserListState',
  default: []
})

// 오른쪽 참여자
export const rightUserListState = atom({
  key: 'rightUserListState',
  default: []
})

// 준비 인원
export const readyUserListState = atom({
  key: 'readyUserListState',
  default: []
})

// 
