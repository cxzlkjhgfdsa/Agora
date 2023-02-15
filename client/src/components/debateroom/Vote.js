import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import customAxios from "utils/customAxios";

// recoil
import { useRecoilValue, useRecoilState } from "recoil";
import { phaseDetailState, timerState, voteLeftResultState, voteRightResultState } from "stores/DebateStates";

function Vote({roomId}) {
  const [isVote, setIsVote] = useState(false);
  const [timer, setTimer] = useRecoilState(timerState);
  const phaseDetail = useRecoilValue(phaseDetailState);
  const leftResult = useRecoilValue(voteLeftResultState);
  const rightResult = useRecoilValue(voteRightResultState);

  const lastIndexLeft = leftResult.length - 1;
  const lastIndexRight = rightResult.length - 1;

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

  const handleVoteButton = (e) => {
    const data = e.target.value;
    
    if (isVote === false && phaseDetail === 3) {
      console.log(data);
      // 투표 결과 보내기
      const axios = customAxios();
      axios
        .post("/v2/debate/vote", {
          "roomId" : roomId,
          "voteTeam" : data
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error)
        })
      // 투표 완료 처리
      setIsVote(data);
    }
  }

  useEffect(() => {
    const newTimer = phaseDetail === 3 ? 60 : 10;
    setTimer(newTimer);
    setIsVote(false);
  }, [phaseDetail]);
  
  return(
    <VoteWrapper>
      <TitleDiv 
        className={phaseDetail === 4 ? "result-root" : null}
      >
        투표시간
      </TitleDiv>
      <ButtonWrapper>
        <VoteButton value="LEFT" onClick={handleVoteButton}
        className={
          (phaseDetail === 4 & (leftResult[lastIndexLeft] < rightResult[lastIndexRight])) 
            ? "lose-root"
            : (phaseDetail === 4)
            ? "win-root"
            : isVote === "LEFT" 
            ? "selected-root" 
            : isVote === "RIGHT" 
            ? "disabled-root" 
            : null}
        >
          A          
          {phaseDetail === 4 
            ? (<ResultDiv>{lastIndexLeft >= 0 ? `${leftResult[lastIndexLeft]}%` : '0%'}</ResultDiv>)
            : null}

        </VoteButton>
        <TitleDiv className="timer-root">{timer}</TitleDiv>
        <VoteButton value="RIGHT" onClick={handleVoteButton}
          className={
            (phaseDetail === 4 & (leftResult[lastIndexLeft] > rightResult[lastIndexRight])) 
            ? "lose-root"
            : (phaseDetail === 4)
            ? "win-root"
            :isVote === "RIGHT" 
            ? "selected-root" 
            : isVote === "LEFT" 
            ? "disabled-root" 
            : null}
        >
          B
          {phaseDetail === 4 
            ? (<ResultDiv>{lastIndexRight >= 0 ? `${rightResult[lastIndexRight]}%` : '0%'}</ResultDiv>)
            : null}
        </VoteButton>
      </ButtonWrapper>
      <SubText className="timer-root">
        {phaseDetail === 3
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
  color : inherit;
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
    cursor: default;
    animation: ${winAnimation} 0.3s 0.01s ease 1 forwards;
  }

  &.lose-root {
    cursor: default;
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