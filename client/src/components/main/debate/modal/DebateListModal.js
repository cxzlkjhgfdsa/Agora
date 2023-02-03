import styled from "styled-components";
import ModalCategory from "./ModalCategory";
import ModalContents from "./ModalContents";
import ModalOrderBy from "./ModalOrderBy";
import ModalTitle from "./ModalTitle";

import Close from "assets/icons/Close.png";
import { useEffect, useState } from "react";
import customAxios from "utils/customAxios";

// Title
import LightBulb from "assets/icons/Light_Bulb.png";
import Clock from "assets/icons/Clock.png";

const StyledDebateListModal = styled.div`
  // 크기 설정
  min-width: 900px;
  width: calc( 90% - 160px );
  height: calc( 900px - 80px );
  margin: 0;
  padding: 40px 80px;

  // 위치 설정
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  // 배경 설정
  background-color: #333333;

  // 테두리 설정
  border-radius: 20px;
`;

const CloseButton = styled.img`
  width: 46px; height: 46px;
  position: absolute;
  top: 15px;
  right: 15px;

  cursor: pointer;

  background-color: #000000;
  border-radius: 2rem;
`;

/*
  closeModalEvent: Modal 닫는 이벤트
  showType: 열띤 토론중 or 토론 대기중 등 모두보기를 누른 토론방의 상태 (debating, waiting)
*/
function DebateListModal({ closeModalEvent, debateState }) {
  const axios = customAxios();

  // 제목 설정
  let titleIcon = null;
  let titleText = "";
  if (debateState === "debating") {
    titleIcon = LightBulb;
    titleText = "열띤 토론중";
  } else if (debateState === "waiting") {
    titleIcon = Clock;
    titleText = "토론 대기중";
  }

  const [orderBy, setOrderBy] = useState("createnew");
  const [category, setCategory] = useState("all");
  const [contents, setContents] = useState([]);

  // 정렬순이나 카테고리가 바뀔 때마다,
  // 1. 서버에서 데이터 받아오기
  // 2. 아톰 패밀리 업데이트
  useEffect(() => {
    // 0. 모두보기 기준 설정 (열띤 토론중 또는 토론 대기중)
    // roomState, true: 진행중, false: 대기중
    let roomState = null;
    // 아톰 패밀리 업데이트 시작 인덱스 설정 (열띤 토론중: 100 ~, 토론 대기중 200 ~)
    let updateBeginIdx = 0;
    if (debateState === "debating") {
      roomState = true;
      updateBeginIdx = 100;
    } else if (debateState === "waiting") {
      roomState = false;
      updateBeginIdx = 200;
    }

    setContents([
      {
        "roomId": 24,
        "roomName": "시빌워 최애는?",
        "roomCreaterName": "로버트다우니주니어",
        "roomDebateType": "FORMAL",
        "roomOpinionLeft": "아이언맨",
        "roomOpinionRight": "캡틴아메리카",
        "roomHashtags": "#영화,#아이언맨,#마블,#캡아",
        "roomWatchCnt": 161,
        "roomPhase": 3,
        "roomPhaseCurrentTimeMinute": 1,
        "roomPhaseCurrentTimeSecond": 5,
        "roomStartTime": "2023-02-03T15:01:44.000227",
        "roomThumbnailUrl": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F53miU%2FbtrXHNPZeR8%2FwgceDIMlSnydGK83o2LAk0%2Fimg.png",
        "roomCategory": "영화/드라마",
        "roomState": false,
        "leftUserList": [
          "이동진",
          "로버트다우니주니어",
          "라면조아",
          "이동진",
          "로버트다우니주니어",
          "라면조아"
        ],
        "rightUserList": [
          "영화좋아하는사람",
          "김영한",
          "안침착맨",
          "영화좋아하는사람",
          "김영한",
          "안침착맨"
        ]
      },
      {
        "roomId": 26,
        "roomName": "라면에 하나만 넣는다면?",
        "roomCreaterName": "라면조아",
        "roomDebateType": "FORMAL",
        "roomOpinionLeft": "김치",
        "roomOpinionRight": "계란",
        "roomHashtags": "#라면,#김치,#계란,#뭐든좋아",
        "roomWatchCnt": 350,
        "roomPhase": 2,
        "roomPhaseCurrentTimeMinute": 1,
        "roomPhaseCurrentTimeSecond": 5,
        "roomStartTime": "2023-02-03T15:01:44.000227",
        "roomThumbnailUrl": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FOd05v%2FbtrXHT3JqkJ%2Fl0Qhf5QygUqOIskZwYEqWK%2Fimg.png",
        "roomCategory": "음식",
        "roomState": false,
        "leftUserList": [
          "이동진",
          "로버트다우니주니어",
          "라면조아",
          "이동진",
          "로버트다우니주니어",
          "라면조아"
        ],
        "rightUserList": [
          "영화좋아하는사람",
          "김영한",
          "안침착맨",
          "영화좋아하는사람",
          "김영한",
          "안침착맨"
        ]
      },
      {
        "roomId": 25,
        "roomName": "침펄 토론 따라하기",
        "roomCreaterName": "안침착맨",
        "roomDebateType": "FORMAL",
        "roomOpinionLeft": "딱딱한 복숭아",
        "roomOpinionRight": "말랑 복숭아",
        "roomHashtags": "#침펄토론,#복숭아,#딱복,#말복",
        "roomWatchCnt": 138,
        "roomPhase": 1,
        "roomPhaseCurrentTimeMinute": 1,
        "roomPhaseCurrentTimeSecond": 5,
        "roomStartTime": "2023-02-03T15:01:44.000227",
        "roomThumbnailUrl": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FccvJcN%2FbtrXHXrhjy7%2F8wtFTqBPT7Xr9hbl5PRCEk%2Fimg.png",
        "roomCategory": "음식",
        "roomState": false,
        "leftUserList": [
          "영화좋아하는사람",
          "김영한",
          "안침착맨",
          "영화좋아하는사람",
          "김영한",
          "안침착맨"
        ],
        "rightUserList": [
          "이동진",
          "로버트다우니주니어",
          "라면조아",
          "이동진",
          "로버트다우니주니어",
          "라면조아"
        ]
      },
      {
        "roomId": 23,
        "roomName": "프로그래머 진로 상담",
        "roomCreaterName": "김영한",
        "roomDebateType": "FORMAL",
        "roomOpinionLeft": "백엔드",
        "roomOpinionRight": "프론트엔드",
        "roomHashtags": "#프로그래머,#백엔드,#프론트엔드,#뭐가좋아요",
        "roomWatchCnt": 182,
        "roomPhase": 2,
        "roomPhaseCurrentTimeMinute": 1,
        "roomPhaseCurrentTimeSecond": 5,
        "roomStartTime": "2023-02-03T15:01:44.000227",
        "roomThumbnailUrl": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbuahof%2FbtrXGT4aryB%2FMp7YUmbKQd9gh7WKz4Tmd0%2Fimg.png",
        "roomCategory": "공부",
        "roomState": false,
        "leftUserList": [
          "영화좋아하는사람",
          "김영한",
          "안침착맨",
          "영화좋아하는사람",
          "김영한",
          "안침착맨"
        ],
        "rightUserList": [
          "이동진",
          "로버트다우니주니어",
          "라면조아",
          "이동진",
          "로버트다우니주니어",
          "라면조아"
        ]
      },
      {
        "roomId": 21,
        "roomName": "배트맨 최고 감독은?",
        "roomCreaterName": "영화좋아하는사람",
        "roomDebateType": "FORMAL",
        "roomOpinionLeft": "크리스토퍼 놀란",
        "roomOpinionRight": "맷 리브스",
        "roomHashtags": "#영화,#크리스토퍼놀란,#맷리브스",
        "roomWatchCnt": 209,
        "roomPhase": 3,
        "roomPhaseCurrentTimeMinute": 1,
        "roomPhaseCurrentTimeSecond": 5,
        "roomStartTime": "2023-02-03T15:01:44.000227",
        "roomThumbnailUrl": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FRkqyn%2FbtrXIohMRVP%2FrXCZVNDLEEKPwNfjBCmjvK%2Fimg.png",
        "roomCategory": "영화/드라마",
        "roomState": false,
        "leftUserList": [
          "영화좋아하는사람",
          "김영한",
          "안침착맨",
          "영화좋아하는사람",
          "김영한",
          "안침착맨"
        ],
        "rightUserList": [
          "이동진",
          "로버트다우니주니어",
          "라면조아",
          "이동진",
          "로버트다우니주니어",
          "라면조아"
        ]
      }]);
    
    // 1. 서버에서 데이터 받아오기 (최신순, 전체)
    axios.get("/api/v1/search/main/modal", {
      params: {
        roomState: roomState,
        order: orderBy,
        category: category
      },
      withCredentials: false
    }).then(({ data }) => {
      // 데이터 저장
      setContents(data.body.content);

      // 2. 아톰 패밀리 업데이트

    }).catch(error => {
      alert(error);
    });
  }, [orderBy, category]);

  return (
    <StyledDebateListModal>
      <ModalTitle image={titleIcon} text={titleText} />
      <CloseButton src={Close} onClick={closeModalEvent} />
      <ModalOrderBy setOrderBy={setOrderBy} />
      <ModalCategory setCategory={setCategory} />
      <ModalContents contents={contents} />
    </StyledDebateListModal>
  );
}

export default DebateListModal;