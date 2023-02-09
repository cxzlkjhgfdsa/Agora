import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// recoil
import { useRecoilValue } from "recoil";
import { phaseNumState } from "../stores/DebateRoomStates";

function Vote() {
  const [isVote, setIsVote] = useState(false);
  const [timer, setTimer] = useState(60);
  const phaseNum = useRecoilValue(phaseNumState);

  // temp win : A
  const winner = "A"

  // initiation
  useEffect(() => {
    setIsVote(false);

    return(() => {
      setIsVote(false);
    })
  },[])

  // timer
  useEffect(() => {
    const counter = setInterval(() => {
      setTimer(timer => (timer - 1) > 0 ? (timer - 1) : 0)
    }, 1000);

    return () => {
      clearInterval(counter)
    }
  }, [])

  const handleButton = (e) => {
    const data = e.target.value;
    
    if (isVote===false) {
      // temp data
      console.log(data);
      setIsVote(data)
    }
  }

  useEffect(() => {
    const newTimer = phaseNum === 3 ? 60 : 10;
    setTimer(newTimer);
    setIsVote(false);
  }, [phaseNum]);
  
  return(
    <VoteWrapper>
      <TitleDiv 
        className={phaseNum === 4 ? "result-root" : null}
      >
        투표시간
      </TitleDiv>
      <ButtonWrapper>
        <VoteButton value="A" onClick={handleButton}
        className={
          (phaseNum === 4 & winner === "A") 
            ? "win-root"
            : (phaseNum === 4 & winner === "B")
            ? "lose-root"
            : isVote === "A" 
            ? "selected-root" 
            : isVote === "B" 
            ? "disabled-root" 
            : null}
        >
          A          
          {phaseNum === 4 
            ? (<ResultDiv>80%</ResultDiv>)
            : null}

        </VoteButton>
        <TitleDiv className="timer-root">{timer}</TitleDiv>
        <VoteButton value="B" onClick={handleButton}
          className={
            (phaseNum === 4 & winner === "A") 
            ? "lose-root"
            : (phaseNum === 4 & winner === "B")
            ? "win-root"
            :isVote === "B" 
            ? "selected-root" 
            : isVote === "A" 
            ? "disabled-root" 
            : null}
        >
          B
          {phaseNum === 4 
            ? (<ResultDiv>20%</ResultDiv>)
            : null}
        </VoteButton>
      </ButtonWrapper>
      <SubText className="timer-root">
        {phaseNum === 3
        ? "더 설득력 있는 의견에 투표해 주세요"
        : "잠시 후 다음 토론을 시작합니다."
        }
      </SubText>
    </VoteWrapper>
  )
}

const winAnimation = keyframes`
  to {
    height: 100px;
    margin-top: 1%;
    font-size: 30px;
    background-color: #F6C026;
    color: white;
  }
`

const loseAnimation = keyframes`
  to {
    height: 100px;
    margin-top: 1%;
    font-size: 30px;
    background-color: #f1f1f1;
    color: #bbbbbb;
  }
`

const appearAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const resultTitleAnime = keyframes`
  from {
    font-size: 40px;
  }
  to {
    font-size: 30px;
  }
`

const ResultDiv = styled.div`
  animation: ${appearAnimation} 1s 0s ease 1 forwards;
`

const VoteWrapper = styled.div`
  width: 100%;
`

const VoteButton = styled.button`
  // size
  height: 80px;
  width: 60%;

  // font
  font-size: 50px;
  font-weight: bold;
  color: #F6C026;

  // border
  border: none;
  border-radius: 12px;

  // pointer
  cursor: pointer;

  // background
  background-color: white;

  // shadow
  box-shadow: 1px 1px 3px #bbbbbb, -1px -1px 3px #eeeeee;

  // margin
  margin-top: 3%;
  margin-left: 10%;
  margin-right: 10%;

  // prevent drag
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;

  &.selected-root {
    cursor: default;
    background-color: #F6C026;
    color: white;
  }

  &.disabled-root {
    cursor: default;
    background-color: #f1f1f1;
    color: #bbbbbb;
  }

  &.win-root {
    animation: ${winAnimation} 0.3s 0.01s ease 1 forwards;
  }

  &.lose-root {
    animation: ${loseAnimation} 0.3s 0.01s ease 1 forwards;
  }
`
const TitleDiv = styled.div`
  // position
  display: flex;
  justify-content: center;

  // font
  font-size: 40px;
  font-weight: bold;

  // color
  color: #777777;

  // margin
  margin-top: 10px;

  &.result-root {
    font-size: 30px;
  }

  &.timer-root {
    width: 10px;
  }

  &.result-root {
    animation: ${resultTitleAnime} 0.3s 0s ease 1 forwards;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SubText = styled.div`
  // font
  font-size: 15px;
  color: #777777;

  // positioning
  text-align: center;

  // margin
  margin-top: 20px;

  // prevent drag
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;

  &.timer-root {
    margin-top: 10px;
  }
`

export default Vote