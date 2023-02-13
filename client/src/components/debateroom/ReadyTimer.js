import styled from "styled-components";
import Grid from "@mui/material/Grid";

function ReadyTimer() {

  return(
    <div>
      <Grid container>
        <Grid item xs={6}> 
          <CountdownDiv className="nickname-root">
            000s
            <NicknameDiv>
              발언자
            </NicknameDiv>
          </CountdownDiv>
        </Grid>
        <Grid item xs={6}>
          <DebatetimeDiv className="text-root">
            토론 시간<br />
            <TimerWrapper>
              00:00
            </TimerWrapper>
            <PhaseDiv>
              토론 준비중
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
  color: white;
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

export default ReadyTimer