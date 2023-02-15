import styled, { keyframes } from "styled-components";
import "./CardComponent.css"
import { useState } from "react";
import customAxios from "utils/customAxios";

// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { firstCardState, secondCardState, leftCardListState, rightCardListState, isStartState, cardNumState, openedFirstCardState, openedSecondCardState } from "stores/DebateStates";
import { leftUserListState, rightUserListState, phaseNumberState, phaseDetailState } from "stores/DebateStates";
import { userInfoState } from "stores/userInfoState";

function CardComponent({role, roomId, nickname}) {

  const firstCard = useRecoilValue(firstCardState);
  const secondCard = useRecoilValue(secondCardState);
  const leftCardList = useRecoilValue(leftCardListState);
  const rightCardList = useRecoilValue(rightCardListState);
  const isStart = useRecoilValue(isStartState);
  const cardNum = useRecoilValue(cardNumState);
  const numList = [0, 1, 2, 3, 4, 5];

  const [selectCard, setSelectCard] = useState(undefined);

  // 카드 오픈 시 차례를 확인하기 위한 State
  const leftUserList = useRecoilValue(leftUserListState);  // 좌측 주장 사용자
  const rightUserList = useRecoilValue(rightUserListState);  // 우측 주장 사용자
  const phaseNumber = useRecoilValue(phaseNumberState);  // 현재 페이즈
  const phaseDetail = useRecoilValue(phaseDetailState);  // 현재 페이즈 내에서 진행상황
  const userInfo = useRecoilValue(userInfoState);  // 현재 사용자 닉네임
  // 중복 오픈 확인을 위한 State
  const [openedFirstCard, setOpenedFirstCard] = useRecoilState(openedFirstCardState);
  const [openedSecondCard, setOpenedSecondCard] = useRecoilState(openedSecondCardState);
  const handleMyCard = (e) => {
    // 카드 오픈 시 현재 본인의 차례인지 확인
    // 1. 현재 페이즈에서 누구의 발언 상황도 아니라면 종료
    if (phaseDetail !== 1 && phaseDetail !== 2) {
      return;
    }
    
    // 2. 현재 페이즈, 현재 페이즈의 진행상황에서 누구의 차례인지 확인
    let curSpeaker = "";
    if (phaseDetail === 1) {  // 왼쪽 팀 차례일 경우
      curSpeaker = leftUserList[phaseNumber - 1];
    } else if (phaseDetail === 2) {  // 오른쪽 팀 차례일 경우
      curSpeaker = rightUserList[phaseNumber - 1];
    }

    // 3. 현재 이미지를 누른 사용자의 차례가 아니라면 종료
    if (curSpeaker !== userInfo?.userNickname) {
      return;
    }

    // 오픈할 카드 번호
    let cardIdx = null;
    if (e.target.id === "first") {
      cardIdx = 0;
      if (openedFirstCard) {
        alert("이미 오픈한 카드입니다.");
        return;
      }
      setOpenedFirstCard(true);
    } else if (e.target.id === "second") {
      cardIdx = 1;
      if (openedSecondCard) {
        alert("이미 오픈한 카드입니다.");
        return;
      }
      setOpenedSecondCard(true);
    }

    // 4. 카드 오픈 요청
    const axios = customAxios();
    axios.post("/v2/debate/cardopen", {
      roomId: roomId,
      userNickname: userInfo?.userNickname,
      cardIdx: cardIdx
    }).then(({ data }) => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
  }

  const handleCard = (e) => {
    // 없는 이미지라면 이벤트 종료
    if (document.querySelector(`img#${e.target.id}`)?.src === "") {
      return;
    }
    document.querySelector(`img#${e.target.id}`)?.classList.toggle("expanded");
  }

  const firstMyCard = cardNum === 2 ? firstCard : firstCard ? firstCard : secondCard ? secondCard : ""
  const secondMyCard = cardNum === 2 ? secondCard : ""

  return(
    <Wrapper>
      <CardArea>
        {(role !== "viewer")
        ? (
          <div>
            <Title>
              나의 카드 <Subtitle>참가자들에게 내 카드를 제출합니다</Subtitle>
            </Title>
            <div className="scrollBar">
              <CardCropping className="myCard-root">
                <CardImage src={firstMyCard} onClick={handleMyCard} id="first" />
              </CardCropping>
              <CardCropping className="myCard-root">
                <CardImage src={secondMyCard} onClick={handleMyCard} id="second" />
              </CardCropping >
            </div>
          </div>
        ) : null }
        <Title>
          A팀 카드 <Subtitle>카드를 클릭하여 확대할 수 있습니다</Subtitle>
        </Title>
        <div className="scrollBar">
          {numList.map((num) => {
            return(
              <CardCropping key={num} id={"lImage" + num} onClick={handleCard}>
                <CardImage id={"lImage" + num} src={leftCardList[num]} />
              </CardCropping>
            )
          })}
        </div>
        <Title>
          B팀 카드 <Subtitle>카드를 클릭하여 확대할 수 있습니다</Subtitle>
        </Title>
        <div className="scrollBar">
          {numList.map((num) => {
            return(
              <CardCropping key={num} id={"rImage" + num} onClick={handleCard}>
                <CardImage id={"rImage" + num} src={rightCardList[num]} />
              </CardCropping>
            )
          })}
        </div>
      </CardArea>
    </Wrapper>
  )
}

export default CardComponent

const CardArea = styled.div`
  width: 100%;
  height: 550px;
  
  box-shadow: 1px 1px 3px #777777, -1px -1px 1px #eeeeee;
  border-radius: 12px;
  color: white;

  background-color: #777777;
`

const Wrapper = styled.div`
  margin-top: 5px;
`

const Title = styled.div`
  padding-top: 8px;
  padding-bottom: 10px;
  margin-left: 20px;

  font-size: 24px;
  font-weight: bold;

  color: white;
`

const Subtitle = styled.span`
  margin-left: 5px;
  font-size: 14px;
  font-weight: normal;
  color: white;
`
const appearAnime = keyframes`
  to {
    opacity : 1;
  }
`

const darkenAnime = keyframes`
  to {
    opacity : 0.35;
  }
`

const DarkenDiv = styled.div`
  background-color: black;
  opacity: 0;
  height: 110px;
  width: 110px;
`

const TextButtonDiv = styled.div`
  color: white;
  font-size: 12px;
  font-weight: bold;
`

const CardCropping = styled.div`
  display: inline-block;

  position: relative;
  overflow: hidden;

  width: 110px;
  height: 110px;
  border-radius: 5px;

  margin-left: 10px;
  margin-bottom: 5px;
  background-color: #eeeeee;

  transition: all ease 0.3s;

  // 내 카드 control
  &.myCard-root {
    background-color: #777777
  }

  &:hover {
    ${DarkenDiv} {
      animation: ${ darkenAnime } 0.3s 0.01s ease 1 forwards;
    }
    ${TextButtonDiv} {
      animation: ${ appearAnime } 0.3s 0.01s ease 1 forwards;
    }
  }
`


const CardImage = styled.img`
  position: absoulte;
  
  cursor: pointer;

  width: 150px;
  height: auto;

  margin-left: calc(50% - 75px);

  &.expanded {
    // 크기 및 비율 설정
    min-width: 1280px;
    width: 80%;
    aspect-ratio: 16 / 9;

    margin: 0;

    position: fixed;
    top: 3%;
    left: 10%;
    z-index: 100;
    transition: 0.5s;

    // 비율 맞추기
    object-fit: contain;
    background-color: #141414;
  }
`
