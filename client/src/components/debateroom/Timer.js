import { useState, useEffect } from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";

// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { phaseNumberState, phaseDetailState, leftUserListState, rightUserListState, counterState, timerState } from "stores/DebateStates";

function Timer() {
  // const [count, setCount] = useState(0);
  // const [timer, setTimer] = useState(180);
  const [count, setCount] = useRecoilState(counterState);
  const [timer, setTimer] = useRecoilState(timerState);
  const phaseNum = useRecoilValue(phaseNumberState);
  const phaseDetail = useRecoilValue(phaseDetailState);
  const leftUserList = useRecoilValue(leftUserListState);
  const rightUserList = useRecoilValue(rightUserListState);

  const second = count % 60;
  const minute = Math.floor(count / 60);

  // count 시작
  useEffect(() => {
    const counter = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
    
    const countdownTimer = setInterval(() => {
      setTimer(timer => (timer - 1) > 0 ? (timer - 1) : 0)
    }, 1000)
    return () => {
      clearInterval(counter);
      clearInterval(countdownTimer)
    }
  },[])

  // useEffect(() => {
  //   const newTimer = phaseDetail===1 ? 180 : phaseDetail===2 ? 180 : phaseDetail===3 ? 60 : 10
  //   setTimer(newTimer)
  // }, [phaseDetail])

  return(
    <div>
      <Grid container>
        <Grid item xs={6}>
          <CountdownDiv className="nickname-root">
            {timer >= 100 ? timer : timer >= 10 ? `0${timer}` : `00${timer}`}s
            <NicknameDiv>
              {phaseDetail >= 2 ? rightUserList[phaseNum - 1] : leftUserList[phaseNum - 1]}
            </NicknameDiv>
          </CountdownDiv>
        </Grid>
        <Grid item xs={6}>
          <DebatetimeDiv className="text-root">
            토론 시간<br />
            <TimerWrapper>
              {minute >= 10 ? minute : `0${minute}`} : {second >= 10 ? second : `0${second}`}
            </TimerWrapper>
            <PhaseDiv>
              {phaseNum === 2 ? "두" : phaseNum === 3 ? "세" : "첫"}번째 토론
            </PhaseDiv>
          </DebatetimeDiv>
        </Grid>
      </Grid>
    </div>
  )
}

const CountdownDiv = styled.div`
  // position
  position: relative;
  text-align: center;

  // margin
  margin-top: 20px;
  margin-left: 10%;

  // font
  font-weight: bold;
  font-size: 60px;
  color: white;
  
  // size
  width: 85%;
  height: 140px;
  border-radius: 12px;

  // color
  background-color: #F6C026;

  // shadow
  box-shadow: 3px 3px 3px #dddddd, -2px -1px 3px #eeeeee;

  // prevent drag
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
`

const NicknameDiv = styled.div`
  // position
  position: absolute;
  bottom: 0px;

  // font
  font-size: 24px;
  color: #F6C026;

  // size
  width: 100%;
  height: 40%;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  // color
  background-color: white;

  // display
  display: flex;
  justify-content: center;
  align-items: center;
`

const DebatetimeDiv = styled.div`
// position
position: relative;
text-align: center;

// margin
margin-top: 20px;
margin-left: 5%;
padding-top: 5px;

// font
font-weight: bold;
font-size: 28px;
color: white;

// size
width: 85%;
height: 135px;
border-radius: 12px;

// color
background-color: #777777;

// shadow
box-shadow: 3px 3px 3px #dddddd, -2px -1px 3px #eeeeee;

// prevent drag
-webkit-user-select:none;
-moz-user-select:none;
-ms-user-select:none;
user-select:none;
`

const TimerWrapper = styled.div`
  font-size: 32px;
  margin-top: -5px;
  color: inherit;
`

const PhaseDiv = styled.div`
  // position
  position: absolute;
  bottom: 0px;

  // font
  font-size: 24px;
  color: #777777;

  // size
  width: 100%;
  height: 40%;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  // color
  background-color: white;

  // display
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Timer