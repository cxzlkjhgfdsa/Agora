import styled from "styled-components";
import { useState, useEffect } from "react";
// components
import DebateButton from "./DebateButton";
import CardInputButton from "./CardInputButton";
// mui
import Grid from "@mui/material/Grid";

// recoil
import { useRecoilState } from "recoil";
import { isReadyState, isStartState, isAllReadyState, roleState } from "../stores/atoms";


function TimeBox() {
  // state
  const [cardNum, setCardNum] = useState(0)

  // recoil state
  const [isReady, setIsReady] = useRecoilState(isReadyState);
  const [isStart, setIsStart] = useRecoilState(isStartState);
  const [isAllReady, setISAllReady] = useRecoilState(isAllReadyState);
  const [role, setRole] = useRecoilState(roleState);

  // toggle ready state
  const toggleReady = () => {
    setIsReady(true);
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
    setRole("master");
  
    return(() => {
      setIsReady(false);
      setIsStart(false);
    })
  },[])

  // function to detect start state
  useEffect(() => {
    console.log(isStart);
  }, [isStart])

  return(
    <Wrapper>
      <AreaDiv>
        <Grid container spacing={0}>
          <Grid item xs={8}>
            <CardInputButton />
          </Grid>
          <Grid item xs={4}>
            <CardNumDiv>
              <div>
                카드 제출
              </div>
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
            준비가 완료되었다면 준비 완료를 눌러주세요
          </Grid>
        </Grid>
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
  font-size: 22px;
  font-weight: bold;
  color: #777777;
  letter-spacing: -1px;

  // positioning
  display: flex;
  flex-direction: column;
  align-items: center;

  // margin & padding
  margin-top: 20%;
  margin-right: 10px;
  line-height: 150%
`
