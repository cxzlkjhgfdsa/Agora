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
import { isStartState, isAllReadyState, isReadyState, roleState, testState } from "../components/stores/DebateRoomStates";
import { useEffect, useState } from "react";

function DebateRoom() {

  // sse test
  const [isStart, setIsStart] = useRecoilState(isStartState);
  const [isAllReady, setISAllReady] = useRecoilState(isAllReadyState);
  const [isReady, setISReady] = useRecoilState(isReadyState);
  const [role, setRole] = useRecoilState(roleState)

  const [test, setTest] = useRecoilState(testState)
  
  const data = {
    isReady: isReady,
    isStart: isStart,
    role: role,
  }
  
  const [listening, setListening] = useState(false);
  const [meventSource, msetEventSource] = useState(undefined);
  
  let eventSource = undefined;

  // sse test
  useEffect(() => {
    if (!listening) {

      console.log("listening", listening);

      eventSource = new EventSource('http://70.12.247.157:8080/api/v2/room/subscribe/6')
      msetEventSource(eventSource);
      console.log("eventSource", eventSource);

      eventSource.onopen = event => {
          console.log("main 연결완료");
      };

      eventSource.onmessage = event => {
        console.log("onmessage");

        const data = JSON.parse(event.data)

        console.log(data)
      };

      eventSource.onerror = event => {
        console.log(event.target.readyState);
        if (event.target.readyState === EventSource.CLOSED) {
          console.log("eventsource closed (" + event.target.readyState + ")");
        }
        eventSource.close();
      };
      setListening(true);  
    }
    return () => {
      eventSource.close();
      console.log("eventsource closed")
    };
  }, []);

  const toggleTest = () => {
    setTest("B")
  }

  useEffect(() => {
    console.log(test)
  }, [test])
  
  return(
    <Container maxWidth="xl">
      <HeadTitle isStart={isStart} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={7} lg={8}>
          <VideoComponent data={data} test={test} />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <TimeBox />
          <CardComponent test={test} />
        </Grid>
      </Grid>
      <button onClick={toggleTest}>toggle test</button>
    </Container>
  )
}

export default DebateRoom;