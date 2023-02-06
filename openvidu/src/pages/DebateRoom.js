import Grid from "@mui/material/Grid";
import Container from "@mui/system/Container";

import VideoComponent from "../components/debateroom/VideoComponents"
import HeadTitle from "../components/debateroom/HeadTitle";
import TimeBar from "../components/debateroom/TimeBar";
import CardComponent from "../components/debateroom/CardComponent";

function DebateRoom() {

  return(
    <Container maxWidth="xl">
      <HeadTitle isStart={true} />
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <VideoComponent />
        </Grid>
        <Grid item xs={4}>
          <TimeBar />
          <CardComponent />
        </Grid>
      </Grid>
    </Container>
  )
}

export default DebateRoom;