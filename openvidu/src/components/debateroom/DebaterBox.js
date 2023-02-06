import styled from "styled-components";
import Grid from "@mui/material/Grid";


const DebaterBoxDiv = styled.div`
  width: 100%;
  height: 80px;
  box-shadow: 1px 1px 3px #d4d4d4, -1px -1px 1px #eeeeee;

  border-radius: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 20px;
`
const MemberDiv = styled.div`
  width: 100%;
  height: 60px;

  font-size: 24px;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;

  border-right : solid 1px  #d4d4d4;
`

const NicknameDiv = styled.div`


  width: 80%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  
  border-radius: 8px;

  color: #bbbbbb;

  // 드래그 방지
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;

  &.isSpeaking-root {
    background-color: #F6C026;
    color: white;
  }
`

function DebaterBox({data, sessionNum}) {
  
  return(
    <DebaterBoxDiv>
      <Grid container spacing={0} >
        <Grid item xs={4}>
          <MemberDiv>
            <NicknameDiv className={sessionNum === 0 ? "isSpeaking-root" : null}>
              {data[0]}
            </NicknameDiv>
          </MemberDiv>
        </Grid>
        <Grid item xs={4}>
          <MemberDiv>
            <NicknameDiv className={sessionNum === 1 ? "isSpeaking-root" : null}>
              {data[1]}
            </NicknameDiv>
          </MemberDiv>
        </Grid>
        <Grid item xs={4}>
          <MemberDiv>
            <NicknameDiv className={sessionNum === 2 ? "isSpeaking-root" : null}>
              {data[2]}
            </NicknameDiv>
          </MemberDiv>
        </Grid>
      </Grid>
    </DebaterBoxDiv>
  )
}

export default DebaterBox