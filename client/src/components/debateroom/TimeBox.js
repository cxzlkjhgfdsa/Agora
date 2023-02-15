import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
// components
import DebateButton from "./DebateButton";
import CardInputButton from "./CardInputButton";
import Timer from "./Timer";
import Vote from "./Vote";
import ReadyTimer from "./ReadyTimer";
// mui
import Grid from "@mui/material/Grid";
// axios
import customAxios from "utils/customAxios";

// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { isStartState, readyUserListState, phaseDetailState, phaseNumberState, cardNumState, voteLeftResultState, voteRightResultState } from "stores/DebateStates";



function TimeBox({isAllReady, roomId, role, nickname}) {
  // state
  const [isReady, setIsReady] = useState(false);
  
  // recoil state
  const cardNum = useRecoilValue(cardNumState);
  const voteLeftResult = useRecoilValue(voteLeftResultState);
  const voteRightResult = useRecoilValue(voteRightResultState);
  const [isStart, setIsStart] = useRecoilState(isStartState);
  const [phaseDetail, setPhaseDetail] = useRecoilState(phaseDetailState);
  


  // toggle ready state
  const toggleReady = () => {

    setIsReady(true);

    // send a user data who clicks the ready button
    const axios = customAxios()
    axios
      .put(`/v2/debate/ready`, {
        "userNickname" : nickname,
        "roomId": roomId
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  // toggle start state
  const toggleStart = () => {
    if (isAllReady) {
      const axios = customAxios();
      axios
        .put(`/v2/debate/start`, {
          "roomId" : roomId,
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  // set default value;
  useEffect(() => {
    setIsStart(false);
    setIsReady(false);
  
    return(() => {
      setIsReady(false);
      setIsStart(false);
    })
  },[])

  return(
    <Wrapper>
      <AreaDiv>
        {(!isStart & role!=="viewer")
          ?(
            <Grid container spacing={0}>
              <Grid item xs={8}>
                <CardInputButton isReady={isReady} />
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
                    className={(role==="speaker") ? (!isReady?"readyButton-root" : "disableButton-root") : (isAllReady ? "startButton-root" : "disableButton-root")}
                    onClick={(role==="speaker")?toggleReady:toggleStart}
                  >
                    {(role==="speaker") ? "준비 완료": "토론 시작"}
                  </DebateButton>
                </CardNumDiv>
              </Grid>
              <Grid item xs={12}>
                <SubText>
                  최대 2개까지 카드(이미지 자료)를 등록할 수 있습니다
                </SubText>
              </Grid>
            </Grid>
          )
          : (!isStart & role==="viewer")
          ? (
            <div>
              <ReadyTimer />
              <SubText className="timer-root">
                발언자의 준비가 끝난 후 토론을 시작합니다
              </SubText>
            </div>
          ) 
          : (
            <TimerWrapper>
              <VoteWrapper className={(phaseDetail === 3 | phaseDetail === 4)? "vote-root": null}>
                <Vote roomId={roomId} />
              </VoteWrapper>
              <VoteResultWrapper className={(phaseDetail === 3 | phaseDetail === 4)? "vote-root": null}>
                <Grid container>
                  <Grid item xs={6}>
                    <VoteRateDiv>
                      {voteLeftResult.length === 0 ? '00' : voteLeftResult[0]}:
                      {voteRightResult.length === 0 ? '00' : voteRightResult[0]}
                      <VoteNameDiv>
                        첫번째 투표
                      </VoteNameDiv>
                    </VoteRateDiv>
                  </Grid>
                  <Grid item xs={6}>
                    <VoteRateDiv className="right-root">
                      {voteLeftResult.length < 2 ? '00' : voteLeftResult[1]}:
                      {voteRightResult.length < 2 ? '00' : voteRightResult[1]}
                      <VoteNameDiv>
                        두번째 투표
                      </VoteNameDiv>
                    </VoteRateDiv>
                  </Grid>
                </Grid>
                <SubText className="timer-root">
                  첫번째 및 두번째 투표 결과(A:B의 비율) 입니다
                </SubText>
              </VoteResultWrapper>
              <TimeDiv className={(phaseDetail === 3 | phaseDetail === 4)? "vote-root": null}>
                <Timer />
                <SubText className="timer-root">
                  {phaseDetail===0 ? "잠시 후 토론을 시작합니다" : "마우스를 올리면 투표 기록을 확인할 수 있습니다"}
                </SubText>
              </TimeDiv>
            </TimerWrapper>
          )}
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