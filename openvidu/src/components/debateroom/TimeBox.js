import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
// components
import DebateButton from "./DebateButton";
import CardInputButton from "./CardInputButton";
import Timer from "./Timer";
import Vote from "./Vote";
// mui
import Grid from "@mui/material/Grid";

// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { isStartState, isAllReadyState, roleState, CardNumState, readyMemberState, phaseNumState } from "../stores/DebateRoomStates";


function TimeBox() {
  // state
  const [isReady, setIsReady] = useState(false);
  
  // recoil state
  const cardNum = useRecoilValue(CardNumState);
  const [isStart, setIsStart] = useRecoilState(isStartState);
  const [isAllReady, setISAllReady] = useRecoilState(isAllReadyState);
  const [role, setRole] = useRecoilState(roleState);
  const [readyMember, setReadyMember] = useRecoilState(readyMemberState);
  const [phaseNum, setPhaseNum] = useRecoilState(phaseNumState)

  // toggle ready state
  const toggleReady = () => {
    // temp nickname
    const nickname = "A"

    const newReadyMember = [...readyMember, nickname];
    setIsReady(true);
    setReadyMember(newReadyMember);
  }

  // toggle start state
  const toggleStart = () => {
    setIsStart(true);
  }

  // set default value;
  useEffect(() => {
    setIsStart(false);
    setIsReady(false);
    // temporarily set user as a "DEBATER"
    setRole("debater");
  
    return(() => {
      setIsReady(false);
      setIsStart(false);
    })
  },[])

  // temp code to proceed the phase
  const tempcode = () => {
    const newPhaseNum = (phaseNum===4 ? 1 : phaseNum + 1)
    setPhaseNum(newPhaseNum)
  }

  useEffect(() => {
    console.log(phaseNum);
  }, [phaseNum])

  return(
    <Wrapper>
      <AreaDiv>
        {!isStart
          ?(
            <Grid container spacing={0}>
              <Grid item xs={8}>
                <CardInputButton />
              </Grid>
              <Grid item xs={4}>
                <CardNumDiv>
                  <TitleDiv>
                    카드 등록
                  </TitleDiv>
                  <div>
                    {cardNum}/2장
                  </div>
                  <DebateButton
                    className={(role==="debater") ? (!isReady?"readyButton-root" : "disableButton-root") : "startButton-root"}
                    onClick={(role==="debater")?toggleReady:toggleStart}
                  >
                    {(role==="debater") ? "준비 완료": "토론 시작"}
                  </DebateButton>
                </CardNumDiv>
              </Grid>
              <Grid item xs={12}>
                <SubText>
                  최대 2개까지 카드(이미지 자료)를 등록할 수 있습니다
                </SubText>
              </Grid>
              <button onClick={toggleStart}>start</button>
            </Grid>
          )
          : (
            <TimerWrapper>
              <VoteWrapper className={(phaseNum === 3 | phaseNum === 4)? "vote-root": null}>
                <Vote />
              </VoteWrapper>
              <VoteResultWrapper className={(phaseNum === 3 | phaseNum === 4)? "vote-root": null}>
                <Grid container>
                  <Grid item xs={6}>
                    <VoteRateDiv>
                      00:00
                      <VoteNameDiv>
                        첫번째 투표
                      </VoteNameDiv>
                    </VoteRateDiv>
                  </Grid>
                  <Grid item xs={6}>
                    <VoteRateDiv className="right-root">
                      00:00
                      <VoteNameDiv>
                        두번째 투표
                      </VoteNameDiv>
                    </VoteRateDiv>
                  </Grid>
                </Grid>
                <SubText className="timer-root">
                  첫번째 및 두번째 투표 기록(A:B) 입니다
                </SubText>
              </VoteResultWrapper>
              <TimeDiv className={(phaseNum === 3 | phaseNum === 4)? "vote-root": null}>
                <Timer />
                <SubText className="timer-root">
                  마우스를 올리면 투표 기록을 확인할 수 있습니다
                </SubText>
              </TimeDiv>
            </TimerWrapper>
          )}
      <TempCode>
        <button onClick={tempcode}>button</button>
      </TempCode>
      </AreaDiv>
    </Wrapper>
  )
}

export default TimeBox

const AreaDiv = styled.div`
  width: 100%;
  height: 200px;
  box-shadow: 1px 1px 3px #777777, -1px -1px 1px #eeeeee;
  border-radius: 12px;

  margin-top: 10px;
`

const Wrapper = styled.div`
`

const CardNumDiv = styled.div`
  // font
  font-size: 20px;
  font-weight: bold;
  color: #777777;
  letter-spacing: -1px;

  // positioning
  display: flex;
  flex-direction: column;
  align-items: center;

  // margin & padding
  margin-top: 25px;
  margin-right: 10px;
  line-height: 150%
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

const TitleDiv = styled.div`
  // font
  font-size: 24px;
  font-weight: bold;
  color: #444444;

  // positioning
  text-align: center;

  // margin
  margin-top: 10px;
`
const TimerWrapper = styled.div`
  position: relative;
`

const changeAnime = keyframes`
  to {
    opacity: 0;
  }
`

const voteAnime = keyframes`
  to {
    opacity: 1;
    z-index: 5;
  }
`

const TimeDiv = styled.div`
  // position
  position: absolute;
  top: 0px;

  // size
  width: 100%;
  height: 100%;
  border-radius: 12px;

  // color
  background-color: white;

  &.vote-root {
    animation: ${changeAnime} 0.3s 0.01s ease 1 forwards;
  }

  &:hover {
    animation: ${changeAnime} 0.3s 0.01s ease 1 forwards;
  }
`

const VoteRateDiv = styled.div`
  // position
  position: relative;
  text-align: center;

  // margin
  margin-top: 20px;
  margin-left: 10%;
  padding-top: 10px;

  // font
  font-weight: bold;
  font-size: 50px;
  color: white;
  
  // size
  width: 85%;
  height: 130px;
  border-radius: 12px;

  // color
  background-color: #777777;

  // shadow
  box-shadow: 3px 3px 3px #dddddd, -2px -1px 3px #eeeeee;

  &.right-root {
    margin-left: 5%;
  }
`

const VoteNameDiv = styled.div`
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
const VoteResultWrapper = styled.div`
  &.vote-root {
    opacity: 0;
  }
`
const VoteWrapper = styled.div`
  position: absolute;
  opacity: 0;
  width: 100%;

  &.vote-root {
    animation: ${voteAnime} 0.3s 0.01s ease 1 forwards;
  }
`

const TempCode = styled.div`
  margin-top: 200px;
`