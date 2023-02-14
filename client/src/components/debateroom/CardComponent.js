import styled, { keyframes } from "styled-components";
import "./CardComponent.css"
import { useState } from "react";
import customAxios from "utils/customAxios";

// recoil
import { useRecoilValue } from "recoil";
import { firstCardState, secondCardState, leftCardListState, rightCardListState, isStartState, cardNumState } from "stores/DebateStates";

function CardComponent({role, roomId, nickname}) {

  const firstCard = useRecoilValue(firstCardState);
  const secondCard = useRecoilValue(secondCardState);
  const leftCardList = useRecoilValue(leftCardListState);
  const rightCardList = useRecoilValue(rightCardListState);
  const isStart = useRecoilValue(isStartState);
  const cardNum = useRecoilValue(cardNumState);
  const numList = [0, 1, 2, 3, 4, 5];

  const [selectCard, setSelectCard] = useState(undefined);

  const handleMyCard = (e) => {
    console.log(e.target.id)
    const cardIdx = e.target.id === "first" ? 0 : 1
    const axios = customAxios();
    axios
      .post('/v2/debate/cardopen', {
        "roomId" : roomId,
        "userNickname" : nickname,
        "cardIdx" : cardIdx,
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleCard = (e) => {
    console.log(e.target.id)
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
              <CardCropping key={num} id={num} onClick={handleCard}>
                <CardImage src={leftCardList[num]} />
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
              <CardCropping key={num}>
                <CardImage src={rightCardList[num]} />
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
`
