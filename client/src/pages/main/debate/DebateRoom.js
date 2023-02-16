import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createBrowserHistory } from "history";
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
import { isStartState, leftCardListState, rightCardListState, leftUserListState, rightUserListState, readyUserListState, phaseNumberState, phaseDetailState, voteLeftResultState, voteRightResultState, timerState, counterState, firstCardFileState, secondCardFileState, lastRoomState, isRoomState } from "stores/DebateStates";
import { userInfoState } from "stores/userInfoState";
import { debateUserRoleState } from "stores/joinDebateRoomStates";

function DebateRoom() {
  // state
  const { roomId } = useParams();
  const userInfo = useRecoilValue(userInfoState);
  const nickname = userInfo?.userNickname;
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

  // 방진입 감지
  const [lastRoom, setLastRoom] = useRecoilState(lastRoomState);
  const [isRoom, setIsRoom] = useRecoilState(isRoomState);
  
  // listening
  const [listening, setListening] = useState(false);
  const [meventSource, msetEventSource] = useState(undefined);

  // 이미지 파일 State
  const img1File = useRecoilValue(firstCardFileState);
  const img2File = useRecoilValue(secondCardFileState);

  // Post Flag
  const [submitPicsPostFlag, setSubmitPicsPostFlag] = useState(false);
  const [leavePostFlag, setLeavePostFlag] = useState(false);

  const navigate = useNavigate();

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
          setTimer(data.roomPhaseRemainSecond - 3);
          setCounter(data.roomTimeInProgressSecond + 3);
          setWatchNum(data.roomWatchCnt);
          setVoteLeftResult(data.voteLeftResultsList);
          setVoteRightResult(data.voteRightResultsList);

          // 방진입 감지
          setLastRoom(roomId);
          setIsRoom(true);

          return data.roomState
        })
        .then(roomState => {
          const setRoomState = (state) => {
            setIsStart(state);
          };
          setTimeout(setRoomState, 2000, roomState);
        })
        .catch(error => {
          console.log(error);
          alert("방이 존재하지 않습니다.");
          navigate("/debate/list");
        })
    }
    get();
    // SSE 연결 
    let eventSource = undefined;

    if(!listening) {
      console.log("listening", listening);

      const baseURL = process.env.REACT_APP_SERVER_BASE_URL;
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
            // 시작 신호가 오면 card를 axios post
            setIsAllReady(true);
          }
        };

        // 2. phase 신호 처리
        // 2.1. debate phase 신호 처리
        if (data.event === "startDebate") {
          setIsStart(true);
          setPhaseNum(data.roomPhase);
          setPhaseDetail(data.roomPhaseDetail);
          setTimer(10);         

          // Post Flag를 True로 바꿔 서버로 근거자료 전송
          setSubmitPicsPostFlag(true);
        };
        if (data.event === "startSpeakPhase") {
          setPhaseNum(data.roomPhase);
          setPhaseDetail(data.roomPhaseDetail);
          // timer 처리  
          setTimer(180);
        }
        // 2.2. vote phase 신호 처리
        if (data.event === "startVotePhase") {
          setPhaseNum(data.roomPhase);
          setPhaseDetail(data.roomPhaseDetail);
          // timer 처리
          setTimer(60);          
        }
        // 2.2. vote result phase 신호 처리
        if (data.event === "startVoteResultPhase") {
          setPhaseNum(data.roomPhase);
          setPhaseDetail(data.roomPhaseDetail);
          // timer 처리
          setTimer(10);
          // 투표 결과 처리
          setVoteLeftResult(data.voteLeftResultsList);
          setVoteRightResult(data.voteRightResultsList);
        }

        // 3. enter 신호 처리
        if (data.event === "enter") {
          setLeftUserList(data.leftUserList);
          setRightUserList(data.rightUserList);
        }

        // 4. cardOpen 신호 처리
        if (data.event === "cardOpen") {
          setLeftCardList(data.leftOpenedCardList);
          setRightCardList(data.rightOpenedCardList);
        }
        
        // 5. 실시간 시청자수 처리
        if (data.event === "updateWatchCnt") {
          setWatchNum(data.roomWatchCnt);
        }

        // 6. 방 나가기 신호
        if (data.event === "endDebate") {
          window.alert("토론이 종료되었습니다;.")
          navigate("/debate/list")
        }
      };

      eventSource.onerror = event => {
        console.log(event.target.readyState);
        if (event.target.readyState === EventSource.CLOSED) {
          console.log("eventsource closed (" + event.target.readyState + ")");
        }
        eventSource.close();
      };
      setListening(true);  

      window.addEventListener('beforeunload', handleBeforeUnload)
    }
    return () => {
      eventSource.close();
      console.log("eventsource closed")
      // 나갈 때, post
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    console.log(lastRoom)
  }, [lastRoom]);


  // 토론방을 떠날 때 실행될 Post
  const handleBeforeUnload = () => {
    setLeavePostFlag(true);
  };

  useEffect(() => {
    if (leavePostFlag) {
      const axios = customAxios();
        axios
          .post('v2/room/leave', {
            "roomId": roomId,
            "userNickname" : nickname,
          })
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      setLeavePostFlag(false);
    }
  }, [leavePostFlag]);

  useEffect(() => {
    if (submitPicsPostFlag) {
      // FormData 생성
      const formData = new FormData();
      formData.append("roomId", roomId);
      formData.append("userNickname", nickname);
      if (img1File instanceof File) {  // 첫 번째 파일 데이터 삽입
        formData.append("files", img1File);
      }
      if (img2File instanceof File) {  // 두 번째 파일 데이터 삽입
        formData.append("files", img2File);
      }
      
      customAxios().post("/v2/file/save/card",
        formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        }).then(({ data }) => {
        console.log(data);
      }).catch(error => {
        console.log(error);
      });
      
      // 다시 False로 변경해 다시 실행될 수 있도록 설정
      setSubmitPicsPostFlag(false);
    }
  }, [submitPicsPostFlag]);

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
    roomId: roomId,
  };

  return (
    <Container maxWidth="xl">
      <HeadTitle isStart={isStart} title={roomName} watchNum={watchNum} />
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
            ) : (
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
              <CardComponent role={role} roomId={roomId} nickname={nickname} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DebateRoom;
