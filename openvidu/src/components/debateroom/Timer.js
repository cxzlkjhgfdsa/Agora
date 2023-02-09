import { useState, useEffect } from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";

// recoil
import { useRecoilValue } from "recoil";
import { phaseNumState, sessionNumState } from "../stores/DebateRoomStates";

function Timer() {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(180);
  const phaseNum = useRecoilValue(phaseNumState);
  const sessionNum = useRecoilValue(sessionNumState)

  const second = count % 60
  const minute = Math.floor(count / 60)

  // temp nickname
  const nickname = "깐풍쿠키파앗으타"

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

  useEffect(() => {
    const newTimer = phaseNum===1 ? 180 : phaseNum===2 ? 180 : phaseNum===3 ? 60 : 10
    setTimer(newTimer)
  }, [phaseNum])

  return(
    <div>
      <Grid container>
        <Grid item xs={6}>
          <CountdownDiv className="nickname-root">
            {timer >= 100 ? timer : timer >= 10 ? `0${timer}` : `00${timer}`}s
            <NicknameDiv>
              <div>
                {nickname}
              </div>
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
              {sessionNum === 0 ? "첫" : sessionNum === 1 ? "두" : "세"}번째 토론
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