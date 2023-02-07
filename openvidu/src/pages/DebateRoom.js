import Grid from "@mui/material/Grid";
import Container from "@mui/system/Container";

// component
import VideoComponent from "../components/debateroom/VideoComponents"
import HeadTitle from "../components/debateroom/HeadTitle";
import TimeBox from "../components/debateroom/TimeBox";
import CardComponent from "../components/debateroom/CardComponent";
import DebateButton from "../components/debateroom/DebateButton";

// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { isStartState, isAllReadyState, isReadyState, roleState } from "../components/stores/atoms";
import { useEffect } from "react";

function DebateRoom() {

  const [isStart, setIsStart] = useRecoilState(isStartState);
  const [isAllReady, setISAllReady] = useRecoilState(isAllReadyState);
  const [isReady, setISReady] = useRecoilState(isReadyState);
  const [role, setRole] = useRecoilState(roleState)

  const data = {
    isReady: isReady,
    isStart: isStart,
    role: role,
  }
  
  return(
    <Container maxWidth="xl">
      <HeadTitle isStart={isStart} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={7} lg={8}>
          <VideoComponent data={data}/>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <TimeBox />
          <CardComponent />
        </Grid>
      </Grid>
    </Container>
  )
}

export default DebateRoom;