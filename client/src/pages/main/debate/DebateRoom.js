import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/system/Container";

// child components
import HeadTitle from "components/debateroom/HeadTitle";
import TimeBox from "components/debateroom/TimeBox";
import CardComponent from "components/debateroom/CardComponent";
import DebaterBox from "components/debateroom/DebaterBox";
import VideoComponent from "components/debateroom/VideoComponent";
import ReadyVideo from "components/debateroom/ReadyVideo";

// axios
import customAxios from "utils/customAxios";

// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { isStartState, leftCardListState, rightCardListState, leftUserListState, rightUserListState, readyUserListState, phaseNumberState, phaseDetailState, voteLeftResultState, voteRightResultState, timerState, counterState } from "stores/DebateStates";
import { userInfoState } from "stores/userInfoState";
import { debateUserRoleState } from "stores/joinDebateRoomStates";
import getToken from "components/debateroom/GetToken";
import axios from "axios";
 

function DebateRoom() {

  // state
  const { roomId } = useParams();
  const userInfo = useRecoilValue(userInfoState);
  // const nickname = userInfo?.userNickname;
  const [currentSpeakingTeam, setCurrentSpeakingTeam] = useState("");
  const [currentSpeakingUser, setCurrentSpeakingUser] = useState("");
  const [isAllReady, setIsAllReady] = useState(false)
  const [leftCardList, setLeftCardList] = useRecoilState(leftCardListState);
  const [rightCardList, setRightCardList] = useRecoilState(rightCardListState);
  const [leftUserList, setLeftUserList] = useRecoilState(leftUserListState);
  const [rightUserList, setRightUserList] = useRecoilState(rightUserListState);
  const [readyUserList, setReadyUserList] = useRecoilState(readyUserListState);
  const [master, setMaster] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomToken, setRoomToken] = useState(undefined);
  const [phaseNum, setPhaseNum] = useRecoilState(phaseNumberState);
  const [phaseDetail, setPhaseDetail] = useRecoilState(phaseDetailState);
  const [rightOpinion, setRightOpinion] = useState("");
  const [leftOpinion, setLeftOpinion] = useState("");
  const [timer, setTimer] = useRecoilState(timerState);
  const [counter, setCounter] = useRecoilState(counterState);
  const [isStart, setIsStart] = useRecoilState(isStartState);
  const [watchNum, setWatchNum] = useState(0);
  const [voteLeftResult, setVoteLeftResult] = useRecoilState(voteLeftResultState);
  const [voteRightResult, setVoteRightResult] = useRecoilState(voteRightResultState);
  const [role, setRole] = useRecoilState(debateUserRoleState);
  
  // // listening
  const [listening, setListening] = useState(false);
  const [meventSource, msetEventSource] = useState(undefined);
  
  // 임시 데이터
  // const [roomName, setRoomName] = useState("여기는 제목입니다.");
  const [nickname, setNickname] = useState("")
  // const [role, setRole] = useState("viewer");
  
  // useEffect(() => {
  //  getToken(roomId).then(token => {
  //   setRoomToken(token);
  //  })
  // }, [])

  useEffect(() => {
    console.log(roomToken)
  }, [roomToken])

  useEffect(() => {
    // 초기 데이터 받기
    async function get() {
      const axios = customAxios();
      axios
        .get(`/v2/room/enter/${roomId}`)
        .then(response => {
          const data = response.data.body
          setCurrentSpeakingTeam(data.currentSpeakingTeam);
          setCurrentSpeakingUser(data.currentSpeakingUser);
          setIsAllReady(data.isAllReady);
          setLeftCardList(data.leftOpenedCardList);
          setLeftUserList(data.leftUserList);
          setRoomToken(data.openviduToken);
          setReadyUserList(data.readyUserList);
          setRightCardList(data.rightOpenedCardList);
          setRightUserList(data.rightUserList);
          setMaster(data.roomCreaterName);
          setRoomName(data.roomName);
          setRightOpinion(data.roomOpinionRight);
          setLeftOpinion(data.roomOpinionLeft);
          setPhaseNum(data.roomPhase);
          setPhaseDetail(data.roomPhaseDetail);
          setTimer(data.roomPhaseRemainSecond);
          setIsStart(data.roomPhase);
          setCounter(data.roomTimeInProgressSecond);
          setWatchNum(data.roomWatchCnt);
          setVoteLeftResult(data.voteLeftResultsList);
          setVoteRightResult(data.voteRightResultsList);
        })
        .catch(error => {
          console.log(error)
        })
    }
    get();
    // SSE 연결
    let eventSource = undefined;

    if(!listening) {
      const baseURL = process.env.REACT_APP_SERVER_BASE_URL
      console.log("listening", listening);

      eventSource = new EventSource(`${baseURL}/v2/room/subscribe/${roomId}`)
      msetEventSource(eventSource);
      console.log("eventSource", eventSource);

      eventSource.onopen = event => {
          console.log("main 연결완료");
      };

      eventSource.onmessage = event => {
        console.log("onmessage");

        const data = JSON.parse(event.data)
        // SSE 수신 데이터 처리
        console.log(data);
        // 1. ready 신호 처리
        if (data.event === "ready") {
          setReadyUserList(data.readyUserList);
          if (data.allReady) {
            setIsAllReady(true);
          }
        };
        // 2. start 신호 처리
        if (data.event === "startDebate") {
          setIsStart(true);
          setPhaseNum(data.roomPhase);
          setPhaseDetail(data.roomPhaseDetail);
          setTimer(10);         
        };
        if (data.event === "startSpeakPhase") {
          setPhaseNum(data.roomPhase);
          setPhaseDetail(data.roomPhaseDetail);
          // timer 처리  
          setTimer(180);
        }
        // 3. enter 신호 처리


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
  }, [])

  // temp button to control session
  const handleStart = () => {
    setIsStart(prev => !prev);
  }
  const handleIsAllReady = () => {
    setIsAllReady(prev => !prev);
  }
  const handlePhaseNum = () => {
    setPhaseNum(prev => (prev === 3 ? 0 : prev + 1))
  }
  const handlePhaseDetail = () => {
    setPhaseDetail(prev => (prev === 4 ? 1 : prev + 1))
  }
  const handleResult = () => {
    if (phaseNum === 1) {
      setVoteLeftResult([10]);
      setVoteRightResult([90]);
    } else if (phaseNum === 2) {
      setVoteLeftResult(prev => [...prev, 70]);
      setVoteRightResult(prev => [...prev, 30]);
    } else {
      setVoteLeftResult(prev => [...prev, 20]);
      setVoteRightResult(prev => [...prev, 80]);   
    }
  }
  const handleUserList = () => {
    setLeftUserList(["left1", "left2", "left3"]);
    setRightUserList(["right1", "right2", "right3"]);
  }
  const handleReadyUserList = () => {
    setReadyUserList(["left1", "left2", "right2", "right3"])
  }
  const handleTotlaPhase = () => {
    const newPhaseDetail = phaseDetail + 1
    if (!phaseNum) {
      setPhaseNum(1);
    } 
    else if (newPhaseDetail === 5) {
      handlePhaseNum();
      handlePhaseDetail();
    } 
    else if (newPhaseDetail === 4) {
      handlePhaseDetail();
      handleResult();
    } 
    else {
      handlePhaseDetail();
    }
  }
  const handleRoleViewer = () => {
    setRole("viewer");
  }
  const handleRoleHost = () => {
    setRole("host");
  }
  const handleRoleSpeaker = () => {
    setRole("speaker");
  }
  const handleNickname = (e) => {
    setNickname(e.target.value);
  }

  // VideoComponent props data
  const data = {
    roomToken : roomToken,
    nickname : nickname,
    role: role,
    phaseNum: phaseNum,
    phaseDetail: phaseDetail,
    leftOpinion: leftOpinion,
    rightOpinion: rightOpinion,
    leftUser: leftUserList,
    rightUser: rightUserList,
  };

  return (
    <Container maxWidth="xl">
      <HeadTitle isStart={isStart} title={roomName} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={7} lg={8}>
          {!isStart
            ? (
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <ReadyVideo opinion={"A쪽 주장입니다"} />
                </Grid>
                <Grid item xs={6}>
                  <ReadyVideo opinion={"B쪽 주장입니다"} />
                </Grid>
              </Grid>
              )
            : (
              <VideoComponent data={data} />
            )}
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <DebaterBox data={leftUserList} sessionNum={phaseNum} />
            </Grid>
            <Grid item xs={6}>
              <DebaterBox data={rightUserList} sessionNum={phaseNum} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TimeBox isAllReady={isAllReady} roomId={roomId} role={role} nickname={nickname} />
            </Grid>
            <Grid item xs={12}>
              <CardComponent role={role} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          시작 전 준비사항
        </Grid>
        <Grid item xs={1}>
          <button onClick={handleUserList}>user list</button>
        </Grid>
        <Grid item xs={1}>
          <button onClick={handleReadyUserList}>ready user list</button>
        </Grid>
        <Grid item xs={1}>
          <button onClick={handleIsAllReady}>is all ready</button>
        </Grid>
        <Grid item xs={3}>
          <input onChange={handleNickname} />
        </Grid>
        <Grid item xs={12}>
          역할 정하기
        </Grid>
        <Grid item xs={1}>
          <button onClick={handleRoleViewer}>
            viewer
          </button>
        </Grid>
        <Grid item xs={1}>
          <button onClick={handleRoleHost}>
            host
          </button>
        </Grid>
        <Grid item xs={1}>
          <button onClick={handleRoleSpeaker}>
            speaker
          </button>
        </Grid>
        <Grid item xs={12}>
          시작 후 조정 사항
        </Grid>
        <Grid item xs={1}>
          <button onClick={handleStart}>start</button>
        </Grid>
        <Grid item xs={1}>
          <button onClick={handleTotlaPhase}>All Phase</button>
        </Grid>
        <Grid item xs={1}>
          <button onClick={handlePhaseNum}>phaseNum : {phaseNum}</button>
        </Grid>
        <Grid item xs={1}>
          <button onClick={handlePhaseDetail}>phaseDetail : {phaseDetail}</button>
        </Grid>
        <Grid item xs={1}>
          <button onClick={handleResult}>handle result</button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DebateRoom;