import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/system/Container";

// child components
import HeadTitle from "components/debateroom/HeadTitle";

// axios
import customAxios from "utils/customAxios";

// recoil
import { useRecoilState } from "recoil";
import { isStartState, cardNumState, leftCardListState, rightCardListState, leftUserListState, rightUserListState, readyUserListState } from "stores/DebateStates";
 

function DebateRoom() {

  // state
  const { roomId } = useParams();
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
  const [roomPhase, setRoomPhase] = useState(0);
  const [roomPhaseDetail, setRoomPhaseDetail] = useState(0);
  const [rightOpinion, setRightOpinion] = useState("");
  const [leftOpinion, setLeftOpinion] = useState("");
  const [timer, setTimer] = useState(0);
  const [counter, setCounter] = useState(0);
  const [isStart, setIsStart] = useRecoilState(isStartState);
  const [watchNum, setWatchNum] = useState(0);
  const [voteLeftResult, setVoteLeftResult] = useState([]) 
  const [voteRightResult, setVoteRightResult] = useState([])
  // listening
  const [listening, setListening] = useState(false);
  const [meventSource, msetEventSource] = useState(undefined);


  useEffect(() => {
    // 초기 데이터 받기
    async function get() {
      const axios = customAxios();
      axios
        .get(`/api/v2/room/enter/${roomId}`)
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
          setRoomPhase(data.roomPhase);
          setRoomPhaseDetail(data.roomPhaseDetail);
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
    // get();
    // SSE 연결
    let eventSource = undefined;

    if(!listening) {
      const baseURL = process.env.REACT_APP_SERVER_BASE_URL
      console.log("listening", listening);

      eventSource = new EventSource(`${baseURL}/api/v2/room/subscribe/${roomId}`)
      msetEventSource(eventSource);
      console.log("eventSource", eventSource);

      eventSource.onopen = event => {
          console.log("main 연결완료");
      };

      eventSource.onmessage = event => {
        console.log("onmessage");

        const data = JSON.parse(event.data)
        // SSE 수신 데이터 처리
        // 다음 코드 ~

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
  }, [])

  return (
    <Container>
      <HeadTitle isStart={isStart} title={roomName} />
    </Container>
  );
}

export default DebateRoom;