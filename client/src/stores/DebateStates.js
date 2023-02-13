import { atom } from "recoil";

// atom to declare the start state
export const isStartState = atom({
  key: 'isStartState',
  default: false,
})

// atom to declare the num of submitted cards
export const cardNumState = atom({
  key: 'cardNumState',
  default: 0,
})

// debator가 저장한 카드 요소
export const firstCardState = atom({
  key: 'firstCardState',
  default: "",
})

export const secondCardState = atom({
  key: 'secondCardState',
  default: "",
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

// phase nuber
// atom to declare the session number(the order of the debates/ 0, 1, 2) state
export const phaseNumberState = atom({
  key: 'phaseNumberState',
  default: 0,
})

// atom to declare the phase number(the turn of debates)
// 0 : the very first phase of the whole debates
// 1 : the turn of A speaker
// 2 : the turn of B speaker
// 3 : the turn to vote
// 4 : the turn to check the vote result
// phase detail
export const phaseDetailState = atom({
  key: 'phaseDetailState',
  default: 0,
})

// 투표결과 저장
export const voteLeftResultState = atom({
  key: 'voteLeftResult',
  default: [],
})

export const voteRightResultState = atom({
  key: 'voteRightResult',
  default: [],
})